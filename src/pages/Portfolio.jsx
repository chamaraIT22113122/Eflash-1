import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { FaExternalLinkAlt, FaWhatsapp, FaPaintBrush, FaCode, FaDesktop, FaTimes, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './Portfolio.css'

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: null },
  { id: 'Graphic Design', label: 'Graphic Design', icon: <FaPaintBrush /> },
  { id: 'Web Development', label: 'Web Development', icon: <FaCode /> },
  { id: 'Web Designing', label: 'Web Designing', icon: <FaDesktop /> },
]

const Portfolio = () => {
  const { content } = useSiteContent()
  const location = useLocation()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const [lightboxIdx, setLightboxIdx] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)

  // Read category from URL query param
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('cat')
    if (cat && CATEGORIES.find(c => c.id === cat)) {
      setFilter(cat)
    }
  }, [location.search])

  const projects = content.portfolio?.projects || []

  const filtered = projects.filter(p => {
    const matchCat = filter === 'all' || p.category === filter
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const openLightbox = (project, idx = 0) => {
    setLightbox(project)
    setLightboxIdx(idx)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightbox(null)
    document.body.style.overflow = ''
  }
  const lightboxImages = lightbox ? [lightbox.thumbnail, ...(lightbox.images || [])].filter(Boolean) : []

  const openProject = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }
  const closeProject = () => {
    setSelectedProject(null)
    document.body.style.overflow = ''
  }

  const catCounts = CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.id === 'all' ? projects.length : projects.filter(p => p.category === c.id).length
    return acc
  }, {})

  const catColors = {
    'Graphic Design': 'var(--accent-pink)',
    'Web Development': 'var(--accent-blue)',
    'Web Designing': 'var(--accent-cyan)',
  }

  return (
    <main className="portfolio-page">
      <SEO
        title="Portfolio — E Flash Creative Work"
        description="Browse our portfolio of Graphic Design, Web Development and Web Designing projects. See our latest creative work."
      />

      {/* Hero */}
      <section className="portfolio-hero">
        <div className="port-hero-glow glow-a" />
        <div className="port-hero-glow glow-b" />
        <div className="container">
          <motion.div
            className="portfolio-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">OUR PORTFOLIO</span>
            <h1>Creative <span className="gradient-text">Showcase</span></h1>
            <p>Explore our work across Graphic Design, Web Development & Web Designing</p>

            <div className="port-hero-stats">
              {CATEGORIES.slice(1).map((c, i) => (
                <div key={i} className="port-stat">
                  <strong style={{ color: catColors[c.id] }}>{catCounts[c.id]}</strong>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="portfolio-controls">
        <div className="container">
          <div className="controls-inner">
            <div className="cat-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`cat-tab ${filter === cat.id ? 'active' : ''}`}
                  onClick={() => setFilter(cat.id)}
                  data-cat={cat.id}
                >
                  {cat.icon && <span className="cat-tab-icon">{cat.icon}</span>}
                  {cat.label}
                  <span className="cat-tab-count">{catCounts[cat.id]}</span>
                </button>
              ))}
            </div>
            <div className="port-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search projects…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && <button onClick={() => setSearch('')}><FaTimes /></button>}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section portfolio-grid-section">
        <div className="container">
          {filtered.length === 0 ? (
            <motion.div
              className="port-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="port-empty-icon">🎨</div>
              <h3>{projects.length === 0 ? 'No projects yet' : 'No results found'}</h3>
              <p>{projects.length === 0
                ? 'Add your first project from the Admin Panel → Manage Projects'
                : `No projects match "${search || filter}"`}
              </p>
              {projects.length === 0 && (
                <a href="/admin/projects" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Go to Admin Panel
                </a>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="port-grid"
              layout
            >
              <AnimatePresence>
                {filtered.map((project, index) => {
                  const img = project.thumbnail || project.images?.[0] || project.image
                  return (
                    <motion.article
                      key={project._id || project.id || index}
                      className="port-card"
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      whileHover={{ y: -8 }}
                    >
                      {/* Image */}
                      <div className="port-card-img" onClick={() => openLightbox(project)}>
                        {img ? (
                          <img src={img} alt={project.title} loading="lazy" />
                        ) : (
                          <div className="port-no-img">
                            {catColors[project.category] ?
                              <span style={{ fontSize: '2.5rem' }}>
                                {project.category === 'Graphic Design' ? '🎨' : project.category === 'Web Development' ? '💻' : '🖥️'}
                              </span>
                              : <FaPaintBrush />}
                          </div>
                        )}
                        <div className="port-card-overlay">
                          <button className="overlay-btn" onClick={e => { e.stopPropagation(); openLightbox(project) }}>
                            <FaExternalLinkAlt /> Preview
                          </button>
                          <button className="overlay-btn overlay-btn-secondary" onClick={e => { e.stopPropagation(); openProject(project) }}>
                            View Details
                          </button>
                        </div>
                        <span
                          className="port-cat-chip"
                          style={{ background: catColors[project.category] || 'var(--accent-blue)' }}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="port-card-info">
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {(project.tags || []).length > 0 && (
                          <div className="port-tags">
                            {project.tags.slice(0, 3).map((t, i) => (
                              <span key={i} className="port-tag">{t}</span>
                            ))}
                          </div>
                        )}
                        <div className="port-card-actions">
                          <button onClick={() => openProject(project)} className="btn btn-ghost btn-sm">
                            Details
                          </button>
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                              <FaExternalLinkAlt /> Live
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightboxImages.length > 0 && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-inner"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}><FaTimes /></button>
              <img src={lightboxImages[lightboxIdx]} alt="Preview" />
              {lightboxImages.length > 1 && (
                <>
                  <button className="lightbox-prev" onClick={() => setLightboxIdx(p => p === 0 ? lightboxImages.length - 1 : p - 1)}>
                    <FaChevronLeft />
                  </button>
                  <button className="lightbox-next" onClick={() => setLightboxIdx(p => p === lightboxImages.length - 1 ? 0 : p + 1)}>
                    <FaChevronRight />
                  </button>
                  <div className="lightbox-counter">{lightboxIdx + 1} / {lightboxImages.length}</div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              className="project-modal"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeProject}><FaTimes /></button>

              <div className="modal-img-wrap">
                {(selectedProject.thumbnail || selectedProject.images?.[0]) && (
                  <img src={selectedProject.thumbnail || selectedProject.images?.[0]} alt={selectedProject.title} />
                )}
                <span
                  className="modal-cat-chip"
                  style={{ background: catColors[selectedProject.category] || 'var(--accent-blue)' }}
                >
                  {selectedProject.category}
                </span>
              </div>

              <div className="modal-body">
                <h2>{selectedProject.title}</h2>
                {selectedProject.clientName && <p className="modal-client">Client: <strong>{selectedProject.clientName}</strong></p>}
                <p className="modal-desc">{selectedProject.description}</p>

                {selectedProject.challenge && (
                  <div className="modal-section">
                    <h4>Challenge</h4>
                    <p>{selectedProject.challenge}</p>
                  </div>
                )}
                {selectedProject.solution && (
                  <div className="modal-section">
                    <h4>Solution</h4>
                    <p>{selectedProject.solution}</p>
                  </div>
                )}
                {selectedProject.result && (
                  <div className="modal-section">
                    <h4>Result</h4>
                    <p>{selectedProject.result}</p>
                  </div>
                )}

                {selectedProject.features?.length > 0 && (
                  <div className="modal-section">
                    <h4>Key Deliverables</h4>
                    <ul className="modal-features">
                      {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}

                {selectedProject.technologies?.length > 0 && (
                  <div className="modal-tags">
                    {selectedProject.technologies.map((t, i) => <span key={i} className="port-tag">{t}</span>)}
                  </div>
                )}

                <div className="modal-actions">
                  {selectedProject.liveUrl && (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <FaExternalLinkAlt /> View Live
                    </a>
                  )}
                  <a
                    href={`https://wa.me/94775608073?text=Hi! I'd like a similar project to: ${selectedProject.title}`}
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <FaWhatsapp /> Get Similar
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/94775608073"
        target="_blank" rel="noopener noreferrer"
        className="whatsapp-float"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default Portfolio
