import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage } from 'react-icons/fa'
import projectService from '../../utils/projectService'
import './ManageProjects.css'
import './AdminBase.css'

const ManageProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load projects from MongoDB on component mount
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')
      const allProjects = await projectService.getAllProjects()
      setProjects(allProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
      setError('Failed to load projects. Using offline mode.')
      // Fallback to localStorage if API fails
      const fallbackProjects = projectService.getFallbackProjects()
      setProjects(fallbackProjects)
    } finally {
      setLoading(false)
    }
  }
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const emptyProject = {
    title: '',
    description: '',
    category: 'Web Design',
    tags: [],
    technologies: [],
    liveUrl: '',
    thumbnail: '',
    images: [],
    features: [],
    // Card display fields
    clientName: '',
    projectDate: '',
    duration: '',
    // Popup detail fields
    challenge: '',
    solution: '',
    result: '',
    stats: {
      users: '',
      pages: '',
      performance: '',
      completion: ''
    }
  }
  const [newProject, setNewProject] = useState(emptyProject)

  const techOptions = ['React', 'Vue', 'Angular', 'WordPress', 'Shopify', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Python', 'Tailwind', 'Bootstrap', 'MongoDB', 'MySQL', 'Firebase']

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) return

    try {
      setLoading(true)
      setError('')
      
      const projectData = {
        ...newProject,
        tags: newProject.tags.filter(tag => tag.trim()),
        technologies: newProject.technologies.filter(tech => tech.trim()),
        features: newProject.features.filter(feature => feature.trim()),
        thumbnail: newProject.thumbnail || newProject.images?.[0] || ''
      }

      const savedProject = await projectService.addProject(projectData)
      await loadProjects() // Reload all projects from database
      
      setNewProject(emptyProject)
      setIsAddingNew(false)
    } catch (error) {
      console.error('Error adding project:', error)
      setError('Failed to add project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProject = (project) => {
    setEditingProject({ ...project })
  }

  const handleSaveEdit = async () => {
    if (!editingProject) return
    
    try {
      setLoading(true)
      setError('')
      
      const projectId = editingProject._id || editingProject.id
      const updateData = {
        ...editingProject,
        thumbnail: editingProject.thumbnail || editingProject.images?.[0] || ''
      }
      await projectService.updateProject(projectId, updateData)
      await loadProjects() // Reload all projects from database
      
      setEditingProject(null)
    } catch (error) {
      console.error('Error updating project:', error)
      setError('Failed to update project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        setLoading(true)
        setError('')
        
        await projectService.deleteProject(id)
        await loadProjects() // Reload all projects from database
      } catch (error) {
        console.error('Error deleting project:', error)
        setError('Failed to delete project. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleImageUpload = (e, isEdit = false) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEdit) {
          setEditingProject(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }))
        } else {
          setNewProject(prev => ({
            ...prev,
            images: [...prev.images, reader.result]
          }))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const addTag = (tag, isEdit = false) => {
    if (!tag.trim()) return
    if (isEdit) {
      if (!editingProject.tags.includes(tag)) {
        setEditingProject(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }))
      }
    } else {
      if (!newProject.tags.includes(tag)) {
        setNewProject(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }))
      }
    }
  }

  const addFeature = (isEdit = false) => {
    if (isEdit) {
      setEditingProject(prev => ({ ...prev, features: [...(prev.features || []), ''] }))
    } else {
      setNewProject(prev => ({ ...prev, features: [...(prev.features || []), ''] }))
    }
  }

  const updateFeature = (index, value, isEdit = false) => {
    if (isEdit) {
      setEditingProject(prev => {
        const features = [...(prev.features || [])]
        features[index] = value
        return { ...prev, features }
      })
    } else {
      setNewProject(prev => {
        const features = [...(prev.features || [])]
        features[index] = value
        return { ...prev, features }
      })
    }
  }

  const removeFeature = (index, isEdit = false) => {
    if (isEdit) {
      setEditingProject(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
    } else {
      setNewProject(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
    }
  }

  const removeTag = (tag, isEdit = false) => {
    if (isEdit) {
      setEditingProject(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    } else {
      setNewProject(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
    }
  }

  const [tagInput, setTagInput] = useState('')
  const [editTagInput, setEditTagInput] = useState('')

  // Reusable form fields renderer
  const renderFormFields = (data, setter, isEdit = false) => (
    <>
      {/* ── CARD INFO SECTION ── */}
      <div className="form-section-title">Card Information (shown on portfolio grid)</div>

      <div className="form-grid">
        <div className="form-group">
          <label>Project Title *</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setter({ ...data, title: e.target.value })}
            placeholder="Enter project title"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={data.category || ''}
            onChange={(e) => setter({ ...data, category: e.target.value })}
            placeholder="e.g. Branding, Web Design, UI/UX…"
          />
        </div>

        <div className="form-group">
          <label>Client Name</label>
          <input
            type="text"
            value={data.clientName || ''}
            onChange={(e) => setter(prev => ({ ...prev, clientName: e.target.value }))}
            placeholder="e.g. Acme Corp"
          />
        </div>

        <div className="form-group">
          <label>Project Date</label>
          <input
            type="month"
            value={data.projectDate || ''}
            onChange={(e) => setter(prev => ({ ...prev, projectDate: e.target.value }))}
          />
        </div>

        <div className="form-group full-width">
          <label>Short Description * (shown on card)</label>
          <textarea
            value={data.description}
            onChange={(e) => setter(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Brief description shown on the portfolio card"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Live URL (optional)</label>
          <input
            type="url"
            value={data.liveUrl || ''}
            onChange={(e) => setter(prev => ({ ...prev, liveUrl: e.target.value }))}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            value={data.duration || ''}
            onChange={(e) => setter(prev => ({ ...prev, duration: e.target.value }))}
            placeholder="e.g. 4 weeks"
          />
        </div>

        {/* Tags */}
        <div className="form-group full-width">
          <label>Card Tags</label>
          <div className="tag-input-row">
            <input
              type="text"
              value={isEdit ? editTagInput : tagInput}
              onChange={(e) => isEdit ? setEditTagInput(e.target.value) : setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault()
                  const val = isEdit ? editTagInput : tagInput
                  addTag(val, isEdit)
                  isEdit ? setEditTagInput('') : setTagInput('')
                }
              }}
              placeholder="Type tag and press Enter"
            />
            <button type="button" className="btn-add-tag" onClick={() => {
              const val = isEdit ? editTagInput : tagInput
              addTag(val, isEdit)
              isEdit ? setEditTagInput('') : setTagInput('')
            }}>Add</button>
          </div>
          <div className="tags-list">
            {(data.tags || []).map(tag => (
              <span key={tag} className="tag-chip">
                {tag}
                <button type="button" onClick={() => removeTag(tag, isEdit)}><FaTimes /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="form-group full-width">
          <label>Project Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e, isEdit)}
          />
          {(data.images || []).length > 0 && (
            <div className="image-preview-grid">
              {(data.images || []).map((img, idx) => (
                <div key={idx} className="image-preview-item">
                  <img src={img} alt={`Preview ${idx}`} />
                  <button type="button" className="remove-img-btn" onClick={() => {
                    setter(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
                  }}><FaTimes /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── POPUP DETAIL SECTION ── */}
      <div className="form-section-title popup-section-title">Popup Details (shown when "View Details" is clicked)</div>

      <div className="form-grid">
        {/* Technologies */}
        <div className="form-group full-width">
          <label>Technologies Used</label>
          <div className="tech-selector">
            {techOptions.map(tech => (
              <button
                key={tech}
                type="button"
                className={`tech-option ${(data.technologies || []).includes(tech) ? 'selected' : ''}`}
                onClick={() => {
                  const current = data.technologies || []
                  setter({
                    ...data,
                    technologies: current.includes(tech)
                      ? current.filter(t => t !== tech)
                      : [...current, tech]
                  })
                }}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Challenge</label>
          <textarea
            value={data.challenge || ''}
            onChange={(e) => setter(prev => ({ ...prev, challenge: e.target.value }))}
            placeholder="What was the challenge or problem this project solved?"
            rows={3}
          />
        </div>

        <div className="form-group full-width">
          <label>Solution</label>
          <textarea
            value={data.solution || ''}
            onChange={(e) => setter(prev => ({ ...prev, solution: e.target.value }))}
            placeholder="How did you solve it? What approach was taken?"
            rows={3}
          />
        </div>

        <div className="form-group full-width">
          <label>Result</label>
          <textarea
            value={data.result || ''}
            onChange={(e) => setter(prev => ({ ...prev, result: e.target.value }))}
            placeholder="What were the outcomes or measurable results?"
            rows={3}
          />
        </div>

        {/* Key Features list */}
        <div className="form-group full-width">
          <label>Key Features / Deliverables</label>
          {(data.features || []).map((feature, idx) => (
            <div key={idx} className="feature-input-row">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(idx, e.target.value, isEdit)}
                placeholder={`Feature ${idx + 1}`}
              />
              <button type="button" className="btn-remove-feature" onClick={() => removeFeature(idx, isEdit)}>
                <FaTimes />
              </button>
            </div>
          ))}
          <button type="button" className="btn-add-feature" onClick={() => addFeature(isEdit)}>
            <FaPlus /> Add Feature
          </button>
        </div>

        {/* Stats */}
        <div className="form-group">
          <label>Stat: Users / Reach</label>
          <input
            type="text"
            value={data.stats?.users || ''}
            onChange={(e) => setter(prev => ({ ...prev, stats: { ...prev.stats, users: e.target.value } }))}
            placeholder="e.g. 500+ users"
          />
        </div>
        <div className="form-group">
          <label>Stat: Pages / Screens</label>
          <input
            type="text"
            value={data.stats?.pages || ''}
            onChange={(e) => setter(prev => ({ ...prev, stats: { ...prev.stats, pages: e.target.value } }))}
            placeholder="e.g. 12 pages"
          />
        </div>
        <div className="form-group">
          <label>Stat: Performance Score</label>
          <input
            type="text"
            value={data.stats?.performance || ''}
            onChange={(e) => setter(prev => ({ ...prev, stats: { ...prev.stats, performance: e.target.value } }))}
            placeholder="e.g. 98/100"
          />
        </div>
        <div className="form-group">
          <label>Stat: Completion / ROI</label>
          <input
            type="text"
            value={data.stats?.completion || ''}
            onChange={(e) => setter(prev => ({ ...prev, stats: { ...prev.stats, completion: e.target.value } }))}
            placeholder="e.g. On time"
          />
        </div>
      </div>
    </>
  )

  return (
    <div className="manage-projects admin-page admin-content">
      <div className="projects-header">
        <h1>Manage Projects</h1>
        {!isAddingNew && (
          <button 
            className="add-project-btn"
            onClick={() => setIsAddingNew(true)}
          >
            <FaPlus />
            Add New Project
          </button>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}
      {loading && <div className="loading-banner">Saving...</div>}

      {/* Add New Project Form */}
      {isAddingNew && (
        <motion.div 
          className="project-form-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Add New Project</h3>
          {renderFormFields(newProject, setNewProject, false)}
          <div className="form-actions">
            <button onClick={() => setIsAddingNew(false)} className="btn-cancel">
              <FaTimes /> Cancel
            </button>
            <button onClick={handleAddProject} className="btn-save" disabled={loading}>
              <FaSave /> Add Project
            </button>
          </div>
        </motion.div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <motion.div
          className="project-form-card edit-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="edit-modal-inner">
            <h3>Edit Project: {editingProject.title}</h3>
            {renderFormFields(editingProject, setEditingProject, true)}
            <div className="form-actions">
              <button onClick={() => setEditingProject(null)} className="btn-cancel">
                <FaTimes /> Cancel
              </button>
              <button onClick={handleSaveEdit} className="btn-save" disabled={loading}>
                <FaSave /> Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      {!isAddingNew && !editingProject && (
        <div className="projects-grid">
          {projects.map(project => (
            <motion.div
              key={project._id || project.id}
              className="project-card"
              layout
            >
              <div className="project-thumbnail">
                {(project.images?.[0] || project.thumbnail) ? (
                  <img src={project.images?.[0] || project.thumbnail} alt={project.title} />
                ) : (
                  <div className="no-image">
                    <FaImage />
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-category">{project.category}</p>
                {project.clientName && <p className="project-client">Client: {project.clientName}</p>}
                <p className="project-description">{project.description}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="tech-tags">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="tech-more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                )}

                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="live-link">
                    View Live Site
                  </a>
                )}
              </div>
              <div className="project-actions">
                <button onClick={() => handleEditProject(project)} className="btn-edit" title="Edit">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteProject(project._id || project.id)} className="btn-delete" title="Delete">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length === 0 && !isAddingNew && !loading && (
        <div className="no-projects">
          <FaImage size={48} />
          <h3>No projects yet</h3>
          <p>Click "Add New Project" to add your first project</p>
        </div>
      )}
    </div>
  )
}

export default ManageProjects