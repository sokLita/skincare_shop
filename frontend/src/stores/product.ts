// stores/product.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Types
export interface Product {
    id: number
    name: string
    slug: string
    description: string
    price: number
    sale_price?: number
    category_id: number
    brand_id?: number
    sku: string
    stock: number
    image: string
    images?: string[]
    rating?: number
    reviews_count?: number
    is_active: boolean
    is_featured: boolean
    created_at: string
    updated_at: string
}

export interface ProductFilter {
    category?: string
    brand?: string
    min_price?: number
    max_price?: number
    sort_by?: 'price_asc' | 'price_desc' | 'rating' | 'newest'
    search?: string
    page?: number
    per_page?: number
}

export interface PaginatedResponse<T> {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    first_page_url: string
    last_page_url: string
    next_page_url: string | null
    prev_page_url: string | null
}

interface ProductState {
    products: Product[]
    currentProduct: Product | null
    featuredProducts: Product[]
    relatedProducts: Product[]
    loading: boolean
    error: string | null
    pagination: {
        currentPage: number
        lastPage: number
        perPage: number
        total: number
    }
    filters: ProductFilter
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        products: [],
        currentProduct: null,
        featuredProducts: [],
        relatedProducts: [],
        loading: false,
        error: null,
        pagination: {
            currentPage: 1,
            lastPage: 1,
            perPage: 12,
            total: 0
        },
        filters: {
            page: 1,
            per_page: 12
        }
    }),
    
    getters: {
        getProductById: (state) => (id: number): Product | undefined => {
            return state.products.find(product => product.id === id)
        },
        
        hasStock: (state) => (productId: number): boolean => {
            const product = state.products.find(p => p.id === productId)
            return product ? product.stock > 0 : false
        },
        
        discountPercentage: (state) => (productId: number): number | null => {
            const product = state.products.find(p => p.id === productId)
            if (product && product.sale_price && product.price > 0) {
                return Math.round(((product.price - product.sale_price) / product.price) * 100)
            }
            return null
        },
        
        filterOptions: (state): { categories: string[]; brands: string[] } => {
            const categories = new Set<string>()
            const brands = new Set<string>()
            
            state.products.forEach(product => {
                // Assuming category and brand names are available
                // Adjust based on your actual data structure
                if (product.category_id) categories.add(product.category_id.toString())
                if (product.brand_id) brands.add(product.brand_id.toString())
            })
            
            return {
                categories: Array.from(categories),
                brands: Array.from(brands)
            }
        }
    },
    
    actions: {
        async fetchProducts(filters?: ProductFilter): Promise<void> {
            this.loading = true
            this.error = null
            
            try {
                const params = { ...this.filters, ...filters }
                const response = await axios.get<PaginatedResponse<Product>>('/products', { params })
                
                this.products = response.data.data
                this.pagination = {
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                    perPage: response.data.per_page,
                    total: response.data.total
                }
                this.filters = { ...this.filters, ...filters }
            } catch (error) {
                this.error = 'Failed to fetch products'
                console.error('Error fetching products:', error)
                throw error
            } finally {
                this.loading = false
            }
        },
        
        async fetchProduct(slug: string): Promise<void> {
            this.loading = true
            this.error = null
            
            try {
                const response = await axios.get<Product>(`/products/${slug}`)
                this.currentProduct = response.data
            } catch (error) {
                this.error = 'Failed to fetch product'
                console.error('Error fetching product:', error)
                throw error
            } finally {
                this.loading = false
            }
        },
        
        async fetchFeaturedProducts(): Promise<void> {
            try {
                const response = await axios.get<Product[]>('/products/featured')
                this.featuredProducts = response.data
            } catch (error) {
                console.error('Error fetching featured products:', error)
            }
        },
        
        async fetchRelatedProducts(productId: number): Promise<void> {
            try {
                const response = await axios.get<Product[]>(`/products/${productId}/related`)
                this.relatedProducts = response.data
            } catch (error) {
                console.error('Error fetching related products:', error)
            }
        },
        
        async searchProducts(query: string): Promise<Product[]> {
            try {
                const response = await axios.get<Product[]>('/products/search', { 
                    params: { q: query } 
                })
                return response.data
            } catch (error) {
                console.error('Error searching products:', error)
                return []
            }
        },
        
        setFilters(filters: ProductFilter): void {
            this.filters = { ...this.filters, ...filters, page: 1 }
            this.fetchProducts(this.filters)
        },
        
        resetFilters(): void {
            this.filters = {
                page: 1,
                per_page: 12
            }
            this.fetchProducts()
        },
        
        goToPage(page: number): void {
            if (page >= 1 && page <= this.pagination.lastPage) {
                this.filters.page = page
                this.fetchProducts(this.filters)
            }
        },
        
        clearCurrentProduct(): void {
            this.currentProduct = null
        },
        
        clearRelatedProducts(): void {
            this.relatedProducts = []
        }
    }
})