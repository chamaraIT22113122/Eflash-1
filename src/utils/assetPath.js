// Helper function to generate correct asset paths
export const getAssetPath = (imagePath) => {
  if (!imagePath) return ''
  
  // If it's a full URL, return as-is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath
  }
  
  // Get base path from vite config
  const basePath = import.meta.env.MODE === 'production' ? '/Eflash-1' : ''
  
  // If path already starts with /, prepend base
  if (imagePath.startsWith('/')) {
    return basePath + imagePath
  }
  
  // Otherwise prepend base and /
  return basePath + '/' + imagePath
}

// Alternative: Use this if you want to modify all image paths
export const normalizeImagePaths = (projects) => {
  return projects.map(project => ({
    ...project,
    thumbnail: getAssetPath(project.thumbnail),
    images: project.images?.map(img => getAssetPath(img)) || []
  }))
}
