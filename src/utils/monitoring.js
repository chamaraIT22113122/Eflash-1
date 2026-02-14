// Error Tracking and Monitoring (Sentry-like)
const ERROR_LOG_KEY = 'eflash_error_logs'

export const errorTracker = {
  // Log error
  logError: (error, context = {}) => {
    const errorLog = {
      id: `ERR-${Date.now()}`,
      message: error.message || String(error),
      stack: error.stack,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      severity: context.severity || 'error'
    }

    // Save locally
    const logs = errorTracker.getErrorLogs()
    logs.push(errorLog)
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(logs))

    // Send to backend (when ready)
    ;(async () => {
      try {
        await fetch('/api/errors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorLog)
        })
      } catch (e) {
        console.log('Backend error tracking unavailable')
      }
    })()

    return errorLog
  },

  // Get all error logs
  getErrorLogs: () => {
    const logsJson = localStorage.getItem(ERROR_LOG_KEY)
    return logsJson ? JSON.parse(logsJson) : []
  },

  // Get recent errors
  getRecentErrors: (limit = 10) => {
    const logs = errorTracker.getErrorLogs()
    return logs.slice(-limit).reverse()
  },

  // Clear error logs
  clearErrorLogs: () => {
    localStorage.removeItem(ERROR_LOG_KEY)
  },

  // Setup global error handler
  setupGlobalErrorHandler: () => {
    window.addEventListener('error', (event) => {
      errorTracker.logError(event.error, { type: 'uncaught' })
    })

    window.addEventListener('unhandledrejection', (event) => {
      errorTracker.logError(event.reason, { type: 'unhandled-promise' })
    })
  }
}

// Performance Monitoring
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad: () => {
    if (!window.performance) return null

    const perfData = window.performance.timing
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart

    return {
      pageLoadTime,
      domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      resourcesLoaded: perfData.loadEventEnd - perfData.responseEnd,
      firstContentfulPaint: this.getFirstContentfulPaint(),
      largestContentfulPaint: this.getLargestContentfulPaint()
    }
  },

  // Get First Contentful Paint
  getFirstContentfulPaint: () => {
    const entries = performance.getEntriesByType('paint')
    const fcp = entries.find(entry => entry.name === 'first-contentful-paint')
    return fcp ? fcp.startTime : null
  },

  // Get Largest Contentful Paint
  getLargestContentfulPaint: () => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        resolve(lastEntry.renderTime || lastEntry.loadTime)
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      setTimeout(() => resolve(null), 5000) // Timeout after 5 seconds
    })
  },

  // Measure function execution time
  measureFunction: async (fn, name) => {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    const duration = end - start

    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`)

    return { result, duration }
  },

  // Get memory usage (if available)
  getMemoryUsage: () => {
    if (!performance.memory) return null

    return {
      used: performance.memory.usedJSHeapSize / 1048576,
      limit: performance.memory.jsHeapSizeLimit / 1048576,
      percentage: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
    }
  },

  // Monitor network requests
  monitorNetworkRequests: () => {
    const entries = performance.getEntriesByType('resource')
    
    return entries.map(entry => ({
      name: entry.name,
      duration: entry.duration,
      size: entry.transferSize,
      type: entry.initiatorType
    }))
  }
}

// User Behavior Analytics
export const userBehavior = {
  // Track time on page
  trackTimeOnPage: (pageName) => {
    const startTime = Date.now()
    
    return () => {
      const timeSpent = (Date.now() - startTime) / 1000
      console.log(`⏱️ Time on ${pageName}: ${timeSpent.toFixed(2)}s`)
      return timeSpent
    }
  },

  // Track scroll depth
  trackScrollDepth: () => {
    let maxScroll = 0
    
    const handleScroll = () => {
      const scrollPercentage = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      return maxScroll
    }
  },

  // Track user interactions
  trackInteraction: (interactionType, data = {}) => {
    const interaction = {
      type: interactionType,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...data
    }

    // Send to analytics
    console.log('📊 Interaction:', interaction)
    
    return interaction
  }
}

export default { errorTracker, performanceMonitor, userBehavior }
