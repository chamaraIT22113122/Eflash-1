import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaDesktop, FaTabletAlt, FaMobileAlt, FaExternalLinkAlt, 
  FaCode, FaReact, FaVuejs, FaAngular, FaWordpress, 
  FaShopify, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaPython 
} from 'react-icons/fa'
import { SiTailwindcss, SiBootstrap, SiMongodb, SiMysql, SiFirebase } from 'react-icons/si'
import './WebsiteShowcase.css'

const WebsiteShowcase = ({ project }) => {
  const [deviceView, setDeviceView] = useState('desktop') // desktop, tablet, mobile
  const [isLoading, setIsLoading] = useState(true)

  // Tech stack icon mapping
  const techIcons = {
    'React': FaReact,
    'Vue': FaVuejs,
    'Angular': FaAngular,
    'WordPress': FaWordpress,
    'Shopify': FaShopify,
    'HTML': FaHtml5,
    'CSS': FaCss3Alt,
    'JavaScript': FaJs,
    'Node.js': FaNodeJs,
    'Python': FaPython,
    'Tailwind': SiTailwindcss,
    'Bootstrap': SiBootstrap,
    'MongoDB': SiMongodb,
    'MySQL': SiMysql,
    'Firebase': SiFirebase
  }

  // Get device dimensions
  const deviceDimensions = {
    desktop: { width: '100%', height: '600px', scale: 1 },
    tablet: { width: '768px', height: '1024px', scale: 0.7 },
    mobile: { width: '375px', height: '667px', scale: 0.8 }
  }

  const currentDimensions = deviceDimensions[deviceView]

  // Check if project has live URL
  const hasLiveUrl = project.liveUrl || project.url || project.link

  return (
    <div className="website-showcase">
      {/* Device Selector */}
      <div className="device-selector">
        <button 
          className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
          onClick={() => setDeviceView('desktop')}
          aria-label="Desktop view"
        >
          <FaDesktop />
          <span>Desktop</span>
        </button>
        <button 
          className={`device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
          onClick={() => setDeviceView('tablet')}
          aria-label="Tablet view"
        >
          <FaTabletAlt />
          <span>Tablet</span>
        </button>
        <button 
          className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
          onClick={() => setDeviceView('mobile')}
          aria-label="Mobile view"
        >
          <FaMobileAlt />
          <span>Mobile</span>
        </button>
      </div>

      {/* Live Preview */}
      {hasLiveUrl ? (
        <motion.div 
          className="preview-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`device-frame ${deviceView}`}>
            <div className="device-screen">
              {isLoading && (
                <div className="iframe-loader">
                  <div className="loader-spinner"></div>
                  <p>Loading preview...</p>
                </div>
              )}
              <iframe
                src={project.liveUrl || project.url || project.link}
                title={`${project.title} preview`}
                style={{
                  width: currentDimensions.width,
                  height: currentDimensions.height,
                  transform: `scale(${currentDimensions.scale})`,
                  transformOrigin: 'top left'
                }}
                onLoad={() => setIsLoading(false)}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="no-preview">
          <FaCode size={48} />
          <p>Live preview not available for this project</p>
          <p className="no-preview-subtitle">View project details and images below</p>
        </div>
      )}

      {/* Technology Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="tech-stack-section">
          <h3>Technology Stack</h3>
          <div className="tech-badges">
            {project.technologies.map((tech, index) => {
              const IconComponent = techIcons[tech]
              return (
                <motion.div
                  key={index}
                  className="tech-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {IconComponent && <IconComponent />}
                  <span>{tech}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Project Statistics */}
      <div className="project-stats">
        {project.stats && (
          <div className="stats-grid">
            {project.stats.users && (
              <div className="stat-item">
                <div className="stat-value">{project.stats.users}</div>
                <div className="stat-label">Active Users</div>
              </div>
            )}
            {project.stats.pages && (
              <div className="stat-item">
                <div className="stat-value">{project.stats.pages}</div>
                <div className="stat-label">Pages Built</div>
              </div>
            )}
            {project.stats.performance && (
              <div className="stat-item">
                <div className="stat-value">{project.stats.performance}</div>
                <div className="stat-label">Performance Score</div>
              </div>
            )}
            {project.stats.completion && (
              <div className="stat-item">
                <div className="stat-value">{project.stats.completion}</div>
                <div className="stat-label">Completion Time</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visit Live Site Button */}
      {hasLiveUrl && (
        <div className="visit-site-section">
          <a 
            href={project.liveUrl || project.url || project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-site-btn"
          >
            <FaExternalLinkAlt />
            <span>Visit Live Site</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default WebsiteShowcase
