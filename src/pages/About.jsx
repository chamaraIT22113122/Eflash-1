import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaCheckCircle, FaAward, FaLightbulb, FaHeart, FaUsers, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa'
import { useSiteContent } from '../context/SiteContentContext'
import SEO from '../components/SEO'
import './About.css'

const About = () => {
  const { content } = useSiteContent()
  const about = content.about || {}
  const general = content.general || {}

  const values = about.values || [
    { icon: '🏆', title: 'Quality Excellence', description: 'We never compromise on quality. Every project receives our full attention and expertise.' },
    { icon: '👥', title: 'Client-Focused', description: 'Your success is our success. We build lasting relationships by exceeding your expectations.' },
    { icon: '💡', title: 'Innovation', description: 'We stay ahead of trends to deliver cutting-edge solutions that give you a competitive edge.' },
    { icon: '❤️', title: 'Passion', description: 'We love what we do, and it shows in our work. Passion drives us to create exceptional experiences.' },
  ]

  const timeline = about.timeline || [
    { year: '2019', title: 'The Beginning', description: 'E Flash was founded with a vision to provide exceptional creative solutions.' },
    { year: '2020', title: 'Growth & Expansion', description: 'Expanded our services to Graphic Design, Web Development, and Web Designing.' },
    { year: '2022', title: '100+ Projects', description: 'Reached the milestone of 100+ successfully completed projects.' },
    { year: '2026', title: 'Leading the Industry', description: 'Recognized as a leading creative agency with 95+ happy clients.' },
  ]

  const teamMembers = about.teamMembers || []

  const skills = about.skills || [
    { name: 'Graphic Design', level: 95 },
    { name: 'Web Development', level: 90 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Brand Strategy', level: 85 },
    { name: 'Digital Marketing', level: 80 },
  ]

  return (
    <main className="about-page">
      <SEO
        title="About E Flash — Creative Design Agency"
        description="Learn about E Flash — our story, team, values, and mission in Graphic Design, Web Development & Web Designing."
      />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-glow" />
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-tag">OUR STORY</span>
            <h1>About <span className="gradient-text">{general.siteName || 'E Flash'}</span></h1>
            <p>{about.subtitle || 'Your Creative Design Partner'}</p>
          </motion.div>
        </div>
      </section>

      {/* Story + Skills */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="story-text"
            >
              <span className="section-tag">WHO WE ARE</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: '0.75rem' }}>
                {about.title || 'About E Flash'}
              </h2>
              <p>{about.description || 'E Flash was born from a passion for creativity and a commitment to excellence. What started as a small design studio has grown into a full-service digital creative agency, helping businesses of all sizes achieve their digital goals.'}</p>
              <p style={{ marginTop: '1rem' }}>{about.mission || 'We specialize in Graphic Design, Web Development, and Web Designing — delivering work that captures attention, communicates ideas, and drives results.'}</p>

              <div className="about-skills">
                {skills.map((sk, i) => (
                  <div key={i} className="skill-row">
                    <div className="skill-label">
                      <span>{sk.name}</span>
                      <span>{sk.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${sk.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="story-stats-wrap"
            >
              <div className="stats-grid-2">
                {[
                  { n: content.home?.statsYears || '7+', l: 'Years Experience', col: 'var(--accent-blue)' },
                  { n: content.home?.statsProjects || '230+', l: 'Projects Done', col: 'var(--accent-purple)' },
                  { n: content.home?.statsClients || '95+', l: 'Happy Clients', col: 'var(--accent-cyan)' },
                  { n: content.home?.statsRating || '4.9★', l: 'Average Rating', col: 'var(--accent-orange)' },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    className="stat-box-2 glass-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ '--stat-color': s.col }}
                  >
                    <strong>{s.n}</strong>
                    <span>{s.l}</span>
                  </motion.div>
                ))}
              </div>

              {about.vision && (
                <div className="vision-card glass-card">
                  <FaLightbulb className="vision-icon" />
                  <h4>Our Vision</h4>
                  <p>{about.vision}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">OUR VALUES</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </motion.div>
          <div className="values-grid">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="value-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="value-emoji">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="section-tag">OUR JOURNEY</span>
            <h2 className="section-title">Milestones & Growth</h2>
          </motion.div>
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-card glass-card">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="section team-section">
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="section-tag">OUR TEAM</span>
              <h2 className="section-title">Meet the Team</h2>
              <p className="section-subtitle">The talented people behind E Flash</p>
            </motion.div>
            <div className="team-grid">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  className="team-card glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="team-avatar">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="avatar-placeholder">{(member.name || 'T').charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-social">
                    {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                    {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>}
                    {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <motion.a
        href={`https://wa.me/${general.whatsapp || '94775608073'}`}
        target="_blank" rel="noopener noreferrer"
        className="whatsapp-float"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaWhatsapp />
      </motion.a>
    </main>
  )
}

export default About
