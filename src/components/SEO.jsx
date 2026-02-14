import React from 'react'
import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title = 'E Flash - Creative Design & Web Solutions',
  description = 'Professional Graphic Design, Web Design & Development Services in Sri Lanka. We create stunning designs and modern websites for businesses.',
  keywords = 'graphic design, web design, web development, UI/UX, branding, digital marketing, Sri Lanka, Colombo, logo design, website design',
  ogImage = '/assets/images/hero-banner.png',
  ogType = 'website',
  author = 'E Flash',
  canonicalUrl = window.location.href
}) => {
  const siteName = 'E Flash'
  const fullTitle = title.includes('E Flash') ? title : `${title} | ${siteName}`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "E Flash",
          "alternateName": "E Flash 24",
          "url": "https://eflash24.tech",
          "logo": "https://eflash24.tech/assets/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+94-76-487-6464",
            "contactType": "customer service",
            "areaServed": "LK",
            "availableLanguage": ["en", "si"]
          },
          "sameAs": [
            "https://facebook.com/eflash",
            "https://instagram.com/eflash",
            "https://twitter.com/eflash"
          ]
        })}
      </script>

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "E Flash",
          "image": "https://eflash24.tech/assets/images/logo.png",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Colombo",
            "addressCountry": "LK"
          },
          "telephone": "+94-76-487-6464",
          "email": "info@eflash24.tech",
          "priceRange": "$$",
          "openingHours": "Mo-Sa 09:00-18:00"
        })}
      </script>
    </Helmet>
  )
}

export default SEO
