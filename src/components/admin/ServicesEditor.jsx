import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSave, FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const ServicesEditor = () => {
  const { content, updateSection } = useSiteContent()
  const [formData, setFormData] = useState(content.services)
  const [saved, setSaved] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    updateSection('services', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingItem({
      id: Date.now(),
      title: '',
      description: '',
      icon: '🎨',
      features: ['', '', '']
    })
    setShowModal(true)
  }

  const openEditModal = (item) => {
    setModalMode('edit')
    setEditingItem({ ...item })
    setShowModal(true)
  }

  const handleItemChange = (field, value) => {
    setEditingItem(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...editingItem.features]
    newFeatures[index] = value
    setEditingItem(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setEditingItem(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setEditingItem(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const saveItem = () => {
    if (modalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, editingItem]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.id === editingItem.id ? editingItem : item
        )
      }))
    }
    setShowModal(false)
    setEditingItem(null)
  }

  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
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
        <h2>Services Page Content</h2>
        <p>Edit services section headers and manage service cards</p>
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

        <div className="form-section">
          <div className="section-header-with-action">
            <h3>Service Cards</h3>
            <button type="button" className="btn-add" onClick={openAddModal}>
              <FaPlus /> Add Service
            </button>
          </div>

          <div className="cards-grid">
            {formData.items.map((item) => (
              <div key={item.id} className="admin-card">
                <div className="card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <ul className="card-features">
                  {item.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => openEditModal(item)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteItem(item.id)}
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
        {showModal && editingItem && (
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
                <h3>{modalMode === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Icon (Emoji)</label>
                  <input
                    type="text"
                    value={editingItem.icon}
                    onChange={(e) => handleItemChange('icon', e.target.value)}
                    placeholder="🎨"
                  />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => handleItemChange('title', e.target.value)}
                    placeholder="Service Name"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => handleItemChange('description', e.target.value)}
                    placeholder="Service description..."
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Features</label>
                  {editingItem.features.map((feature, idx) => (
                    <div key={idx} className="feature-input-row">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature ${idx + 1}`}
                      />
                      {editingItem.features.length > 1 && (
                        <button
                          type="button"
                          className="btn-icon-delete"
                          onClick={() => removeFeature(idx)}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn-add-feature" onClick={addFeature}>
                    <FaPlus /> Add Feature
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={saveItem}>
                  <FaSave /> Save Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ServicesEditor