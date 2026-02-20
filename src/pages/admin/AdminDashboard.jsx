import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaEye, FaUsers, FaShoppingCart, FaStar, FaArrowUp, FaArrowDown,
  FaBlog, FaEnvelope, FaChartLine
} from 'react-icons/fa'
import { getAnalyticsSummary, getDetailedAnalytics } from '../../utils/analyticsTracking'
import { reviewService } from '../../utils/reviewService'
import { orderService } from '../../utils/orderService'
import { blogService } from '../../utils/blogService'
import './AdminDashboard.css'
import './AdminBase.css'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    analytics: null,
    orders: { total: 0, pending: 0, revenue: 0 },
    reviews: { total: 0, pending: 0, avgRating: 0 },
    blog: { total: 0, published: 0, drafts: 0 }
  })

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = () => {
    // Analytics
    const analyticsSummary = getAnalyticsSummary()
    const analyticsDetails = getDetailedAnalytics()

    // Orders
    const allOrders = orderService.getAllOrders()
    const pendingOrders = allOrders.filter(o => o.status === 'pending')
    const totalRevenue = allOrders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0)

    // Reviews
    const allReviews = reviewService.getAllReviews()
    const pendingReviews = reviewService.getPendingReviews()
    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0

    // Blog
    const allPosts = blogService.getAllPosts()
    const publishedPosts = allPosts.filter(p => p.status === 'published')
    const draftPosts = allPosts.filter(p => p.status === 'draft')

    setStats({
      analytics: analyticsSummary,
      analyticsDetails,
      orders: {
        total: allOrders.length,
        pending: pendingOrders.length,
        revenue: totalRevenue
      },
      reviews: {
        total: allReviews.length,
        pending: pendingReviews.length,
        avgRating: avgRating.toFixed(1)
      },
      blog: {
        total: allPosts.length,
        published: publishedPosts.length,
        drafts: draftPosts.length
      }
    })
  }

  const StatCard = ({ icon, title, value, change, color, link }) => (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <Link to={link} className="stat-card-link">
        <div className="stat-icon" style={{ background: color }}>
          {icon}
        </div>
        <div className="stat-content">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{value}</div>
          {change && (
            <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
              {change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )

  const getRecentPageViews = () => {
    if (!stats.analyticsDetails?.pageViews) return []
    return stats.analyticsDetails.pageViews.slice(-5).reverse()
  }

  return (
    <div className="admin-dashboard admin-page admin-content">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's what's happening with your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<FaEye />}
          title="Page Views"
          value={stats.analytics?.totalPageViews.toLocaleString() || '0'}
          color="linear-gradient(135deg, #667eea, #764ba2)"
          link="/admin/analytics"
        />
        <StatCard
          icon={<FaUsers />}
          title="Unique Visitors"
          value={stats.analytics?.uniqueVisitors.toLocaleString() || '0'}
          color="linear-gradient(135deg, #f093fb, #f5576c)"
          link="/admin/analytics"
        />
        <StatCard
          icon={<FaShoppingCart />}
          title="Total Orders"
          value={stats.orders.total}
          color="linear-gradient(135deg, #4facfe, #00f2fe)"
          link="/admin/orders"
        />
        <StatCard
          icon={<FaStar />}
          title="Avg Rating"
          value={`${stats.reviews.avgRating} ⭐`}
          color="linear-gradient(135deg, #43e97b, #38f9d7)"
          link="/admin/reviews"
        />
      </div>

      {/* Quick Stats Row */}
      <div className="quick-stats">
        <div className="quick-stat-item">
          <div className="quick-stat-label">Pending Orders</div>
          <div className="quick-stat-value">{stats.orders.pending}</div>
        </div>
        <div className="quick-stat-item">
          <div className="quick-stat-label">Pending Reviews</div>
          <div className="quick-stat-value">{stats.reviews.pending}</div>
        </div>
        <div className="quick-stat-item">
          <div className="quick-stat-label">Published Posts</div>
          <div className="quick-stat-value">{stats.blog.published}</div>
        </div>
        <div className="quick-stat-item">
          <div className="quick-stat-label">Draft Posts</div>
          <div className="quick-stat-value">{stats.blog.drafts}</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Traffic */}
        <motion.div 
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header">
            <h3><FaChartLine /> Recent Traffic</h3>
            <Link to="/admin/analytics" className="view-all-link">View All</Link>
          </div>
          <div className="recent-traffic-list">
            {getRecentPageViews().length > 0 ? (
              getRecentPageViews().map((view, index) => (
                <div key={index} className="traffic-item">
                  <div className="traffic-info">
                    <div className="traffic-page">{view.path === '/' ? 'Home' : view.path}</div>
                    <div className="traffic-meta">
                      {view.device} • {view.browser} • {new Date(view.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="traffic-source">{view.source}</div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No traffic data yet</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-links">
            <Link to="/admin/blog" className="quick-link-btn">
              <FaBlog />
              <span>Create Blog Post</span>
            </Link>
            <Link to="/admin/reviews" className="quick-link-btn">
              <FaStar />
              <span>Moderate Reviews</span>
            </Link>
            <Link to="/admin/orders" className="quick-link-btn">
              <FaShoppingCart />
              <span>View Orders</span>
            </Link>
            <Link to="/admin/newsletter" className="quick-link-btn">
              <FaEnvelope />
              <span>Send Newsletter</span>
            </Link>
          </div>
        </motion.div>

        {/* Website Stats */}
        <motion.div 
          className="dashboard-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Website Statistics</h3>
          </div>
          <div className="website-stats-grid">
            {stats.analytics && (
              <>
                <div className="website-stat">
                  <div className="stat-label">Total Sessions</div>
                  <div className="stat-number">{stats.analytics.totalSessions}</div>
                </div>
                <div className="website-stat">
                  <div className="stat-label">Bounce Rate</div>
                  <div className="stat-number">{stats.analytics.bounceRate.toFixed(1)}%</div>
                </div>
                <div className="website-stat">
                  <div className="stat-label">Avg. Session Time</div>
                  <div className="stat-number">{Math.round(stats.analytics.avgSessionDuration / 1000 / 60)}m</div>
                </div>
                <div className="website-stat">
                  <div className="stat-label">Total Events</div>
                  <div className="stat-number">{stats.analytics.totalEvents}</div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
