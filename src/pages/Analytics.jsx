import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaUsers, FaEye, FaMousePointer, FaClock, FaMobile, FaDesktop, 
  FaChrome, FaFirefox, FaSafari, FaDownload, FaTrash, FaChartLine,
  FaMapMarkerAlt, FaCalendarAlt
} from 'react-icons/fa'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { getAnalyticsSummary, getDetailedAnalytics, exportAnalytics, clearAnalytics } from '../utils/analyticsTracking'
import SEO from '../components/SEO'
import './Analytics.css'

const Analytics = () => {
  const [summary, setSummary] = useState(null)
  const [details, setDetails] = useState(null)
  const [timeRange, setTimeRange] = useState('7d') // 24h, 7d, 30d, all
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    loadAnalytics()
  }, [refreshKey, timeRange])

  const loadAnalytics = () => {
    const summaryData = getAnalyticsSummary()
    const detailsData = getDetailedAnalytics()
    setSummary(summaryData)
    setDetails(detailsData)
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      clearAnalytics()
      setRefreshKey(prev => prev + 1)
    }
  }

  const handleExportData = () => {
    exportAnalytics()
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  // Filter data by time range
  const filterByTimeRange = (data) => {
    if (!data || timeRange === 'all') return data

    const now = Date.now()
    const ranges = {
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    }

    const cutoff = now - ranges[timeRange]
    return data.filter(item => new Date(item.timestamp).getTime() > cutoff)
  }

  // Prepare chart data
  const getPageViewsChartData = () => {
    if (!details || !details.pageViews) return []

    const filtered = filterByTimeRange(details.pageViews)
    const grouped = {}

    filtered.forEach(pv => {
      const date = new Date(pv.timestamp).toLocaleDateString()
      grouped[date] = (grouped[date] || 0) + 1
    })

    return Object.entries(grouped).map(([date, views]) => ({
      date,
      views
    }))
  }

  const getTopPagesData = () => {
    if (!summary || !summary.topPages) return []

    return Object.entries(summary.topPages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({
        page: page === '/' ? 'Home' : page.replace(/^\//, ''),
        count
      }))
  }

  const getDeviceData = () => {
    if (!summary || !summary.deviceTypes) return []

    return Object.entries(summary.deviceTypes).map(([device, count]) => ({
      name: device,
      value: count
    }))
  }

  const getBrowserData = () => {
    if (!summary || !summary.browsers) return []

    return Object.entries(summary.browsers).map(([browser, count]) => ({
      name: browser,
      value: count
    }))
  }

  const getTrafficSourceData = () => {
    if (!summary || !summary.trafficSources) return []

    return Object.entries(summary.trafficSources)
      .sort((a, b) => b[1] - a[1])
      .map(([source, count]) => ({
        source,
        count
      }))
  }

  const getEventsChartData = () => {
    if (!details || !details.events) return []

    const filtered = filterByTimeRange(details.events)
    const grouped = {}

    filtered.forEach(evt => {
      grouped[evt.category] = (grouped[evt.category] || 0) + 1
    })

    return Object.entries(grouped).map(([category, count]) => ({
      category,
      count
    }))
  }

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a']

  if (!summary || !details) {
    return (
      <div className="analytics-page">
        <div className="container">
          <div className="analytics-empty">
            <FaChartLine size={80} />
            <h2>No Analytics Data Yet</h2>
            <p>Start browsing the site to collect analytics data</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="analytics-page">
      <SEO 
        title="Analytics Dashboard - E Flash"
        description="Website traffic and analytics dashboard"
      />

      <div className="container">
        {/* Header */}
        <div className="analytics-header">
          <div className="header-content">
            <h1>Analytics Dashboard</h1>
            <p>Real-time website traffic and visitor insights</p>
          </div>

          <div className="header-actions">
            <select 
              className="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>

            <button className="action-btn refresh-btn" onClick={handleRefresh}>
              <FaChartLine /> Refresh
            </button>

            <button className="action-btn export-btn" onClick={handleExportData}>
              <FaDownload /> Export
            </button>

            <button className="action-btn clear-btn" onClick={handleClearData}>
              <FaTrash /> Clear Data
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <motion.div 
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
              <FaEye />
            </div>
            <div className="kpi-content">
              <h3>{summary.totalPageViews.toLocaleString()}</h3>
              <p>Total Page Views</p>
            </div>
          </motion.div>

          <motion.div 
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
              <FaUsers />
            </div>
            <div className="kpi-content">
              <h3>{summary.uniqueVisitors.toLocaleString()}</h3>
              <p>Unique Visitors</p>
            </div>
          </motion.div>

          <motion.div 
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
              <FaMousePointer />
            </div>
            <div className="kpi-content">
              <h3>{summary.totalEvents.toLocaleString()}</h3>
              <p>Total Events</p>
            </div>
          </motion.div>

          <motion.div 
            className="kpi-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
              <FaClock />
            </div>
            <div className="kpi-content">
              <h3>{Math.round(summary.avgSessionDuration / 1000 / 60)}m</h3>
              <p>Avg. Session Time</p>
            </div>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Page Views Over Time */}
          <motion.div 
            className="chart-card full-width"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3><FaChartLine /> Page Views Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getPageViewsChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#667eea" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Pages */}
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3><FaMapMarkerAlt /> Top Pages</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getTopPagesData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="page" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#764ba2" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Device Types */}
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3><FaMobile /> Device Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getDeviceData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getDeviceData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3><FaCalendarAlt /> Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getTrafficSourceData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4facfe" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Browsers */}
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3><FaChrome /> Browsers</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getBrowserData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getBrowserData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Events */}
          <motion.div 
            className="chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3><FaMousePointer /> Event Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getEventsChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#43e97b" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Summary Stats */}
        <motion.div 
          className="summary-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3>Summary Statistics</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Total Sessions:</span>
              <span className="value">{summary.totalSessions.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="label">Bounce Rate:</span>
              <span className="value">{summary.bounceRate.toFixed(1)}%</span>
            </div>
            <div className="summary-item">
              <span className="label">Pages per Session:</span>
              <span className="value">
                {summary.totalSessions > 0 
                  ? (summary.totalPageViews / summary.totalSessions).toFixed(1)
                  : '0'}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Events per Session:</span>
              <span className="value">
                {summary.totalSessions > 0 
                  ? (summary.totalEvents / summary.totalSessions).toFixed(1)
                  : '0'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
