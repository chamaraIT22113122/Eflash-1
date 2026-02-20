# Admin Panel Guide

## 🚀 Accessing the Admin Panel

### Login Credentials
- **URL**: `http://localhost:3002/admin/login` (or your deployed URL)
- **Email**: `admin@eflash24.tech`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change the default admin password after first login! Update it in `src/utils/authService.js` > `initializeAdmin()` function.

---

## 📊 Admin Panel Features

### 1. **Dashboard** (`/admin/dashboard`)
The main hub showing:
- Total page views and unique visitors
- Active users count
- Order statistics (total orders, pending, revenue)
- Review statistics (total, pending, approved)
- Blog post counts (total, published, drafts)
- Recent traffic data (last 10 visitors)
- Quick action buttons

### 2. **Analytics** (`/admin/analytics`)
Complete website traffic monitoring:
- **Visitors Overview**: Total visitors, page views, sessions
- **Time Filters**: Today, Last 7 Days, Last 30 Days, All Time
- **Interactive Charts**:
  - Page views over time (line chart)
  - Top pages by visits (bar chart)
  - Device distribution (pie chart)
  - Browser distribution (pie chart)
- **Detailed Traffic Table**: Page, visits, unique visitors
- **Traffic Sources Tracking**: Referrers and devices

### 3. **Review Moderation** (`/admin/reviews`)
Manage customer reviews:
- **Statistics**: Total reviews, pending, approved
- **Filters**: All, Pending, Approved
- **Review Cards Show**:
  - Customer name and email
  - Star rating (1-5)
  - Comment text
  - Submission date
  - Status badge (pending/approved)
- **Actions**:
  - Approve pending reviews
  - Delete any review
- Reviews are stored in `localStorage` under the key `product_reviews`

### 4. **Order Management** (`/admin/orders`)
Complete e-commerce order handling:
- **Statistics**: Total orders, revenue, pending, delivered
- **Filters**: All, Pending, Processing, Shipped, Delivered, Cancelled
- **Order Details**:
  - Order ID and date
  - Customer information (name, email, phone, address)
  - Ordered items with quantity and price
  - Total amount
  - Current status
- **Actions**:
  - Update order status via dropdown
  - Statuses: Pending → Processing → Shipped → Delivered
  - Can also mark as Cancelled
- Orders are stored in `localStorage` under the key `eflash_orders`

### 5. **Blog Management** (`/admin/blog`)
Full blogging CMS:
- **Statistics**: Total posts, published, drafts
- **Create New Post**: Click "New Post" button
- **Post Editor Form**:
  - Title (required)
  - Author (required)
  - Category (Design, Development, Marketing, Tutorial, News)
  - Excerpt (required) - shown in blog list
  - Content (required) - full post body
  - Image URL (optional)
  - Tags (comma-separated)
- **Filters**: All, Published, Drafts
- **Post Cards Show**:
  - Featured image (if provided)
  - Title and excerpt
  - Author, category, date
  - Tags
  - Status badge (draft/published)
- **Actions**:
  - Edit any post
  - Publish draft posts
  - Delete posts
- Blog posts are stored in `localStorage` under the key `blog_posts`

### 6. **Content Management** (`/admin/content`)
Edit website text content:
- **Hero Section**: Main title, subtitle, CTA button text
- **About Section**: Heading, description, years of experience
- **Services Section**: Heading, subtitle
- **Contact Information**: Email, phone, address, WhatsApp
- **Social Media Links**: Facebook, Instagram, Twitter, LinkedIn, YouTube
- **How it Works**:
  - Click "Edit" on any section
  - Update the fields
  - Click "Save Changes"
  - Changes reflect immediately across the site
- Content is managed via `SiteContentContext` and stored in `localStorage`

### 7. **User Management** (`/admin/users`)
Manage registered users:
- **Statistics**: Total users, administrators, customers
- **Search**: Find users by email or name
- **Filters**: All Users, Admins, Customers
- **User Table Shows**:
  - Email address
  - Name
  - Role (admin/customer)
  - Account creation date
- **Actions**:
  - Delete customer accounts
  - Default admin account is protected (cannot be deleted)
- Users are stored in `localStorage` under the key `eflash_users`

### 8. **Newsletter Management** (`/admin/newsletter`)
Email marketing tools:
- **Statistics**: Total subscribers, new subscribers (last 30 days)
- **Compose Newsletter**:
  - Choose recipients (all subscribers or custom list)
  - Write subject line
  - Compose email content (HTML supported)
  - Send button (requires EmailJS configuration)
- **Subscriber List Table**:
  - Email addresses
  - Subscription dates
  - Remove action
- **Export Subscribers**: Download CSV file of all emails
- Subscribers are stored in `localStorage` under the key `newsletter_subscribers`
- ⚠️ **Note**: EmailJS integration pending - configure to send actual emails

