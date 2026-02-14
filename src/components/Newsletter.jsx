import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane } from 'react-icons/fa'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setStatus('success')
      setTimeout(() => {
        setStatus('')
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="newsletter-content"
        >
          <div className="newsletter-text">
            <h2>Stay Updated with E Flash</h2>
            <p>Subscribe to our newsletter for the latest design trends, tips, and exclusive offers</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                <FaPaperPlane />
                <span>Subscribe</span>
              </button>
            </div>
            {status === 'success' && (
              <p className="success-message">Thank you for subscribing!</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
