import { useState, useEffect } from 'react';
import { getAllReviews, approveReview, deleteReview } from '../../utils/reviewService';
import './AdminReviews.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setLoading(true);
    const allReviews = getAllReviews();
    setReviews(allReviews);
    setLoading(false);
  };

  const handleApprove = (reviewId) => {
    if (approveReview(reviewId)) {
      loadReviews();
    }
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      if (deleteReview(reviewId)) {
        loadReviews();
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !review.approved;
    if (filter === 'approved') return review.approved;
    return true;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => !r.approved).length,
    approved: reviews.filter(r => r.approved).length
  };

  if (loading) {
    return <div className="admin-reviews-loading">Loading reviews...</div>;
  }

  return (
    <div className="admin-reviews">
      <div className="admin-reviews-header">
        <h1>Review Moderation</h1>
        <div className="review-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Reviews</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.approved}</span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
      </div>

      <div className="review-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Reviews
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={filter === 'approved' ? 'active' : ''}
          onClick={() => setFilter('approved')}
        >
          Approved ({stats.approved})
        </button>
      </div>

      <div className="reviews-list">
        {filteredReviews.length === 0 ? (
          <div className="no-reviews">
            <p>No {filter !== 'all' ? filter : ''} reviews found.</p>
          </div>
        ) : (
          filteredReviews.map(review => (
            <div key={review.id} className={`review-card ${review.approved ? 'approved' : 'pending'}`}>
              <div className="review-header">
                <div className="reviewer-info">
                  <h3>{review.name}</h3>
                  <span className="review-email">{review.email}</span>
                </div>
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              
              <div className="review-body">
                <p>{review.comment}</p>
              </div>

              <div className="review-meta">
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
                <span className={`review-status ${review.approved ? 'status-approved' : 'status-pending'}`}>
                  {review.approved ? 'Approved' : 'Pending'}
                </span>
              </div>

              <div className="review-actions">
                {!review.approved && (
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(review.id)}
                  >
                    Approve
                  </button>
                )}
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