---

## 🔧 Technical Details

### Authentication System
- **Location**: `src/utils/authService.js`
- **Security**: Uses `bcryptjs` for password hashing (SALT_ROUNDS: 10)
- **Storage**: Users stored in localStorage
- **Protected Routes**: Admin layout checks for logged-in admin user
- **Session**: User session stored in `eflash_current_user` key
- **Default Admin**: Auto-created on first load with email `admin@eflash24.tech`

### Data Services
1. **Review Service** (`src/utils/reviewService.js`):
   - `addReview(reviewData)` - Submit new review
   - `getAllReviews()` - Get all reviews
   - `approveReview(reviewId)` - Approve pending review
   - `deleteReview(reviewId)` - Delete review
   - `getApprovedReviews()` - Get only approved reviews

2. **Order Service** (`src/utils/orderService.js`):
   - `createOrder(orderData)` - Create new order
   - `getAllOrders()` - Get all orders
   - `updateOrderStatus(orderId, status)` - Update order status
   - `getOrderStats()` - Get order statistics

3. **Blog Service** (`src/utils/blogService.js`):
   - `createPost(postData)` - Create new blog post
   - `getAllPosts()` - Get all posts
   - `getPublishedPosts()` - Get published posts only
   - `updatePost(postId, postData)` - Update existing post
   - `deletePost(postId)` - Delete post
   - `publishPost(postId)` - Publish draft post

4. **Analytics Tracking** (`src/utils/analyticsTracking.js`):
   - `initializeAnalytics()` - Initialize tracking
   - `trackPageView(pagePath)` - Track page view
   - `trackEvent(category, action, label)` - Track custom event
   - `getLocalAnalytics()` - Get analytics data
   - Integrates with Google Analytics 4 (GA4)

### Admin Panel Routes
All routes are lazy-loaded for optimal performance:
```javascript
/admin/login          - Login page (no auth required)
/admin                - Redirects to dashboard
/admin/dashboard      - Main dashboard
/admin/analytics      - Analytics page
/admin/reviews        - Review moderation
/admin/orders         - Order management
/admin/blog           - Blog CMS
/admin/content        - Content editor
/admin/users          - User management
/admin/newsletter     - Newsletter tools
```

### Admin Panel Components
1. **AdminLogin** (`src/pages/admin/AdminLogin.jsx`):
   - Email/password form
   - Role validation (admin only)
   - Redirects to dashboard on success

2. **AdminLayout** (`src/pages/admin/AdminLayout.jsx`):
   - Sidebar navigation
   - Mobile responsive menu
   - Logout functionality
   - Protected route wrapper

3. **AdminDashboard** (`src/pages/admin/AdminDashboard.jsx`):
   - Statistics overview
   - Recent traffic display
   - Quick action links

---

## 🎨 Styling

All admin pages have dark mode support:
- Light theme by default
- Dark theme via `[data-theme="dark"]` selector
- Responsive design (mobile-first)
- Consistent color scheme using CSS variables
- Primary color: `var(--primary-color)`
- Card background: `var(--card-bg)`
- Text color: `var(--text-color)`

### Mobile Responsiveness
- Sidebar collapses to hamburger menu on mobile
- Tables become stacked cards on small screens
- Forms stack vertically
- Buttons become full-width
- All admin pages fully functional on mobile

---

## 📝 Data Storage

All data is stored in `localStorage` for development. For production:

### Recommended Backend Integration
1. **Users & Auth**: 
   - Replace localStorage with JWT tokens
   - Store users in database (MongoDB, PostgreSQL)
   - Implement email verification

2. **Orders**:
   - Payment gateway integration (Stripe, PayPal)
   - Order confirmation emails
   - Database storage for order history

3. **Reviews**:
   - Store in database with timestamps
   - Email notifications for new reviews
   - Spam detection

4. **Blog Posts**:
   - Rich text editor (CKEditor, TinyMCE)
   - Image upload to cloud storage (Cloudinary, AWS S3)
   - SEO metadata management

5. **Newsletter**:
   - EmailJS configuration (get API keys from emailjs.com)
   - Or use Mailchimp, SendGrid, AWS SES
   - GDPR-compliant unsubscribe links

6. **Analytics**:
   - Google Analytics 4 (add GA_MEASUREMENT_ID to env)
   - Server-side analytics for accuracy
   - User behavior tracking

---

## 🚀 Deployment Checklist

Before deploying to production:

### Security
- [ ] Change default admin password
- [ ] Add password strength requirements
- [ ] Implement rate limiting for login attempts
- [ ] Add HTTPS/SSL certificate
- [ ] Sanitize all user inputs
- [ ] Add CSRF protection

### Backend Setup
- [ ] Set up database (MongoDB/PostgreSQL)
- [ ] Create REST API for data operations
- [ ] Implement proper authentication (JWT)
- [ ] Add email service (SMTP/EmailJS/SendGrid)
- [ ] Set up payment processing
- [ ] Configure file upload service

