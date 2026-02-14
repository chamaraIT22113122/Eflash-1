/**
 * Meta Tags Helper
 * For dynamic meta tags and SEO
 */

export const setMetaTags = (metaData = {}) => {
  const {
    title = 'E Flash - Creative Design & Web Solutions',
    description = 'Professional Graphic Design, Web Design & Development Services',
    keywords = 'graphic design, web design, web development, UI/UX, branding',
    image = '/assets/images/logo.png',
    url = window.location.href,
    type = 'website',
  } = metaData

  // Update title
  document.title = title

  // Update meta description
  let descMeta = document.querySelector('meta[name="description"]')
  if (descMeta) {
    descMeta.setAttribute('content', description)
  } else {
    descMeta = document.createElement('meta')
    descMeta.setAttribute('name', 'description')
    descMeta.setAttribute('content', description)
    document.head.appendChild(descMeta)
  }

  // Update keywords
  let keywordsMeta = document.querySelector('meta[name="keywords"]')
  if (keywordsMeta) {
    keywordsMeta.setAttribute('content', keywords)
  } else {
    keywordsMeta = document.createElement('meta')
    keywordsMeta.setAttribute('name', 'keywords')
    keywordsMeta.setAttribute('content', keywords)
    document.head.appendChild(keywordsMeta)
  }

  // Open Graph tags
  setOpenGraphTags({ title, description, image, url, type })
}

export const setOpenGraphTags = ({ title, description, image, url, type }) => {
  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
  ]

  ogTags.forEach(({ property, content }) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (meta) {
      meta.setAttribute('content', content)
    } else {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }
  })
}

export const setCanonicalUrl = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', url)
  } else {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    canonical.setAttribute('href', url)
    document.head.appendChild(canonical)
  }
}

export const setStructuredData = (data) => {
  let script = document.querySelector('script[type="application/ld+json"]')
  if (script) {
    script.textContent = JSON.stringify(data)
  } else {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }
}

export default {
  setMetaTags,
  setOpenGraphTags,
  setCanonicalUrl,
  setStructuredData,
}