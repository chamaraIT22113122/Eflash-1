import React, { createContext, useContext, useState, useEffect } from 'react'

const SiteContentContext = createContext()

export const useSiteContent = () => {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return context
}

// Default site content
const defaultContent = {
  general: {
    siteName: 'E Flash',
    tagline: 'Creative Design Agency',
    email: 'info@eflash.lk',
    phone: '+94 70 248 1691',
    whatsapp: '94702481691',
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
    projects: [
      {
        id: 1,
        title: 'Social Media Marketing Designs',
        category: 'Graphic Design',
        description: 'Creative social media posts and marketing graphics for various brands. Our designs help businesses engage their audience with visually stunning content that drives conversions and brand awareness.',
        thumbnail: '/assets/images/portfolio/Social media p/1.jpg',
        images: [
          '/assets/images/portfolio/Social media p/1.jpg',
          '/assets/images/portfolio/Social media p/2.png',
          '/assets/images/portfolio/Social media p/3.png',
          '/assets/images/portfolio/Social media p/4.jpg',
          '/assets/images/portfolio/Social media p/5.png',
          '/assets/images/portfolio/Social media p/6.png',
          '/assets/images/portfolio/Social media p/7.png',
          '/assets/images/portfolio/Social media p/8.png',
          '/assets/images/portfolio/Social media p/9.png',
          '/assets/images/portfolio/Social media p/27.jpg',
          '/assets/images/portfolio/Social media p/28.jpg',
          '/assets/images/portfolio/Social media p/29.jpg'
        ],
        tags: ['Social Media', 'Graphics', 'Marketing'],
        features: ['Instagram Posts', 'Facebook Graphics', 'Twitter Headers', 'Story Templates']
      },
      {
        id: 2,
        title: 'Brand Logo Designs',
        category: 'Branding',
        description: 'Professional logo designs for various clients and industries. From concept to final delivery, we create memorable logos that perfectly represent your brand identity.',
        thumbnail: '/assets/images/portfolio/logo/459161113_921611919989918_3548539809512993639_n.jpg',
        images: [
          '/assets/images/portfolio/logo/459161113_921611919989918_3548539809512993639_n.jpg',
          '/assets/images/portfolio/logo/soju logo.jpg',
          '/assets/images/portfolio/logo/gam kukul logo.jpg',
          '/assets/images/portfolio/logo/hana logo 3.png',
          '/assets/images/portfolio/logo/lalai logo.png',
          '/assets/images/portfolio/logo/k edu logo.png',
          '/assets/images/portfolio/logo/environmental logo png 2.png',
          '/assets/images/portfolio/logo/recital logo-01.png'
        ],
        tags: ['Branding', 'Logo', 'Identity'],
        features: ['Custom Logo Design', 'Multiple Concepts', 'Vector Files', 'Brand Guidelines']
      },
      {
        id: 3,
        title: 'YouTube Thumbnails',
        category: 'Graphic Design',
        description: 'Eye-catching YouTube video thumbnails that drive engagement and increase click-through rates. Designed to stand out in search results and recommended videos.',
        thumbnail: '/assets/images/portfolio/Thambnails/ai.jpg',
        images: [
          '/assets/images/portfolio/Thambnails/ai.jpg',
          '/assets/images/portfolio/Thambnails/alamo.jpg',
          '/assets/images/portfolio/Thambnails/blog.jpg',
          '/assets/images/portfolio/Thambnails/blood.jpg',
          '/assets/images/portfolio/Thambnails/flayers.jpg',
          '/assets/images/portfolio/Thambnails/logo.jpg',
          '/assets/images/portfolio/Thambnails/ml.jpg',
          '/assets/images/portfolio/Thambnails/oversized.jpg',
          '/assets/images/portfolio/Thambnails/app.jpg',
          '/assets/images/portfolio/Thambnails/city tour.png',
          '/assets/images/portfolio/Thambnails/musicplayer.jpg',
          '/assets/images/portfolio/Thambnails/todo.jpg'
        ],
        tags: ['YouTube', 'Thumbnail', 'Design'],
        features: ['Custom Thumbnails', 'Consistent Branding', 'High CTR Design', 'Quick Turnaround']
      },
      {
        id: 4,
        title: 'Banner Designs',
        category: 'Graphic Design',
        description: 'Professional banner designs for web and social media platforms. Perfect for promotions, announcements, and brand awareness campaigns.',
        thumbnail: '/assets/images/portfolio/banners/banners-01.png',
        images: [
          '/assets/images/portfolio/banners/banners-01.png',
          '/assets/images/portfolio/banners/banners-02.png',
          '/assets/images/portfolio/banners/banners-03.png',
          '/assets/images/portfolio/banners/mj wedding package.png',
          '/assets/images/portfolio/banners/nimeshk ay flyer 2.png'
        ],
        tags: ['Banner', 'Web', 'Design'],
        features: ['Web Banners', 'Social Media Covers', 'Ad Banners', 'Event Banners']
      },
      {
        id: 5,
        title: 'Flyer Designs',
        category: 'Print Design',
        description: 'Creative flyer designs for events and promotions. Eye-catching layouts that communicate your message effectively.',
        thumbnail: '/assets/images/portfolio/flayers/Health Awareness flayer-01.png',
        images: [
          '/assets/images/portfolio/flayers/Health Awareness flayer-01.png',
          '/assets/images/portfolio/flayers/moders sinhala flayer-01.png',
          '/assets/images/portfolio/flayers/HEALTH AWARENESS flayer-01.png',
          '/assets/images/portfolio/flayers/malshan JBL.jpg',
          '/assets/images/portfolio/flayers/Peony cake deco flayr 1.jpg',
          '/assets/images/portfolio/flayers/evoke size chart.jpg',
          '/assets/images/portfolio/flayers/akka 1.jpg',
          '/assets/images/portfolio/flayers/akka 2.jpg'
        ],
        tags: ['Flyer', 'Print', 'Promotional'],
        features: ['Print-Ready Files', 'Multiple Sizes', 'Creative Layouts', 'Revisions Included']
      },
      {
        id: 6,
        title: 'Social Media Graphics Pack',
        category: 'Graphic Design',
        description: 'Complete social media content packages for consistent branding across all platforms. Increase your online presence with cohesive designs.',
        thumbnail: '/assets/images/portfolio/Social media p/11.png',
        images: [
          '/assets/images/portfolio/Social media p/11.png',
          '/assets/images/portfolio/Social media p/12.png',
          '/assets/images/portfolio/Social media p/13.png',
          '/assets/images/portfolio/Social media p/14.png',
          '/assets/images/portfolio/Social media p/15.png',
          '/assets/images/portfolio/Social media p/16.png'
        ],
        tags: ['Social Media', 'Graphics', 'Brand'],
        features: ['Template Sets', 'Consistent Branding', 'Multiple Formats', 'Editable Files']
      },
      {
        id: 7,
        title: 'Wedding Package Design',
        category: 'Graphic Design',
        description: 'Beautiful wedding invitation and promotional materials. Elegant designs that capture the magic of your special day.',
        thumbnail: '/assets/images/portfolio/banners/mj wedding package.png',
        images: [
          '/assets/images/portfolio/banners/mj wedding package.png'
        ],
        tags: ['Wedding', 'Design', 'Print'],
        features: ['Invitation Cards', 'Save The Date', 'Thank You Cards', 'Menu Cards']
      },
      {
        id: 8,
        title: 'Product Promotional Flyers',
        category: 'Graphic Design',
        description: 'Product-focused promotional flyer designs that highlight features and benefits to drive sales.',
        thumbnail: '/assets/images/portfolio/flayers/malshan JBL.jpg',
        images: [
          '/assets/images/portfolio/flayers/malshan JBL.jpg',
          '/assets/images/portfolio/flayers/nimeshk ay flyer 2.png'
        ],
        tags: ['Product', 'Flyer', 'Marketing'],
        features: ['Product Focus', 'Call to Action', 'Benefit Highlights', 'Multiple Layouts']
      },
      {
        id: 9,
        title: 'Video Thumbnails Collection',
        category: 'Graphic Design',
        description: 'Professional video thumbnails for content creators. Designed to maximize views and engagement.',
        thumbnail: '/assets/images/portfolio/Thambnails/ENGLISH Thumbnal.jpg',
        images: [
          '/assets/images/portfolio/Thambnails/ENGLISH Thumbnal.jpg',
          '/assets/images/portfolio/Thambnails/Korean maraya thumb.jpg',
          '/assets/images/portfolio/Thambnails/new thumb amith ayya.png',
          '/assets/images/portfolio/Thambnails/recommender.jpg',
          '/assets/images/portfolio/Thambnails/resume.jpg',
          '/assets/images/portfolio/Thambnails/stock.jpg'
        ],
        tags: ['Video', 'Thumbnail', 'YouTube'],
        features: ['High Resolution', 'Eye-Catching Design', 'Text Overlay', 'Brand Consistency']
      },
      {
        id: 10,
        title: 'Educational Content Designs',
        category: 'Graphic Design',
        description: 'Engaging social media graphics for educational content. Making learning visual and engaging.',
        thumbnail: '/assets/images/portfolio/Social media p/13.png',
        images: [
          '/assets/images/portfolio/Social media p/13.png',
          '/assets/images/portfolio/Social media p/17.png',
          '/assets/images/portfolio/Social media p/19.png',
          '/assets/images/portfolio/Social media p/20.png'
        ],
        tags: ['Education', 'Social Media', 'Content'],
        features: ['Infographics', 'Visual Learning', 'Shareable Content', 'Consistent Style']
      },
      {
        id: 11,
        title: 'Brand Identity Package',
        category: 'Branding',
        description: 'Complete brand identity including logo and guidelines. Everything you need for consistent branding.',
        thumbnail: '/assets/images/portfolio/logo/k edu logo.png',
        images: [
          '/assets/images/portfolio/logo/k edu logo.png',
          '/assets/images/portfolio/logo/see you logo.png',
          '/assets/images/portfolio/logo/wdadwa.png',
          '/assets/images/portfolio/logo/mj12.jpg'
        ],
        tags: ['Branding', 'Logo', 'Identity'],
        features: ['Logo Variations', 'Color Palette', 'Typography', 'Usage Guidelines']
      },
      {
        id: 12,
        title: 'Event Promotional Designs',
        category: 'Graphic Design',
        description: 'Eye-catching promotional materials for events and campaigns.',
        thumbnail: '/assets/images/portfolio/Social media p/22.jpg',
        images: [
          '/assets/images/portfolio/Social media p/22.jpg',
          '/assets/images/portfolio/Social media p/23.jpg',
          '/assets/images/portfolio/Social media p/24.jpg',
          '/assets/images/portfolio/Social media p/25.jpg',
          '/assets/images/portfolio/Social media p/26.jpg'
        ],
        tags: ['Events', 'Promotion', 'Marketing'],
        features: ['Event Posters', 'Social Media Posts', 'Digital Flyers', 'Announcements']
      },
      {
        id: 13,
        title: 'YouTube Video Titles & Graphics',
        category: 'Graphic Design',
        description: 'Professional YouTube video title designs and channel graphics. Custom-crafted titles that enhance your video branding and viewer experience.',
        thumbnail: '/assets/images/portfolio/Video Title/Y1.png',
        images: [
          '/assets/images/portfolio/Video Title/Y1.png',
          '/assets/images/portfolio/Video Title/Y2.png',
          '/assets/images/portfolio/Video Title/Y3.png',
          '/assets/images/portfolio/Video Title/Y4.png',
          '/assets/images/portfolio/Video Title/Y5.png',
          '/assets/images/portfolio/Video Title/Y6.png',
          '/assets/images/portfolio/Video Title/Y7.png',
          '/assets/images/portfolio/Video Title/Y8.png',
          '/assets/images/portfolio/Video Title/Y9.png',
          '/assets/images/portfolio/Video Title/Y10.png'
        ],
        tags: ['YouTube', 'Video Titles', 'Channel Graphics'],
        features: ['Custom Title Designs', 'Channel Branding', 'Intro/Outro Graphics', 'Professional Typography']
      },
      {
        id: 14,
        title: 'Premium Social Media Content',
        category: 'Graphic Design',
        description: 'High-quality social media designs for premium brands. Sophisticated graphics that elevate your brand presence.',
        thumbnail: '/assets/images/portfolio/Social media p/30.jpg',
        images: [
          '/assets/images/portfolio/Social media p/30.jpg',
          '/assets/images/portfolio/Social media p/31.jpg',
          '/assets/images/portfolio/Social media p/32.png',
          '/assets/images/portfolio/Social media p/33.png',
          '/assets/images/portfolio/Social media p/34.png',
          '/assets/images/portfolio/Social media p/36.png',
          '/assets/images/portfolio/Social media p/37.png',
          '/assets/images/portfolio/Social media p/38.png'
        ],
        tags: ['Social Media', 'Premium Design', 'Luxury'],
        features: ['High-End Graphics', 'Premium Templates', 'Brand Consistency', 'Multiple Formats']
      }
    ]
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
        icon: '/assets/images/illustrator.png'
      },
      {
        id: 2,
        name: 'Photoshop',
        icon: '/assets/images/photoshop.png'
      },
      {
        id: 3,
        name: 'Figma',
        icon: '/assets/images/figma.png'
      },
      {
        id: 4,
        name: 'VS Code',
        icon: '/assets/images/vs-code.png'
      },
      {
        id: 5,
        name: 'Git',
        icon: '/assets/images/git.png'
      },
      {
        id: 6,
        name: 'GitHub',
        icon: '/assets/images/github.png'
      },
      {
        id: 7,
        name: 'WordPress',
        icon: '/assets/images/wordpress.png'
      },
      {
        id: 8,
        name: 'Canva',
        icon: '/assets/images/canva.png'
      },
      {
        id: 9,
        name: 'React',
        icon: '/assets/images/react.png'
      },
      {
        id: 10,
        name: 'HTML5',
        icon: '/assets/images/html5.png'
      },
      {
        id: 11,
        name: 'CSS3',
        icon: '/assets/images/css31.png'
      },
      {
        id: 12,
        name: 'Bootstrap',
        icon: '/assets/images/bootstrap.png'
      },
      {
        id: 13,
        name: 'MongoDB',
        icon: '/assets/images/mongodb.png'
      },
      {
        id: 14,
        name: 'Firebase',
        icon: '/assets/images/firebase.png'
      },
      {
        id: 15,
        name: 'Adobe XD',
        icon: '/assets/images/adobe-xd.png'
      },
      {
        id: 16,
        name: 'CapCut',
        icon: '/assets/images/capcut.png'
      },
      {
        id: 17,
        name: 'MySQL',
        icon: '/assets/images/MYSQL.png'
      },
      {
        id: 18,
        name: 'Java',
        icon: '/assets/images/Java.png'
      },
      {
        id: 19,
        name: 'Android',
        icon: '/assets/images/android.png'
      },
      {
        id: 20,
        name: 'Angular',
        icon: '/assets/images/angular.png'
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

export const SiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent)
  const [isLoading, setIsLoading] = useState(true)

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent')
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (error) {
        console.error('Error loading site content:', error)
      }
    }
    setIsLoading(false)
  }, [])

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
    setContent(defaultContent)
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
      setContent(parsed)
      localStorage.setItem('siteContent', JSON.stringify(parsed))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Invalid JSON data' }
    }
  }

  const value = {
    content,
    updateContent,
    updateSection,
    resetContent,
    exportContent,
    importContent,
    isLoading
  }

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}
