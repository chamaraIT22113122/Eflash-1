import { useState, useEffect } from 'react';
import { getAllPosts, createPost, updatePost, deletePost, publishPost } from '../../utils/blogService';
import './AdminBlog.css';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Design',
    tags: '',
    image: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = getAllPosts();
    setPosts(allPosts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (editingPost) {
      if (updatePost(editingPost.id, postData)) {
        resetForm();
        loadPosts();
      }
    } else {
      if (createPost(postData)) {
        resetForm();
        loadPosts();
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      image: post.image
    });
    setShowEditor(true);
  };

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      if (deletePost(postId)) {
        loadPosts();
      }
    }
  };

  const handlePublish = (postId) => {
    if (publishPost(postId)) {
      loadPosts();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Design',
      tags: '',
      image: ''
    });
    setEditingPost(null);
    setShowEditor(false);
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'published') return post.published;
    if (filter === 'draft') return !post.published;
    return true;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length
  };

  return (
    <div className="admin-blog">
      <div className="admin-blog-header">
        <h1>Blog Management</h1>
        <button className="btn-new-post" onClick={() => setShowEditor(true)}>
          + New Post
        </button>
      </div>

      <div className="blog-stats">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Posts</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.published}</span>
          <span className="stat-label">Published</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.drafts}</span>
          <span className="stat-label">Drafts</span>
        </div>
      </div>

      {showEditor && (
        <div className="blog-editor">
          <div className="editor-header">
            <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <button className="btn-close" onClick={resetForm}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter post title"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  placeholder="Author name"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="News">News</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                placeholder="Brief description (shown in blog list)"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Full blog post content"
                rows="10"
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="design, web, tutorial"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blog-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Posts
        </button>
        <button
          className={filter === 'published' ? 'active' : ''}
          onClick={() => setFilter('published')}
        >
          Published ({stats.published})
        </button>
        <button
          className={filter === 'draft' ? 'active' : ''}
          onClick={() => setFilter('draft')}
        >
          Drafts ({stats.drafts})
        </button>
      </div>

      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No {filter !== 'all' ? filter : ''} posts found.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className={`post-card ${post.published ? 'published' : 'draft'}`}>
              {post.image && (
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              
              <div className="post-content">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <span className={`post-status ${post.published ? 'status-published' : 'status-draft'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="post-excerpt">{post.excerpt}</p>

                <div className="post-meta">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="post-actions">
                  <button className="btn-edit" onClick={() => handleEdit(post)}>
                    Edit
                  </button>
                  {!post.published && (
                    <button className="btn-publish" onClick={() => handlePublish(post.id)}>
                      Publish
                    </button>
                  )}
                  <button className="btn-delete" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
