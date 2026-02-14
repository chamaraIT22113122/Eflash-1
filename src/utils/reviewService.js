// Reviews and Ratings System
const REVIEWS_DB_KEY = 'eflash_reviews'
const WISHLIST_DB_KEY = 'eflash_wishlist'

export const reviewService = {
  // Add review
  addReview: (productId, reviewData) => {
    const review = {
      id: `REV-${Date.now()}`,
      productId,
      rating: reviewData.rating, // 1-5 stars
      title: reviewData.title,
      content: reviewData.content,
      authorName: reviewData.authorName,
      authorEmail: reviewData.authorEmail,
      verified: reviewData.verified || false, // true if user bought the product
      helpful: 0,
      unhelpful: 0,
      createdAt: new Date().toISOString(),
      approved: false // Requires moderation
    }

    const reviews = reviewService.getAllReviews()
    reviews.push(review)
    localStorage.setItem(REVIEWS_DB_KEY, JSON.stringify(reviews))

    return review
  },

  // Get all reviews
  getAllReviews: () => {
    const reviewsJson = localStorage.getItem(REVIEWS_DB_KEY)
    return reviewsJson ? JSON.parse(reviewsJson) : []
  },

  // Get product reviews
  getProductReviews: (productId, onlyApproved = true) => {
    const reviews = reviewService.getAllReviews()
    return reviews.filter(
      r => r.productId === productId && (!onlyApproved || r.approved)
    )
  },

  // Get average rating
  getAverageRating: (productId) => {
    const reviews = reviewService.getProductReviews(productId, true)
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return (sum / reviews.length).toFixed(1)
  },

  // Get rating distribution
  getRatingDistribution: (productId) => {
    const reviews = reviewService.getProductReviews(productId, true)
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

    reviews.forEach(r => {
      distribution[r.rating]++
    })

    return distribution
  },

  // Approve review (admin)
  approveReview: (reviewId) => {
    const reviews = reviewService.getAllReviews()
    const review = reviews.find(r => r.id === reviewId)
    if (review) {
      review.approved = true
      localStorage.setItem(REVIEWS_DB_KEY, JSON.stringify(reviews))
    }
    return review
  },

  // Mark helpful
  markHelpful: (reviewId) => {
    const reviews = reviewService.getAllReviews()
    const review = reviews.find(r => r.id === reviewId)
    if (review) {
      review.helpful++
      localStorage.setItem(REVIEWS_DB_KEY, JSON.stringify(reviews))
    }
    return review
  },

  // Get pending reviews (admin)
  getPendingReviews: () => {
    const reviews = reviewService.getAllReviews()
    return reviews.filter(r => !r.approved)
  }
}

// Wishlist System
export const wishlistService = {
  // Get user wishlist
  getWishlist: (userId) => {
    const wishlistJson = localStorage.getItem(`${WISHLIST_DB_KEY}_${userId}`)
    return wishlistJson ? JSON.parse(wishlistJson) : []
  },

  // Add to wishlist
  addToWishlist: (userId, product) => {
    const wishlist = wishlistService.getWishlist(userId)
    const exists = wishlist.some(item => item.id === product.id)

    if (!exists) {
      wishlist.push({
        ...product,
        addedAt: new Date().toISOString()
      })
      localStorage.setItem(`${WISHLIST_DB_KEY}_${userId}`, JSON.stringify(wishlist))
    }

    return wishlist
  },

  // Remove from wishlist
  removeFromWishlist: (userId, productId) => {
    const wishlist = wishlistService.getWishlist(userId)
    const filtered = wishlist.filter(item => item.id !== productId)
    localStorage.setItem(`${WISHLIST_DB_KEY}_${userId}`, JSON.stringify(filtered))
    return filtered
  },

  // Check if in wishlist
  isInWishlist: (userId, productId) => {
    const wishlist = wishlistService.getWishlist(userId)
    return wishlist.some(item => item.id === productId)
  },

  // Clear wishlist
  clearWishlist: (userId) => {
    localStorage.removeItem(`${WISHLIST_DB_KEY}_${userId}`)
    return []
  }
}

export default { reviewService, wishlistService }
