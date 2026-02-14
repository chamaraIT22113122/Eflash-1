import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaCheckCircle, FaBriefcase, FaUsers, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './Home.css'

const Home = () => {
  const { content } = useSiteContent()
  
  const stats = [
    { number: '7+', label: 'Years of Experience' },
    { number: '230+', label: 'Completed Projects' },
    { number: '95+', label: 'Happy Clients' }
  ]

  // Use tools from context
  const tools = content.skills.items || []

  const projects = [
    { id: 1, image: '/assets/images/portfolio/Social media p/14.png' },
    { id: 2, image: '/assets/images/portfolio/Thambnails/logo.jpg' },
    { id: 3, image: '/assets/images/portfolio/banners/banners-02.png' },
    { id: 4, image: '/assets/images/portfolio/Social media p/25.jpg' },
    { id: 5, image: '/assets/images/portfolio/flayers/Peony cake deco flayr 1.jpg' },
    { id: 6, image: '/assets/images/portfolio/Social media p/35.png' }
  ]

  return (
    <main className="home">
      <SEO 
        title="E Flash - Creative Design & Web Solutions"
        description="Professional Graphic Design, Web Design & Development Services in Sri Lanka. Transform your brand with stunning designs and modern websites."
        keywords="graphic design Sri Lanka, web design Colombo, logo design, website development, branding services, digital marketing"
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text"
            >
              
              
              <h1>
                We Design & Build <br />
                <span className="gradient-text">Creative Products</span>
              </h1>
              
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="stat-badge"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="stat-icon">
                      {index === 0 && <FaBriefcase />}
                      {index === 1 && <FaCheckCircle />}
                      {index === 2 && <FaUsers />}
                    </div>
                    <div className="stat-text">
                      <strong>{stat.number}</strong>
                      <span>{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hero-image"
            >
              <div className="hero-image-wrapper">
                <motion.div
                  className="floating-shape shape-1"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="floating-shape shape-2"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="hero-avatar">
                  <img src="/assets/images/hero-banner.png" alt="E Flash - Creative Design" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
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
      </section>

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-tag">ABOUT EFLASH24</span>
            <h2 className="section-title">Need a Creative Product? We can Help You!</h2>
          </motion.div>

          <div className="about-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="about-text"
            >
              <p>
                At Eflash24, <strong>Creativity Is At The Heart Of Everything We Do</strong>. 
                We Specialize In Graphic Design That Captures Attention And Communicates Ideas 
                With Impact. From Branding And Digital Art To Marketing Materials And Visual Content, 
                Our Focus Is On Crafting Designs That Are Both Aesthetic And Meaningful.
              </p>
              <p>
                With A Strong Foundation In Design Principles, We Bring Visuals To Life That Inspire, 
                Engage, And Connect With Audiences. Every Project Is An Opportunity To Transform 
                Concepts Into Striking Graphics And Memorable Experiences.
              </p>
              
              <div className="about-actions">
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  HIRE US
                </motion.a>
                <Link to="/portfolio" className="btn btn-outline">
                  OUR WORKS
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="about-image"
            >
              <div className="about-image-wrapper">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/assets/images/about-banner.png" alt="About Eflash24" />
                </motion.div>
                <div className="about-badge">
                  <span className="badge-number">230+</span>
                  <span className="badge-text">Projects Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section className="section skills-section" id="skills">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-tag">OUR SKILLS</span>
            <h2 className="section-title">{content.skills.title}</h2>
            <p className="section-subtitle">
              We bridge the gap between brands and users with intuitive web design and captivating graphics. 
              We create simple, functional, and visually striking solutions that ensure your message connects 
              clearly and effortlessly.
            </p>
          </motion.div>

          <div className="tools-grid">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="tool-card"
              >
                <div className="tool-icon">
                  <img src={tool.icon} alt={tool.name} />
                </div>
                <h3>{tool.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Works Preview Section */}
      <section className="section works-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-tag">OUR WORKS</span>
            <h2 className="section-title">See My Works Which Will Amaze You!</h2>
            <p className="section-subtitle">
              We craft high-quality graphic designs built to make a lasting impact. Clean, creative, 
              and visually elegant designs ensure that even non-design audiences can easily connect 
              with and understand the message.
            </p>
          </motion.div>

          <div className="works-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="work-card"
              >
                <div className="work-image">
                  <img src={project.image} alt={`Project ${project.id}`} />
                  <div className="work-overlay">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="overlay-content"
                    >
                      <h4>Creative Design</h4>
                      <p>Graphic Design Project</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="works-action"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/portfolio" className="btn btn-primary btn-lg">
              LOAD MORE <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <span className="section-tag">CONTACT</span>
            <h2 className="section-title">Have You Any Project? Please Drop a Message</h2>
            <p className="section-subtitle">
              Get in touch and let me know how i can help. Fill out the form and i'll be in touch as soon as possible.
            </p>
          </motion.div>

          <div className="contact-wrapper">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4>Address:</h4>
                  <p>Kaduwela, Sri Lanka</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone:</h4>
                  <p><a href="tel:0702481691">070 2481 691</a></p>
                  <p><a href="tel:0720363675">072 0363 675</a></p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p><a href="mailto:tcnbandara@gmail.com">tcnbandara@gmail.com</a></p>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="contact-form"
            >
              <div className="form-group">
                <input type="text" placeholder="Name" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder="Phone" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Message" rows="5" required></textarea>
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary btn-block"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                SEND
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
