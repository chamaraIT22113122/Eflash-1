import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHome, FaInfoCircle, FaCog, FaBoxOpen, FaImage, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, FaDownload, FaUpload, FaUndo, FaQuoteLeft, FaTools } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { useSiteContent } from '../context/SiteContentContext'
import GeneralSettings from '../components/admin/GeneralSettings'
import HomeEditor from '../components/admin/HomeEditor'
import AdvancedTeamEditor from '../components/admin/AdvancedTeamEditor'
import ServicesEditor from '../components/admin/ServicesEditor'
import AdvancedPortfolioEditor from '../components/admin/AdvancedPortfolioEditor'
import PackagesEditor from '../components/admin/PackagesEditor'
import ContactEditor from '../components/admin/ContactEditor'
import TestimonialsEditor from '../components/admin/TestimonialsEditor'
import SkillsEditor from '../components/admin/SkillsEditor'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout, adminUser } = useAdmin()
  const { exportContent, resetContent } = useSiteContent()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const handleExport = () => {
    exportContent()
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      resetContent()
      alert('Content reset successfully!')
    }
  }

  const menuItems = [
    { id: 'general', name: 'General Settings', icon: <FaCog /> },
    { id: 'home', name: 'Home Page', icon: <FaHome /> },
    { id: 'about', name: 'About & Team', icon: <FaInfoCircle /> },
    { id: 'services', name: 'Services', icon: <FaCog /> },
    { id: 'portfolio', name: 'Portfolio', icon: <FaImage /> },
    { id: 'packages', name: 'Packages', icon: <FaBoxOpen /> },
    { id: 'testimonials', name: 'Testimonials', icon: <FaQuoteLeft /> },
    { id: 'skills', name: 'Tools & Skills', icon: <FaTools /> },
    { id: 'contact', name: 'Contact', icon: <FaEnvelope /> }
  ]

  const renderEditor = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />
      case 'home':
        return <HomeEditor />
      case 'about':
        return <AdvancedTeamEditor />
      case 'services':
        return <ServicesEditor />
      case 'portfolio':
        return <AdvancedPortfolioEditor />
      case 'packages':
        return <PackagesEditor />
      case 'testimonials':
        return <TestimonialsEditor />
      case 'skills':
        return <SkillsEditor />
      case 'contact':
        return <ContactEditor />
      default:
        return <GeneralSettings />
    }
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>E Flash Admin</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="admin-user-info">
          <div className="user-avatar">
            {adminUser?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <h4>{adminUser?.username}</h4>
            <p>{adminUser?.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-actions">
          <button className="action-btn" onClick={handleExport}>
            <FaDownload /> Export Data
          </button>
          <button className="action-btn danger" onClick={handleReset}>
            <FaUndo /> Reset All
          </button>
          <button className="action-btn logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="content-header">
          <button className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h1>{menuItems.find(item => item.id === activeSection)?.name}</h1>
        </div>

        <div className="content-body">
          {renderEditor()}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
