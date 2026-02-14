import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { getTotalItems } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

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
    { path: '/', label: 'Home', type: 'route', keywords: ['home', 'main', 'landing', 'start'] },
    { path: '/about', label: 'About', type: 'route', keywords: ['about', 'team', 'company', 'who we are'] },
    { path: '/services', label: 'Services', type: 'route', keywords: ['services', 'what we do', 'offerings', 'design', 'development'] },
    { path: '/portfolio', label: 'Portfolio', type: 'route', keywords: ['portfolio', 'work', 'projects', 'gallery', 'showcase'] },
    { path: '/packages', label: 'Packages', type: 'route', keywords: ['packages', 'pricing', 'plans', 'offers'] },
    { path: '/shop', label: 'Shop', type: 'route', keywords: ['shop', 'store', 'products', 'buy'] },
    { path: '/contact', label: 'Contact', type: 'route', keywords: ['contact', 'get in touch', 'reach us', 'email', 'phone'] }
  ]

  const searchResults = navLinks.filter(link => {
    const query = searchQuery.toLowerCase()
    return query && (
      link.label.toLowerCase().includes(query) ||
      link.keywords.some(keyword => keyword.includes(query))
    )
  })

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setShowSearchResults(e.target.value.length > 0)
  }

  const handleSearchSelect = (path) => {
    navigate(path)
    setSearchQuery('')
    setShowSearchResults(false)
    closeMenu()
  }

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img 
              src="/assets/images/logo1.png" 
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
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                onBlur={handleSearchBlur}
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSearchSelect(result.path)}
                    >
                      <span>{result.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
