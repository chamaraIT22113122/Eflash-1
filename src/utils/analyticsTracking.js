// Enhanced Analytics Tracking with Google Analytics 4 and Local Storage
import ReactGA from 'react-ga4'

// Initialize GA4 - Replace with your actual tracking ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' // TODO: Replace with your actual GA4 ID
let isInitialized = false

// Local analytics storage key
const ANALYTICS_KEY = 'eflash_analytics'

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (!isInitialized && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    try {
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
          siteSpeedSampleRate: 100,
        },
      })
      isInitialized = true
      console.log('✅ Google Analytics initialized')
    } catch (error) {
      console.error('❌ Failed to initialize Google Analytics:', error)
    }
  } else {
    console.log('⚠️ Google Analytics not configured. Using local tracking only.')
  }
}

// Get local analytics data
const getLocalAnalytics = () => {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY)
    if (!data) {
      return {
        pageViews: [],
        events: [],
        sessions: [],
        visitors: new Set(),
        summary: {
          totalPageViews: 0,
          totalEvents: 0,
          totalSessions: 0,
          uniqueVisitors: 0,
          avgSessionDuration: 0,
          bounceRate: 0,
          topPages: {},
          topEvents: {},
          deviceTypes: {},
          browsers: {},
          trafficSources: {}
        }
      }
    }
    
    const parsed = JSON.parse(data)
    // Convert visitors array back to Set if it exists
    if (parsed.visitors && Array.isArray(parsed.visitors)) {
      parsed.visitors = new Set(parsed.visitors)
    } else if (!parsed.visitors) {
      parsed.visitors = new Set()
    }
    
    return parsed
  } catch (error) {
    console.error('Error reading analytics:', error)
    return null
  }
}

// Save local analytics data
const saveLocalAnalytics = (data) => {
  try {
    // Convert Set to Array for storage
    const storageData = {
      ...data,
      visitors: Array.from(data.visitors)
    }
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(storageData))
  } catch (error) {
    console.error('Error saving analytics:', error)
  }
}

// Generate unique visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem('eflash_visitor_id')
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('eflash_visitor_id', visitorId)
  }
  return visitorId
}

// Get current session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('eflash_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('eflash_session_id', sessionId)
    sessionStorage.setItem('eflash_session_start', Date.now().toString())
  }
  return sessionId
}

// Get device type
const getDeviceType = () => {
  const width = window.innerWidth
  if (width < 768) return 'Mobile'
  if (width < 1024) return 'Tablet'
  return 'Desktop'
}

// Get browser info
const getBrowserInfo = () => {
  const ua = navigator.userAgent
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'
  return 'Other'
}

// Get traffic source
const getTrafficSource = () => {
  const referrer = document.referrer
  if (!referrer) return 'Direct'
  if (referrer.includes('google')) return 'Google'
  if (referrer.includes('facebook')) return 'Facebook'
  if (referrer.includes('twitter')) return 'Twitter'
  if (referrer.includes('linkedin')) return 'LinkedIn'
  return 'Referral'
}

// Track page view
export const trackPageView = (path, title) => {
  // Google Analytics
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path, title })
  }

  // Local tracking
  const analytics = getLocalAnalytics()
  if (!analytics) return

  const visitorId = getVisitorId()
  const sessionId = getSessionId()
  const timestamp = new Date().toISOString()

  const pageView = {
    id: `pv_${Date.now()}`,
    path,
    title,
    visitorId,
    sessionId,
    timestamp,
    device: getDeviceType(),
    browser: getBrowserInfo(),
    source: getTrafficSource(),
    referrer: document.referrer || 'Direct'
  }

  analytics.pageViews.push(pageView)
  analytics.visitors.add(visitorId)
  analytics.summary.totalPageViews++

  // Update top pages
  analytics.summary.topPages[path] = (analytics.summary.topPages[path] || 0) + 1

  // Update device types
  const device = getDeviceType()
  analytics.summary.deviceTypes[device] = (analytics.summary.deviceTypes[device] || 0) + 1

  // Update browsers
  const browser = getBrowserInfo()
  analytics.summary.browsers[browser] = (analytics.summary.browsers[browser] || 0) + 1

  // Update traffic sources
  const source = getTrafficSource()
  analytics.summary.trafficSources[source] = (analytics.summary.trafficSources[source] || 0) + 1

  // Update unique visitors
  analytics.summary.uniqueVisitors = analytics.visitors.size

  saveLocalAnalytics(analytics)
}

