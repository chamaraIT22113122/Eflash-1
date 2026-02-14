// Advanced Search and Filter Utility
export const searchService = {
  // Search products with filters
  searchProducts: (products, query,  filters = {}) => {
    let results = products

    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        (p.category && p.category.toLowerCase().includes(lowerQuery))
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => p.category === filters.category)
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      results = results.filter(p => p.price >= filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter(p => p.price <= filters.maxPrice)
    }

    // Rating filter
    if (filters.minRating !== undefined) {
      results = results.filter(p => (p.rating || 0) >= filters.minRating)
    }

    // Stock filter
    if (filters.inStockOnly) {
      results = results.filter(p => (p.inStock !== false && p.quantity > 0))
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          results.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'popular':
          results.sort((a, b) => (b.views || 0) - (a.views || 0))
          break
        default:
          break
      }
    }

    return results
  },

  // Search services
  searchServices: (services, query) => {
    if (!query) return services

    const lowerQuery = query.toLowerCase()
    return services.filter(s =>
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      (s.features && s.features.some(f => f.toLowerCase().includes(lowerQuery)))
    )
  },

  // Search portfolio
  searchPortfolio: (projects, query, filters = {}) => {
    let results = projects

    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase()
      results = results.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        (p.category && p.category.toLowerCase().includes(lowerQuery))
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => 
        p.category && p.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Year filter
    if (filters.year) {
      results = results.filter(p => {
        const year = new Date(p.completedDate || p.createdAt).getFullYear()
        return year === parseInt(filters.year)
      })
    }

    // Sort
    if (filters.sortBy === 'newest') {
      results.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
    }

    return results
  },

  // Get filter options
  getProductFilters: (products) => {
    return {
      categories: [...new Set(products.map(p => p.category).filter(Boolean))],
      priceRange: {
        min: Math.min(...products.map(p => p.price || 0)),
        max: Math.max(...products.map(p => p.price || 0))
      },
      ratings: [5, 4, 3, 2, 1]
    }
  },

  // Get portfolio filter options
  getPortfolioFilters: (projects) => {
    const years = [
      ...new Set(
        projects
          .map(p => new Date(p.completedDate || p.createdAt).getFullYear())
          .filter(Boolean)
      )
    ].sort((a, b) => b - a)

    return {
      categories: [...new Set(projects.map(p => p.category).filter(Boolean))],
      years
    }
  },

  // Fuzzy search (more lenient matching)
  fuzzySearch: (items, query, fields = ['name', 'title', 'description']) => {
    const lowerQuery = query.toLowerCase()
    
    return items.filter(item => {
      return fields.some(field => {
        const value = item[field]
        if (!value) return false
        
        const lowerValue = value.toString().toLowerCase()
        const queryChars = lowerQuery.split('')
        let matchIndex = 0
        
        for (let i = 0; i < lowerValue.length && matchIndex < queryChars.length; i++) {
          if (lowerValue[i] === queryChars[matchIndex]) {
            matchIndex++
          }
        }
        
        return matchIndex === queryChars.length
      })
    })
  }
}

export default searchService
