// Product Service - MongoDB API Integration
// Mirrors projectService.js but for Shop products

class ProductService {
    constructor() {
        this.API_BASE = import.meta.env.VITE_API_BASE ||
            (import.meta.env.DEV
                ? 'http://localhost:8888/.netlify/functions'
                : 'https://adorable-dodol-77eb48.netlify.app/api')
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

    // Helper: remove base64 Data URLs before sending to the API.
    // Netlify serverless functions reject payloads over 6 MB, and a single
    // base64-encoded image can easily exceed that limit.
    _stripBase64Images(data) {
        const isBase64 = (s) => typeof s === 'string' && s.startsWith('data:');
        return {
            ...data,
            images: (data.images || []).filter(img => !isBase64(img)),
            image: isBase64(data.image) ? '' : (data.image || ''),
        };
    }

    // ── ADD a product ──
    async addProduct(product) {
        try {
            const productData = this._stripBase64Images({
                ...product,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })
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
        const updateData = this._stripBase64Images({ ...updates, updatedAt: new Date().toISOString() })
        const response = await fetch(`${this.API_BASE}/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        })
        if (!response.ok) {
            let errMsg = `HTTP ${response.status}`
            try { const b = await response.json(); if (b.error) errMsg = b.error } catch (_) { }
            throw new Error(errMsg)
        }
        const updated = await response.json()
        window.dispatchEvent(new CustomEvent('productsUpdate'))
        return updated
    }

    // ── DELETE a product ──
    async deleteProduct(productId) {
        const response = await fetch(`${this.API_BASE}/products/${productId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        if (!response.ok) {
            let errMsg = `HTTP ${response.status}`
            try { const b = await response.json(); if (b.error) errMsg = b.error } catch (_) { }
            throw new Error(errMsg)
        }
        const result = await response.json()
        window.dispatchEvent(new CustomEvent('productsUpdate'))
        return result
    }

    // ── localStorage fallbacks ──
    getFallbackProducts() {
        try {
            const stored = localStorage.getItem('eflash_admin_products')
            return stored ? JSON.parse(stored) : []
        } catch { return [] }
    }

    addFallbackProduct(product) {
        const newProduct = {
            ...product,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        try {
            const products = this.getFallbackProducts()
            products.unshift(newProduct)
            try {
                localStorage.setItem('eflash_admin_products', JSON.stringify(products))
            } catch (quotaErr) {
                console.warn('localStorage quota exceeded for products, skipping local save')
            }
            window.dispatchEvent(new CustomEvent('productsUpdate'))
        } catch (error) {
            console.error('Error in addFallbackProduct:', error)
        }
        return newProduct
    }

    updateFallbackProduct(productId, updates) {
        try {
            const products = this.getFallbackProducts()
            const idx = products.findIndex(p => p.id === productId || p._id === productId)
            if (idx === -1) throw new Error('Not found')
            products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString() }
            try {
                localStorage.setItem('eflash_admin_products', JSON.stringify(products))
            } catch (quotaErr) {
                console.warn('localStorage quota exceeded for products, skipping local save')
            }
            window.dispatchEvent(new CustomEvent('productsUpdate'))
            return products[idx]
        } catch (error) {
            console.error('Error in updateFallbackProduct:', error)
            return null
        }
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
