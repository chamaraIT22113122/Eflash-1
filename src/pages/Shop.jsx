import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaEye, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import './Shop.css'

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products = [
    {
      id: 1,
      name: 'Oversize T-shirt (The same but different)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2650.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/123.png`,
      category: 'clothes'
    },
    {
      id: 2,
      name: 'Oversize T-shirt (Aesthetic)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2750.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/astronaut.jpg`,
      category: 'clothes'
    },
    {
      id: 3,
      name: 'Oversize T-shirt (Anime)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2790.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/15.png`,
      category: 'clothes'
    },
    {
      id: 4,
      name: 'Oversize T-shirt (Modern)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2650.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/9752418 (1).jpg`,
      category: 'clothes'
    },
    {
      id: 5,
      name: 'Oversize T-shirt (Beast)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2750.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/Beast.jpg`,
      category: 'clothes'
    },
    {
      id: 6,
      name: 'Oversize T-shirt (Enjoy The Wind)',
      description: 'Where premium quality meets unparalleled style. Elevate your wardrobe with our latest collection, crafted from the finest Heavy GSM material for a truly luxurious feel.',
      price: 2690.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/Evoke/ENJOY_THE_WIND 02.jpg`,
      category: 'clothes'
    },
    {
      id: 7,
      name: 'Tissue Box',
      description: '✨High quality & premium look. Brand sleeves — BMW, Benz, Honda, Toyota, Nissan, Land Rover, Audi & more',
      price: 350.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/T3.png`,
      category: 'accessories'
    },
    {
      id: 8,
      name: 'LUXGEAR BOTTLE',
      description: 'Premium glass bottles wrapped in your brand sleeves. BMW, Benz, Honda, Toyota, Nissan, Land Rover, Audi & more',
      price: 1849.99,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/435.png`,
      category: 'accessories'
    },
    {
      id: 9,
      name: 'Premium Brand Bottle',
      description: 'High-quality branded bottles for your vehicle. Available for all major car brands.',
      price: 1499.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/b1.png`,
      category: 'accessories'
    },
    {
      id: 10,
      name: 'Luxury Brand Bottle',
      description: 'Elegant branded bottles for your car. Premium quality materials.',
      price: 1599.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/b2.png`,
      category: 'accessories'
    },
    {
      id: 11,
      name: 'Smart Watch',
      description: 'Stay connected and track your fitness with our sleek and stylish smart watch.',
      price: 13999.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/watch/1.jpeg`,
      category: 'watch'
    },
    {
      id: 12,
      name: 'Sport Smart Watch',
      description: 'Advanced fitness tracking with heart rate monitor and GPS.',
      price: 14999.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/watch/2.jpeg`,
      category: 'watch'
    },
    {
      id: 13,
      name: 'Premium Smart Watch',
      description: 'Luxury smartwatch with premium features and elegant design.',
      price: 15999.00,
      image: `${import.meta.env.BASE_URL}assets/images/Shop/watch/3.jpeg`,
      category: 'watch'
    }
  ]

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'clothes', label: 'Clothes' },
    { id: 'accessories', label: 'Vehicles Accessories' },
    { id: 'watch', label: 'Watch' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleWhatsAppOrder = (product) => {
    const message = `Hello! I'm interested in ordering:\n${product.name}\nPrice: Rs ${product.price.toFixed(2)}`
    const whatsappUrl = `https://wa.me/94702481691?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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

      {/* Categories Filter */}
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

      {/* Products Grid */}
      <section className="shop-products">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="product-card"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
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
                    <motion.button
                      className="add-to-cart-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWhatsAppOrder(product)}
                    >
                      <FaWhatsapp /> Order Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/94702481691?text=Hello%20Eflash!%20I%20found%20you%20on%20your%20website"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default Shop
