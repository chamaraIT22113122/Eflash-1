import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAssetPath } from '../utils/assetPath'
import projectService from '../utils/projectService'

const SiteContentContext = createContext()

// Export the context itself for direct consumption (admin panel needs it)
export { SiteContentContext }

export const useSiteContent = () => {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return context
}

// Helper function to transform image paths in content
const transformImagePaths = (obj) => {
  if (!obj) return obj
  
  if (typeof obj === 'string') {
    // If it's a string that looks like an image path, transform it
    if (obj.startsWith('/assets/images/') || obj.startsWith('/assets/images/')) {
      return getAssetPath(obj)
    }
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => transformImagePaths(item))
  }
  
  if (typeof obj === 'object') {
    const transformed = {}
    for (const key in obj) {
      transformed[key] = transformImagePaths(obj[key])
    }
    return transformed
  }
  
  return obj
}

// Default site content
const defaultContent = {
  general: {
    siteName: 'E Flash',
    tagline: 'Creative Design Agency',
    email: 'info@eflash24.tech',
    phone: '+94 77 560 8073',
    whatsapp: '94775608073',
    address: 'Colombo, Sri Lanka',
    socialMedia: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#'
    }
  },
  home: {
    heroTitle: 'Transform Your Brand with',
    heroSubtitle: 'Creative Design Solutions',
    heroDescription: 'We bring your ideas to life with stunning designs that captivate and convert. From web design to branding, we\'ve got you covered.',
    heroCTA1: 'View Our Work',
    heroCTA2: 'Get Started',
    statsClients: '500+',
    statsProjects: '1000+',
    statsYears: '5+',
    statsRating: '4.9'
  },
  about: {
    title: 'About E Flash',
    subtitle: 'Your Creative Design Partner',
    description: 'We are a passionate team of designers and developers dedicated to creating exceptional digital experiences.',
    mission: 'To deliver innovative design solutions that help businesses grow and succeed in the digital world.',
    vision: 'To be the leading creative agency known for transforming brands through exceptional design.',
    teamMembers: [
      {
        id: 1,
        name: 'John Doe',
        role: 'Creative Director',
        image: '👨‍💼',
        bio: 'Leading the creative vision'
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'Lead Designer',
        image: '👩‍💼',
        bio: 'Crafting beautiful designs'
      }
    ]
  },
  services: {
    title: 'Our Services',
    subtitle: 'What We Offer',
    description: 'Comprehensive design and development services tailored to your needs',
    items: [
      {
        id: 1,
        title: 'Web Design',
        description: 'Beautiful, responsive websites that convert visitors into customers',
        icon: '💻',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
      },
      {
        id: 2,
        title: 'Graphic Design',
        description: 'Eye-catching graphics that make your brand stand out',
        icon: '🎨',
        features: ['Logo Design', 'Brand Identity', 'Print Materials']
      },
      {
        id: 3,
        title: 'UI/UX Design',
        description: 'User-centered design that enhances user experience',
        icon: '📱',
        features: ['User Research', 'Wireframing', 'Prototyping']
      },
      {
        id: 4,
        title: 'Branding',
        description: 'Complete brand identity that tells your story',
        icon: '⭐',
        features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines']
      }
    ]
  },
  portfolio: {
    title: 'Our Portfolio',
    subtitle: 'Recent Work',
    description: 'Check out some of our latest projects',
    projects: []
  },
  packages: {
    title: 'Pricing Packages',
    subtitle: 'Choose the Perfect Package',
    description: 'Transparent pricing with no hidden fees'
  },
  testimonials: {
    title: 'What Our Clients Say',
    subtitle: 'Client Testimonials',
    description: 'Don\'t just take our word for it',
    items: [
      {
        id: 1,
        name: 'Sarah Johnson',
        position: 'CEO, TechStart Inc.',
        image: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        text: 'E Flash transformed our online presence with a stunning website. Their attention to detail and creative approach exceeded our expectations. Highly recommended!'
      },
      {
        id: 2,
        name: 'Michael Chen',
        position: 'Marketing Director, GrowthCo',
        image: 'https://i.pravatar.cc/150?img=2',
        rating: 5,
        text: 'Working with E Flash was a game-changer for our brand. They delivered exceptional graphic design work and helped us establish a strong visual identity.'
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        position: 'Founder, StyleHub',
        image: 'https://i.pravatar.cc/150?img=3',
        rating: 5,
        text: 'The team at E Flash is incredibly talented and professional. They built our e-commerce platform from scratch and it\'s been performing brilliantly!'
      },
      {
        id: 4,
        name: 'David Thompson',
        position: 'Product Manager, InnovateLab',
        image: 'https://i.pravatar.cc/150?img=4',
        rating: 5,
        text: 'Outstanding service! E Flash created a beautiful UI/UX for our app. The user feedback has been overwhelmingly positive. Worth every penny!'
      },
      {
        id: 5,
        name: 'Lisa Anderson',
        position: 'Owner, Cafe Delight',
        image: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        text: 'E Flash helped us create a modern website and marketing materials. Our customer engagement has increased significantly. Thank you!'
      }
    ]
  },
  skills: {
    title: 'What Are Our Tools & Skills Included?',
    subtitle: 'Our Skills',
    description: 'We use the latest tools and technologies',
    items: [
      {
        id: 1,
        name: 'Illustrator',
        icon: 'assets/images/illustrator.png'
      },
      {
        id: 2,
        name: 'Photoshop',
        icon: 'assets/images/photoshop.png'
      },
      {
        id: 3,
        name: 'Figma',
        icon: 'assets/images/figma.png'
      },
      {
        id: 4,
        name: 'VS Code',
        icon: 'assets/images/vs-code.png'
      },
      {
        id: 5,
        name: 'Git',
        icon: 'assets/images/git.png'
      },
      {
        id: 6,
        name: 'GitHub',
        icon: 'assets/images/github.png'
      },
      {
        id: 7,
        name: 'WordPress',
        icon: 'assets/images/wordpress.png'
      },
      {
        id: 8,
        name: 'Canva',
        icon: 'assets/images/canva.png'
      },
      {
        id: 9,
        name: 'React',
        icon: 'assets/images/react.png'
      },
      {
        id: 10,
        name: 'HTML5',
        icon: 'assets/images/html5.png'
      },
      {
        id: 11,
        name: 'CSS3',
        icon: 'assets/images/css31.png'
      },
      {
        id: 12,
        name: 'Bootstrap',
        icon: 'assets/images/bootstrap.png'
      },
      {
        id: 13,
        name: 'MongoDB',
        icon: 'assets/images/mongodb.png'
      },
      {
        id: 14,
        name: 'Firebase',
        icon: 'assets/images/firebase.png'
      },
      {
        id: 15,
        name: 'Adobe XD',
        icon: 'assets/images/adobe-xd.png'
      },
      {
        id: 16,
        name: 'CapCut',
        icon: 'assets/images/capcut.png'
      },
      {
        id: 17,
        name: 'MySQL',
        icon: 'assets/images/MYSQL.png'
      },
      {
        id: 18,
        name: 'Java',
        icon: 'assets/images/Java.png'
      },
      {
        id: 19,
        name: 'Android',
        icon: 'assets/images/android.png'
      },
      {
        id: 20,
        name: 'Angular',
        icon: 'assets/images/angular.png'
      }
    ]
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Let\'s Work Together',
    description: 'Have a project in mind? We\'d love to hear from you!'
  },
  footer: {
    copyrightText: '© 2024 E Flash. All rights reserved.',
    quickLinks: [
      { name: 'Home', url: '/' },
      { name: 'About', url: '/about' },
      { name: 'Services', url: '/services' },
      { name: 'Portfolio', url: '/portfolio' },
      { name: 'Packages', url: '/packages' },
      { name: 'Contact', url: '/contact' }
    ]
  }
}

