import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa'
import './ImageLightbox.css'

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const downloadImage = () => {
    const link = document.createElement('a')
    link.href = images[currentIndex]
    link.download = `${projectTitle}-image-${currentIndex + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen || !images || images.length === 0) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="lightbox-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              className="lightbox-close"
              onClick={onClose}
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>

            {/* Main Image */}
            <div className="lightbox-main">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${projectTitle} - Image ${currentIndex + 1}`}
                className="lightbox-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    className="lightbox-nav prev"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="lightbox-nav next"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Counter */}
              <div className="lightbox-counter">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Download Button */}
              <button
                className="lightbox-download"
                onClick={downloadImage}
                title="Download image"
              >
                <FaDownload />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="lightbox-thumbnails">
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    className={`lightbox-thumbnail ${
                      index === currentIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Keyboard Instructions */}
            <div className="lightbox-instructions">
              ← → Arrow keys • Esc to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ImageLightbox
