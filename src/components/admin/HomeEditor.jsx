import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const HomeEditor = () => {
  const { content, updateContent } = useSiteContent()
  const [formData, setFormData] = useState(content.home)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateContent('home', formData)
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
        <h2>Home Page Content</h2>
        <p>Edit hero section and stats for the home page</p>
      </div>

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-section">
          <h3>Hero Section</h3>
          <div className="form-group">
            <label>Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Hero Subtitle</label>
            <input
              type="text"
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Hero Description</label>
            <textarea
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Primary CTA Text</label>
              <input
                type="text"
                name="heroCTA1"
                value={formData.heroCTA1}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Secondary CTA Text</label>
              <input
                type="text"
                name="heroCTA2"
                value={formData.heroCTA2}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Statistics Section</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Clients</label>
              <input
                type="text"
                name="statsClients"
                value={formData.statsClients}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Projects</label>
              <input
                type="text"
                name="statsProjects"
                value={formData.statsProjects}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Years</label>
              <input
                type="text"
                name="statsYears"
                value={formData.statsYears}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="text"
                name="statsRating"
                value={formData.statsRating}
                onChange={handleChange}
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

export default HomeEditor
