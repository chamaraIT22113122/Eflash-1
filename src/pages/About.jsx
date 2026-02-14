import React from 'react'
import { motion } from 'framer-motion'
import { FaAward, FaUsers, FaLightbulb, FaHeart, FaWhatsapp } from 'react-icons/fa'
import './About.css'

const About = () => {
  const values = [
    {
      icon: <FaAward />,
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every project receives our full attention and expertise to deliver exceptional results.'
    },
    {
      icon: <FaUsers />,
      title: 'Client-Focused',
      description: 'Your success is our success. We build lasting relationships by understanding and exceeding your expectations.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We stay ahead of trends and technologies to provide cutting-edge solutions that give you a competitive edge.'
    },
    {
      icon: <FaHeart />,
      title: 'Passion',
      description: 'We love what we do, and it shows in our work. Our passion drives us to create exceptional digital experiences.'
    }
  ]

  const team = [
    {
      name: 'Creative Director',
      role: 'Lead Designer',
      description: 'Expert in UI/UX design with 8+ years of experience in creating stunning visual experiences.'
    },
    {
      name: 'Technical Lead',
      role: 'Full Stack Developer',
      description: 'Specialized in modern web technologies with expertise in React, Node.js, and cloud architecture.'
    },
    {
      name: 'Marketing Strategist',
      role: 'Digital Marketing',
      description: 'Data-driven marketing professional focused on growth and brand visibility.'
    }
  ]

  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'E Flash was founded with a vision to provide exceptional digital solutions.'
    },
    {
      year: '2020',
      title: 'Growth & Expansion',
      description: 'Expanded our services and team to better serve our growing client base.'
    },
    {
      year: '2022',
      title: '100+ Projects',
      description: 'Reached the milestone of successfully completing 100+ projects.'
    },
    {
      year: '2026',
      title: 'Leading the Industry',
      description: 'Recognized as a leading creative agency with 50+ satisfied clients.'
    }
  ]

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-image">
          <img src="/assets/images/about-banner1 (2).png" alt="About E Flash" />
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>About E Flash</h1>
            <p>Transforming ideas into exceptional digital experiences since 2019</p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="story-text"
            >
              <h2 className="section-title">Our Story</h2>
              <p>
                E Flash was born from a passion for creativity and a commitment to excellence. 
                What started as a small design studio has grown into a full-service digital agency, 
                helping businesses of all sizes achieve their digital goals.
              </p>
              <p>
                We specialize in graphic design, web development, UI/UX design, and digital marketing. 
                Our team of talented professionals brings together years of experience and a fresh 
                perspective to every project we undertake.
              </p>
              <p>
                Today, we're proud to have served over 50 clients worldwide, completed 100+ projects, 
                and built a reputation for delivering quality work on time, every time. Our success 
                is measured by the success of our clients, and we're committed to being your trusted 
                partner in digital transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="story-stats"
            >
              <div className="stat-box">
                <h3>5+</h3>
                <p>Years of Experience</p>
              </div>
              <div className="stat-box">
                <h3>100+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-box">
                <h3>50+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-box">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="value-card"
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">
            Milestones that shaped our growth
          </p>

          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the talented people behind E Flash
          </p>

          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="team-card"
              >
                <div className="team-avatar">
                  <div className="avatar-placeholder">{member.name.charAt(0)}</div>
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mission-content"
          >
            <h2>Our Mission</h2>
            <p>
              To empower businesses with innovative digital solutions that drive growth, 
              enhance user experiences, and create lasting value. We believe in the power 
              of design and technology to transform businesses and make a positive impact 
              in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/94702481691?text=Hello%20Eflash!%20I%20found%20you%20on%20your%20website"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default About
