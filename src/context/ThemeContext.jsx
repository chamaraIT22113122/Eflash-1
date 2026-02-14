import React, { createContext, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const darkMode = true // Always dark mode

  useEffect(() => {
    document.documentElement.classList.add('dark-mode')
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
