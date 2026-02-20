import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaImage } from 'react-icons/fa'
import './ManageProjects.css'
import './AdminBase.css'

// Project service for localStorage management
const projectService = {
  getAll: () => {
    const projects = localStorage.getItem('eflash_admin_projects')
    return projects ? JSON.parse(projects) : []
  },
  save: (projects) => {
    localStorage.setItem('eflash_admin_projects', JSON.stringify(projects))
  },
  add: (project) => {
    const projects = projectService.getAll()
    const newProject = { ...project, id: Date.now() }
    projects.push(newProject)
    projectService.save(projects)
    return newProject
  },
  update: (id, updatedProject) => {
    const projects = projectService.getAll()
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      projects[index] = { ...updatedProject, id }
      projectService.save(projects)
    }
    return updatedProject
  },
  delete: (id) => {
    const projects = projectService.getAll().filter(p => p.id !== id)
    projectService.save(projects)
  }
}

const ManageProjects = () => {
  const [projects, setProjects] = useState([])

  // Load projects from localStorage on component mount
  useEffect(() => {
    setProjects(projectService.getAll())
  }, [])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    tags: [],
    technologies: [],
    liveUrl: '',
    thumbnail: '',
    images: [],
    features: [],
    stats: {
      users: '',
      pages: '',
      performance: '',
      completion: ''
    }
  })

  const categories = ['Web Design', 'Branding', 'UI/UX', 'Graphic Design', 'E-Commerce']
  const techOptions = ['React', 'Vue', 'Angular', 'WordPress', 'Shopify', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Python', 'Tailwind', 'Bootstrap', 'MongoDB', 'MySQL', 'Firebase']

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return

    const projectData = {
      ...newProject,
      tags: newProject.tags.filter(tag => tag.trim()),
      technologies: newProject.technologies.filter(tech => tech.trim()),
      features: newProject.features.filter(feature => feature.trim())
    }

    const savedProject = projectService.add(projectData)
    setProjects([...projects, savedProject])
    
    // Trigger refresh event for other components
    window.dispatchEvent(new Event('adminProjectsUpdate'))
    
    setNewProject({
      title: '',
      description: '',
      category: 'Web Design',
      tags: [],
      technologies: [],
      liveUrl: '',
      thumbnail: '',
      images: [],
      features: [],
      stats: { users: '', pages: '', performance: '', completion: '' }
    })
    setIsAddingNew(false)
  }

  const handleEditProject = (project) => {
    setEditingProject({ ...project })
  }

  const handleSaveEdit = () => {
    const updatedProjects = projects.map(p => p.id === editingProject.id ? editingProject : p)
    projectService.update(editingProject.id, editingProject)
    setProjects(updatedProjects)
    setEditingProject(null)
    
    // Trigger refresh event for other components
    window.dispatchEvent(new Event('adminProjectsUpdate'))
  }

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      projectService.delete(id)
      setProjects(projects.filter(p => p.id !== id))
      
      // Trigger refresh event for other components
      window.dispatchEvent(new Event('adminProjectsUpdate'))
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

  return (
    <div className="manage-projects admin-page admin-content">
      <div className="projects-header">
        <h1>Manage Projects</h1>
        <button 
          className="add-project-btn"
          onClick={() => setIsAddingNew(true)}
        >
          <FaPlus />
          Add New Project
        </button>
      </div>

      {/* Add New Project Form */}
      {isAddingNew && (
        <motion.div 
          className="project-form-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Add New Project</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Project Title *</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="Enter project title"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Live URL (optional)</label>
              <input
                type="url"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-group">
              <label>Technologies</label>
              <div className="tech-selector">
                {techOptions.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    className={`tech-option ${newProject.technologies.includes(tech) ? 'selected' : ''}`}
                    onClick={() => {
                      if (newProject.technologies.includes(tech)) {
                        setNewProject(prev => ({
                          ...prev,
                          technologies: prev.technologies.filter(t => t !== tech)
                        }))
                      } else {
                        setNewProject(prev => ({
                          ...prev,
                          technologies: [...prev.technologies, tech]
                        }))
                      }
                    }}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Project Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
              />
              {newProject.images.length > 0 && (
                <div className="image-preview-grid">
                  {newProject.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`Preview ${idx}`} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button onClick={() => setIsAddingNew(false)} className="btn-cancel">
              <FaTimes />
              Cancel
            </button>
            <button onClick={handleAddProject} className="btn-save">
              <FaSave />
              Add Project
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="projects-grid">
        {projects.map(project => (
          <motion.div
            key={project.id}
            className="project-card"
            layout
          >
            {editingProject && editingProject.id === project.id ? (
              // Edit Mode
              <div className="edit-form">
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                />
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  rows={3}
                />
                <input
                  type="url"
                  value={editingProject.liveUrl}
                  onChange={(e) => setEditingProject({...editingProject, liveUrl: e.target.value})}
                  placeholder="Live URL"
                />
                <div className="edit-actions">
                  <button onClick={handleSaveEdit} className="btn-save">
                    <FaSave />
                    Save
                  </button>
                  <button onClick={() => setEditingProject(null)} className="btn-cancel">
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="project-thumbnail">
                  {project.images?.[0] ? (
                    <img src={project.images[0]} alt={project.title} />
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
                  <button onClick={() => handleEditProject(project)} className="btn-edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteProject(project.id)} className="btn-delete">
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && !isAddingNew && (
        <div className="no-projects">
          <FaImage size={48} />
          <h3>No projects yet</h3>
          <p>Start by adding your first project</p>
        </div>
      )}
    </div>
  )
}

export default ManageProjects