# E-Flash Services - Quick Reference Card

## 1. Email Service
```javascript
import emailService from '../utils/emailService'

// Send contact form email
await emailService.sendContactFormNotification({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello...'
})

// Send order confirmation
await emailService.sendOrderConfirmation({
  customerEmail: 'john@example.com',
  orderId: 'ORD-123',
  items: [{name: 'Logo Design', price: 5000}],
  totalAmount: 5000
})

// Send admin alert
await emailService.sendAdminNotification({
  type: 'NEW_ORDER',
  title: 'New Order Received',
  data: orderData
})
```

---

## 2. Order Service

```javascript
import orderService from '../utils/orderService'

// Create
const order = orderService.createOrder({
  customerName: 'John',
  customerEmail: 'john@example.com',
  items: cartItems,
  totalAmount: 5000,
  orderDate: new Date(),
  deliveryAddress: {...}
})

// Get
orderService.getAllOrders()
orderService.getOrderById('ORD-123')
orderService.getUserOrders('john@example.com')

// Update
orderService.updateOrderStatus('ORD-123', 'confirmed')
orderService.updateOrderStatus('ORD-123', 'processing')
orderService.updateOrderStatus('ORD-123', 'shipped')
orderService.updateOrderStatus('ORD-123', 'delivered')

// Cancel
orderService.cancelOrder('ORD-123')

// Stats
const stats = orderService.getOrderStats()
// Returns: {total, pending, confirmed, processing, shipped, delivered, cancelled, totalRevenue}
```

---

## 3. Auth Service

```javascript
import authService from '../utils/authService'

// Register
const user = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePass123',
  phone: '0775608073'
})

// Login
const session = await authService.login('john@example.com', 'securePass123')

// Current user
const user = authService.getCurrentUser()

// Update profile
authService.updateProfile(userId, {
  name: 'Jane Doe',
  phone: '0775608073'
})

// Addresses
authService.addAddress(userId, {
  type: 'home',
  address: '123 Main St',
  city: 'Colombo',
  zipCode: '1000'
})

authService.getUserAddresses(userId)

// Logout
authService.logout()
```

---

## 4. Inventory Service

```javascript
import inventoryService from '../utils/inventoryService'

// Initialize (run once)
inventoryService.initializeInventory(productsList)

// Check stock
const inStock = inventoryService.isInStock('prod-1', 2)

// Reserve for order
inventoryService.reserveStock('prod-1', 2)

// Confirm shipment
inventoryService.confirmStock('prod-1', 2)

// Cancel reservation
inventoryService.cancelReservation('prod-1', 2)

// Get low stock
const lowStockItems = inventoryService.getLowStockItems()

// Get report
const report = inventoryService.getInventoryReport()
// Returns: {totalItems, totalQuantity, lowStockCount, outOfStock, reserved}
```

---

## 5. Review Service

```javascript
import { reviewService, wishlistService } from '../utils/reviewService'

// Add review
reviewService.addReview('prod-1', {
  rating: 5,
  title: 'Excellent!',
  content: 'Very happy with this product',
  authorName: 'John',
  authorEmail: 'john@example.com'
})

// Get reviews
reviewService.getProductReviews('prod-1')

// Get rating
const avgRating = reviewService.getAverageRating('prod-1')
const distribution = reviewService.getRatingDistribution('prod-1')
// Returns: {1: 0, 2: 1, 3: 2, 4: 5, 5: 10}

// Moderation (Admin)
reviewService.approveReview(reviewId)
reviewService.getPendingReviews()

// Mark helpful
reviewService.markHelpful(reviewId)

// Wishlist
wishlistService.addToWishlist(userId, product)
wishlistService.removeFromWishlist(userId, 'prod-1')
wishlistService.isInWishlist(userId, 'prod-1')
wishlistService.getWishlist(userId)
```

---

## 6. Blog Service

