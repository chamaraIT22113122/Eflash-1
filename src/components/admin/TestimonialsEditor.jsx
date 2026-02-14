import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSave, FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaImage, FaStar } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const TestimonialsEditor = () => {
  const { content, updateSection } = useSiteContent()
  const [formData, setFormData] = useState(content.testimonials)
  const [saved, setSaved] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
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
    updateSection('testimonials', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingTestimonial({
      id: Date.now(),
      name: '',
      position: '',
      image: '👤',
      rating: 5,
      text: ''
    })
    setShowModal(true)
  }

  const openEditModal = (testimonial) => {
    setModalMode('edit')
    setEditingTestimonial({ ...testimonial })
    setShowModal(true)
  }

  const handleTestimonialChange = (field, value) => {
    setEditingTestimonial(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingTestimonial(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrl = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setEditingTestimonial(prev => ({
        ...prev,
        image: url
      }))
    }
  }

  const saveTestimonial = () => {
    if (modalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, editingTestimonial]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item.id === editingTestimonial.id ? editingTestimonial : item
        )
      }))
    }
    setShowModal(false)
    setEditingTestimonial(null)
  }

  const deleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
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
        <h2>Client Testimonials</h2>
        <p>Manage customer reviews and testimonials</p>
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
            <h3>Testimonials</h3>
            <button type="button" className="btn-add" onClick={openAddModal}>
              <FaPlus /> Add Testimonial
            </button>
          </div>

          <div className="cards-grid">
            {formData.items.map((testimonial) => (
              <div key={testimonial.id} className="admin-card">
                <div className="card-icon">
                  {testimonial.image.startsWith('data:') || testimonial.image.startsWith('http') ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '50%',
                        margin: '0 auto'
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '3rem' }}>{testimonial.image}</span>
                  )}
                </div>
                <h4>{testimonial.name}</h4>
                <p style={{ color: '#667eea', fontWeight: '500', fontSize: '0.85rem' }}>
                  {testimonial.position}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <FaStar key={idx} style={{ color: '#ffc107', fontSize: '0.9rem' }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                  "{testimonial.text.substring(0, 100)}..."
                </p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => openEditModal(testimonial)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteTestimonial(testimonial.id)}
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
        {showModal && editingTestimonial && (
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
                <h3>{modalMode === 'add' ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group image-upload-section">
                  <label>Client Photo</label>
                  <div className="image-preview" style={{ borderRadius: '50%', width: '150px', height: '150px', margin: '0 auto' }}>
                    {editingTestimonial.image.startsWith('data:') || editingTestimonial.image.startsWith('http') ? (
                      <img src={editingTestimonial.image} alt="Preview" style={{ borderRadius: '50%' }} />
                    ) : (
                      <div className="image-preview-placeholder">{editingTestimonial.image}</div>
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
                      <FaUpload /> Upload Photo
                    </button>
                    <button
                      type="button"
                      className="btn-upload"
                      onClick={handleImageUrl}
                    >
                      <FaImage /> Image URL
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.name}
                    onChange={(e) => handleTestimonialChange('name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Position/Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.position}
                    onChange={(e) => handleTestimonialChange('position', e.target.value)}
                    placeholder="CEO, Company Name"
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={(e) => handleTestimonialChange('rating', parseInt(e.target.value))}
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Testimonial Text</label>
                  <textarea
                    value={editingTestimonial.text}
                    onChange={(e) => handleTestimonialChange('text', e.target.value)}
                    placeholder="Write the testimonial..."
                    rows="5"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={saveTestimonial}>
                  <FaSave /> Save Testimonial
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TestimonialsEditor
