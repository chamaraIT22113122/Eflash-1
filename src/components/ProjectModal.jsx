import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
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
          />
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <FaTimes />
            </button>

            {/* Image Gallery */}
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

            <div className="modal-body">
              <h2>{project.title}</h2>
              <div className="project-category">{project.category}</div>
              <p className="modal-description">{project.description}</p>

              <div className="modal-details">
                {project.tags && project.tags.length > 0 && (
                  <div className="detail-section">
                    <h3>Tags</h3>
                    <div className="tech-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tech-tag-modal">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="detail-section">
                    <h3>Features</h3>
                    <ul className="features-list">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
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
