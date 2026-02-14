import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaFile, FaTimes } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'
import SEO from '../components/SEO'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null)
  const fileInputRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.phone && !/^[0-9+\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    return newErrors
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: 'File size must be less than 5MB' })
        return
      }
      setFile(selectedFile)
      setErrors({ ...errors, file: '' })
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCaptcha = (value) => {
    setCaptchaValue(value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Note: In production, replace 'YOUR_RECAPTCHA_SITE_KEY' with actual key
    // For now, commenting out captcha validation
    // if (!captchaValue) {
    //   setErrors({ ...newErrors, captcha: 'Please complete the captcha' })
    //   return
    // }

    setIsSubmitting(true)
    
    // Simulate API call - In production, send to backend with file
    setTimeout(() => {
      setStatus('success')
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setTimeout(() => {
        setStatus('')
      }, 5000)
    }, 1500)
  }

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: '+94 76 487 6464',
      link: 'tel:+94764876464'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      details: '+94 76 487 6464',
      link: 'https://wa.me/94764876464'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: 'info@eflash24.tech',
      link: 'mailto:info@eflash24.tech'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      details: 'Sri Lanka',
      link: null
    }
  ]

  return (
    <main className="contact-page">
      <SEO 
        title="Contact Us - Get In Touch"
        description="Contact E Flash for professional graphic design and web development services. Get a free quote for your project today."
        keywords="contact graphic designer, web design quote, design inquiry, Sri Lanka design services"
      />
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Get In Touch</h1>
            <p>Let's discuss your project and bring your ideas to life</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="contact-form-wrapper"
            >
              <h2>Send Us a Message</h2>
              <p className="form-description">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject *"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  />
                  {errors.subject && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.message}
                    </span>
                  )}
                </div>

                <div className="form-group file-upload-group">
                  <label htmlFor="file-upload" className="file-upload-label">
                    <FaFile /> Attach Files (Optional)
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    className="file-input"
                  />
                  {file && (
                    <div className="file-preview">
                      <span className="file-name">
                        <FaFile /> {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <button type="button" onClick={handleRemoveFile} className="remove-file-btn">
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {errors.file && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.file}
                    </span>
                  )}
                  <small className="file-hint">Accepted formats: PDF, DOC, Images, ZIP (Max 5MB)</small>
                </div>

                {/* ReCAPTCHA - Note: Replace with your actual site key in production */}
                {/* <div className="form-group captcha-group">
                  <ReCAPTCHA
                    sitekey="YOUR_RECAPTCHA_SITE_KEY"
                    onChange={handleCaptcha}
                  />
                  {errors.captcha && (
                    <span className="error-message">
                      <FaExclamationCircle /> {errors.captcha}
                    </span>
                  )}
                </div> */}

                <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="btn-spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="success-message"
                  >
                    <FaCheckCircle />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="contact-info-wrapper"
            >
              <h2>Contact Information</h2>
              <p className="info-description">
                Reach out to us through any of these channels. We're always happy to help!
              </p>

              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <h3>{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.details}
                      </a>
                    ) : (
                      <p>{info.details}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="working-hours">
                <h3>Working Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>

              <div className="quick-contact">
                <h3>Quick Contact</h3>
                <p>For immediate assistance, you can call or WhatsApp us directly.</p>
                <div className="quick-buttons">
                  <a href="tel:+94764876464" className="quick-btn">
                    <FaPhone />
                    Call Now
                  </a>
                  <a href="https://wa.me/94764876464" target="_blank" rel="noopener noreferrer" className="quick-btn whatsapp">
                    <FaWhatsapp />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or CTA Section */}
      <section className="section map-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="map-content"
          >
            <h2>We're Here to Help</h2>
            <p>
              Whether you have a question about our services, pricing, or anything else, 
              our team is ready to answer all your questions.
            </p>
            <div className="cta-stats">
              <div className="cta-stat">
                <h3>&lt; 24hrs</h3>
                <p>Average Response Time</p>
              </div>
              <div className="cta-stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
              <div className="cta-stat">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </div>
          </motion.div>
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

export default Contact
