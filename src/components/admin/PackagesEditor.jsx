import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSave } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const PackagesEditor = () => {
  const { content, updateContent } = useSiteContent()
  const [formData, setFormData] = useState(content.packages)
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
    updateContent('packages', formData)
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
        <h2>Packages Page Content</h2>
        <p>Edit pricing packages section headers</p>
      </div>

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-section">
          <h3>Page Headers</h3>
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

export default PackagesEditor
