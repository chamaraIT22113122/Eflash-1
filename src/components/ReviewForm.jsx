import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaCamera, FaTimes } from 'react-icons/fa'
import { addReview } from '../utils/reviewService'
import { useToast } from '../context/ToastContext'
import './ReviewForm.css'

const ReviewForm = ({ productId, onReviewSubmitted, onCancel }) => {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
    authorName: '',
    authorEmail: ''
  })
  const [photos, setPhotos] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating })
  }

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (photos.length + files.length > 5) {
      showToast('You can upload a maximum of 5 photos', 'warning')
      return
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showToast('Each photo must be less than 5MB', 'error')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          data: reader.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    if (!formData.authorName.trim() || !formData.authorEmail.trim()) {
      showToast('Please provide your name and email', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        ...formData,
        photos: photos.map(p => p.data)
      }

      const newReview = addReview(productId, reviewData)
      
      showToast('Review submitted successfully! It will be published after moderation.', 'success')
      
      // Reset form
      setFormData({
        rating: 5,
        title: '',
        content: '',
        authorName: '',
        authorEmail: ''
      })
      setPhotos([])

      if (onReviewSubmitted) {
        onReviewSubmitted(newReview)
      }
    } catch (error) {
      showToast('Failed to submit review. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      className="review-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
        {/* Rating */}
        <div className="form-group">
          <label>Rating *</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`star-icon ${star <= formData.rating ? 'active' : ''}`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
            <span className="rating-text">{formData.rating} out of 5</span>
          </div>
        </div>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Review Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Sum up your experience"
            maxLength={100}
            required
          />
        </div>

        {/* Content */}
        <div className="form-group">
          <label htmlFor="content">Review *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Share your thoughts about this product..."
            rows={5}
            maxLength={1000}
            required
          />
          <small>{formData.content.length}/1000 characters</small>
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <label>Add Photos (Optional)</label>
          <div className="photo-upload-section">
            <label className="photo-upload-btn">
              <FaCamera />
              <span>Upload Photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
            </label>
            <small>Max 5 photos, 5MB each</small>
          </div>

          {/* Photo Preview */}
          {photos.length > 0 && (
            <div className="photo-preview-grid">
              {photos.map((photo) => (
                <div key={photo.id} className="photo-preview-item">
                  <img src={photo.data} alt="Preview" />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => removePhoto(photo.id)}
                    aria-label="Remove photo"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="authorName">Your Name *</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="authorEmail">Your Email *</label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          {onCancel && (
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>

        <p className="form-note">
          * Your review will be published after our team reviews it.
        </p>
      </form>
    </motion.div>
  )
}

export default ReviewForm
