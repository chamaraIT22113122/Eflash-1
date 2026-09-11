import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import {
  FaWhatsapp, FaArrowRight, FaPaintBrush, FaCode, FaDesktop,
  FaCheckCircle, FaBriefcase, FaUsers, FaStar, FaQuoteLeft,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './Home.css'

const Home = () => {
  const { content } = useSiteContent()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setActiveTestimonial(prev =>
        prev < (content.testimonials?.items?.length || 1) - 1 ? prev + 1 : 0
      )
    }, 5000)
    return () => clearInterval(timer)
  }, [content.testimonials?.items?.length])

  const stats = content.about?.stats || [
    { number: content.home?.statsYears || '7+', label: 'Years Experience' },
    { number: content.home?.statsProjects || '230+', label: 'Projects Done' },
    { number: content.home?.statsClients || '95+', label: 'Happy Clients' },
    { number: content.home?.statsRating || '4.9★', label: 'Avg Rating' },
  ]

  const categories = [
    {
      icon: <FaPaintBrush />,
      title: 'Graphic Design',
      desc: 'Logos, branding, social media graphics, banners, flyers & print materials',
      color: 'var(--accent-pink)',
      gradient: 'linear-gradient(135deg,#ec4899,#f59e0b)',
      link: '/portfolio?cat=Graphic+Design',
      count: content.portfolio?.projects?.filter(p => p.category === 'Graphic Design').length || 0,
    },
    {
      icon: <FaCode />,
      title: 'Web Development',
      desc: 'Custom websites, web apps, e-commerce & full-stack solutions',
      color: 'var(--accent-blue)',
      gradient: 'var(--gradient-primary)',
      link: '/portfolio?cat=Web+Development',
      count: content.portfolio?.projects?.filter(p => p.category === 'Web Development').length || 0,
    },
    {
      icon: <FaDesktop />,
      title: 'Web Designing',
      desc: 'UI/UX design, Figma mockups, prototypes & design systems',
      color: 'var(--accent-cyan)',
      gradient: 'var(--gradient-secondary)',
      link: '/portfolio?cat=Web+Designing',
      count: content.portfolio?.projects?.filter(p => p.category === 'Web Designing').length || 0,
    },
  ]

  const tools = content.skills?.items || []
  const projects = content.portfolio?.projects?.slice(0, 6) || []
  const testimonials = content.testimonials?.items || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <main className="home">
      <SEO
        title="E Flash — Graphic Design, Web Development & Web Designing"
        description="Professional Graphic Design, Web Development & Web Design services in Sri Lanka. Logos, websites, UI/UX & more."
        keywords="graphic design Sri Lanka, web development, web design, logo design, UI/UX, branding, Eflash"
      />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-glow glow-1" />
        <div className="hero-bg-glow glow-2" />
        <div className="hero-bg-glow glow-3" />
        <div className="container">
          <div className="hero-inner">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="badge-dot" />
                Available for new projects
              </motion.div>

              <h1 className="hero-heading">
                We Create
                <span className="typewriter-wrap">
                  <TypeAnimation
                    sequence={[
                      ' Graphic Designs', 2200,
                      ' Web Solutions', 2200,
                      ' UI/UX Designs', 2200,
                      ' Brand Identities', 2200,
                    ]}
                    speed={55}
                    deletionSpeed={70}
                    repeat={Infinity}
                    className="typewriter-text"
                  />
                </span>
                <br />
                <span className="hero-sub-heading">That <span className="gradient-text">Stand Out</span></span>
              </h1>

              <p className="hero-description">
                {content.home?.heroDescription || 'Professional Graphic Design, Web Development & Web Designing services in Sri Lanka. From logos to full websites — we make your brand unforgettable.'}
              </p>

              <div className="hero-actions">
                <Link to="/portfolio" className="btn btn-primary btn-lg">
                  View Our Work <FaArrowRight />
                </Link>
                <a
                  href={`https://wa.me/${content.general?.whatsapp || '94775608073'}?text=Hello%20Eflash!%20I%20need%20your%20help`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  <FaWhatsapp /> WhatsApp Us
                </a>
              </div>

              <motion.div
                className="hero-stats"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { n: content.home?.statsYears || '7+', l: 'Years Exp.' },
                  { n: content.home?.statsProjects || '230+', l: 'Projects' },
                  { n: content.home?.statsClients || '95+', l: 'Clients' },
                  { n: content.home?.statsRating || '4.9★', l: 'Rating' },
                ].map((s, i) => (
                  <motion.div key={i} variants={itemVariants} className="hero-stat">
                    <strong>{s.n}</strong>
                    <span>{s.l}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="hero-img-wrapper">
                <div className="hero-glow-ring" />
                <img src="assets/images/hero-banner.png" alt="E Flash Creative Studio" />
              </div>

              {/* Floating badges */}
              <motion.div
                className="float-badge float-badge-1"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaCheckCircle /> Projects Done <strong>{content.home?.statsProjects || '230+'}</strong>
              </motion.div>
              <motion.div
                className="float-badge float-badge-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaStar /> Rating <strong>{content.home?.statsRating || '4.9'}</strong>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.a
          href={`https://wa.me/${content.general?.whatsapp || '94775608073'}?text=Hello%20Eflash!%20I%20found%20you%20on%20your%20website`}
          target="_blank" rel="noopener noreferrer"
          className="whatsapp-float"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaWhatsapp />
        </motion.a>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="section categories-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">WHAT WE DO</span>
            <h2 className="section-title">Our Core Services</h2>
            <p className="section-subtitle">
              Three specialized areas where we deliver exceptional results for our clients
            </p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                className="cat-card glass-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -10 }}
              >
                <div className="cat-icon" style={{ background: cat.gradient }}>
                  {cat.icon}
                </div>
                <div className="cat-count">{cat.count} Projects</div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <Link to={cat.link} className="cat-link">
                  View Projects <FaArrowRight />
                </Link>
                <div className="cat-glow" style={{ background: cat.gradient }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="section about-snippet">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-img-wrap"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="about-img-frame">
                <img src="assets/images/about-banner.png" alt="About E Flash" />
              </div>
              <div className="about-exp-badge">
                <strong>{content.home?.statsYears || '7+'}</strong>
                <span>Years of<br />Experience</span>
              </div>
            </motion.div>

            <motion.div
              className="about-text-wrap"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-tag">ABOUT EFLASH</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                {content.about?.title || 'Creative Agency'}<br />
                <span className="gradient-text">{content.about?.subtitle || 'Built on Passion'}</span>
              </h2>
              <p className="about-desc">
                {content.about?.description || 'At E Flash, creativity is at the heart of everything we do. We specialize in Graphic Design, Web Development, and Web Designing that captures attention and communicates ideas with impact.'}
              </p>
              <p className="about-desc">
                {content.about?.mission || 'Our mission is to deliver innovative design solutions that help businesses grow and succeed in the digital world.'}
              </p>

              <div className="about-feats">
                {['Premium Quality Work', 'On-Time Delivery', '24/7 Client Support', '100% Satisfaction'].map((f, i) => (
                  <div key={i} className="feat-item">
                    <FaCheckCircle style={{ color: 'var(--accent-blue)' }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="about-cta">
                <Link to="/about" className="btn btn-primary">Learn More <FaArrowRight /></Link>
                <Link to="/contact" className="btn btn-outline">Hire Us</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      {projects.length > 0 && (
        <section className="section projects-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">OUR WORK</span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">A glimpse of our latest creative work across all categories</p>
            </motion.div>

            <div className="projects-grid">
              {projects.map((p, i) => (
                <motion.div
                  key={p._id || p.id || i}
                  className="project-thumb"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="project-img">
                    {(p.thumbnail || p.images?.[0] || p.image) ? (
                      <img src={p.thumbnail || p.images?.[0] || p.image} alt={p.title} />
                    ) : (
                      <div className="no-img-placeholder">
                        <FaPaintBrush />
                      </div>
                    )}
                    <div className="project-overlay">
                      <span className="project-cat-badge">{p.category}</span>
                      <h4>{p.title}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="projects-cta">
              <Link to="/portfolio" className="btn btn-primary btn-lg">
                View All Projects <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── SKILLS MARQUEE ── */}
      {tools.length > 0 && (
        <section className="section skills-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">OUR SKILLS</span>
              <h2 className="section-title">{content.skills?.title || 'Tools & Technologies'}</h2>
            </motion.div>
          </div>

          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...tools, ...tools].map((tool, i) => (
                <div key={i} className="marquee-item">
                  <img src={tool.icon} alt={tool.name} />
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section className="section testimonials-section">
          <div className="container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">TESTIMONIALS</span>
              <h2 className="section-title">What Clients Say</h2>
            </motion.div>

            <div className="testimonials-carousel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="testimonial-card glass-card"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.45 }}
                >
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-text">{testimonials[activeTestimonial]?.text}</p>
                  <div className="testimonial-author">
                    <img
                      src={testimonials[activeTestimonial]?.image || `https://i.pravatar.cc/80?u=${activeTestimonial}`}
                      alt={testimonials[activeTestimonial]?.name}
                    />
                    <div>
                      <strong>{testimonials[activeTestimonial]?.name}</strong>
                      <span>{testimonials[activeTestimonial]?.position}</span>
                    </div>
                    <div className="testimonial-stars">
                      {Array.from({ length: testimonials[activeTestimonial]?.rating || 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="carousel-controls">
                <button
                  onClick={() => setActiveTestimonial(p => p === 0 ? testimonials.length - 1 : p - 1)}
                  className="carousel-btn"
                >
                  <FaChevronLeft />
                </button>
                <div className="carousel-dots">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      className={`dot ${i === activeTestimonial ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(i)}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveTestimonial(p => p === testimonials.length - 1 ? 0 : p + 1)}
                  className="carousel-btn"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cta-glow" />
            <h2>Ready to Start Your Project?</h2>
            <p>Let's create something amazing together. Get in touch today.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Started <FaArrowRight />
              </Link>
              <a
                href={`https://wa.me/${content.general?.whatsapp || '94775608073'}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-ghost btn-lg"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Home
