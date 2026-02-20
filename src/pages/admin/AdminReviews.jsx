import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaStar, FaEye, FaEdit, FaTrash, FaCheck, FaTimes, 
  FaImage, FaCalendar, FaUser, FaEnvelope, FaThumbsUp, 
  FaThumbsDown, FaSearch, FaFilter 
} from 'react-icons/fa'
import { getAllReviews, approveReview, deleteReview, markHelpful, markUnhelpful } from '../../utils/reviewService'
import './AdminReviews.css'
import './AdminBase.css'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [filter, setFilter] = useState('pending') // 'all', 'pending', 'approved'
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReview, setSelectedReview] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'oldest', 'rating-high', 'rating-low'

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = () => {
    setLoading(true)
    const allReviews = getAllReviews()
    setReviews(allReviews)
    setLoading(false)
  }

  const handleApprove = (reviewId) => {
    if (approveReview(reviewId)) {
      loadReviews()
    }
  }

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      if (deleteReview(reviewId)) {
        loadReviews()
        if (selectedReview && selectedReview.id === reviewId) {
          closeModal()
        }
      }
    }
  }

  const handleEdit = (review) => {
    setEditingReview({ ...review })
  }

  const handleSaveEdit = () => {
    // Update review in localStorage
    const allReviews = getAllReviews()
    const updatedReviews = allReviews.map(r => 
      r.id === editingReview.id ? editingReview : r
    )
    localStorage.setItem('eflash_reviews', JSON.stringify(updatedReviews))
    setEditingReview(null)
    loadReviews()
  }

  const handleCancelEdit = () => {
    setEditingReview(null)
  }

  const openModal = (review) => {
    setSelectedReview(review)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedReview(null)
    setIsModalOpen(false)
    document.body.style.overflow = ''
  }

  const handleHelpfulVote = (reviewId) => {
    markHelpful(reviewId, 'admin')
    loadReviews()
  }

  const handleUnhelpfulVote = (reviewId) => {
    markUnhelpful(reviewId, 'admin')
    loadReviews()
  }

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (filter === 'all') return true
      if (filter === 'pending') return !review.approved
      if (filter === 'approved') return review.approved
      return true
    })
    .filter(review => {
      if (!searchTerm) return true
      const searchLower = searchTerm.toLowerCase()
      return (
        review.authorName?.toLowerCase().includes(searchLower) ||
        review.title?.toLowerCase().includes(searchLower) ||
        review.content?.toLowerCase().includes(searchLower) ||
        review.authorEmail?.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'rating-high':
          return b.rating - a.rating
        case 'rating-low':
          return a.rating - b.rating
        default:
          return 0
      }
    })

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !review.approved;
    if (filter === 'approved') return review.approved;
    return true;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => !r.approved).length,
    approved: reviews.filter(r => r.approved).length,
    withPhotos: reviews.filter(r => r.photos && r.photos.length > 0).length,
    highRated: reviews.filter(r => r.rating >= 4).length
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="admin-reviews-loading">
        <div className="spinner"></div>
        <p>Loading reviews...</p>
      </div>
    )
  }

  return (
    <>
      <div className="admin-reviews admin-page admin-content">
        {/* Header Section */}
        <div className="admin-reviews-header">
          <div className="header-content">
            <h1>Review Management</h1>
            <p>Moderate, edit, and manage customer reviews</p>
          </div>
          <div className="header-actions">
            <button 
              className="refresh-btn"
              onClick={loadReviews}
              disabled={loading}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="review-stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Reviews</span>
            </div>
          </div>
          <div className="stat-card warning">
            <div className="stat-icon">
              <FaEye />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.pending}</span>
              <span className="stat-label">Pending Approval</span>
            </div>
          </div>
          <div className="stat-card success">
            <div className="stat-icon">
              <FaCheck />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.approved}</span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
          <div className="stat-card info">
            <div className="stat-icon">
              <FaImage />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.withPhotos}</span>
              <span className="stat-label">With Photos</span>
            </div>
          </div>
          <div className="stat-card accent">
            <div className="stat-icon">
              <FaThumbsUp />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.highRated}</span>
              <span className="stat-label">4+ Stars</span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="reviews-controls">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-input-wrapper">
              <FaSearch />
              <input
                type="text"
                placeholder="Search reviews by name, email, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="filter-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({stats.total})
              </button>
              <button
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({stats.pending})
              </button>
              <button
                className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
                onClick={() => setFilter('approved')}
              >
                Approved ({stats.approved})
              </button>
            </div>

            <div className="sort-section">
              <FaFilter />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating-high">Highest Rating</option>
                <option value="rating-low">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {filteredAndSortedReviews.length === 0 ? (
            <div className="no-reviews">
              <FaStar size={48} />
              <h3>No reviews found</h3>
              <p>
                {searchTerm 
                  ? `No reviews match "${searchTerm}"` 
                  : `No ${filter !== 'all' ? filter : ''} reviews available.`}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredAndSortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`review-card ${review.approved ? 'approved' : 'pending'}`}
                >
                  {/* Review Header */}
                  <div className="review-card-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <FaUser />
                      </div>
                      <div className="reviewer-details">
                        {editingReview && editingReview.id === review.id ? (
                          <input
                            type="text"
                            value={editingReview.authorName}
                            onChange={(e) => setEditingReview({
                              ...editingReview,
                              authorName: e.target.value
                            })}
                            className="edit-input"
                          />
                        ) : (
                          <h3>{review.authorName}</h3>
                        )}
                        <div className="reviewer-meta">
                          <span className="reviewer-email">
                            <FaEnvelope />
                            {review.authorEmail}
                          </span>
                          <span className="review-date">
                            <FaCalendar />
                            {formatDate(review.createdAt)}  
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="review-rating-section">
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < review.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                        <span className="rating-number">({review.rating}/5)</span>
                      </div>
                      <div className={`approval-status ${review.approved ? 'approved' : 'pending'}`}>
                        {review.approved ? (
                          <>
                            <FaCheck />
                            <span>Approved</span>
                          </>
                        ) : (
                          <>
                            <FaEye />
                            <span>Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="review-card-body">
                    {review.title && (
                      <div className="review-title-section">
                        {editingReview && editingReview.id === review.id ? (
                          <input
                            type="text"
                            value={editingReview.title}
                            onChange={(e) => setEditingReview({
                              ...editingReview,
                              title: e.target.value
                            })}
                            className="edit-input"
                          />
                        ) : (
                          <h4>{review.title}</h4>
                        )}
                      </div>
                    )}
                    
                    <div className="review-content-section">
                      {editingReview && editingReview.id === review.id ? (
                        <textarea
                          value={editingReview.content}
                          onChange={(e) => setEditingReview({
                            ...editingReview,
                            content: e.target.value
                          })}
                          className="edit-textarea"
                          rows={3}
                        />
                      ) : (
                        <p>{review.content}</p>
                      )}
                    </div>

                    {/* Review Photos */}
                    {review.photos && review.photos.length > 0 && (
                      <div className="review-photos-section">
                        <div className="photos-header">
                          <FaImage />
                          <span>{review.photos.length} Photo{review.photos.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="review-photos-grid">
                          {review.photos.slice(0, 3).map((photo, photoIndex) => (
                            <div 
                              key={photoIndex} 
                              className="review-photo-thumb"
                              onClick={() => openModal(review)}
                            >
                              <img src={photo} alt={`Review photo ${photoIndex + 1}`} />
                            </div>
                          ))}
                          {review.photos.length > 3 && (
                            <div className="photo-count-more">
                              +{review.photos.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Helpfulness Section */}
                    <div className="review-helpfulness">
                      <span className="helpful-label">Helpfulness:</span>
                      <div className="helpful-votes">
                        <button
                          className="helpful-btn"
                          onClick={() => handleHelpfulVote(review.id)}
                        >
                          <FaThumbsUp />
                          <span>{review.helpful || 0}</span>
                        </button>
                        <button
                          className="unhelpful-btn"
                          onClick={() => handleUnhelpfulVote(review.id)}
                        >
                          <FaThumbsDown />
                          <span>{review.unhelpful || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Review Actions */}
                  <div className="review-card-actions">
                    {editingReview && editingReview.id === review.id ? (
                      <div className="edit-actions">
                        <button
                          className="btn-save"
                          onClick={handleSaveEdit}
                        >
                          <FaCheck />
                          Save Changes
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={handleCancelEdit}
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button
                          className="btn-view"
                          onClick={() => openModal(review)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(review)}
                          title="Edit Review"
                        >
                          <FaEdit />
                        </button>
                        {!review.approved && (
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(review.id)}
                            title="Approve Review"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(review.id)}
                          title="Delete Review"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Review Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedReview && (
          <div className="modal-overlay" onClick={closeModal}>
            <motion.div
              className="review-modal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Review Details</h2>
                <button className="modal-close" onClick={closeModal}>
                  <FaTimes />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-review-info">
                  <div className="modal-reviewer">
                    <strong>{selectedReview.authorName}</strong>
                    <span>{selectedReview.authorEmail}</span>
                    <span>{formatDate(selectedReview.createdAt)}</span>
                  </div>
                  
                  <div className="modal-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < selectedReview.rating ? 'star-filled' : 'star-empty'}
                      />
                    ))}
                  </div>
                </div>

                {selectedReview.title && (
                  <h3 className="modal-review-title">{selectedReview.title}</h3>
                )}
                
                <p className="modal-review-content">{selectedReview.content}</p>

                {selectedReview.photos && selectedReview.photos.length > 0 && (
                  <div className="modal-photos-section">
                    <h4>Customer Photos</h4>
                    <div className="modal-photos-grid">
                      {selectedReview.photos.map((photo, index) => (
                        <img 
                          key={index} 
                          src={photo} 
                          alt={`Review photo ${index + 1}`}
                          className="modal-photo"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-helpfulness">
                  <div className="helpfulness-stats">
                    <span>👍 {selectedReview.helpful || 0} helpful</span>
                    <span>👎 {selectedReview.unhelpful || 0} unhelpful</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                {!selectedReview.approved && (
                  <button
                    className="btn-approve"
                    onClick={() => {
                      handleApprove(selectedReview.id)
                      closeModal()
                    }}
                  >
                    <FaCheck />
                    Approve Review
                  </button>
                )}
                <button
                  className="btn-edit"
                  onClick={() => {
                    handleEdit(selectedReview)
                    closeModal()
                  }}
                >
                  <FaEdit />
                  Edit Review
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(selectedReview.id)}
                >
                  <FaTrash />
                  Delete Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminReviews
