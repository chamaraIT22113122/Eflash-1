import React from 'react'
import { useToast } from '../context/ToastContext'
import './Toast.css'

const Toast = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close toast"
            >
              ×
            </button>
          </div>
          <div className="toast-progress"></div>
        </div>
      ))}
    </div>
  )
}

export default Toast