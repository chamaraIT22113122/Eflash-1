import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  const handleScroll = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      closeMenu()
    }
  }

  const navLinks = [
    { path: '/', label: 'Home', type: 'route' },
    { path: '/about', label: 'About', type: 'route' },
    { path: '/services', label: 'Services', type: 'route' },
    { path: '/portfolio', label: 'Portfolio', type: 'route' },
    { path: '/packages', label: 'Packages', type: 'route' },
    { path: '/shop', label: 'Shop', type: 'route' },
    { path: '/contact', label: 'Contact', type: 'route' }
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img 
              src={darkMode ? "/assets/images/logo1.png" : "/assets/images/logo.png"} 
              alt="E Flash Logo" 
              className="logo-img" 
            />
          </Link>

          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link, index) => (
              <li key={index}>
                {link.type === 'route' ? (
                  <Link
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScroll(link.id)
                    }}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className="menu-toggle" onClick={toggleMenu}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
