import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaWhatsapp, FaPaintBrush, FaCode, FaMobile, FaChartLine, FaBullhorn, FaCamera, FaPenNib, FaShoppingCart } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './Services.css'

const Services = () => {
  const { content } = useSiteContent()
  const general = content.general || {}
  const servicesContent = content.services || {}
  const items = servicesContent.items || []

  // Dynamic Process from content or default
  const process = servicesContent.process || [
    { step: '01', title: 'Discovery', description: 'We learn about your business, goals, and target audience to create the perfect strategy.' },
    { step: '02', title: 'Planning', description: 'We develop a comprehensive plan with timelines, milestones, and deliverables.' },
    { step: '03', title: 'Design & Development', description: 'Our team brings your vision to life with creative designs and robust development.' },
    { step: '04', title: 'Review & Launch', description: 'We refine based on your feedback and launch your project with full support.' }
  ]

  // Dynamic Why section from content or default
  const whyChooseUs = servicesContent.whyChooseUs || {
    title: 'Why Choose E Flash?',
    description: 'With years of experience and a passion for excellence, we deliver solutions that not only meet but exceed expectations.',
    points: [
      'Expert team with diverse skill sets',
      'Cutting-edge technology and tools',
      'On-time delivery guaranteed',
      'Affordable pricing packages',
      'Dedicated support 24/7',
      '100% client satisfaction focus'
    ]
  }

  return (
    <main className="services-page">
      <SEO 
        title={`${servicesContent.title || 'Our Services'} — ${general.siteName || 'E Flash'}`}
        description={servicesContent.description || "Professional design and development services including graphic design, web development, UI/UX design, and digital marketing."}
      />
      
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>{servicesContent.title || 'Our Services'}</h1>
            <p>{servicesContent.subtitle || 'Comprehensive digital solutions to elevate your business'}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section services-main-section">
        <div className="container">
          <div className="services-grid-detailed">
            {items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card-detailed"
              >
                <div className="service-header">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                {service.features && service.features.length > 0 && (
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <motion.div className="section-header" initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}}>
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">A streamlined approach to delivering exceptional results</p>
          </motion.div>

          <div className="process-grid">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="process-card"
              >
                <div className="process-step">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section why-section">
        <div className="container">
          <div className="why-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="why-text"
            >
              <h2>{whyChooseUs.title}</h2>
              <p>{whyChooseUs.description}</p>
              <ul className="why-list">
                {whyChooseUs.points.map((point, i) => (
                  <li key={i}>
                    <FaCheckCircle className="check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="why-image"
            >
              <div className="stats-box">
                <div className="stat-item">
                  <h3>{content.home?.statsProjects || '230+'}</h3>
                  <p>Projects Delivered</p>
                </div>
                <div className="stat-item">
                  <h3>{content.home?.statsClients || '95+'}</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                  <h3>{content.home?.statsYears || '7+'}</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <motion.a
        href={`https://wa.me/${general.whatsapp || '94775608073'}?text=Hello%20Eflash!%20I%20need%20a%20service`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default Services
