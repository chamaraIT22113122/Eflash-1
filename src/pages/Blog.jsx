import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaTag, FaClock, FaSearch, FaArrowRight } from 'react-icons/fa'
import SEO from '../components/SEO'
import './Blog.css'

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 1,
      slug: 'top-10-graphic-design-trends-2026',
      title: 'Top 10 Graphic Design Trends for 2026',
      excerpt: 'Discover the latest design trends that are shaping the creative industry this year.',
      content: '',
      author: 'E Flash Team',
      date: '2026-02-01',
      category: 'Design Trends',
      image: '/assets/images/portfolio/Social media p/11.png',
      readTime: '5 min read',
      tags: ['Design', 'Trends', 'Graphic Design']
    },
    {
      id: 2,
      slug: 'why-your-business-needs-professional-website',
      title: 'Why Your Business Needs a Professional Website',
      excerpt: 'Learn how a professional website can transform your business and boost your online presence.',
      content: '',
      author: 'E Flash Team',
      date: '2026-01-28',
      category: 'Web Development',
      image: '/assets/images/portfolio/banners/banners-01.png',
      readTime: '7 min read',
      tags: ['Website', 'Business', 'Marketing']
    },
    {
      id: 3,
      slug: 'creating-memorable-brand-identity',
      title: 'Creating a Memorable Brand Identity',
      excerpt: 'A comprehensive guide to building a strong brand identity that resonates with your audience.',
      content: '',
      author: 'E Flash Team',
      date: '2026-01-25',
      category: 'Branding',
      image: '/assets/images/portfolio/logo/459161113_921611919989918_3548539809512993639_n.jpg',
      readTime: '8 min read',
      tags: ['Branding', 'Logo', 'Identity']
    },
    {
      id: 4,
      slug: 'social-media-design-best-practices',
      title: 'Social Media Design Best Practices',
      excerpt: 'Tips and tricks for creating engaging social media graphics that drive engagement.',
      content: '',
      author: 'E Flash Team',
      date: '2026-01-20',
      category: 'Social Media',
      image: '/assets/images/portfolio/Social media p/14.png',
      readTime: '6 min read',
      tags: ['Social Media', 'Design', 'Marketing']
    },
    {
      id: 5,
      slug: 'color-psychology-in-design',
      title: 'The Psychology of Color in Design',
      excerpt: 'Understanding how colors influence emotions and decision-making in design.',
      content: '',
      author: 'E Flash Team',
      date: '2026-01-15',
      category: 'Design Tips',
      image: '/assets/images/portfolio/Social media p/35.png',
      readTime: '5 min read',
      tags: ['Color', 'Psychology', 'Design']
    },
    {
      id: 6,
      slug: 'responsive-web-design-essentials',
      title: 'Responsive Web Design Essentials',
      excerpt: 'Everything you need to know about creating websites that work on all devices.',
      content: '',
      author: 'E Flash Team',
      date: '2026-01-10',
      category: 'Web Development',
      image: '/assets/images/portfolio/banners/banners-02.png',
      readTime: '9 min read',
      tags: ['Responsive', 'Web Design', 'Mobile']
    }
  ]

  const categories = ['all', 'Design Trends', 'Web Development', 'Branding', 'Social Media', 'Design Tips']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="blog-page">
      <SEO 
        title="Blog - Design Tips & Industry Insights"
        description="Read our latest articles about graphic design, web development, branding, and digital marketing. Expert tips and industry insights from E Flash."
        keywords="design blog, graphic design tips, web development articles, branding guide, design trends"
      />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Our Blog</h1>
            <p>Insights, tips, and trends in design and development</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="section">
        <div className="container">
          <div className="blog-controls">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="blog-card"
                >
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} />
                      <span className="blog-category">{post.category}</span>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span><FaCalendar /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span><FaClock /> {post.readTime}</span>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <div className="blog-tags">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="tag">
                            <FaTag /> {tag}
                          </span>
                        ))}
                      </div>
                      <div className="read-more">
                        Read Article <FaArrowRight />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="no-results">
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Blog