```javascript
import blogService from '../utils/blogService'

// Create
const post = blogService.createPost({
  title: 'Getting Started',
  slug: 'getting-started',
  content: 'Markdown content...',
  excerpt: 'Short summary...',
  category: 'Tutorial',
  tags: ['react', 'javascript'],
  author: 'John',
  featured: true,
  published: true,
  image: 'imageUrl'
})

// Read
blogService.getPublishedPosts()
blogService.getPostByIdentifier('getting-started') // or ID
blogService.getPostsByCategory('Tutorial')
blogService.getPostsByTag('react')

// Search
blogService.searchPosts('react')

// Analytics
blogService.getTrendingPosts(5)
blogService.getRelatedPosts('post-1')
blogService.incrementViews('post-1')

// Categories & Tags
blogService.getAllCategories()
blogService.getAllTags()

// Comments
blogService.addComment('post-1', {
  authorName: 'Jane',
  authorEmail: 'jane@example.com',
  content: 'Nice post!',
  approved: false // Moderation flag
})
```

---

## 7. Search Service

```javascript
import searchService from '../utils/searchService'

// Search with filters
const results = searchService.searchProducts(
  products,
  'logo', // query
  {
    category: 'Branding',
    minPrice: 1000,
    maxPrice: 10000,
    minRating: 3.5,
    inStockOnly: true,
    sortBy: 'price-asc' // or 'price-desc', 'rating', 'newest', 'popular'
  }
)

// Get filters
const filters = searchService.getProductFilters(products)

// Other searches
searchService.searchServices(services, 'web design')
searchService.searchPortfolio(portfolio, 'evoke', {
  category: 'Branding',
  minYear: 2022
})

// Fuzzy search
const results = searchService.fuzzySearch(
  products,
  'tshrt', // Matches: t-shirt
  ['name', 'description']
)
```

---

## 8. Accessibility Utilities

```javascript
import { a11y, seoUtils } from '../utils/a11yUtils'

// Accessibility
a11y.getContrastRatio('rgb(0, 0, 0)', 'rgb(255, 255, 255)') // 21:1
a11y.validateHeadingHierarchy(headingElements)
a11y.checkAltText(imageElements)
a11y.createAccessibleButton('Click me', handleClick)
a11y.manageFocus(element)

// SEO Schemas
const productSchema = seoUtils.generateProductSchema({
  name: 'T-Shirt',
  description: 'Premium cotton t-shirt',
  price: 2650,
  image: 'url',
  rating: 4.5,
  reviewCount: 20
})

const businessSchema = seoUtils.generateLocalBusinessSchema()

const breadcrumbs = seoUtils.generateBreadcrumbSchema([
  {name: 'Home', url: '/'},
  {name: 'Products', url: '/shop'},
  {name: 'T-Shirt', url: '/shop/t-shirt'}
])

// Meta Tags
const ogTags = seoUtils.generateOpenGraphTags({
  title: 'E-Flash',
  image: 'url',
  url: 'https://eflash.com'
})

const twitterTags = seoUtils.generateTwitterCardTags({
  title: 'E-Flash',
  description: 'Design agency',
  image: 'url'
})

const metaDesc = seoUtils.optimizeMetaDescription(
  'This is a very long description...',
  160
)
```

---

## 9. Monitoring

```javascript
import { errorTracker, performanceMonitor, userBehavior } from '../utils/monitoring'

// Setup (call once in App.jsx)
errorTracker.setupGlobalErrorHandler()

// Error tracking
errorTracker.logError(error, {userId: '123', page: 'ProductPage'})
const allErrors = errorTracker.getErrorLogs()
const recentErrors = errorTracker.getRecentErrors(10)

// Performance
const metrics = performanceMonitor.measurePageLoad()
// {pageLoadTime, navigationStart, responseEnd, domLoading, domComplete}

const fcp = performanceMonitor.getFirstContentfulPaint()
const lcp = performanceMonitor.getLargestContentfulPaint()

const time = performanceMonitor.measureFunction(() => {
  // expensive operation
}, 'expensiveOp')

const memory = performanceMonitor.getMemoryUsage()
performanceMonitor.monitorNetworkRequests()

// User behavior
const stopTracking = userBehavior.trackTimeOnPage('HomePage')
stopTracking() // Returns time in seconds

userBehavior.trackScrollDepth() // Tracks scroll percentage
userBehavior.trackInteraction('button-click', {buttonName: 'AddToCart'})
```

