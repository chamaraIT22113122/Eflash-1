import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaUser, FaCalendarAlt, FaClock } from 'react-icons/fa'
import WebsiteShowcase from './WebsiteShowcase'
import './ProjectModal.css'

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!project) return null

  // Use images array if available, otherwise fall back to single image
  const images = project.images || (project.thumbnail ? [project.thumbnail] : project.image ? [project.image] : [])
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const selectImage = (index) => {
    setCurrentImageIndex(index)
  }

  // Format project date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return null
    try {
      const [year, month] = dateStr.split('-')
      return new Date(year, month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    } catch {
      return dateStr
    }
  }

  const hasStats = project.stats && (
    project.stats.users || project.stats.pages || project.stats.performance || project.stats.completion
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
              pointerEvents: 'auto'
            }}
          />
          <motion.div
            className="modal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              margin: 0,
              pointerEvents: 'auto'
            }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <FaTimes />
            </button>

            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="modal-gallery">
                <div className="main-image-container">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                    className="main-image"
                  />
                  
                  {hasMultipleImages && (
                    <>
                      <button className="gallery-nav prev" onClick={prevImage} aria-label="Previous image">
                        <FaChevronLeft />
                      </button>
                      <button className="gallery-nav next" onClick={nextImage} aria-label="Next image">
                        <FaChevronRight />
                      </button>
                      <div className="image-counter">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {hasMultipleImages && (
                  <div className="thumbnail-strip">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => selectImage(index)}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="modal-body">
              <h2>{project.title}</h2>
              <div className="modal-top-row">
                <span className="project-category-badge">{project.category}</span>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-live-btn">
                    <FaExternalLinkAlt /> View Live
                  </a>
                )}
              </div>

              {/* Meta info row */}
              <div className="modal-meta-row">
                {project.clientName && (
                  <span className="modal-meta-item"><FaUser /> {project.clientName}</span>
                )}
                {project.projectDate && (
                  <span className="modal-meta-item"><FaCalendarAlt /> {formatDate(project.projectDate)}</span>
                )}
                {project.duration && (
                  <span className="modal-meta-item"><FaClock /> {project.duration}</span>
                )}
              </div>

              <p className="modal-description">{project.description}</p>

              {/* Website Showcase with Live Preview */}
              <WebsiteShowcase project={project} />

              <div className="modal-details">
                {/* Stats */}
                {hasStats && (
                  <div className="detail-section">
                    <h3>Project Stats</h3>
                    <div className="modal-stats-grid">
                      {project.stats.users && (
                        <div className="modal-stat-card">
                          <span className="stat-value">{project.stats.users}</span>
                          <span className="stat-label">Users / Reach</span>
                        </div>
                      )}
                      {project.stats.pages && (
                        <div className="modal-stat-card">
                          <span className="stat-value">{project.stats.pages}</span>
                          <span className="stat-label">Pages</span>
                        </div>
                      )}
                      {project.stats.performance && (
                        <div className="modal-stat-card">
                          <span className="stat-value">{project.stats.performance}</span>
                          <span className="stat-label">Performance</span>
                        </div>
                      )}
                      {project.stats.completion && (
                        <div className="modal-stat-card">
                          <span className="stat-value">{project.stats.completion}</span>
                          <span className="stat-label">Completion</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Challenge */}
                {project.challenge && (
                  <div className="detail-section">
                    <h3>Challenge</h3>
                    <p className="detail-text">{project.challenge}</p>
                  </div>
                )}

                {/* Solution */}
                {project.solution && (
                  <div className="detail-section">
                    <h3>Solution</h3>
                    <p className="detail-text">{project.solution}</p>
                  </div>
                )}

                {/* Result */}
                {project.result && (
                  <div className="detail-section">
                    <h3>Result</h3>
                    <p className="detail-text">{project.result}</p>
                  </div>
                )}

                {/* Features */}
                {project.features && project.features.filter(f => f).length > 0 && (
                  <div className="detail-section">
                    <h3>Key Features / Deliverables</h3>
                    <ul className="features-list">
                      {project.features.filter(f => f).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="detail-section">
                    <h3>Technologies Used</h3>
                    <div className="tech-tags">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag-modal">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="detail-section">
                    <h3>Tags</h3>
                    <div className="tech-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tech-tag-modal tag-style">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