// Track custom event
export const trackEvent = (category, action, label, value) => {
  // Google Analytics
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value
    })
  }

  // Local tracking
  const analytics = getLocalAnalytics()
  if (!analytics) return

  const event = {
    id: `evt_${Date.now()}`,
    category,
    action,
    label,
    value,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    path: window.location.pathname
  }

  analytics.events.push(event)
  analytics.summary.totalEvents++

  // Update top events
  const eventKey = `${category}:${action}`
  analytics.summary.topEvents[eventKey] = (analytics.summary.topEvents[eventKey] || 0) + 1

  saveLocalAnalytics(analytics)
}

// Track session start
export const trackSessionStart = () => {
  const analytics = getLocalAnalytics()
  if (!analytics) return

  const sessionId = getSessionId()
  const session = {
    id: sessionId,
    visitorId: getVisitorId(),
    startTime: Date.now(),
    device: getDeviceType(),
    browser: getBrowserInfo(),
    source: getTrafficSource()
  }

  analytics.sessions.push(session)
  analytics.summary.totalSessions++

  saveLocalAnalytics(analytics)
}

// Track session end
export const trackSessionEnd = () => {
  const analytics = getLocalAnalytics()
  if (!analytics) return

  const sessionId = getSessionId()
  const session = analytics.sessions.find(s => s.id === sessionId)

  if (session && !session.endTime) {
    session.endTime = Date.now()
    session.duration = session.endTime - session.startTime

    // Update average session duration
    const completedSessions = analytics.sessions.filter(s => s.endTime)
    const totalDuration = completedSessions.reduce((sum, s) => sum + s.duration, 0)
    analytics.summary.avgSessionDuration = totalDuration / completedSessions.length

    saveLocalAnalytics(analytics)
  }
}

// Track button click
export const trackButtonClick = (buttonName, location) => {
  trackEvent('Button', 'Click', `${buttonName} - ${location}`)
}

// Track form submission
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('Form', success ? 'Submit Success' : 'Submit Failed', formName)
}

// Track link click
export const trackLinkClick = (linkName, destination) => {
  trackEvent('Link', 'Click', `${linkName} → ${destination}`)
}

// Track download
export const trackDownload = (fileName) => {
  trackEvent('Download', 'File', fileName)
}

// Track search
export const trackSearch = (searchTerm) => {
  trackEvent('Search', 'Query', searchTerm)
}

// Track scroll depth
export const trackScrollDepth = (depth) => {
  trackEvent('Engagement', 'Scroll Depth', `${depth}%`, depth)
}

// Track time on page
export const trackTimeOnPage = (page, seconds) => {
  trackEvent('Engagement', 'Time on Page', page, seconds)
}

// Get analytics summary
export const getAnalyticsSummary = () => {
  const analytics = getLocalAnalytics()
  if (!analytics) return null

  // Calculate bounce rate (sessions with only 1 page view)
  const bouncedSessions = analytics.sessions.filter(session => {
    const sessionPageViews = analytics.pageViews.filter(pv => pv.sessionId === session.id)
    return sessionPageViews.length === 1
  })
  analytics.summary.bounceRate = analytics.sessions.length > 0
    ? (bouncedSessions.length / analytics.sessions.length) * 100
    : 0

  return analytics.summary
}

// Get detailed analytics
export const getDetailedAnalytics = () => {
  const analytics = getLocalAnalytics()
  if (!analytics) return null

  // Convert visitors Set back to Set if it's an array
  if (Array.isArray(analytics.visitors)) {
    analytics.visitors = new Set(analytics.visitors)
  }

  return analytics
}

// Clear analytics data
export const clearAnalytics = () => {
  localStorage.removeItem(ANALYTICS_KEY)
  console.log('Analytics data cleared')
}

// Export analytics data
export const exportAnalytics = () => {
  const analytics = getLocalAnalytics()
  if (!analytics) return null

  const dataStr = JSON.stringify(analytics, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `eflash-analytics-${new Date().toISOString().split('T')[0]}.json`
  link.click()
}

export default {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackSessionStart,
  trackSessionEnd,
  trackButtonClick,
  trackFormSubmission,
  trackLinkClick,
  trackDownload,
  trackSearch,
  trackScrollDepth,
  trackTimeOnPage,
  getAnalyticsSummary,
  getDetailedAnalytics,
  clearAnalytics,
  exportAnalytics
}
