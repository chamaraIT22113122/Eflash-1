import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { SiteContentProvider } from './context/SiteContentContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LiveChat from './components/LiveChat'
import Toast from './components/Toast'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Packages from './pages/Packages'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  // Use basename for GitHub Pages deployment
  const basename = import.meta.env.PROD ? '/Eflash-1' : '/';
  
  return (
    <HelmetProvider>
      <ToastProvider>
        <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ThemeProvider>
            <CartProvider>
              <SiteContentProvider>
                <Toast />
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
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                  <ScrollToTop />
                  <LiveChat />
                </div>
              </SiteContentProvider>
            </CartProvider>
          </ThemeProvider>
        </Router>
      </ToastProvider>
    </HelmetProvider>
  )
}

export default App
