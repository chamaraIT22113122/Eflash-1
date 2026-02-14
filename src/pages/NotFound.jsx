import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa'
import SEO from '../components/SEO'
import './NotFound.css'

const NotFound = () => {
  return (
    <main className="not-found-page">
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="not-found-content"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="error-code"
          >
            404
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="error-message"
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="error-actions"
          >
            <Link to="/" className="btn btn-primary">
              <FaHome /> Go to Homepage
            </Link>
            <Link to="/portfolio" className="btn btn-outline">
              <FaSearch /> View Portfolio
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="helpful-links"
          >
            <h3>You might be looking for:</h3>
            <ul>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/packages">Pricing Packages</Link></li>
              <li><Link to="/blog">Blog Articles</Link></li>
              <li><Link to="/#contact">Contact Us</Link></li>
            </ul>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="floating-illustration"
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path fill="url(#gradient404)" d="M45.4,-59.1C57.1,-46.8,64.3,-31.2,68.2,-14.4C72.1,2.4,72.7,20.4,65.3,35.8C57.9,51.2,42.5,64,25.6,69.4C8.7,74.8,-9.7,72.8,-26.5,66.4C-43.3,60,-58.5,49.2,-67.4,34.8C-76.3,20.4,-78.9,2.4,-75.1,-14.3C-71.3,-31,-61.1,-46.4,-47.5,-58.3C-33.9,-70.2,-17,-78.6,0.1,-78.7C17.1,-78.8,33.8,-71.3,45.4,-59.1Z" transform="translate(100 100)" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

export default NotFound
