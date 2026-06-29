import { defineStore } from 'pinia'
import axios from 'axios'

type PersistedWishlistItem = {
  product_id: number
}

const STORAGE_KEY = 'wishlist.items.v1'

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    // Unique products by product_id; product object can be fetched/enriched later.
    items: [] as any[],
    loading: false
  }),

  getters: {
    count: (state) => state.items.length,
    productIds: (state) => state.items.map((item) => item.product_id ?? item.product?.id),
    hasProduct: (state) => (productId: number) => {
      const pid = Number(productId)
      return state.items.some((item) => Number(item.product_id ?? item.product?.id) === pid)
    }
  },

  actions: {
    hydrateFromLocalStorage() {
      const persisted = safeParseJson<PersistedWishlistItem[]>(localStorage.getItem(STORAGE_KEY)) || []

      // De-dupe defensively
      const set = new Set<number>()
      for (const it of persisted) {
        const pid = Number((it as any).product_id)
        if (!pid) continue
        set.add(pid)
      }

      this.items = Array.from(set.values()).map((product_id) => ({
        product_id
      }))
    },

    persistToLocalStorage() {
      const persisted: PersistedWishlistItem[] = this.items.map((it: any) => ({
        product_id: Number(it.product_id ?? it.product?.id)
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
    },

    async fetchWishlist() {
      // Keep badges immediate by hydrating first
      this.hydrateFromLocalStorage()

      this.loading = true
      try {
        const response = await axios.get('/wishlist')
        const serverItems = Array.isArray(response.data) ? response.data : []

        // Only overwrite local items if the backend actually has items.
        // If the backend wishlist is empty (because addToWishlist only writes to localStorage),
        // keep the local wishlist to avoid wiping out items the user just added.
        if (serverItems.length > 0) {
          // Normalize + de-dupe
          const map = new Map<number, any>()
          for (const item of serverItems) {
            const pid = Number(item.product_id ?? item.product?.id ?? item.id)
            if (!pid) continue
            map.set(pid, item)
          }

          this.items = Array.from(map.values()).map((item: any) => ({
            ...item,
            product_id: Number(item.product_id ?? item.product?.id ?? item.id)
          }))

          this.persistToLocalStorage()
        }
      } catch {
        // keep local wishlist if backend fails
      } finally {
        this.loading = false
      }
    },

    addToWishlist(productId: number) {
      const pid = Number(productId)
      if (!pid) return { success: false, error: 'Invalid product id' }

      if (this.hasProduct(pid)) {
        // ignore duplicate click
        return { success: true, data: { ignored: true } }
      }

      this.items.push({ product_id: pid })
      this.persistToLocalStorage()

      // Fire-and-forget sync with backend (non-blocking)
      axios.post('/wishlist', { product_id: pid }).catch(() => {})

      return { success: true, data: { product_id: pid } }
    },

    async removeFromWishlist(productId: number) {
      const pid = Number(productId)
      this.items = this.items.filter((item: any) => Number(item.product_id ?? item.product?.id) !== pid)
      this.persistToLocalStorage()

      // Optional backend sync
      try {
        await axios.delete(`/wishlist/${pid}`)
      } catch {
        // ignore
      }

      return { success: true }
    },

    clearWishlist() {
      this.items = []
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
