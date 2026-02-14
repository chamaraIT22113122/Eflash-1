import React from 'react'
import { motion } from 'framer-motion'
import { FaPaintBrush, FaCode, FaMobile, FaChartLine, FaBullhorn, FaCamera, FaPenNib, FaShoppingCart, FaCheckCircle, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <FaPaintBrush />,
      title: 'Graphic Design',
      description: 'Professional graphic design services for all your branding needs.',
      features: [
        'Logo Design & Branding',
        'Business Cards & Stationery',
        'Brochures & Flyers',
        'Social Media Graphics',
        'Posters & Banners',
        'Packaging Design'
      ]
    },
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technology.',
      features: [
        'Custom Website Development',
        'Responsive Web Design',
        'E-commerce Solutions',
        'Content Management Systems',
        'Web Application Development',
        'Website Maintenance & Support'
      ]
    },
    {
      icon: <FaMobile />,
      title: 'UI/UX Design',
      description: 'User-centered design that creates exceptional digital experiences.',
      features: [
        'User Interface Design',
        'User Experience Research',
        'Wireframing & Prototyping',
        'Mobile App Design',
        'Usability Testing',
        'Design Systems'
      ]
    },
    {
      icon: <FaChartLine />,
      title: 'Digital Marketing',
      description: 'Strategic digital marketing to grow your online presence.',
      features: [
        'Social Media Marketing',
        'Search Engine Optimization',
        'Content Marketing',
        'Email Marketing Campaigns',
        'Pay-Per-Click Advertising',
        'Analytics & Reporting'
      ]
    },
    {
      icon: <FaBullhorn />,
      title: 'Brand Strategy',
      description: 'Comprehensive branding solutions to establish your market presence.',
      features: [
        'Brand Identity Development',
        'Market Research & Analysis',
        'Brand Positioning',
        'Visual Identity Guidelines',
        'Brand Messaging',
        'Rebranding Services'
      ]
    },
    {
      icon: <FaCamera />,
      title: 'Content Creation',
      description: 'Engaging content that tells your brand story effectively.',
      features: [
        'Photography & Videography',
        'Video Editing',
        'Motion Graphics',
        'Copywriting',
        'Infographic Design',
        'Social Media Content'
      ]
    },
    {
      icon: <FaPenNib />,
      title: 'Print Design',
      description: 'High-quality print materials that leave a lasting impression.',
      features: [
        'Magazine & Book Design',
        'Catalog Design',
        'Event Materials',
        'Signage Design',
        'Print Advertising',
        'Custom Illustration'
      ]
    },
    {
      icon: <FaShoppingCart />,
      title: 'E-commerce Solutions',
      description: 'Complete online store setup and management services.',
      features: [
        'Online Store Development',
        'Shopping Cart Integration',
        'Payment Gateway Setup',
        'Product Photography',
        'Inventory Management',
        'Order Processing Systems'
      ]
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We learn about your business, goals, and target audience to create the perfect strategy.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'We develop a comprehensive plan with timelines, milestones, and deliverables.'
    },
    {
      step: '03',
      title: 'Design & Development',
      description: 'Our team brings your vision to life with creative designs and robust development.'
    },
    {
      step: '04',
      title: 'Review & Launch',
      description: 'We refine based on your feedback and launch your project with full support.'
    }
  ]

  return (
    <main className="services-page">
      <SEO 
        title="Our Services - Graphic Design, Web Development & More"
        description="Professional design and development services including graphic design, web development, UI/UX design, digital marketing, branding, and content creation."
        keywords="graphic design services, web development services, UI/UX design, digital marketing, branding services, logo design, website design"
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
            <h1>Our Services</h1>
            <p>Comprehensive digital solutions to elevate your business</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="services-grid-detailed">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card-detailed"
              >
                <div className="service-header">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            A streamlined approach to delivering exceptional results
          </p>

          <div className="process-grid">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
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
              transition={{ duration: 0.6 }}
              className="why-text"
            >
              <h2>Why Choose E Flash?</h2>
              <p>
                With years of experience and a passion for excellence, we deliver 
                solutions that not only meet but exceed expectations.
              </p>
              <ul className="why-list">
                <li>
                  <FaCheckCircle />
                  <span>Expert team with diverse skill sets</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Cutting-edge technology and tools</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>On-time delivery guaranteed</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Affordable pricing packages</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>Dedicated support 24/7</span>
                </li>
                <li>
                  <FaCheckCircle />
                  <span>100% client satisfaction focus</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="why-image"
            >
              <div className="stats-box">
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Projects Delivered</p>
                </div>
                <div className="stat-item">
                  <h3>50+</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat-item">
                  <h3>5+</h3>
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

export default Services
