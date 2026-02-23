// Product Service - MongoDB API Integration
// Mirrors projectService.js but for Shop products

class ProductService {
    constructor() {
        this.API_BASE = import.meta.env.VITE_API_BASE ||
            (import.meta.env.DEV
                ? 'http://localhost:8888/.netlify/functions'
                : 'https://adorable-dodol-77eb48.netlify.app/.netlify/functions')
    }

    // ── GET all products ──
    async getAllProducts() {
        try {
            const response = await fetch(`${this.API_BASE}/products`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            return (await response.json()) || []
        } catch (error) {
            console.error('Error fetching products:', error)
            return this.getFallbackProducts()
        }
    }

    // ── ADD a product ──
    async addProduct(product) {
        try {
            const productData = {
                ...product,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            const response = await fetch(`${this.API_BASE}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const newProduct = await response.json()
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return newProduct
        } catch (error) {
            console.error('Error adding product:', error)
            return this.addFallbackProduct(product)
        }
    }

    // ── UPDATE a product ──
    async updateProduct(productId, updates) {
        try {
            const updateData = { ...updates, updatedAt: new Date().toISOString() }
            const response = await fetch(`${this.API_BASE}/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const updated = await response.json()
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return updated
        } catch (error) {
            console.error('Error updating product:', error)
            return this.updateFallbackProduct(productId, updates)
        }
    }

    // ── DELETE a product ──
    async deleteProduct(productId) {
        try {
            const response = await fetch(`${this.API_BASE}/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            const result = await response.json()
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return result
        } catch (error) {
            console.error('Error deleting product:', error)
            return this.deleteFallbackProduct(productId)
        }
    }

    // ── localStorage fallbacks ──
    getFallbackProducts() {
        try {
            const stored = localStorage.getItem('eflash_admin_products')
            return stored ? JSON.parse(stored) : []
        } catch { return [] }
    }

    addFallbackProduct(product) {
        try {
            const products = this.getFallbackProducts()
            const newProduct = {
                ...product,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            products.unshift(newProduct)
            localStorage.setItem('eflash_admin_products', JSON.stringify(products))
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return newProduct
        } catch { return null }
    }

    updateFallbackProduct(productId, updates) {
        try {
            const products = this.getFallbackProducts()
            const idx = products.findIndex(p => p.id === productId || p._id === productId)
            if (idx === -1) throw new Error('Not found')
            products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString() }
            localStorage.setItem('eflash_admin_products', JSON.stringify(products))
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return products[idx]
        } catch { return null }
    }

    deleteFallbackProduct(productId) {
        try {
            const products = this.getFallbackProducts()
            const filtered = products.filter(p => p.id !== productId && p._id !== productId)
            localStorage.setItem('eflash_admin_products', JSON.stringify(filtered))
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return { message: 'Deleted successfully' }
        } catch { return null }
    }
}

const productService = new ProductService()
export default productService
