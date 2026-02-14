import React from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { FaCalendar, FaUser, FaClock, FaArrowLeft, FaTag, FaShare } from 'react-icons/fa'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import './BlogPost.css'

const BlogPost = () => {
  const { slug } = useParams()

  // In a real app, this would fetch from an API
  const post = {
    slug: 'top-10-graphic-design-trends-2026',
    title: 'Top 10 Graphic Design Trends for 2026',
    excerpt: 'Discover the latest design trends that are shaping the creative industry this year.',
    content: `
      <p>The world of graphic design is constantly evolving, and 2026 is no exception. As we navigate through this exciting year, new trends are emerging that are reshaping how we think about visual communication and brand identity.</p>

      <h2>1. AI-Enhanced Designs</h2>
      <p>Artificial Intelligence is not replacing designers but empowering them. AI tools are helping create more sophisticated designs, generate unique patterns, and automate repetitive tasks, allowing designers to focus on creativity.</p>

      <h2>2. 3D Typography</h2>
      <p>Three-dimensional typography is making a huge comeback. With improved rendering capabilities, designers are creating stunning 3D text effects that add depth and visual interest to designs.</p>

      <h2>3. Sustainable Design</h2>
      <p>Eco-consciousness is influencing design choices. From minimalist approaches that use less ink to designs that promote sustainability messages, environmental awareness is a key trend.</p>

      <h2>4. Bold Color Gradients</h2>
      <p>Vibrant, bold gradients are everywhere. Moving away from flat design, gradients add dimension and eye-catching visual appeal to modern designs.</p>

      <h2>5. Retro Futurism</h2>
      <p>A blend of vintage aesthetics with futuristic elements is creating a unique visual style. Think 80s and 90s nostalgia mixed with modern technology themes.</p>

      <h2>6. Abstract Shapes</h2>
      <p>Organic, flowing abstract shapes are replacing rigid geometric forms. These shapes add movement and energy to designs while maintaining a modern aesthetic.</p>

      <h2>7. Maximalist Designs</h2>
      <p>While minimalism had its moment, maximalism is making a statement. Bold, complex designs with multiple layers and rich details are gaining popularity.</p>

      <h2>8. Animated Graphics</h2>
      <p>Static images are giving way to subtle animations. Micro-animations and motion graphics are enhancing user experience and engagement.</p>

      <h2>9. Custom Illustrations</h2>
      <p>Unique, hand-drawn illustrations are helping brands stand out. Custom artwork adds personality and authenticity to design projects.</p>

      <h2>10. Variable Fonts</h2>
      <p>Variable fonts offer multiple styles in a single file, providing designers with greater flexibility and reducing load times while maintaining visual variety.</p>

      <h2>Conclusion</h2>
      <p>These trends reflect the industry's direction toward more dynamic, expressive, and technologically advanced design solutions. Whether you're a designer or a business owner, understanding these trends can help you create more impactful visual communications.</p>

      <p>At E Flash, we stay ahead of these trends to deliver cutting-edge designs for our clients. Contact us to learn how we can bring these trends to your next project!</p>
    `,
    author: 'E Flash Team',
    date: '2026-02-01',
    category: 'Design Trends',
    image: '/assets/images/portfolio/Social media p/11.png',
    readTime: '5 min read',
    tags: ['Design', 'Trends', 'Graphic Design']
  }

  const shareUrl = window.location.href

  return (
    <main className="blog-post-page">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        ogImage={post.image}
        ogType="article"
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="blog-post-content"
        >
          <Link to="/blog" className="back-link">
            <FaArrowLeft /> Back to Blog
          </Link>

          <article className="post-article">
            <header className="post-header">
              <span className="post-category">{post.category}</span>
              <h1>{post.title}</h1>
              
              <div className="post-meta">
                <span><FaUser /> {post.author}</span>
                <span><FaCalendar /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span><FaClock /> {post.readTime}</span>
              </div>

              <div className="post-tags">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    <FaTag /> {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>

            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

            <footer className="post-footer">
              <div className="share-section">
                <h3><FaShare /> Share this article</h3>
                <div className="share-buttons">
                  <FacebookShareButton url={shareUrl} quote={post.title}>
                    <button className="share-btn facebook"><FaFacebook /> Facebook</button>
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} title={post.title}>
                    <button className="share-btn twitter"><FaTwitter /> Twitter</button>
                  </TwitterShareButton>
                  <LinkedinShareButton url={shareUrl} title={post.title}>
                    <button className="share-btn linkedin"><FaLinkedin /> LinkedIn</button>
                  </LinkedinShareButton>
                  <WhatsappShareButton url={shareUrl} title={post.title}>
                    <button className="share-btn whatsapp"><FaWhatsapp /> WhatsApp</button>
                  </WhatsappShareButton>
                </div>
              </div>
            </footer>
          </article>

          <div className="post-cta">
            <h3>Ready to Transform Your Brand?</h3>
            <p>Let's work together to create amazing designs for your business</p>
            <Link to="/#contact" className="btn btn-primary">Get Started</Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default BlogPost
