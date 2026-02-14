import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  effect = 'blur',
  placeholderSrc = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  ...props 
}) => {
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      effect={effect}
      placeholderSrc={placeholderSrc}
      className={className}
      {...props}
    />
  )
}

export default LazyImage
