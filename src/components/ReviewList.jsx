import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar, FaThumbsUp, FaThumbsDown, FaImage, FaTimes } from 'react-icons/fa'
import reviewService from '../utils/reviewService'
import './ReviewList.css'

const ReviewList = ({ reviews, userId = 'anonymous' }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [localReviews, setLocalReviews] = useState(reviews)

  const handleHelpfulVote = async (reviewId) => {
    try {
      const updatedReview = await reviewService.markHelpful(reviewId, userId)
      if (updatedReview) {
        setLocalReviews(prev => 
          prev.map(r => (r.id === reviewId || r._id === reviewId) ? updatedReview : r)
        )
      }
    } catch (error) {
      console.error('Error marking review as helpful:', error)
    }
  }

  const handleUnhelpfulVote = async (reviewId) => {
    try {
      const updatedReview = await reviewService.markUnhelpful(reviewId, userId)
      if (updatedReview) {
        setLocalReviews(prev => 
          prev.map(r => (r.id === reviewId || r._id === reviewId) ? updatedReview : r)
        )
      }
    } catch (error) {
      console.error('Error marking review as unhelpful:', error)
    }
  }

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = 'hidden'
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = ''
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const hasVotedHelpful = (review) => {
    return review.helpfulVoters && review.helpfulVoters.includes(userId)
  }

  const hasVotedUnhelpful = (review) => {
    return review.unhelpfulVoters && review.unhelpfulVoters.includes(userId)
  }

  if (!localReviews || localReviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  return (
    <>
      <div className="review-list">
        {localReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="review-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Review Header */}
            <div className="review-header">
              <div className="review-author-section">
                <div className="review-author-avatar">
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="review-author-info">
                  <h4>{review.authorName}</h4>
                  {review.verified && (
                    <span className="verified-badge">Verified Purchase</span>
                  )}
                  <div className="review-date">{formatDate(review.createdAt)}</div>
                </div>
              </div>
              <div className="review-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < review.rating ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
            </div>

            {/* Review Content */}
            <div className="review-body">
              {review.title && <h5 className="review-title">{review.title}</h5>}
              <p className="review-content">{review.content}</p>

              {/* Review Photos */}
              {review.photos && review.photos.length > 0 && (
                <div className="review-photos">
                  {review.photos.map((photo, photoIndex) => (
                    <div 
                      key={photoIndex} 
                      className="review-photo-item"
                      onClick={() => openPhotoModal(photo)}
                    >
                      <img src={photo} alt={`Review photo ${photoIndex + 1}`} />
                      <div className="photo-overlay">
                        <FaImage />
                      </div>
                    </div>
                  ))}
                  {review.photos.length > 3 && (
                    <div className="photo-count-badge">
                      +{review.photos.length - 3} more
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Review Footer - Helpful Voting */}
            <div className="review-footer">
              <div className="review-helpful">
                <span className="helpful-label">Was this helpful?</span>
                <button
                  className={`helpful-btn ${hasVotedHelpful(review) ? 'active' : ''}`}
                  onClick={() => handleHelpfulVote(review.id)}
                  aria-label="Mark as helpful"
                >
                  <FaThumbsUp />
                  <span>{review.helpful || 0}</span>
                </button>
                <button
                  className={`unhelpful-btn ${hasVotedUnhelpful(review) ? 'active' : ''}`}
                  onClick={() => handleUnhelpfulVote(review.id)}
                  aria-label="Mark as unhelpful"
                >
                  <FaThumbsDown />
                  <span>{review.unhelpful || 0}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="photo-modal-overlay" onClick={closePhotoModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="photo-modal-close" 
              onClick={closePhotoModal}
              aria-label="Close photo"
            >
              <FaTimes />
            </button>
            <img src={selectedPhoto} alt="Review photo full size" />
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewList
