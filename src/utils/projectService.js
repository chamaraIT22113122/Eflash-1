// Project Service - MongoDB API Integration
// Replaces localStorage with MongoDB database calls

class ProjectService {
  constructor() {
    // Use environment variable for API base URL or default to the Netlify deployment.
    // NOTE: GitHub Pages only serves static files; Netlify Functions must be called
    //       from the separate Netlify deployment URL below.
    // We use /api/* proxy (not /.netlify/functions directly) so CORS headers
    // can be configured at the Netlify CDN level.
    this.API_BASE = import.meta.env.VITE_API_BASE ||
      (import.meta.env.DEV
        ? 'http://localhost:8888/.netlify/functions'
        : 'https://eflash-1.vercel.app/api');
  }

  // Get all projects from MongoDB
  async getAllProjects() {
    try {
      const response = await fetch(`${this.API_BASE}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const projects = await response.json();
      // API reachable — wipe any stale localStorage cache so it never leaks back
      localStorage.removeItem('eflash_admin_projects');
      return projects || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to localStorage for development
      return this.getFallbackProjects();
    }
  }

  // Helper: remove base64 Data URLs before sending to the API.
  // Netlify serverless functions reject payloads over 6 MB, and a single
  // base64-encoded image can easily exceed that limit.
  _stripBase64Images(data) {
    const isBase64 = (s) => typeof s === 'string' && s.startsWith('data:');
    return {
      ...data,
      images: (data.images || []).filter(img => !isBase64(img)),
      thumbnail: isBase64(data.thumbnail) ? '' : (data.thumbnail || ''),
    };
  }

  // Add a new project to MongoDB
  async addProject(project) {
    try {
      const projectData = this._stripBase64Images({
        ...project,
        id: project.id || Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const response = await fetch(`${this.API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newProject = await response.json();

      // Trigger refresh event for other components
      window.dispatchEvent(new CustomEvent('projectsUpdate'));

      return newProject;
    } catch (error) {
      console.error('Error adding project:', error);
      // Fallback to localStorage
      return this.addFallbackProject(project);
    }
  }

  // Update an existing project in MongoDB
  async updateProject(projectId, updates) {
    const updateData = this._stripBase64Images({
      ...updates,
      updatedAt: new Date().toISOString()
    });

    const response = await fetch(`${this.API_BASE}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      let errMsg = `HTTP error! status: ${response.status}`;
      try {
        const errBody = await response.json();
        if (errBody.error) errMsg = errBody.error;
      } catch (_) { }
      throw new Error(errMsg);
    }

    const updatedProject = await response.json();

    // Trigger refresh event for other components
    window.dispatchEvent(new CustomEvent('projectsUpdate'));

    return updatedProject;
  }

  // Delete a project from MongoDB
  async deleteProject(projectId) {
    const response = await fetch(`${this.API_BASE}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errMsg = `HTTP error! status: ${response.status}`;
      try {
        const errBody = await response.json();
        if (errBody.error) errMsg = errBody.error;
      } catch (_) { }
      throw new Error(errMsg);
    }

    const result = await response.json();

    // Trigger refresh event for other components
    window.dispatchEvent(new CustomEvent('projectsUpdate'));

    return result;
  }

  // Get a single project by ID from MongoDB
  async getProjectById(projectId) {
    try {
      const response = await fetch(`${this.API_BASE}/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  }

  // Fallback methods for localStorage (development/offline mode)
  getFallbackProjects() {
    try {
      const projects = localStorage.getItem('eflash_admin_projects');
      return projects ? JSON.parse(projects) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  addFallbackProject(project) {
    const newProject = {
      ...project,
      id: project.id || Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    try {
      const projects = this.getFallbackProjects();
      projects.unshift(newProject);
      try {
        localStorage.setItem('eflash_admin_projects', JSON.stringify(projects));
      } catch (quotaErr) {
        // localStorage quota exceeded — skip persistence, still return the object
        console.warn('localStorage quota exceeded for projects, skipping local save');
      }
      window.dispatchEvent(new CustomEvent('projectsUpdate'));
      window.dispatchEvent(new CustomEvent('adminProjectsUpdate'));
    } catch (error) {
      console.error('Error in addFallbackProject:', error);
    }
    return newProject;
  }

  updateFallbackProject(projectId, updates) {
    try {
      const projects = this.getFallbackProjects();
      const projectIndex = projects.findIndex(p => p.id === projectId || p._id === projectId);

      if (projectIndex === -1) {
        throw new Error('Project not found');
      }

      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('eflash_admin_projects', JSON.stringify(projects));
      } catch (quotaErr) {
        console.warn('localStorage quota exceeded for projects, skipping local save');
      }

      window.dispatchEvent(new CustomEvent('projectsUpdate'));
      window.dispatchEvent(new CustomEvent('adminProjectsUpdate'));

      return projects[projectIndex];
    } catch (error) {
      console.error('Error updating project in localStorage:', error);
      return null;
    }
  }

  deleteFallbackProject(projectId) {
    try {
      const projects = this.getFallbackProjects();
      const filteredProjects = projects.filter(p => p.id !== projectId && p._id !== projectId);

      localStorage.setItem('eflash_admin_projects', JSON.stringify(filteredProjects));

      // Trigger refresh event
      window.dispatchEvent(new CustomEvent('projectsUpdate'));
      window.dispatchEvent(new CustomEvent('adminProjectsUpdate'));

      return { message: 'Project deleted successfully' };
    } catch (error) {
      console.error('Error deleting project from localStorage:', error);
      return null;
    }
  }

  // Migrate existing localStorage projects to MongoDB (one-time operation)
  async migrateToDatabase() {
    try {
      const localProjects = this.getFallbackProjects();

      if (localProjects.length === 0) {
        console.log('No projects to migrate');
        return { migrated: 0, message: 'No projects to migrate' };
      }

      let migratedCount = 0;

      for (const project of localProjects) {
        try {
          // Remove local ID and let MongoDB generate _id
          const { id, ...projectData } = project;
          await this.addProject(projectData);
          migratedCount++;
        } catch (error) {
          console.error('Error migrating project:', project, error);
        }
      }

      // Clear localStorage after successful migration
      if (migratedCount > 0) {
        localStorage.removeItem('eflash_admin_projects');
        console.log(`Migrated ${migratedCount} projects to MongoDB`);
      }

      return {
        migrated: migratedCount,
        message: `Successfully migrated ${migratedCount} projects`
      };
    } catch (error) {
      console.error('Error during migration:', error);
      return { migrated: 0, error: error.message };
    }
  }

  // Check if database connection is working
  async testConnection() {
    try {
      const response = await fetch(`${this.API_BASE}/projects?limit=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }
}

// Create and export singleton instance
const projectService = new ProjectService();

export default projectService;