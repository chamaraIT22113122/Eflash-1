import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { AdminProvider } from './context/AdminContext'
import { SiteContentProvider } from './context/SiteContentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LiveChat from './components/LiveChat'
import ScrollProgress from './components/ScrollProgress'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Packages from './pages/Packages'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider>
          <AdminProvider>
            <SiteContentProvider>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* Public Routes */}
                <Route path="/*" element={
                  <div className="App">
                    <ScrollProgress />
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/packages" element={<Packages />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                    <ScrollToTop />
                    <LiveChat />
                  </div>
                } />
              </Routes>
            </SiteContentProvider>
          </AdminProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