### Configuration
- [ ] Add environment variables (.env file):
  ```
  VITE_API_URL=your-backend-url
  VITE_GA_MEASUREMENT_ID=your-ga-id
  VITE_EMAILJS_SERVICE_ID=your-service-id
  VITE_EMAILJS_TEMPLATE_ID=your-template-id
  VITE_EMAILJS_PUBLIC_KEY=your-public-key
  ```

### Testing
- [ ] Test all admin functionalities
- [ ] Test mobile responsiveness
- [ ] Test in multiple browsers
- [ ] Test with real data
- [ ] Check page load speeds
- [ ] Verify all links work

### Performance
- [ ] Optimize images
- [ ] Enable caching
- [ ] Minify assets (Vite does this automatically)
- [ ] Set up CDN for static assets
- [ ] Monitor error logs

---

## 🔍 Common Tasks

### Add a New Admin User
```javascript
// In browser console or via registration form
import { register } from './utils/authService'

await register({
  email: 'newadmin@example.com',
  password: 'securepassword',
  name: 'Admin Name',
  role: 'admin'
})
```

### Export All Data
```javascript
// In browser console
const exportAllData = () => {
  const data = {
    users: JSON.parse(localStorage.getItem('eflash_users') || '[]'),
    orders: JSON.parse(localStorage.getItem('eflash_orders') || '[]'),
    reviews: JSON.parse(localStorage.getItem('product_reviews') || '[]'),
    blog: JSON.parse(localStorage.getItem('blog_posts') || '[]'),
    newsletter: JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'),
    analytics: JSON.parse(localStorage.getItem('analytics_data') || '{}')
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `eflash-data-${new Date().toISOString()}.json`
  a.click()
}

exportAllData()
```

### Clear All Data (Reset)
```javascript
// In browser console - USE CAREFULLY!
localStorage.clear()
location.reload()
```

---

## 🆘 Troubleshooting

### Cannot Login to Admin
1. Check credentials: `admin@eflash24.tech` / `admin123`
2. Clear localStorage and refresh: `localStorage.clear()`
3. Check browser console for errors
4. Verify authService initialized properly

### Analytics Not Tracking
1. Check if `initializeAnalytics()` is called
2. Verify `AnalyticsWrapper` is wrapping routes
3. Check localStorage for `analytics_data` key
4. For GA4, add `VITE_GA_MEASUREMENT_ID` to .env

### Orders Not Appearing
1. Verify cart checkout creates orders
2. Check `localStorage` for `eflash_orders` key
3. Ensure orderService functions are imported correctly

### Newsletter Won't Send
1. EmailJS integration is pending by default
2. Sign up at emailjs.com
3. Get service ID, template ID, and public key
4. Update Newsletter component with EmailJS SDK
5. Configure email template in EmailJS dashboard

### Mobile Menu Not Working
1. Check that hamburger icon appears on small screens
2. Verify `AdminLayout.css` media queries load
3. Test on actual mobile device, not just browser resize

---

## 📚 Additional Resources

- **React Router**: https://reactrouter.com/
- **bcryptjs**: https://www.npmjs.com/package/bcryptjs
- **Recharts**: https://recharts.org/
- **EmailJS**: https://www.emailjs.com/
- **Google Analytics 4**: https://developers.google.com/analytics/devguides/collection/ga4

---

## 🎯 Future Enhancements

Potential features to add:
- Two-factor authentication (2FA)
- Advanced analytics with heatmaps
- Bulk operations (delete multiple, export selected)
- Real-time notifications
- Activity log/audit trail
- User roles and permissions
- Advanced blog editor with markdown
- Image gallery manager
- SEO tools and meta tag editor
- Email templates editor
- Customer support ticketing system
- Inventory management for shop
- Discount codes and coupons
- Automated email campaigns
- A/B testing tools

---

## 📞 Support

For issues or questions:
- Check the browser console for errors
- Review the code in `/src/pages/admin/` and `/src/utils/`
- Test in incognito mode to rule out cache issues
- Verify all dependencies are installed: `npm install`

---

**Version**: 2.0.0  
**Last Updated**: 2024  
**Built with**: React 18.3, Vite 6.4, React Router 6.28

---

## ✅ Quick Start Checklist

1. [x] Install dependencies: `npm install`
2. [x] Start dev server: `npm run dev`
3. [ ] Navigate to `http://localhost:3002/admin/login`
4. [ ] Login with default credentials
5. [ ] Explore the dashboard
6. [ ] Change admin password
7. [ ] Configure EmailJS for newsletter
8. [ ] Add Google Analytics ID
9. [ ] Test all features
10. [ ] Deploy to production

**Enjoy your new admin panel! 🎉**
