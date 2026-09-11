import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { content } = useSiteContent()
  
  const general = content.general || {}
  const footerData = content.footer || {}
  const social = general.socialMedia || {}

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Link to="/">
                <img 
                  src="/assets/images/logo1.png" 
                  alt={general.siteName || 'E Flash'} 
                  className="footer-logo-img" 
                  style={{ maxHeight: '60px', objectFit: 'contain' }}
                />
              </Link>
            </div>
            <p className="footer-desc">
              {general.tagline || 'Your trusted partner for creative design solutions, web development, and digital innovation.'}
            </p>
            <div className="social-links">
              {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>}
              {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
              {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
              {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
              {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>}
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
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our Focus</h4>
            <ul>
              <li><Link to="/portfolio?cat=Graphic Design">Graphic Design</Link></li>
              <li><Link to="/portfolio?cat=Web Development">Web Development</Link></li>
              <li><Link to="/portfolio?cat=Web Designing">Web Designing</Link></li>
              <li><Link to="/packages">Our Packages</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              {general.phone && (
                <li><FaPhone /><span>{general.phone}</span></li>
              )}
              {general.whatsapp && (
                <li><FaWhatsapp /><span>+{general.whatsapp}</span></li>
              )}
              {general.email && (
                <li><FaEnvelope /><span>{general.email}</span></li>
              )}
              {general.address && (
                <li><FaMapMarkerAlt /><span>{general.address}</span></li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {footerData.copyrightText || `${general.siteName || 'E Flash'}. All rights reserved.`}</p>
          <p>Powered by Next-Gen Digital Solutions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
