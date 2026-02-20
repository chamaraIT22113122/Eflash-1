import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { SiteContentProvider } from './context/SiteContentContext'
import { CartProvider } from './context/CartContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LiveChat from './components/LiveChat'
import Toast from './components/Toast'
import ScrollProgress from './components/ScrollProgress'
import Loading from './components/Loading'
import { initializeAnalytics, trackPageView, trackSessionStart, trackSessionEnd } from './utils/analyticsTracking'
import './App.css'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Packages = lazy(() => import('./pages/Packages'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))
const Analytics = lazy(() => import('./pages/Analytics'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'))
const AdminNewsletter = lazy(() => import('./pages/admin/AdminNewsletter'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const AdminContent = lazy(() => import('./pages/admin/AdminContent'))

// Analytics wrapper component
function AnalyticsWrapper({ children }) {
  const location = useLocation()

  useEffect(() => {
    // Initialize analytics on mount
    initializeAnalytics()
    trackSessionStart()

    // Track session end on unmount
    return () => {
      trackSessionEnd()
    }
  }, [])

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname, document.title)
  }, [location])

  return children
}

function App() {
  // Use basename for GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/Eflash-1' : '/'
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ToastProvider>
          <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ThemeProvider>
              <CartProvider>
                <SiteContentProvider>
                  <Toast />
                  <AnalyticsWrapper>
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Home />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/about" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <About />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/services" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Services />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/portfolio" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Portfolio />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/packages" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Packages />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/shop" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Shop />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/cart" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Cart />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/contact" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Contact />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                        <Route path="/analytics" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <Analytics />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                          <Route path="dashboard" element={<AdminDashboard />} />
                          <Route path="analytics" element={<Analytics />} />
                          <Route path="reviews" element={<AdminReviews />} />
                          <Route path="orders" element={<AdminOrders />} />
                          <Route path="blog" element={<AdminBlog />} />
                          <Route path="content" element={<AdminContent />} />
                          <Route path="users" element={<AdminUsers />} />
                          <Route path="newsletter" element={<AdminNewsletter />} />
                          <Route index element={<AdminDashboard />} />
                        </Route>

                        <Route path="*" element={
                          <div className="App">
                            <ScrollProgress />
                            <Navbar />
                            <NotFound />
                            <Footer />
                            <ScrollToTop />
                            <LiveChat />
                          </div>
                        } />
                      </Routes>
                    </Suspense>
                  </AnalyticsWrapper>
                </SiteContentProvider>
              </CartProvider>
            </ThemeProvider>
          </Router>
        </ToastProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
