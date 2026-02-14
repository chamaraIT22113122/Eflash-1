import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaStar, FaPalette, FaCode, FaQuoteLeft, FaTimes, FaWhatsapp, FaHeart, FaRegHeart, FaFilter, FaSort, FaShoppingCart, FaCheckCircle, FaUsers, FaAward, FaShieldAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Packages.css'

const Packages = () => {
  const [activeTab, setActiveTab] = useState('web')
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState([])
  const [showComparison, setShowComparison] = useState(false)
  const [selectedAddons, setSelectedAddons] = useState([])
  const [favorites, setFavorites] = useState([])
  const [sortBy, setSortBy] = useState('popular')
  const [filterByPrice, setFilterByPrice] = useState('all')

  const webDesignPackages = [
    {
      id: 1,
      name: 'Portfolio Website',
      price: 'LKR 35,000',
      numericPrice: 35000,
      period: 'per project',
      description: 'Perfect for freelancers and creatives',
      deliveryTime: '7-10 days',
      bestFor: 'Freelancers, Artists, Photographers',
      features: [
        'Modern Single Page Design',
        'Responsive Layout',
        'Portfolio Gallery',
        'About & Contact Sections',
        'Mobile Optimized',
        'Fast Loading Speed',
        '3 Revisions',
        'Source Files Included',
        '7-10 Day Delivery'
      ],
      popular: false,
      badge: null
    },
    {
      id: 2,
      name: 'Business Website',
      price: 'LKR 85,000',
      numericPrice: 85000,
      period: 'per project',
      description: 'Ideal for small to medium businesses',
      deliveryTime: '14-21 days',
      bestFor: 'Small Businesses, Startups, Agencies',
      features: [
        '5-7 Page Website',
        'Custom Design',
        'Fully Responsive',
        'Contact Form Integration',
        'SEO Optimized',
        'Google Maps Integration',
        'Social Media Links',
        'Basic Animation Effects',
        '5 Revisions',
        'All Source Files',
        '14-21 Day Delivery',
        'Free 1 Month Support'
      ],
      popular: true,
      badge: 'MOST POPULAR'
    },
    {
      id: 3,
      name: 'E-Commerce Website',
      price: 'LKR 150,000+',
      numericPrice: 150000,
      period: 'per project',
      description: 'Complete online store solution',
      deliveryTime: '30-45 days',
      bestFor: 'Online Stores, Retailers, Product Sellers',
      features: [
        'Custom E-Commerce Design',
        'Product Catalog (50+ items)',
        'Shopping Cart & Checkout',
        'Payment Gateway Integration',
        'Admin Dashboard',
        'Mobile Responsive',
        'SEO Ready',
        'Product Search & Filter',
        'Unlimited Revisions',
        'Full Documentation',
        '30-45 Day Delivery',
        'Priority Support (3 Months)'
      ],
      popular: false,
      badge: 'BEST VALUE'
    },
    {
      id: 4,
      name: 'Web Design Pro',
      price: 'LKR 150,000+',
      numericPrice: 150000,
      period: 'per project',
      description: 'Advanced website with animations',
      deliveryTime: '21-30 days',
      bestFor: 'Enterprises, Premium Brands, Tech Companies',
      features: [
        'Up to 10 Pages',
        'Premium Design',
        'Advanced Animations',
        'Parallax Effects',
        'CMS Integration',
        'Blog System',
        'Newsletter Integration',
        'SEO Optimized',
        'Performance Optimization',
        '7 Revisions',
        'Complete Source Code',
        '21-30 Day Delivery',
        '2 Months Free Support'
      ],
      popular: false,
      badge: 'PREMIUM'
    },
    {
      id: 5,
      name: 'Landing Page',
      price: 'LKR 25,000',
      numericPrice: 25000,
      period: 'per project',
      description: 'High-converting single page website',
      deliveryTime: '5-7 days',
      bestFor: 'Marketing Campaigns, Product Launches',
      features: [
        'Single Page Design',
        'Conversion Optimized',
        'Responsive Design',
        'Lead Capture Form',
        'Call-to-Action Sections',
        'Fast Loading',
        '3 Revisions',
        'Source Files',
        '5-7 Day Delivery'
      ],
      popular: false,
      badge: 'QUICK START'
    }
  ]

  const graphicDesignPackages = [
    {
      id: 6,
      name: 'Starter',
      price: 'LKR 25,000',
      numericPrice: 25000,
      period: 'per project',
      description: 'Perfect for small businesses and startups',
      deliveryTime: '5-7 days',
      bestFor: 'Startups, Small Businesses',
      features: [
        'Logo Design',
        'Business Card Design',
        '2 Social Media Posts',
        '2 Revisions',
        'Basic Brand Guidelines',
        'Source Files Included',
        '5-7 Day Delivery'
      ],
      popular: false,
      badge: 'QUICK START'
    },
    {
      id: 7,
      name: 'Professional',
      price: 'LKR 75,000',
      numericPrice: 75000,
      period: 'per project',
      description: 'Ideal for growing businesses',
      deliveryTime: '10-14 days',
      bestFor: 'Growing Businesses, Established Brands',
      features: [
        'Complete Brand Identity',
        'Logo + 3 Variations',
        'Business Card & Letterhead',
        'Social Media Templates (10)',
        'Brochure/Flyer Design',
        'Email Signature',
        '5 Revisions',
        'Brand Guidelines Document',
        'All Source Files',
        '10-14 Day Delivery',
        'Priority Support'
      ],
      popular: true,
      badge: 'MOST POPULAR'
    },
    {
      id: 8,
      name: 'Enterprise',
      price: 'LKR 150,000+',
      numericPrice: 150000,
      period: 'per project',
      description: 'Complete graphic design solution',
      deliveryTime: '21-30 days',
      bestFor: 'Large Companies, Premium Brands',
      features: [
        'Everything in Professional',
        'Packaging Design',
        'Social Media Graphics (20+)',
        'Marketing Materials',
        'Billboard/Banner Design',
        'Menu/Catalog Design',
        'Video/Motion Graphics',
        'Unlimited Revisions',
        'Full Brand Strategy',
        'Ongoing Support (1 Month)',
        '21-30 Day Delivery',
        'Dedicated Designer'
      ],
      popular: false,
      badge: 'BEST VALUE'
    },
    {
      id: 9,
      name: 'Social Media',
      price: 'LKR 30,000',
      numericPrice: 30000,
      period: 'per month',
      description: 'Monthly social media content',
      deliveryTime: 'Monthly',
      bestFor: 'Social Media Managers, Influencers',
      features: [
        '15 Social Media Posts',
        'Instagram & Facebook Formats',
        'Story Templates',
        'Hashtag Research',
        'Content Calendar',
        '3 Revisions per post',
        'Brand Consistency',
        'Monthly Delivery'
      ],
      popular: false,
      badge: null
    },
    {
      id: 10,
      name: 'Print Design',
      price: 'LKR 40,000',
      numericPrice: 40000,
      period: 'per project',
      description: 'Professional print materials',
      deliveryTime: '7-10 days',
      bestFor: 'Events, Restaurants, Retail Stores',
      features: [
        'Brochure Design (Tri-fold)',
        'Flyer Design (2 versions)',
        'Poster Design',
        'Print-Ready Files',
        'CMYK Color Setup',
        '4 Revisions',
        'All Source Files',
        '7-10 Day Delivery'
      ],
      popular: false,
      badge: null
    },
    {
      id: 11,
      name: 'Packaging Design',
      price: 'LKR 65,000',
      numericPrice: 65000,
      period: 'per project',
      description: 'Product packaging & labels',
      deliveryTime: '14-21 days',
      bestFor: 'Product Companies, Food & Beverage',
      features: [
        'Custom Package Design',
        'Label Design',
        '3D Mockups',
        'Print Specifications',
        'Multiple Size Variations',
        '5 Revisions',
        'Die-cut Templates',
        'All Source Files',
        '14-21 Day Delivery'
      ],
      popular: false,
      badge: null
    }
  ]

  const packages = activeTab === 'web' ? webDesignPackages : graphicDesignPackages

  const webDesignAddOns = [
    { name: 'Additional Page Design', price: 'LKR 8,000' },
    { name: 'E-Commerce Functionality', price: 'LKR 35,000' },
    { name: 'Blog Setup & Integration', price: 'LKR 15,000' },
    { name: 'SEO Package (Basic)', price: 'LKR 20,000' },
    { name: 'Social Media Integration', price: 'LKR 5,000' },
    { name: 'Contact Form Advanced', price: 'LKR 7,000' },
    { name: 'Google Analytics Setup', price: 'LKR 5,000' },
    { name: 'Live Chat Integration', price: 'LKR 10,000' },
    { name: 'Multilingual Support', price: 'LKR 25,000' },
    { name: 'Payment Gateway Setup', price: 'LKR 18,000' },
    { name: 'Database Integration', price: 'LKR 20,000' },
    { name: 'Custom API Development', price: 'LKR 30,000' },
    { name: 'Content Management System', price: 'LKR 25,000' },
    { name: 'Mobile App Integration', price: 'LKR 40,000' },
    { name: 'Rush Delivery (50% faster)', price: 'LKR 20,000' },
    { name: 'Extra Revision Round', price: 'LKR 5,000' }
  ]

  const graphicDesignAddOns = [
    { name: 'Single Social Media Post', price: 'LKR 800' },
    { name: 'Logo Design', price: 'LKR 15,000' },
    { name: 'Additional Logo Variation', price: 'LKR 5,000' },
    { name: 'Social Media Pack (10 posts)', price: 'LKR 10,000' },
    { name: 'Instagram Story Templates (15)', price: 'LKR 8,000' },
    { name: 'Business Card Design', price: 'LKR 5,000' },
    { name: 'Letterhead Design', price: 'LKR 4,000' },
    { name: 'Brochure Design', price: 'LKR 12,000' },
    { name: 'Flyer/Poster Design', price: 'LKR 6,000' },
    { name: 'Print-Ready Files Setup', price: 'LKR 5,000' },
    { name: 'Motion Graphics (15s)', price: 'LKR 20,000' },
    { name: 'Video Intro/Outro', price: 'LKR 15,000' },
    { name: '3D Mockup Creation', price: 'LKR 8,000' },
    { name: 'Brand Guidelines Document', price: 'LKR 10,000' },
    { name: 'Package/Label Design', price: 'LKR 18,000' },
    { name: 'Rush Delivery (50% faster)', price: 'LKR 15,000' },
    { name: 'Extra Revision Round', price: 'LKR 3,000' }
  ]

  const addOns = activeTab === 'web' ? webDesignAddOns : graphicDesignAddOns

  // Portfolio examples
  const portfolioExamples = {
    web: [
      { name: 'Restaurant Website', image: '🍽️', category: 'Business' },
      { name: 'Photography Portfolio', image: '📷', category: 'Portfolio' },
      { name: 'Online Store', image: '🛒', category: 'E-Commerce' },
      { name: 'Fashion Brand', image: '👗', category: 'Business' }
    ],
    graphic: [
      { name: 'Coffee Brand Logo', image: '☕', category: 'Branding' },
      { name: 'Product Packaging', image: '📦', category: 'Packaging' },
      { name: 'Social Media Graphics', image: '📱', category: 'Social Media' },
      { name: 'Restaurant Menu', image: '📋', category: 'Print Design' }
    ]
  }

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('packageFavorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('packageFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Toggle favorite
  const toggleFavorite = (pkgId) => {
    setFavorites(prev => 
      prev.includes(pkgId) 
        ? prev.filter(id => id !== pkgId)
        : [...prev, pkgId]
    )
  }

  // Toggle package for comparison
  const toggleCompare = (pkg) => {
    setSelectedForCompare(prev => {
      const exists = prev.find(p => p.id === pkg.id)
      if (exists) {
        return prev.filter(p => p.id !== pkg.id)
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 packages at a time')
        return prev
      }
      return [...prev, pkg]
    })
  }

  // Toggle addon selection
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.name === addon.name)
      if (exists) {
        return prev.filter(a => a.name !== addon.name)
      }
      return [...prev, addon]
    })
  }

  // Calculate total with addons
  const calculateTotal = (basePrice, addons) => {
    const base = parseInt(basePrice.replace(/[^0-9]/g, ''))
    const addonsTotal = addons.reduce((sum, addon) => {
      const price = parseInt(addon.price.replace(/[^0-9]/g, ''))
      return sum + price
    }, 0)
    return base + addonsTotal
  }

  // Filter and sort packages
  const getFilteredPackages = () => {
    let filtered = [...packages]
    
    // Filter by price
    if (filterByPrice !== 'all') {
      if (filterByPrice === 'low') {
        filtered = filtered.filter(pkg => pkg.numericPrice < 50000)
      } else if (filterByPrice === 'medium') {
        filtered = filtered.filter(pkg => pkg.numericPrice >= 50000 && pkg.numericPrice < 100000)
      } else if (filterByPrice === 'high') {
        filtered = filtered.filter(pkg => pkg.numericPrice >= 100000)
      }
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.numericPrice - b.numericPrice)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.numericPrice - a.numericPrice)
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.popular - a.popular)
    }

    return filtered
  }

  const filteredPackages = getFilteredPackages()

  const reviews = [
    {
      name: 'Saman Perera',
      role: 'CEO, TechStart Solutions',
      package: 'Business Website',
      rating: 5,
      review: 'Exceptional work! The team delivered a stunning website that perfectly represents our brand. The design is modern, responsive, and our conversions have increased by 40%.',
      image: '👨‍💼'
    },
    {
      name: 'Nimal Fernando',
      role: 'Owner, Fresh Bakery',
      package: 'E-Commerce Website',
      rating: 5,
      review: 'Our online store is amazing! Easy to manage, looks professional, and our customers love the smooth checkout process. Sales have tripled since launch!',
      image: '👨‍🍳'
    },
    {
      name: 'Kavindi Silva',
      role: 'Freelance Photographer',
      package: 'Portfolio Website',
      rating: 5,
      review: 'My portfolio website is absolutely beautiful! It showcases my work perfectly and I\'ve received so many client inquiries since it went live. Highly recommend!',
      image: '👩‍💼'
    },
    {
      name: 'Ruwan Jayasinghe',
      role: 'Marketing Director',
      package: 'Professional Package',
      rating: 5,
      review: 'The complete brand identity package exceeded our expectations. Logo, business cards, and all materials are cohesive and professional. Worth every rupee!',
      image: '👨‍💻'
    },
    {
      name: 'Dilini Rathnayake',
      role: 'Fashion Designer',
      package: 'Packaging Design',
      rating: 5,
      review: 'The packaging design is stunning! It perfectly captures my brand\'s essence and my customers constantly compliment the beautiful presentation.',
      image: '👩‍🎨'
    },
    {
      name: 'Chamara Bandara',
      role: 'Restaurant Owner',
      package: 'Print Design',
      rating: 5,
      review: 'Our menu and promotional materials look incredible! The print quality and design have elevated our restaurant\'s image significantly.',
      image: '👨‍🍳'
    }
  ]

  return (
    <main className="packages-page">
      <SEO 
        title="Pricing & Packages - Affordable Design Services"
        description="Transparent pricing for web design, graphic design, and development services. Choose from our flexible packages or get a custom quote."
        keywords="design pricing, web design packages, graphic design prices, website cost, logo design prices, affordable web design"
      />
      {/* Hero Section */}
      <section className="packages-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <span className="hero-tag">PRICING PACKAGES</span>
            <h1>Choose the Perfect Package for Your Business</h1>
            <p>Transparent pricing with no hidden fees. All packages include high-quality work and professional support.</p>
          </motion.div>
        </div>
      </section>

      {/* Category Toggle */}
      <section className="category-toggle-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="toggle-container"
          >
            <button
              className={`toggle-btn ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              <FaCode className="toggle-icon" />
              <span>Web Design</span>
            </button>
            <button
              className={`toggle-btn ${activeTab === 'graphic' ? 'active' : ''}`}
              onClick={() => setActiveTab('graphic')}
            >
              <FaPalette className="toggle-icon" />
              <span>Graphic Design</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="trust-badges"
          >
            <div className="trust-badge">
              <FaUsers className="trust-icon" />
              <div>
                <h4>500+</h4>
                <p>Happy Clients</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaCheckCircle className="trust-icon" />
              <div>
                <h4>100%</h4>
                <p>Money Back Guarantee</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaAward className="trust-icon" />
              <div>
                <h4>5 Years</h4>
                <p>Experience</p>
              </div>
            </div>
            <div className="trust-badge">
              <FaShieldAlt className="trust-icon" />
              <div>
                <h4>24/7</h4>
                <p>Support Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Sort Controls */}
      <section className="filter-sort-section">
        <div className="container">
          <div className="controls-bar">
            <div className="filter-controls">
              <FaFilter className="control-icon" />
              <select 
                value={filterByPrice} 
                onChange={(e) => setFilterByPrice(e.target.value)}
                className="control-select"
              >
                <option value="all">All Prices</option>
                <option value="low">Under LKR 50,000</option>
                <option value="medium">LKR 50,000 - 100,000</option>
                <option value="high">Above LKR 100,000</option>
              </select>
            </div>

            <div className="sort-controls">
              <FaSort className="control-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="control-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button 
              className={`compare-mode-btn ${compareMode ? 'active' : ''}`}
              onClick={() => {
                setCompareMode(!compareMode)
                if (!compareMode) setSelectedForCompare([])
              }}
            >
              Compare Packages ({selectedForCompare.length})
            </button>

            {selectedForCompare.length >= 2 && (
              <button 
                className="show-comparison-btn"
                onClick={() => setShowComparison(true)}
              >
                View Comparison
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="packages-section">
        <div className="container">
          <div className="packages-grid">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`package-card ${pkg.popular ? 'popular' : ''} ${selectedForCompare.find(p => p.id === pkg.id) ? 'selected-compare' : ''}`}
              >
                {/* Top Action Buttons */}
                <div className="card-actions">
                  <button 
                    className="favorite-btn"
                    onClick={() => toggleFavorite(pkg.id)}
                    title={favorites.includes(pkg.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favorites.includes(pkg.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  {compareMode && (
                    <button 
                      className={`compare-checkbox ${selectedForCompare.find(p => p.id === pkg.id) ? 'checked' : ''}`}
                      onClick={() => toggleCompare(pkg)}
                    >
                      <FaCheckCircle />
                    </button>
                  )}
                </div>

                {/* Badge */}
                {pkg.badge && (
                  <div className={`package-badge ${pkg.popular ? 'popular-badge' : 'custom-badge'}`}>
                    <FaStar /> {pkg.badge}
                  </div>
                )}
                
                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <p className="package-description">{pkg.description}</p>
                  <p className="package-best-for">Best for: {pkg.bestFor}</p>
                  <div className="package-price">
                    <span className="price">{pkg.price}</span>
                    <span className="period">{pkg.period}</span>
                  </div>
                  <p className="delivery-time">⏱️ {pkg.deliveryTime}</p>
                </div>

                <ul className="package-features">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>
                      <FaCheck className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Payment Plan Info */}
                <div className="payment-plan-info">
                  <small>💳 Flexible payment plans available</small>
                </div>

                {/* CTA Buttons */}
                <div className="package-cta-buttons">
                  <motion.a
                    href={`https://wa.me/94702481691?text=Hi! I'm interested in the ${pkg.name} package (${pkg.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-dark'} btn-whatsapp`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp /> Order Now
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="btn btn-outline-primary btn-secondary"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Quote
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && selectedForCompare.length >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="comparison-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Package Comparison</h3>
                <button onClick={() => setShowComparison(false)} className="close-btn">
                  <FaTimes />
                </button>
              </div>
              <div className="modal-body">
                <div className="comparison-grid">
                  {selectedForCompare.map((pkg, index) => (
                    <div key={index} className="comparison-column">
                      <h4>{pkg.name}</h4>
                      <p className="comparison-price">{pkg.price}</p>
                      <p className="comparison-delivery">⏱️ {pkg.deliveryTime}</p>
                      <ul className="comparison-features">
                        {pkg.features.map((feature, i) => (
                          <li key={i}><FaCheck /> {feature}</li>
                        ))}
                      </ul>
                      <a 
                        href={`https://wa.me/94702481691?text=Hi! I'm interested in the ${pkg.name} package`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <FaWhatsapp /> Choose This
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add-Ons Section */}
      <section className="addons-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Additional Services</h2>
            <p>Enhance your package with these optional add-ons</p>
          </motion.div>

          <div className="addons-grid">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="addon-card"
              >
                <h4>{addon.name}</h4>
                <p className="addon-price">{addon.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>What Our Clients Say</h2>
            <p>Real feedback from satisfied customers who chose our packages</p>
          </motion.div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="review-card"
              >
                <FaQuoteLeft className="quote-icon" />
                
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>

                <p className="review-text">{review.review}</p>

                <div className="review-footer">
                  <div className="reviewer-avatar">{review.image}</div>
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <p className="reviewer-role">{review.role}</p>
                    <span className="review-package">{review.package}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Examples Section */}
      <section className="portfolio-examples-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Our Recent Work</h2>
            <p>See what we've created for our clients</p>
          </motion.div>

          <div className="portfolio-grid">
            {portfolioExamples[activeTab].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="portfolio-item"
              >
                <div className="portfolio-image">{item.image}</div>
                <h4>{item.name}</h4>
                <span className="portfolio-category">{item.category}</span>
              </motion.div>
            ))}
          </div>
          <div className="portfolio-cta">
            <Link to="/portfolio" className="btn btn-primary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="custom-package-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="custom-package-card"
          >
            <h2>Need a Custom Package?</h2>
            <p>
              Don't see what you're looking for? We can create a custom package tailored specifically to your needs and budget.
            </p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-light btn-lg">
                Contact Us
              </Link>
              <a href="https://wa.me/94702481691?text=Hello%20Eflash!%20I%27d%20like%20to%20discuss%20a%20custom%20package" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-lg">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Frequently Asked Questions</h2>
          </motion.div>

          <div className="faq-grid">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="faq-item"
            >
              <h3>What payment methods do you accept?</h3>
              <p>We accept bank transfers, online payments, and cash payments. 50% advance required to start the project.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="faq-item"
            >
              <h3>Can I upgrade my package later?</h3>
              <p>Yes! You can upgrade your package at any time during the project. We'll adjust the pricing accordingly.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="faq-item"
            >
              <h3>What if I need revisions?</h3>
              <p>All packages include multiple revision rounds. Additional revisions can be purchased if needed.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="faq-item"
            >
              <h3>Do you offer refunds?</h3>
              <p>We offer refunds if we haven't started work on your project. Once work begins, refunds are subject to our terms.</p>
            </motion.div>
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

export default Packages
