import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const AboutEditor = () => {
  const { content, updateContent } = useSiteContent()
  const [formData, setFormData] = useState(content.about)
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
    updateContent('about', formData)
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
        <h2>About Page Content</h2>
        <p>Edit about us information, mission, and vision</p>
      </div>

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-section">
          <h3>Main Content</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Mission & Vision</h3>
          <div className="form-group">
            <label>Mission</label>
            <textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Vision</label>
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              rows="3"
            />
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

export default AboutEditor
