// Blog Management System
const BLOG_POSTS_DB_KEY = 'eflash_blog_posts'

export const blogService = {
  // Create blog post
  createPost: (postData) => {
    const post = {
      id: `POST-${Date.now()}`,
      slug: postData.slug || postData.title.toLowerCase().replace(/\s+/g, '-'),
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: postData.published || false,
      views: 0,
      likes: 0,
      comments: []
    }

    const posts = blogService.getAllPosts()
    posts.push(post)
    localStorage.setItem(BLOG_POSTS_DB_KEY, JSON.stringify(posts))

    return post
  },

  // Get all posts
  getAllPosts: () => {
    const postsJson = localStorage.getItem(BLOG_POSTS_DB_KEY)
    return postsJson ? JSON.parse(postsJson) : []
  },

  // Get published posts
  getPublishedPosts: () => {
    const posts = blogService.getAllPosts()
    return posts.filter(p => p.published).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )
  },

  // Get post by ID or slug
  getPostByIdentifier: (identifier) => {
    const posts = blogService.getAllPosts()
    return posts.find(p => p.id === identifier || p.slug === identifier)
  },

  // Get posts by category
  getPostsByCategory: (category) => {
    const posts = blogService.getPublishedPosts()
    return posts.filter(p => p.category === category)
  },

  // Get posts by tag
  getPostsByTag: (tag) => {
    const posts = blogService.getPublishedPosts()
    return posts.filter(p => p.tags && p.tags.includes(tag))
  },

  // Search posts
  searchPosts: (query) => {
    const posts = blogService.getPublishedPosts()
    const lowerQuery = query.toLowerCase()
    
    return posts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.content.toLowerCase().includes(lowerQuery) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(lowerQuery)))
    )
  },

  // Update post
  updatePost: (postId, updates) => {
    const posts = blogService.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)

    if (postIndex !== -1) {
      posts[postIndex] = {
        ...posts[postIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(BLOG_POSTS_DB_KEY, JSON.stringify(posts))
      return posts[postIndex]
    }

    return null
  },

  // Delete post
  deletePost: (postId) => {
    const posts = blogService.getAllPosts()
    const filtered = posts.filter(p => p.id !== postId)
    localStorage.setItem(BLOG_POSTS_DB_KEY, JSON.stringify(filtered))
    return filtered
  },

  // Increment views
  incrementViews: (postId) => {
    const post = blogService.getPostByIdentifier(postId)
    if (post) {
      post.views = (post.views || 0) + 1
      return blogService.updatePost(postId, { views: post.views })
    }
    return null
  },

  // Add comment
  addComment: (postId, commentData) => {
    const post = blogService.getPostByIdentifier(postId)
    
    if (post) {
      if (!post.comments) post.comments = []
      
      const comment = {
        id: `COM-${Date.now()}`,
        ...commentData,
        createdAt: new Date().toISOString(),
        approved: false
      }

      post.comments.push(comment)
      return blogService.updatePost(postId, { comments: post.comments })
    }

    return null
  },

  // Get trending posts
  getTrendingPosts: (limit = 5) => {
    const posts = blogService.getPublishedPosts()
    return posts
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit)
  },

  // Get related posts
  getRelatedPosts: (postId, limit = 3) => {
    const post = blogService.getPostByIdentifier(postId)
    if (!post) return []

    const posts = blogService.getPublishedPosts()
    // Find posts with same category or tags
    return posts
      .filter(p => 
        p.id !== postId && (
          p.category === post.category ||
          (p.tags && post.tags && p.tags.some(t => post.tags.includes(t)))
        )
      )
      .slice(0, limit)
  },

  // Get all categories
  getAllCategories: () => {
    const posts = blogService.getPublishedPosts()
    const categories = new Set(posts.map(p => p.category).filter(Boolean))
    return Array.from(categories)
  },

  // Get all tags
  getAllTags: () => {
    const posts = blogService.getPublishedPosts()
    const tags = new Set()
    posts.forEach(p => {
      if (p.tags && Array.isArray(p.tags)) {
        p.tags.forEach(t => tags.add(t))
      }
    })
    return Array.from(tags)
  },

  // Publish post
  publishPost: (postId, published = true) => {
    return blogService.updatePost(postId, { published })
  }
}

// Export individual functions for easier imports
export const createPost = blogService.createPost
export const getAllPosts = blogService.getAllPosts
export const getPublishedPosts = blogService.getPublishedPosts
export const getPostByIdentifier = blogService.getPostByIdentifier
export const getPostsByCategory = blogService.getPostsByCategory
export const getPostsByTag = blogService.getPostsByTag
export const searchPosts = blogService.searchPosts
export const updatePost = blogService.updatePost
export const deletePost = blogService.deletePost
export const incrementViews = blogService.incrementViews
export const addComment = blogService.addComment
export const getTrendingPosts = blogService.getTrendingPosts
export const getRelatedPosts = blogService.getRelatedPosts
export const getAllCategories = blogService.getAllCategories
export const getAllTags = blogService.getAllTags
export const publishPost = blogService.publishPost

export default blogService
