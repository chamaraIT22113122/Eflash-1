import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import SearchBar from './SearchBar'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()
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
              src="assets/images/logo1.png" 
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
            <SearchBar />
            <Link to="/cart" className="cart-icon-link" title="Shopping Cart">
              <FaShoppingCart className="cart-icon" />
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
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
