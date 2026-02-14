import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSave, FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaImage } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const AdvancedPortfolioEditor = () => {
  const { content, updateSection } = useSiteContent()
  const [formData, setFormData] = useState(content.portfolio)
  const [saved, setSaved] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [newTag, setNewTag] = useState('')
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
    updateSection('portfolio', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingProject({
      id: Date.now(),
      title: '',
      category: '',
      description: '',
      image: '🖼️',
      tags: []
    })
    setShowModal(true)
  }

  const openEditModal = (project) => {
    setModalMode('edit')
    setEditingProject({ ...project })
    setShowModal(true)
  }

  const handleProjectChange = (field, value) => {
    setEditingProject(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editingProject.tags.includes(newTag.trim())) {
      setEditingProject(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setEditingProject(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingProject(prev => ({
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
      setEditingProject(prev => ({
        ...prev,
        image: url
      }))
    }
  }

  const saveProject = () => {
    if (modalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, editingProject]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.map(project =>
          project.id === editingProject.id ? editingProject : project
        )
      }))
    }
    setShowModal(false)
    setEditingProject(null)
  }

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setFormData(prev => ({
        ...prev,
        projects: prev.projects.filter(project => project.id !== id)
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
        <h2>Portfolio Page Content</h2>
        <p>Edit portfolio section and manage project cards with images</p>
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
            <h3>Portfolio Projects</h3>
            <button type="button" className="btn-add" onClick={openAddModal}>
              <FaPlus /> Add Project
            </button>
          </div>

          <div className="cards-grid">
            {formData.projects.map((project) => (
              <div key={project.id} className="admin-card">
                <div className="card-icon">
                  {project.image.startsWith('data:') || project.image.startsWith('http') ? (
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>{project.image}</span>
                  )}
                </div>
                <h4>{project.title}</h4>
                <p style={{ color: '#667eea', fontWeight: '500', fontSize: '0.85rem' }}>{project.category}</p>
                <p>{project.description}</p>
                <div className="tags-container">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag-item" style={{ background: '#e2e8f0', color: '#2d3748', padding: '4px 10px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => openEditModal(project)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteProject(project.id)}
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
        {showModal && editingProject && (
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
                <h3>{modalMode === 'add' ? 'Add New Project' : 'Edit Project'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group image-upload-section">
                  <label>Project Image</label>
                  <div className="image-preview">
                    {editingProject.image.startsWith('data:') || editingProject.image.startsWith('http') ? (
                      <img src={editingProject.image} alt="Preview" />
                    ) : (
                      <div className="image-preview-placeholder">{editingProject.image}</div>
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
                      <FaUpload /> Upload Image
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
                  <label>Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => handleProjectChange('title', e.target.value)}
                    placeholder="Project Name"
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => handleProjectChange('category', e.target.value)}
                    placeholder="e.g., Web Design, Branding, UI/UX"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => handleProjectChange('description', e.target.value)}
                    placeholder="Project description..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Tags</label>
                  <div className="tags-container">
                    {editingProject.tags.map((tag, idx) => (
                      <span key={idx} className="tag-item">
                        {tag}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="tag-input-row">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      className="btn-add-tag"
                      onClick={handleAddTag}
                    >
                      <FaPlus /> Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={saveProject}>
                  <FaSave /> Save Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AdvancedPortfolioEditor
