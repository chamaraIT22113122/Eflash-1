import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import './Testimonials.css'

const Testimonials = () => {
  const { content } = useSiteContent()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Use testimonials from context
  const testimonials = content.testimonials.items || []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <section className="testimonials-section section">
      <div className="container">
        <h2 className="section-title">{content.testimonials.title}</h2>
        <p className="section-subtitle">
          Don't just take our word for it - hear from our satisfied clients
        </p>

        <div className="testimonials-container">
          <button className="testimonial-nav prev" onClick={goToPrevious} aria-label="Previous testimonial">
            <FaChevronLeft />
          </button>

          <div className="testimonials-wrapper">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`testimonial-card ${index === currentIndex ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0,
                  scale: index === currentIndex ? 1 : 0.8,
                  display: index === currentIndex ? 'flex' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="testimonial-nav next" onClick={goToNext} aria-label="Next testimonial">
            <FaChevronRight />
          </button>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
