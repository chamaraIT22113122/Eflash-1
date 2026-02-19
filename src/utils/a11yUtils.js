// Accessibility Utilities for WCAG Compliance
export const a11y = {
  // Check color contrast ratio
  getContrastRatio: (rgb1, rgb2) => {
    const getLuminance = (rgb) => {
      const [r, g, b] = rgb.match(/\d+/g).map(Number)
      const [rs, gs, bs] = [r, g, b].map(val => {
        val = val / 255
        return val <= 0.03928
          ? val / 12.92
          : Math.pow((val + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    }

    const l1 = getLuminance(rgb1)
    const l2 = getLuminance(rgb2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2)
  },

  // Generate accessible heading hierarchy
  validateHeadingHierarchy: (headings) => {
    const issues = []
    let previousLevel = 0

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1])
      
      if (level - previousLevel > 1 && previousLevel !== 0) {
        issues.push({
          index,
          heading: heading.textContent,
          issue: `Skipped heading levels from h${previousLevel} to h${level}`
        })
      }
      previousLevel = level
    })

    return issues
  },

  // Check for alt text
  checkAltText: (images) => {
    const issues = []
    
    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        issues.push({
          index,
          src: img.src,
          issue: 'Missing or empty alt text'
        })
      }
    })

    return issues
  },

  // Generate accessible button
  createAccessibleButton: (label, onClick, options = {}) => {
    return {
      role: 'button',
      'aria-label': label,
      'aria-pressed': options.pressed || false,
      'aria-disabled': options.disabled || false,
      tabIndex: options.disabled ? -1 : 0,
      onClick
    }
  },

  // Focus management
  manageFocus: (element) => {
    if (element && typeof element.focus === 'function') {
      element.focus()
      return true
    }
    return false
  },

  // Skip to content link
  createSkipLink: () => {
    return {
      className: 'skip-link',
      href: '#main-content',
      text: 'Skip to main content'
    }
  }
}

// SEO Enhancements
export const seoUtils = {
  // Generate structured data for Product
  generateProductSchema: (product) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      priceCurrency: 'LKR',
      availability: product.inStock ? 'InStock' : 'OutOfStock',
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'LKR',
        availability: product.inStock ? 'InStock' : 'OutOfStock'
      },
      aggregateRating: product.rating ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0
      } : undefined
    }
  },

  // Generate structured data for LocalBusiness
  generateLocalBusinessSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'E Flash',
      image: 'assets/images/logo.png',
      description: 'Professional Graphic Design, Web Design & Development Services',
      telephone: '+94775608073',
      email: 'info@eflash24.tech',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LK'
      },
      url: 'https://eflash24.tech',
      sameAs: [
        'https://www.facebook.com/eflash24',
        'https://www.instagram.com/eflash24'
      ]
    }
  },

  // Generate structured data for BreadcrumbList
  generateBreadcrumbSchema: (breadcrumbs) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `https://eflash24.tech${crumb.url}`
      }))
    }
  },

  // Generate Open Graph tags
  generateOpenGraphTags: (page) => {
    return {
      'og:title': page.title,
      'og:description': page.description,
      'og:image': page.image || '/assets/images/logo.png',
      'og:url': page.url,
      'og:type': page.type || 'website'
    }
  },

  // Generate Twitter Card tags
  generateTwitterCardTags: (page) => {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title,
      'twitter:description': page.description,
      'twitter:image': page.image || '/assets/images/logo.png',
      'twitter:creator': '@eflash24'
    }
  },

  // Optimize meta description
  optimizeMetaDescription: (text, maxLength = 160) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3) + '...'
  },

  // Generate XML sitemap entry
  generateSitemapEntry: (url, lastmod, changefreq, priority) => {
    return {
      loc: url,
      lastmod: lastmod || new Date().toISOString().split('T')[0],
      changefreq: changefreq || 'monthly',
      priority: priority || 0.8
    }
  }
}

export default { a11y, seoUtils }
