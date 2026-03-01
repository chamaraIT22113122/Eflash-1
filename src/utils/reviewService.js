// Review Service - MongoDB API Integration
// Handles customer reviews and testimonials

class ReviewService {
  constructor() {
    // Use environment variable for API base URL or default to localhost for development
    this.API_BASE = import.meta.env.VITE_API_BASE || 
                    (import.meta.env.DEV 
                      ? 'http://localhost:8888/.netlify/functions' 
                      : 'https://adorable-dodol-77eb48.netlify.app/api');
  }

  // Get all reviews from MongoDB
  async getAllReviews() {
    try {
      const response = await fetch(`${this.API_BASE}/reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reviews = await response.json();
      return reviews || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to localStorage for development
      return this.getFallbackReviews();
    }
  }

  // Add a new review to MongoDB
  async addReview(review) {
    try {
      const reviewData = {
        ...review,
        id: review.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: review.status || 'pending'
      };

      const response = await fetch(`${this.API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newReview = await response.json();
      
      // Trigger refresh event for other components
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return newReview;
    } catch (error) {
      console.error('Error adding review:', error);
      // Fallback to localStorage
      return this.addFallbackReview(review);
    }
  }

  // Update an existing review in MongoDB
  async updateReview(reviewId, updates) {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`${this.API_BASE}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedReview = await response.json();
      
      // Trigger refresh event for other components
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      // Fallback to localStorage
      return this.updateFallbackReview(reviewId, updates);
    }
  }

  // Delete a review from MongoDB
  async deleteReview(reviewId) {
    try {
      const response = await fetch(`${this.API_BASE}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Trigger refresh event for other components
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return result;
    } catch (error) {
      console.error('Error deleting review:', error);
      // Fallback to localStorage
      return this.deleteFallbackReview(reviewId);
    }
  }

  // Get approved reviews for public display
  async getApprovedReviews() {
    try {
      const allReviews = await this.getAllReviews();
      return allReviews.filter(review => review.status === 'approved');
    } catch (error) {
      console.error('Error fetching approved reviews:', error);
      return [];
    }
  }

  // Bulk update review status (approve/reject multiple reviews)
  async bulkUpdateStatus(reviewIds, status) {
    try {
      const results = await Promise.all(
        reviewIds.map(id => this.updateReview(id, { status }))
      );
      return results;
    } catch (error) {
      console.error('Error bulk updating reviews:', error);
      return [];
    }
  }

  // Mark review as helpful (for product reviews)
  async markHelpful(reviewId, userId = 'anonymous') {
    try {
      const review = await this.getReviewById(reviewId);
      if (!review) return null;

      // Initialize helpful arrays if they don't exist
      if (!review.helpfulVoters) review.helpfulVoters = [];
      if (!review.unhelpfulVoters) review.unhelpfulVoters = [];
      if (!review.helpful) review.helpful = 0;
      if (!review.unhelpful) review.unhelpful = 0;

      // Check if user already voted helpful
      if (review.helpfulVoters.includes(userId)) {
        // User is un-voting helpful
        review.helpful--;
        review.helpfulVoters = review.helpfulVoters.filter(id => id !== userId);
      } else {
        // If user voted unhelpful before, remove that vote
        if (review.unhelpfulVoters.includes(userId)) {
          review.unhelpful--;
          review.unhelpfulVoters = review.unhelpfulVoters.filter(id => id !== userId);
        }
        // Add helpful vote
        review.helpful++;
        review.helpfulVoters.push(userId);
      }

      return await this.updateReview(reviewId, {
        helpful: review.helpful,
        unhelpful: review.unhelpful,
        helpfulVoters: review.helpfulVoters,
        unhelpfulVoters: review.unhelpfulVoters
      });
    } catch (error) {
      console.error('Error marking review as helpful:', error);
      return null;
    }
  }

  // Mark review as unhelpful (for product reviews)
  async markUnhelpful(reviewId, userId = 'anonymous') {
    try {
      const review = await this.getReviewById(reviewId);
      if (!review) return null;

      // Initialize helpful arrays if they don't exist
      if (!review.helpfulVoters) review.helpfulVoters = [];
      if (!review.unhelpfulVoters) review.unhelpfulVoters = [];
      if (!review.helpful) review.helpful = 0;
      if (!review.unhelpful) review.unhelpful = 0;

      // Check if user already voted unhelpful
      if (review.unhelpfulVoters.includes(userId)) {
        // User is un-voting unhelpful
        review.unhelpful--;
        review.unhelpfulVoters = review.unhelpfulVoters.filter(id => id !== userId);
      } else {
        // If user voted helpful before, remove that vote
        if (review.helpfulVoters.includes(userId)) {
          review.helpful--;
          review.helpfulVoters = review.helpfulVoters.filter(id => id !== userId);
        }
        // Add unhelpful vote
        review.unhelpful++;
        review.unhelpfulVoters.push(userId);
      }

      return await this.updateReview(reviewId, {
        helpful: review.helpful,
        unhelpful: review.unhelpful,
        helpfulVoters: review.helpfulVoters,
        unhelpfulVoters: review.unhelpfulVoters
      });
    } catch (error) {
      console.error('Error marking review as unhelpful:', error);
      return null;
    }
  }

  // Get a single review by ID from MongoDB
  async getReviewById(reviewId) {
    try {
      const response = await fetch(`${this.API_BASE}/reviews/${reviewId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching review:', error);
      return null;
    }
  }

  // Approve a review (admin function)
  async approveReview(reviewId) {
    try {
      return await this.updateReview(reviewId, { status: 'approved' });
    } catch (error) {
      console.error('Error approving review:', error);
      return null;
    }
  }

  // Get pending reviews for admin
  async getPendingReviews() {
    try {
      const allReviews = await this.getAllReviews();
      return allReviews.filter(review => review.status === 'pending' || !review.status);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      return [];
    }
  }

  // Fallback methods for localStorage (development/offline mode)
  getFallbackReviews() {
    try {
      const reviews = localStorage.getItem('eflash_admin_reviews');
      return reviews ? JSON.parse(reviews) : [];
    } catch (error) {
      console.error('Error reading reviews from localStorage:', error);
      return [];
    }
  }

  addFallbackReview(review) {
    try {
      const reviews = this.getFallbackReviews();
      const newReview = {
        ...review,
        id: review.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: review.status || 'pending'
      };
      
      reviews.unshift(newReview);
      localStorage.setItem('eflash_admin_reviews', JSON.stringify(reviews));
      
      // Trigger refresh event
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return newReview;
    } catch (error) {
      console.error('Error adding review to localStorage:', error);
      return null;
    }
  }

  updateFallbackReview(reviewId, updates) {
    try {
      const reviews = this.getFallbackReviews();
      const reviewIndex = reviews.findIndex(r => r.id === reviewId || r._id === reviewId);
      
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      reviews[reviewIndex] = {
        ...reviews[reviewIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('eflash_admin_reviews', JSON.stringify(reviews));
      
      // Trigger refresh event
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return reviews[reviewIndex];
    } catch (error) {
      console.error('Error updating review in localStorage:', error);
      return null;
    }
  }

  deleteFallbackReview(reviewId) {
    try {
      const reviews = this.getFallbackReviews();
      const filteredReviews = reviews.filter(r => r.id !== reviewId && r._id !== reviewId);
      
      localStorage.setItem('eflash_admin_reviews', JSON.stringify(filteredReviews));
      
      // Trigger refresh event
      window.dispatchEvent(new CustomEvent('reviewsUpdate'));
      
      return { message: 'Review deleted successfully' };
    } catch (error) {
      console.error('Error deleting review from localStorage:', error);
      return null;
    }
  }

  // Migrate existing localStorage reviews to MongoDB
  async migrateToDatabase() {
    try {
      const localReviews = this.getFallbackReviews();
      
      if (localReviews.length === 0) {
        console.log('No reviews to migrate');
        return { migrated: 0, message: 'No reviews to migrate' };
      }

      let migratedCount = 0;
      
      for (const review of localReviews) {
        try {
          const { id, ...reviewData } = review;
          await this.addReview(reviewData);
          migratedCount++;
        } catch (error) {
          console.error('Error migrating review:', review, error);
        }
      }

      // Clear localStorage after successful migration
      if (migratedCount > 0) {
        localStorage.removeItem('eflash_admin_reviews');
        console.log(`Migrated ${migratedCount} reviews to MongoDB`);
      }

      return { 
        migrated: migratedCount, 
        message: `Successfully migrated ${migratedCount} reviews` 
      };
    } catch (error) {
      console.error('Error during review migration:', error);
      return { migrated: 0, error: error.message };
    }
  }
}

// Create and export singleton instance
const reviewService = new ReviewService();

export default reviewService;
