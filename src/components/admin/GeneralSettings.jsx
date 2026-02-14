import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const GeneralSettings = () => {
  const { content, updateContent } = useSiteContent()
  const [formData, setFormData] = useState(content.general)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value
      }
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateContent('general', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="editor-section"
    >
      <div className="editor-header">
        <h2>General Website Settings</h2>
        <p>Configure your site's basic information and contact details</p>
      </div>

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="94702481691"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Social Media Links</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData.socialMedia.facebook}
                onChange={handleSocialChange}
              />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData.socialMedia.instagram}
                onChange={handleSocialChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                name="twitter"
                value={formData.socialMedia.twitter}
                onChange={handleSocialChange}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.socialMedia.linkedin}
                onChange={handleSocialChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            <FaSave /> Save Changes
          </button>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="save-indicator"
            >
              ✓ Saved successfully!
            </motion.span>
          )}
        </div>
      </form>
    </motion.div>
  )
}

export default GeneralSettings
