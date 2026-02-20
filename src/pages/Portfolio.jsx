import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaWhatsapp } from 'react-icons/fa'
import ProjectModal from '../components/ProjectModal'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './Portfolio.css'

const Portfolio = () => {
  const { content } = useSiteContent()
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  // Use projects from context
  const projects = content.portfolio.projects || []

  // Dynamic categories: derive from actual projects + always include "All"
  const dynamicCategories = ['All Projects', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  return (
    <main className="portfolio-page">
      <SEO 
        title="Portfolio - Our Creative Work & Projects"
        description="View our portfolio of graphic design, branding, social media designs, and web development projects. See examples of our creative work."
        keywords="design portfolio, graphic design examples, branding projects, logo portfolio, social media designs, web design portfolio"
      />
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Our Portfolio</h1>
            <p>Showcasing our best work and successful projects</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section">
        <div className="container">
          <div className="filter-buttons">
            {dynamicCategories.map((cat) => {
              const val = cat === 'All Projects' ? 'all' : cat
              return (
                <button
                  key={val}
                  className={`filter-btn ${filter === val ? 'active' : ''}`}
                  onClick={() => setFilter(val)}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Projects Grid */}
          <div className="portfolio-grid">
            {projects.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8', gridColumn: '1/-1' }}>
                <p style={{ fontSize: '1.1rem' }}>No projects added yet.</p>
              </div>
            )}
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="portfolio-card"
              >
                <div className="portfolio-image">
                  {(project.thumbnail || project.images?.[0] || project.image) ? (
                    <img
                      src={project.thumbnail || project.images?.[0] || project.image}
                      alt={project.title}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '220px', background: '#f1f5f9', color: '#94a3b8', fontSize: '1rem' }}>
                      No Image
                    </div>
                  )}
                  
                  <div className="portfolio-overlay">
                    <button onClick={() => openModal(project)} className="view-project">
                      <FaExternalLinkAlt />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {(project.tags || []).map((tag, idx) => (
                      <span key={idx} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Design Showcase - hidden, content managed via admin */}
      {false && <section className="section web-design-section">
        <div className="container">
          <h2 className="section-title">Web Design Showcase</h2>
          <p className="section-subtitle">
            Explore our collection of stunning web designs and interfaces
          </p>

          <div className="design-showcase">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="showcase-item"
            >
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800" alt="Modern UI Design" />
              </div>
              <div className="showcase-content">
                <FaCode className="showcase-icon" />
                <h3>Modern UI Components</h3>
                <p>
                  Clean, reusable UI components designed with accessibility and 
                  user experience in mind. Built with React and modern CSS frameworks.
                </p>
                <ul className="showcase-features">
                  <li>Responsive design across all devices</li>
                  <li>Dark mode support</li>
                  <li>Animation and transitions</li>
                  <li>Accessibility standards (WCAG)</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="showcase-item reverse"
            >
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800" alt="E-Commerce Design" />
              </div>
              <div className="showcase-content">
                <FaShoppingCart className="showcase-icon" />
                <h3>E-Commerce Solutions</h3>
                <p>
                  Powerful e-commerce platforms with intuitive shopping experiences, 
                  secure payment processing, and inventory management.
                </p>
                <ul className="showcase-features">
                  <li>Product catalog management</li>
                  <li>Secure checkout process</li>
                  <li>Order tracking system</li>
                  <li>Customer account dashboard</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="showcase-item"
            >
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800" alt="Mobile First Design" />
              </div>
              <div className="showcase-content">
                <FaMobile className="showcase-icon" />
                <h3>Mobile-First Approach</h3>
                <p>
                  Websites optimized for mobile devices first, ensuring perfect 
                  performance and user experience on smartphones and tablets.
                </p>
                <ul className="showcase-features">
                  <li>Touch-optimized interfaces</li>
                  <li>Fast loading times</li>
                  <li>Progressive Web App features</li>
                  <li>Offline functionality</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="showcase-item reverse"
            >
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800" alt="SEO Optimized" />
              </div>
              <div className="showcase-content">
                <FaSearch className="showcase-icon" />
                <h3>SEO Optimized</h3>
                <p>
                  Websites built with SEO best practices to ensure maximum visibility 
                  in search engines and drive organic traffic.
                </p>
                <ul className="showcase-features">
                  <li>Semantic HTML structure</li>
                  <li>Meta tags optimization</li>
                  <li>Fast page load speed</li>
                  <li>Mobile-friendly design</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>}

      {/* Technologies Section removed - managed via admin */}

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/94775608073?text=Hello%20Eflash!%20I%20found%20you%20on%20your%20website"
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

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  )
}

export default Portfolio
