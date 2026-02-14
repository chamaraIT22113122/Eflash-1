import React, { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  // Default admin credentials (change these!)
  const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@eflash.com'
  }

  useEffect(() => {
    // Check if admin is already logged in
    const savedAuth = localStorage.getItem('adminAuth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      if (authData.isAuthenticated) {
        setIsAuthenticated(true)
        setAdminUser(authData.user)
      }
    }
  }, [])

  const login = (username, password) => {
    // Simple authentication (in production, use proper backend auth)
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const user = {
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email
      }
      setIsAuthenticated(true)
      setAdminUser(user)
      localStorage.setItem('adminAuth', JSON.stringify({
        isAuthenticated: true,
        user
      }))
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    localStorage.removeItem('adminAuth')
  }

  const value = {
    isAuthenticated,
    adminUser,
    login,
    logout
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
