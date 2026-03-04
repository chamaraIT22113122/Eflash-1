import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaEye, FaWhatsapp, FaBoxOpen } from 'react-icons/fa'
import SEO from '../components/SEO'
import { useToast } from '../context/ToastContext'
import { useCart } from '../context/CartContext'
import { trackProductView, trackEvent } from '../utils/analytics'
import productService from '../utils/productService'
import './Shop.css'

const Shop = () => {
  const toast = useToast()
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const fetched = await productService.getAllProducts()
        // Only show in-stock products on the public shop page
        setProducts(fetched.filter(p => p.inStock !== false))
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()

    // Re-fetch whenever admin saves/deletes a product
    window.addEventListener('productsUpdate', loadProducts)
    return () => window.removeEventListener('productsUpdate', loadProducts)
  }, [])

  // Build category list dynamically from DB products
  const categories = [
    { id: 'all', label: 'All' },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))
      .map(cat => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }))
  ]

  // Normalise DB products to a consistent shape
  const allProducts = products.map(p => ({
    id: p._id || p.id,
    name: p.name,
    description: p.description,
    price: parseFloat(p.price) || 0,
    image: p.image || p.images?.[0] || '',
    category: p.category || 'other',
    badge: p.badge || ''
  }))

  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory)

  const handleWhatsAppOrder = (product) => {
    const message = `Hello! I'm interested in ordering:\n${product.name}\nPrice: Rs ${product.price.toFixed(2)}`
    const whatsappUrl = `https://wa.me/94775608073?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast.success(`Opening WhatsApp for ${product.name}`)
    trackProductView(product.id, product.name, product.price)
    trackEvent('product_order_initiated', { product_name: product.name, product_price: product.price })
  }

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    toast.success(`${product.name} added to cart`)
    trackEvent('product_added_to_cart', { product_id: product.id, product_name: product.name, product_price: product.price })
  }

  return (
    <main className="shop">
      <SEO
        title="Shop - E Flash Products"
        description="Browse our collection of premium t-shirts, smart watches, and vehicle accessories. Quality products at great prices."
        keywords="online shop, t-shirts, smart watches, vehicle accessories, Sri Lanka shopping"
      />

      {/* Hero Section */}
      <section className="shop-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="shop-hero-content"
          >
            <h1>Shop Our Products</h1>
            <p>Discover premium quality products for your lifestyle</p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter — only shown when products exist */}
      {!loading && allProducts.length > 0 && (
        <section className="shop-filters">
          <div className="container">
            <div className="category-filters">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="shop-products">
        <div className="container">

          {/* Loading state */}
          {loading && (
            <div className="shop-loading">
              <div className="shop-spinner" />
              <p>Loading products…</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredProducts.length === 0 && (
            <motion.div
              className="shop-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaBoxOpen size={64} />
              <h2>No Products Yet</h2>
              <p>We're stocking up! Check back soon for amazing products.</p>
            </motion.div>
          )}

          {/* Products */}
          {!loading && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                  className="product-card"
                >
                  <div className="product-image">
                    {product.image
                      ? <img src={product.image} alt={product.name} />
                      : <div className="product-no-image"><FaBoxOpen /></div>
                    }
                    {product.badge && <span className="product-badge-tag">{product.badge}</span>}
                    <div className="product-overlay">
                      <motion.button
                        className="overlay-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleWhatsAppOrder(product)}
                      >
                        <FaEye />
                      </motion.button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-footer">
                      <span className="product-price">Rs {product.price.toFixed(2)}</span>
                      <div className="product-buttons">
                        <motion.button
                          className="add-to-cart-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          title="Add to cart for checkout later"
                        >
                          <FaShoppingCart /> Add to Cart
                        </motion.button>
                        <motion.button
                          className="order-now-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleWhatsAppOrder(product)}
                          title="Order now via WhatsApp"
                        >
                          <FaWhatsapp /> Order
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/94775608073?text=Hello%20Eflash!%20I%20found%20you%20on%20your%20website"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default Shop