---

## 10. Notifications

```javascript
import notificationService from '../utils/notificationService'

// Request permission
await notificationService.requestNotificationPermission()

// Send notification
notificationService.sendBrowserNotification('New Message', {
  body: 'You have a new order',
  icon: '/logo.png',
  badge: '/badge.png'
})

// Store notification
notificationService.storeNotification({
  title: 'Order Confirmed',
  message: 'Your order ORD-123 has been confirmed',
  type: 'success',
  timestamp: new Date()
})

// Get notifications
const allNotifications = notificationService.getNotifications()
const unreadNotifications = notificationService.getUnreadNotifications()

notificationService.markAsRead('notif-1')
notificationService.deleteNotification('notif-1')

// Specialized notifications
notificationService.sendOrderNotification({id: 'ORD-123', totalAmount: 5000})
notificationService.sendOrderStatusNotification(order, 'shipped') // or 'delivered', 'processing', etc.
notificationService.sendBlogPostNotification({title: 'New Post', slug: 'new-post'})
notificationService.sendPromoNotification('50% off today!')

// Cleanup
notificationService.clearOldNotifications() // Removes notifications older than 30 days
```

---

## 11. Image Lightbox

```javascript
import ImageLightbox from '../components/ImageLightbox'

<ImageLightbox
  images={[
    'https://example.com/1.jpg',
    'https://example.com/2.jpg',
    'https://example.com/3.jpg'
  ]}
  initialIndex={0}
  isOpen={isLightboxOpen}
  onClose={() => setIsLightboxOpen(false)}
  projectTitle="Project Name"
/>
```

---

## Component Integration Example

```jsx
import React, { useState } from 'react'
import ImageLightbox from '../components/ImageLightbox'
import orderService from '../utils/orderService'
import emailService from '../utils/emailService'
import notificationService from '../utils/notificationService'

function CheckoutPage() {
  const handleCheckout = async () => {
    try {
      // Create order
      const order = orderService.createOrder({
        customerName: 'John',
        customerEmail: 'john@example.com',
        items: cartItems,
        totalAmount: 5000
      })

      // Send confirmation email
      await emailService.sendOrderConfirmation({
        customerEmail: 'john@example.com',
        orderId: order.id,
        items: cartItems,
        totalAmount: 5000
      })

      // Send notification
      notificationService.sendOrderNotification(order)

      // Show success
      showToast('Order created successfully! ID: ' + order.id, 'success')
    } catch (error) {
      showToast('Checkout failed: ' + error.message, 'error')
    }
  }

  return (
    <div>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  )
}
```

---

## Data Storage Priority

All services follow this pattern:
1. **Primary:** localStorage (works offline)
2. **Secondary:** Backend API (when ready)
3. **Fallback:** In-memory cache

Example:
```javascript
// First, try localStorage
let data = localStorage.getItem('orders')
if (data) return JSON.parse(data)

// Then, try backend API
try {
  const response = await fetch('/api/orders')
  return response.json()
} catch (error) {
  // Fallback to empty array
  return []
}
```

---

## Status Codes

**Orders:** pending → confirmed → processing → shipped → delivered/cancelled
**Reviews:** pending (moderation) → approved
**Posts:** draft → published
**Notifications:** unread → read → archived

---

## Error Handling Pattern

All services handle errors gracefully:
```javascript
try {
  const result = await service.method()
  return result
} catch (error) {
  console.error('Error:', error)
  // Return fallback/cached data or empty result
  return fallbackValue
}
```

**Important:** All services work offline with localStorage - no need for user to be online!
