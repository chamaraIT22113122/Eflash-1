import React from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { FaExclamationTriangle, FaHome } from 'react-icons/fa'
import './ErrorBoundary.css'

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary">
      <div className="error-container">
        <div className="error-icon">
          <FaExclamationTriangle />
        </div>
        <h1>Oops! Something went wrong</h1>
        <p className="error-message">
          We're sorry, but something unexpected happened. Our team has been notified.
        </p>
        <details className="error-details">
          <summary>Error Details</summary>
          <pre>{error.message}</pre>
        </details>
        <div className="error-actions">
          <button onClick={resetErrorBoundary} className="btn-retry">
            Try Again
          </button>
          <a href="/" className="btn-home">
            <FaHome /> Go to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}

// Error handler
const errorHandler = (error, info) => {
  // Log error to console
  console.error('Error caught by boundary:', error, info)
  
  // You can send error to analytics/monitoring service
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false
    })
  }
}

// ErrorBoundary wrapper component
export function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler}
      onReset={() => {
        // Reset app state if needed
        window.location.href = '/'
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
