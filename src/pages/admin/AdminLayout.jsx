import React, { useState, useEffect } from 'react'
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaHome, FaChartLine, FaStar, FaShoppingCart, FaBlog, FaCog,
  FaSignOutAlt, FaUsers, FaEnvelope, FaBars, FaTimes
} from 'react-icons/fa'
import { authService } from '../../utils/authService'
import './AdminLayout.css'

const AdminLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user || user.role !== 'admin') {
      navigate('/admin/login')
    } else {
      setCurrentUser(user)
    }
  }, [navigate])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout()
      navigate('/admin/login')
    }
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/analytics', icon: <FaChartLine />, label: 'Analytics & Traffic' },
    { path: '/admin/reviews', icon: <FaStar />, label: 'Reviews' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { path: '/admin/projects', icon: <FaCog />, label: 'Manage Projects' },
    { path: '/admin/blog', icon: <FaBlog />, label: 'Blog Posts' },
    { path: '/admin/content', icon: <FaCog />, label: 'Site Content' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/newsletter', icon: <FaEnvelope />, label: 'Newsletter' }
  ]

  const isActive = (path) => location.pathname === path

  if (!currentUser) {
    return null
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'collapsed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <h2>E Flash</h2>
            <span>Admin Panel</span>
          </div>
          <button className="sidebar-toggle desktop-only" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {currentUser.name?.charAt(0) || 'A'}
            </div>
            <div className="user-details">
              <div className="user-name">{currentUser.name || 'Admin'}</div>
              <div className="user-role">{currentUser.role}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars />
          </button>
          <div className="topbar-title">
            <h1>{menuItems.find(item => isActive(item.path))?.label || 'Admin Panel'}</h1>
          </div>
          <div className="topbar-actions">
            <span className="welcome-text">Welcome, {currentUser.name || 'Admin'}</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
