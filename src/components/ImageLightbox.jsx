import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa'
import './ImageLightbox.css'

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose, projectTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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

  return createPortal(
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: '0',
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.95)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        margin: '0',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1400px',
          height: '90vh',
          maxHeight: '900px',
          position: 'relative',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          boxSizing: 'border-box'
        }}
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
              <img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`${projectTitle} - Image ${currentIndex + 1}`}
                className="lightbox-image"
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
                  <button
                    key={index}
                    className={`lightbox-thumbnail ${
                      index === currentIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Keyboard Instructions */}
            <div className="lightbox-instructions">
              ← → Arrow keys • Esc to close
            </div>
          </div>
        </div>,
    document.body
  )
}

export default ImageLightbox
