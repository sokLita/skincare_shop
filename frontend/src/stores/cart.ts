import { defineStore } from 'pinia'
import axios from 'axios'

type PersistedCartItem = {
  product_id: number
  quantity: number
  product?: any
}

const STORAGE_KEY = 'cart.items.v1'

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    // For the UI we primarily need product + quantity; product can be filled by backend later.
    items: [] as Array<any>,
    total: 0,
    count: 0,
    loading: false
  }),

  actions: {
    recalculateCart() {
      this.count = this.items.reduce((sum: number, item: any) => sum + Number(item.quantity || 0), 0)
      this.total = this.items.reduce((sum: number, item: any) => {
        const price = Number(item.product?.price || 0)
        return sum + (Number(item.quantity || 0) * price)
      }, 0)
    },

    hydrateFromLocalStorage() {
      const persisted = safeParseJson<PersistedCartItem[]>(localStorage.getItem(STORAGE_KEY)) || []

      // De-dupe defensively (in case localStorage is manually edited)
      const map = new Map<number, any>()
      for (const it of persisted) {
        const pid = Number((it as any).product_id)
        const qty = Number((it as any).quantity || 0)
        if (!pid || qty <= 0) continue

        const existing = map.get(pid)
        map.set(pid, {
          id: pid,
          product_id: pid,
          quantity: Number(existing?.quantity || 0) + qty,
          product: existing?.product || (it as any).product
        })
      }

      this.items = Array.from(map.values())
      this.recalculateCart()
    },

    persistToLocalStorage() {
      const persisted: PersistedCartItem[] = this.items.map((it: any) => ({
        product_id: Number(it.product_id ?? it.id),
        quantity: Number(it.quantity || 0),
        product: it.product
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
    },

    async enrichMissingProducts() {
      const missingIds = this.items
        .filter((item: any) => !item.product)
        .map((item: any) => Number(item.product_id ?? item.id))
        .filter(Boolean)

      if (missingIds.length === 0) return

      try {
        const remaining = new Set(missingIds)
        const foundProducts = new Map<number, any>()
        let page = 1
        let lastPage = 1

        do {
          const response = await axios.get('/products', { params: { page } })
          const products = Array.isArray(response.data?.data) ? response.data.data : []

          products.forEach((product: any) => {
            const productId = Number(product.id)

            if (remaining.has(productId)) {
              foundProducts.set(productId, product)
              remaining.delete(productId)
            }
          })

          lastPage = Number(response.data?.last_page || page)
          page += 1
        } while (remaining.size > 0 && page <= lastPage)

        if (foundProducts.size > 0) {
          this.items = this.items.map((item: any) => {
            const productId = Number(item.product_id ?? item.id)
            const product = foundProducts.get(productId)
            return product ? { ...item, product, product_id: productId, id: item.id ?? productId } : item
          })
          this.recalculateCart()
          this.persistToLocalStorage()
        }
      } catch {
        // keep the existing cart; the cart view has a fallback for unavailable products
      }
    },

    async fetchCart() {
      // Requirement: immediate badge updates and local persistence.
      // So always hydrate first. If user is authenticated, backend can later enrich prices.
      this.hydrateFromLocalStorage()

      // Optional backend sync (won't break badge correctness)
      this.loading = true
      try {
        const response = await axios.get('/cart')
        const items = Array.isArray(response.data.items) ? response.data.items : []

        // Only overwrite local items if the backend actually has items.
        // If the backend cart is empty (because addToCart only writes to localStorage),
        // keep the local cart to avoid wiping out items the user just added.
        if (items.length > 0) {
          this.items = items
          this.recalculateCart()
          if (response.data.total !== undefined) {
            this.total = Number(response.data.total || this.total)
          }
          if (response.data.count !== undefined) {
            this.count = Number(response.data.count || this.count)
          }
          // keep localStorage aligned with backend truth
          this.persistToLocalStorage()
        }
      } catch {
        // keep local cart if backend fails
      } finally {
        await this.enrichMissingProducts()
        this.loading = false
      }
    },

    addToCart(productOrId: number | any, quantity = 1) {
      // No popups/alerts here; UI will update via reactive state.
      const product = typeof productOrId === 'object' ? productOrId : null
      const pid = Number(product?.id ?? productOrId)
      const qty = Math.max(1, Number(quantity || 0))

      const existing = this.items.find((it: any) => Number(it.product_id ?? it.id) === pid)
      if (existing) {
        existing.quantity = Number(existing.quantity || 0) + qty
        if (product) existing.product = product
      } else {
        this.items.push({
          id: pid, // for Cart.vue list key
          product_id: pid,
          quantity: qty,
          product
        })
      }

      this.recalculateCart()
      this.persistToLocalStorage()

      // Fire-and-forget sync with backend (non-blocking)
      axios.post('/cart', { product_id: pid, quantity: qty }).catch(() => {})

      return { success: true, data: { product_id: pid, quantity: qty } }
    },

    async updateQuantity(cartId: number, quantity: number) {
      const qty = Number(quantity)
      if (qty < 1) {
        this.removeFromCart(cartId)
        return { success: true }
      }

      const cid = Number(cartId)
      const item = this.items.find((it: any) => Number(it.id ?? it.product_id) === cid)
      if (item) item.quantity = qty

      this.recalculateCart()
      this.persistToLocalStorage()

      // Optional backend sync (cart page)
      try {
        await axios.put(`/cart/${cid}`, { quantity: qty })
        await this.fetchCart()
      } catch {
        // keep local state
      }

      return { success: true }
    },

    removeFromCart(cartId: number) {
      const cid = Number(cartId)
      this.items = this.items.filter((it: any) => Number(it.id ?? it.product_id) !== cid)

      this.recalculateCart()
      this.persistToLocalStorage()

      // Fire-and-forget sync with backend (non-blocking)
      axios.delete(`/cart/${cid}`).catch(() => {})

      return { success: true }
    },

    async clearCart() {
      this.items = []
      this.count = 0
      this.total = 0
      localStorage.removeItem(STORAGE_KEY)

      // Optional backend sync
      try {
        await axios.delete('/cart')
      } catch {
        // ignore
      }

      return { success: true }
    },

    clearLocalCart() {
      this.items = []
      this.total = 0
      this.count = 0
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
