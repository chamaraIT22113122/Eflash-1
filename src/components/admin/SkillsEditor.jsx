import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSave, FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaImage } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const SkillsEditor = () => {
  const { content, updateSection } = useSiteContent()
  const [formData, setFormData] = useState(content.skills)
  const [saved, setSaved] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateSection('skills', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingSkill({
      id: Date.now(),
      name: '',
      icon: '🛠️'
    })
    setShowModal(true)
  }

  const openEditModal = (skill) => {
    setModalMode('edit')
    setEditingSkill({ ...skill })
    setShowModal(true)
  }

  const handleSkillChange = (field, value) => {
    setEditingSkill(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingSkill(prev => ({
          ...prev,
          icon: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrl = () => {
    const url = prompt('Enter icon URL (SVG or PNG recommended):')
    if (url) {
      setEditingSkill(prev => ({
        ...prev,
        icon: url
      }))
    }
  }

  const saveSkill = () => {
    if (modalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, editingSkill]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.id === editingSkill.id ? editingSkill : item
        )
      }))
    }
    setShowModal(false)
    setEditingSkill(null)
  }

  const deleteSkill = (id) => {
    if (window.confirm('Are you sure you want to delete this skill/tool?')) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id)
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="editor-section"
    >
      <div className="editor-header">
        <h2>Tools & Skills</h2>
        <p>Manage your tools and skills showcase</p>
      </div>

      <form onSubmit={handleSave} className="editor-form">
        <div className="form-section">
          <h3>Section Headers</h3>
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
              rows="2"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header-with-action">
            <h3>Tools & Skills</h3>
            <button type="button" className="btn-add" onClick={openAddModal}>
              <FaPlus /> Add Tool/Skill
            </button>
          </div>

          <div className="cards-grid">
            {formData.items.map((skill) => (
              <div key={skill.id} className="admin-card" style={{ textAlign: 'center' }}>
                <div className="card-icon">
                  {skill.icon.startsWith('data:') || skill.icon.startsWith('http') ? (
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'contain',
                        margin: '0 auto'
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>{skill.icon}</span>
                  )}
                </div>
                <h4>{skill.name}</h4>
                <div className="card-actions" style={{ marginTop: '15px' }}>
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => openEditModal(skill)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteSkill(skill.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            <FaSave /> Save All Changes
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

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && editingSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{modalMode === 'add' ? 'Add Tool/Skill' : 'Edit Tool/Skill'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group image-upload-section">
                  <label>Icon/Logo</label>
                  <div className="image-preview" style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                    {editingSkill.icon.startsWith('data:') || editingSkill.icon.startsWith('http') ? (
                      <img src={editingSkill.icon} alt="Preview" style={{ objectFit: 'contain' }} />
                    ) : (
                      <div className="image-preview-placeholder">{editingSkill.icon}</div>
                    )}
                  </div>
                  <div className="image-upload-options">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <FaUpload /> Upload Icon
                    </button>
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={handleImageUrl}
                    >
                      <FaImage /> Icon URL
                    </button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#718096', marginTop: '10px', textAlign: 'center' }}>
                    Tip: Use devicon.dev for popular tool icons
                  </p>
                </div>

                <div className="form-group">
                  <label>Tool/Skill Name</label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) => handleSkillChange('name', e.target.value)}
                    placeholder="e.g., Photoshop, Figma, React"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={saveSkill}>
                  <FaSave /> Save Tool/Skill
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SkillsEditor