// Project service to get admin projects
const getAdminProjects = () => {
  try {
    const projects = localStorage.getItem('eflash_admin_projects')
    return projects ? JSON.parse(projects) : []
  } catch (error) {
    console.error('Error loading admin projects:', error)
    return []
  }
}

const SiteContentProvider = ({ children }) => {
  const [adminProjects, setAdminProjects] = useState([])
  const [content, setContent] = useState(() => transformImagePaths(defaultContent))
  const [isLoading, setIsLoading] = useState(true)

  // Load projects from MongoDB/API and fallback to localStorage
  const loadAdminProjects = async () => {
    try {
      const projects = await projectService.getAllProjects()
      setAdminProjects(projects)
    } catch (error) {
      console.error('Error loading admin projects from API:', error)
      // Fallback to localStorage
      const fallbackProjects = projectService.getFallbackProjects()
      setAdminProjects(fallbackProjects)
    }
  }

  // Load admin projects on mount and listen for changes
  useEffect(() => {
    loadAdminProjects()
    
    // Listen for project updates
    const handleProjectUpdate = () => {
      loadAdminProjects()
    }
    
    window.addEventListener('projectsUpdate', handleProjectUpdate)
    window.addEventListener('adminProjectsUpdate', handleProjectUpdate)
    
    return () => {
      window.removeEventListener('projectsUpdate', handleProjectUpdate)
      window.removeEventListener('adminProjectsUpdate', handleProjectUpdate)
    }
  }, [])

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent')
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        // Always transform paths when loading from storage
        setContent(transformImagePaths(parsed))
      } catch (error) {
        console.error('Error loading site content:', error)
        // Fall back to default with transformed paths
        setContent(transformImagePaths(defaultContent))
      }
    } else {
      // No saved content, use default with transformed paths
      setContent(transformImagePaths(defaultContent))
    }
    setIsLoading(false)
  }, [])

  // Only show admin-added projects (no default/hardcoded projects)
  const allProjects = [...adminProjects]
  
  const mergedContent = {
    ...content,
    portfolio: {
      ...content.portfolio,
      projects: allProjects
    }
  }

  // Save content to localStorage whenever it changes
  const updateContent = (section, data) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      }
      localStorage.setItem('siteContent', JSON.stringify(newContent))
      return newContent
    })
  }

  // Update entire section
  const updateSection = (section, data) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [section]: data
      }
      localStorage.setItem('siteContent', JSON.stringify(newContent))
      return newContent
    })
  }

  // Reset to default
  const resetContent = () => {
    const transformedDefault = transformImagePaths(defaultContent)
    setContent(transformedDefault)
    localStorage.setItem('siteContent', JSON.stringify(defaultContent))
  }

  // Export/Import functionality
  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'site-content-backup.json'
    link.click()
  }

  const importContent = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData)
      const transformed = transformImagePaths(parsed)
      setContent(transformed)
      localStorage.setItem('siteContent', JSON.stringify(parsed))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Invalid JSON data' }
    }
  }

  const value = {
    content: mergedContent,
    updateContent,
    updateSection,
    resetContent,
    exportContent,
    importContent,
    isLoading,
    refreshProjectsFromAdmin: loadAdminProjects
  }

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}

export { SiteContentProvider }
export default SiteContentProvider
