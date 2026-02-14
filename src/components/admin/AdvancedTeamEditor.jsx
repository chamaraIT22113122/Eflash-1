import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSave, FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaImage } from 'react-icons/fa'
import { useSiteContent } from '../../context/SiteContentContext'

const AdvancedTeamEditor = () => {
  const { content, updateSection } = useSiteContent()
  const [formData, setFormData] = useState(content.about)
  const [saved, setSaved] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
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
    updateSection('about', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const openAddModal = () => {
    setModalMode('add')
    setEditingMember({
      id: Date.now(),
      name: '',
      role: '',
      image: '👤',
      bio: ''
    })
    setShowModal(true)
  }

  const openEditModal = (member) => {
    setModalMode('edit')
    setEditingMember({ ...member })
    setShowModal(true)
  }

  const handleMemberChange = (field, value) => {
    setEditingMember(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingMember(prev => ({
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
      setEditingMember(prev => ({
        ...prev,
        image: url
      }))
    }
  }

  const saveMember = () => {
    if (modalMode === 'add') {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, editingMember]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.map(member =>
          member.id === editingMember.id ? editingMember : member
        )
      }))
    }
    setShowModal(false)
    setEditingMember(null)
  }

  const deleteMember = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setFormData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter(member => member.id !== id)
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
        <h2>About Page & Team Members</h2>
        <p>Edit about section content and manage team member profiles</p>
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
              rows="4"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Company Information</h3>
          <div className="form-row">
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
        </div>

        <div className="form-section">
          <div className="section-header-with-action">
            <h3>Team Members</h3>
            <button type="button" className="btn-add" onClick={openAddModal}>
              <FaPlus /> Add Member
            </button>
          </div>

          <div className="cards-grid">
            {formData.teamMembers.map((member) => (
              <div key={member.id} className="admin-card">
                <div className="card-icon">
                  {member.image.startsWith('data:') || member.image.startsWith('http') ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      style={{ 
                        width: '120px', 
                        height: '120px', 
                        objectFit: 'cover', 
                        borderRadius: '50%',
                        margin: '0 auto'
                      }} 
                    />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>{member.image}</span>
                  )}
                </div>
                <h4>{member.name}</h4>
                <p style={{ color: '#667eea', fontWeight: '500', fontSize: '0.9rem', marginBottom: '10px' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.85rem' }}>{member.bio}</p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => openEditModal(member)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => deleteMember(member.id)}
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
        {showModal && editingMember && (
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
                <h3>{modalMode === 'add' ? 'Add Team Member' : 'Edit Team Member'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group image-upload-section">
                  <label>Profile Photo</label>
                  <div className="image-preview" style={{ borderRadius: '50%' }}>
                    {editingMember.image.startsWith('data:') || editingMember.image.startsWith('http') ? (
                      <img src={editingMember.image} alt="Preview" style={{ borderRadius: '50%' }} />
                    ) : (
                      <div className="image-preview-placeholder">{editingMember.image}</div>
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
                  <label>Name</label>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) => handleMemberChange('name', e.target.value)}
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group">
                  <label>Role/Position</label>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => handleMemberChange('role', e.target.value)}
                    placeholder="e.g., Creative Director, Lead Designer"
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    value={editingMember.bio}
                    onChange={(e) => handleMemberChange('bio', e.target.value)}
                    placeholder="Short biography or description..."
                    rows="4"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-save" onClick={saveMember}>
                  <FaSave /> Save Member
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AdvancedTeamEditor
