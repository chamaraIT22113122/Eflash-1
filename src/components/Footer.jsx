import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img 
                src="/assets/images/logo1.png" 
                alt="E Flash Logo" 
              />
            </div>
            <p className="footer-desc">
              Your trusted partner for creative design solutions, web development, and digital innovation.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Graphic Design</Link></li>
              <li><Link to="/services">Web Design</Link></li>
              <li><Link to="/services">Web Development</Link></li>
              <li><Link to="/services">UI/UX Design</Link></li>
              <li><Link to="/services">Digital Marketing</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>
                <FaPhone />
                <span>+94 76 487 6464</span>
              </li>
              <li>
                <FaWhatsapp />
                <span>+94 76 487 6464</span>
              </li>
              <li>
                <FaEnvelope />
                <span>info@eflash24.tech</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} E Flash. All rights reserved.</p>
          <p>Designed & Developed by E Flash</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
