import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalculator, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa'
import './QuoteCalculator.css'

const QuoteCalculator = () => {
  const [selections, setSelections] = useState({
    serviceType: '',
    pages: 1,
    design: '',
    features: [],
    timeline: 'standard'
  })

  const services = [
    { id: 'website', name: 'Website Design', basePrice: 50000 },
    { id: 'logo', name: 'Logo Design', basePrice: 15000 },
    { id: 'branding', name: 'Brand Identity', basePrice: 75000 },
    { id: 'social', name: 'Social Media Pack', basePrice: 25000 }
  ]

  const designTypes = [
    { id: 'basic', name: 'Basic', multiplier: 1 },
    { id: 'standard', name: 'Standard', multiplier: 1.5 },
    { id: 'premium', name: 'Premium', multiplier: 2.5 }
  ]

  const features = [
    { id: 'responsive', name: 'Responsive Design', price: 0 },
    { id: 'cms', name: 'CMS Integration', price: 20000 },
    { id: 'ecommerce', name: 'E-commerce', price: 50000 },
    { id: 'seo', name: 'SEO Optimization', price: 15000 },
    { id: 'animations', name: 'Advanced Animations', price: 10000 },
    { id: 'multilingual', name: 'Multilingual', price: 20000 }
  ]

  const timelines = [
    { id: 'rush', name: 'Rush (7 days)', multiplier: 1.5 },
    { id: 'standard', name: 'Standard (14 days)', multiplier: 1 },
    { id: 'flexible', name: 'Flexible (30 days)', multiplier: 0.9 }
  ]

  const calculateTotal = () => {
    if (!selections.serviceType || !selections.design) return 0

    const service = services.find(s => s.id === selections.serviceType)
    const design = designTypes.find(d => d.id === selections.design)
    const timeline = timelines.find(t => t.id === selections.timeline)

    let total = service.basePrice * design.multiplier

    // Add page cost for websites
    if (selections.serviceType === 'website' && selections.pages > 1) {
      total += (selections.pages - 1) * 8000
    }

    // Add features
    selections.features.forEach(featureId => {
      const feature = features.find(f => f.id === featureId)
      if (feature) total += feature.price
    })

    // Apply timeline multiplier
    total *= timeline.multiplier

    return Math.round(total)
  }

  const handleServiceChange = (serviceId) => {
    setSelections({ ...selections, serviceType: serviceId })
  }

  const handleDesignChange = (designId) => {
    setSelections({ ...selections, design: designId })
  }

  const handleFeatureToggle = (featureId) => {
    const features = selections.features.includes(featureId)
      ? selections.features.filter(f => f !== featureId)
      : [...selections.features, featureId]
    setSelections({ ...selections, features })
  }

  const handlePageChange = (increment) => {
    const newPages = Math.max(1, selections.pages + increment)
    setSelections({ ...selections, pages: newPages })
  }

  const total = calculateTotal()

  return (
    <div className="quote-calculator">
      <div className="calculator-header">
        <FaCalculator />
        <h3>Quick Quote Calculator</h3>
        <p>Get an instant estimate for your project</p>
      </div>

      <div className="calculator-body">
        {/* Service Type */}
        <div className="calculator-section">
          <label>Select Service Type</label>
          <div className="option-grid">
            {services.map(service => (
              <button
                key={service.id}
                className={`option-btn ${selections.serviceType === service.id ? 'active' : ''}`}
                onClick={() => handleServiceChange(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Design Type */}
        {selections.serviceType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="calculator-section"
          >
            <label>Design Complexity</label>
            <div className="option-grid">
              {designTypes.map(design => (
                <button
                  key={design.id}
                  className={`option-btn ${selections.design === design.id ? 'active' : ''}`}
                  onClick={() => handleDesignChange(design.id)}
                >
                  {design.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pages (for websites) */}
        {selections.serviceType === 'website' && selections.design && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="calculator-section"
          >
            <label>Number of Pages</label>
            <div className="number-selector">
              <button onClick={() => handlePageChange(-1)}>
                <FaMinus />
              </button>
              <span className="number-display">{selections.pages}</span>
              <button onClick={() => handlePageChange(1)}>
                <FaPlus />
              </button>
            </div>
          </motion.div>
        )}

        {/* Features */}
        {selections.design && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="calculator-section"
          >
            <label>Additional Features</label>
            <div className="feature-list">
              {features.map(feature => (
                <button
                  key={feature.id}
                  className={`feature-btn ${selections.features.includes(feature.id) ? 'selected' : ''}`}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  <span>{feature.name}</span>
                  {feature.price > 0 && <span className="feature-price">+LKR {feature.price.toLocaleString()}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        {selections.design && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="calculator-section"
          >
            <label>Delivery Timeline</label>
            <div className="option-grid">
              {timelines.map(timeline => (
                <button
                  key={timeline.id}
                  className={`option-btn ${selections.timeline === timeline.id ? 'active' : ''}`}
                  onClick={() => setSelections({ ...selections, timeline: timeline.id })}
                >
                  {timeline.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Total */}
      {total > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="calculator-footer"
        >
          <div className="total-section">
            <span>Estimated Total</span>
            <span className="total-amount">LKR {total.toLocaleString()}</span>
          </div>
          <p className="disclaimer">*This is an estimated price. Final quote may vary based on specific requirements.</p>
          <a
            href={`https://wa.me/94702481691?text=Hi! I got a quote of LKR ${total.toLocaleString()} from your calculator. I'd like to discuss this project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-quote-btn"
          >
            <FaWhatsapp /> Get Exact Quote on WhatsApp
          </a>
        </motion.div>
      )}
    </div>
  )
}

export default QuoteCalculator
