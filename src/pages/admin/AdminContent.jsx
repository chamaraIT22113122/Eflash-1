import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import {
  FaSave, FaHome, FaInfoCircle, FaTools, FaEnvelope, FaGlobe,
  FaUsers, FaPlus, FaTrash, FaEdit, FaTimes, FaChartBar, FaImage
} from 'react-icons/fa'
import { SiteContentContext } from '../../context/SiteContentContext'
import './AdminContent.css'
import './AdminBase.css'

const TABS = [
  { id: 'general', label: 'General & Social', icon: <FaGlobe /> },
  { id: 'home', label: 'Home Page', icon: <FaHome /> },
  { id: 'about', label: 'About Page', icon: <FaInfoCircle /> },
  { id: 'team', label: 'Team Members', icon: <FaUsers /> },
  { id: 'skills', label: 'Skills & Tools', icon: <FaTools /> },
  { id: 'services', label: 'Services', icon: <FaChartBar /> },
  { id: 'contact', label: 'Contact & Footer', icon: <FaEnvelope /> },
]

const AdminContent = () => {
  const { content, updateContent, updateSection } = useContext(SiteContentContext)
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [newMember, setNewMember] = useState(null)

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSave = (section, data) => {
    updateContent(section, data)
    showSaved()
  }

  const handleSaveSection = (section, data) => {
    updateSection(section, data)
    showSaved()
  }

  // ── GENERAL ──────────────────────────────────────────────
  const GeneralTab = () => {
    const [form, setForm] = useState({ ...content.general })
    const [social, setSocial] = useState({ ...(content.general?.socialMedia || {}) })
    return (
      <div className="content-tab-pane">
        <h3>General Information</h3>
        <div className="form-grid-2">
          {[
            { label: 'Site Name', key: 'siteName' },
            { label: 'Tagline', key: 'tagline' },
            { label: 'Email', key: 'email' },
            { label: 'Phone', key: 'phone' },
            { label: 'WhatsApp Number (no +)', key: 'whatsapp' },
            { label: 'Address', key: 'address' },
          ].map(({ label, key }) => (
            <div key={key} className="form-group">
              <label>{label}</label>
              <input type="text" value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
        <h4 className="sub-heading">Social Media Links</h4>
        <div className="form-grid-2">
          {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map(net => (
            <div key={net} className="form-group">
              <label style={{ textTransform: 'capitalize' }}>{net}</label>
              <input type="url" value={social[net] || ''} placeholder={`https://${net}.com/yourpage`} onChange={e => setSocial(p => ({ ...p, [net]: e.target.value }))} />
            </div>
          ))}
        </div>
        <button className="btn-save-section" onClick={() => handleSave('general', { ...form, socialMedia: social })}>
          <FaSave /> Save General Settings
        </button>
      </div>
    )
  }

  // ── HOME ──────────────────────────────────────────────
  const HomeTab = () => {
    const [form, setForm] = useState({ ...content.home })
    return (
      <div className="content-tab-pane">
        <h3>Home Page Content</h3>
        <div className="form-grid-2">
          {[
            { label: 'Hero Title', key: 'heroTitle' },
            { label: 'Hero Subtitle', key: 'heroSubtitle' },
            { label: 'Years Experience (e.g. 7+)', key: 'statsYears' },
            { label: 'Projects Count (e.g. 230+)', key: 'statsProjects' },
            { label: 'Clients Count (e.g. 95+)', key: 'statsClients' },
            { label: 'Rating (e.g. 4.9)', key: 'statsRating' },
          ].map(({ label, key }) => (
            <div key={key} className="form-group">
              <label>{label}</label>
              <input type="text" value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          <div className="form-group full-width">
            <label>Hero Description</label>
            <textarea rows={3} value={form.heroDescription || ''} onChange={e => setForm(p => ({ ...p, heroDescription: e.target.value }))} />
          </div>
          <div className="form-group"><label>CTA Button 1 Text</label><input type="text" value={form.heroCTA1 || ''} onChange={e => setForm(p => ({ ...p, heroCTA1: e.target.value }))} /></div>
          <div className="form-group"><label>CTA Button 2 Text</label><input type="text" value={form.heroCTA2 || ''} onChange={e => setForm(p => ({ ...p, heroCTA2: e.target.value }))} /></div>
        </div>
        <button className="btn-save-section" onClick={() => handleSave('home', form)}><FaSave /> Save Home Page</button>
      </div>
    )
  }

  // ── ABOUT ──────────────────────────────────────────────
  const AboutTab = () => {
    const [form, setForm] = useState({ ...content.about })
    const [skills, setSkills] = useState(content.about?.skills || [
      { name: 'Graphic Design', level: 95 },
      { name: 'Web Development', level: 90 },
      { name: 'UI/UX Design', level: 88 },
    ])
    const [timeline, setTimeline] = useState(content.about?.timeline || [])

    return (
      <div className="content-tab-pane">
        <h3>About Page Content</h3>
        <div className="form-grid-2">
          {[
            { label: 'Page Title', key: 'title' },
            { label: 'Subtitle', key: 'subtitle' },
          ].map(({ label, key }) => (
            <div key={key} className="form-group">
              <label>{label}</label>
              <input type="text" value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          {['description', 'mission', 'vision'].map(key => (
            <div key={key} className="form-group full-width">
              <label style={{ textTransform: 'capitalize' }}>{key}</label>
              <textarea rows={3} value={form[key] || ''} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <h4 className="sub-heading">Skills / Proficiency Bars</h4>
        <div className="skills-editor">
          {skills.map((sk, i) => (
            <div key={i} className="skill-editor-row">
              <input type="text" value={sk.name} placeholder="Skill name" onChange={e => { const s = [...skills]; s[i] = { ...s[i], name: e.target.value }; setSkills(s) }} />
              <input type="number" min="0" max="100" value={sk.level} onChange={e => { const s = [...skills]; s[i] = { ...s[i], level: parseInt(e.target.value) || 0 }; setSkills(s) }} />
              <span>%</span>
              <button onClick={() => setSkills(skills.filter((_, j) => j !== i))}><FaTrash /></button>
            </div>
          ))}
          <button className="btn-add-row" onClick={() => setSkills([...skills, { name: '', level: 80 }])}><FaPlus /> Add Skill</button>
        </div>

        <h4 className="sub-heading">Timeline / Journey</h4>
        {timeline.map((item, i) => (
          <div key={i} className="timeline-editor-row">
            <input type="text" value={item.year} placeholder="Year" style={{ width: '80px' }} onChange={e => { const t = [...timeline]; t[i] = { ...t[i], year: e.target.value }; setTimeline(t) }} />
            <input type="text" value={item.title} placeholder="Title" onChange={e => { const t = [...timeline]; t[i] = { ...t[i], title: e.target.value }; setTimeline(t) }} />
            <input type="text" value={item.description} placeholder="Description" onChange={e => { const t = [...timeline]; t[i] = { ...t[i], description: e.target.value }; setTimeline(t) }} />
            <button onClick={() => setTimeline(timeline.filter((_, j) => j !== i))}><FaTrash /></button>
          </div>
        ))}
        <button className="btn-add-row" onClick={() => setTimeline([...timeline, { year: new Date().getFullYear().toString(), title: '', description: '' }])}><FaPlus /> Add Timeline Entry</button>

        <button className="btn-save-section" style={{ marginTop: '2rem' }} onClick={() => handleSave('about', { ...form, skills, timeline })}>
          <FaSave /> Save About Page
        </button>
      </div>
    )
  }

  // ── TEAM ──────────────────────────────────────────────
  const TeamTab = () => {
    const members = content.about?.teamMembers || []
    const emptyMember = { name: '', role: '', bio: '', image: '', linkedin: '', instagram: '', twitter: '' }

    const saveMember = (member, isEdit = false, idx = null) => {
      let updated
      if (isEdit && idx !== null) {
        updated = [...members]; updated[idx] = member
      } else {
        updated = [...members, member]
      }
      updateContent('about', { ...content.about, teamMembers: updated })
      showSaved()
      setEditingMember(null)
      setNewMember(null)
    }

    const deleteMember = (idx) => {
      if (!window.confirm('Delete this team member?')) return
      const updated = members.filter((_, i) => i !== idx)
      updateContent('about', { ...content.about, teamMembers: updated })
      showSaved()
    }

    const MemberForm = ({ data, onSave, onCancel }) => {
      const [form, setForm] = useState({ ...data })
      return (
        <div className="member-form glass-card">
          <div className="form-grid-2">
            <div className="form-group"><label>Full Name</label><input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="form-group"><label>Role / Position</label><input type="text" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} /></div>
            <div className="form-group full-width"><label>Bio</label><textarea rows={2} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} /></div>
            <div className="form-group full-width"><label>Photo URL</label><input type="url" value={form.image} placeholder="https://..." onChange={e => setForm(p => ({ ...p, image: e.target.value }))} /></div>
            <div className="form-group"><label>LinkedIn URL</label><input type="url" value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} /></div>
            <div className="form-group"><label>Instagram URL</label><input type="url" value={form.instagram} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} /></div>
            <div className="form-group"><label>Twitter URL</label><input type="url" value={form.twitter} onChange={e => setForm(p => ({ ...p, twitter: e.target.value }))} /></div>
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={onCancel}><FaTimes /> Cancel</button>
            <button className="btn-save-section" onClick={() => onSave(form)}><FaSave /> Save Member</button>
          </div>
        </div>
      )
    }

    return (
      <div className="content-tab-pane">
        <div className="tab-header-row">
          <h3>Team Members</h3>
          <button className="btn-add-item" onClick={() => { setNewMember(emptyMember); setEditingMember(null) }}>
            <FaPlus /> Add Member
          </button>
        </div>
        {newMember && (
          <MemberForm data={newMember} onSave={m => saveMember(m)} onCancel={() => setNewMember(null)} />
        )}
        <div className="members-grid">
          {members.length === 0 && !newMember && (
            <p className="empty-note">No team members yet. Add your first team member above.</p>
          )}
          {members.map((m, i) => (
            <div key={i}>
              {editingMember === i ? (
                <MemberForm data={m} onSave={updated => saveMember(updated, true, i)} onCancel={() => setEditingMember(null)} />
              ) : (
                <div className="member-card glass-card">
                  <div className="member-avatar">
                    {m.image ? <img src={m.image} alt={m.name} /> : <div className="avatar-ph">{(m.name || 'T')[0].toUpperCase()}</div>}
                  </div>
                  <div className="member-info">
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                    <p>{m.bio}</p>
                  </div>
                  <div className="member-actions">
                    <button onClick={() => setEditingMember(i)}><FaEdit /></button>
                    <button onClick={() => deleteMember(i)} className="btn-danger"><FaTrash /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── SKILLS ──────────────────────────────────────────────
  const SkillsTab = () => {
    const [title, setTitle] = useState(content.skills?.title || '')
    const [items, setItems] = useState(content.skills?.items || [])
    return (
      <div className="content-tab-pane">
        <h3>Skills & Tools Section</h3>
        <div className="form-group" style={{ maxWidth: '500px', marginBottom: '1.5rem' }}>
          <label>Section Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <p className="info-note">Tools appear in the marquee ticker on the Home page. Add icon image URLs (PNG/SVG).</p>
        <div className="tools-editor">
          {items.map((tool, i) => (
            <div key={i} className="tool-editor-row">
              <img src={tool.icon} alt={tool.name} className="tool-preview-img" onError={e => e.target.style.display = 'none'} />
              <input type="text" value={tool.name} placeholder="Tool name" onChange={e => { const t = [...items]; t[i] = { ...t[i], name: e.target.value }; setItems(t) }} />
              <input type="url" value={tool.icon} placeholder="Icon URL or path" onChange={e => { const t = [...items]; t[i] = { ...t[i], icon: e.target.value }; setItems(t) }} />
              <button onClick={() => setItems(items.filter((_, j) => j !== i))}><FaTrash /></button>
            </div>
          ))}
          <button className="btn-add-row" onClick={() => setItems([...items, { name: '', icon: '', id: Date.now() }])}><FaPlus /> Add Tool</button>
        </div>
        <button className="btn-save-section" style={{ marginTop: '1.5rem' }} onClick={() => handleSave('skills', { title, items })}>
          <FaSave /> Save Skills
        </button>
      </div>
    )
  }

  // ── CONTACT ──────────────────────────────────────────────
  const ContactTab = () => {
    const [contact, setContact] = useState({ ...content.contact })
    const [footer, setFooter] = useState({ ...content.footer })
    return (
      <div className="content-tab-pane">
        <h3>Contact Section</h3>
        <div className="form-grid-2">
          {[
            { label: 'Section Title', key: 'title' },
            { label: 'Subtitle', key: 'subtitle' },
          ].map(({ label, key }) => (
            <div key={key} className="form-group">
              <label>{label}</label>
              <input type="text" value={contact[key] || ''} onChange={e => setContact(p => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
          <div className="form-group full-width">
            <label>Description</label>
            <textarea rows={2} value={contact.description || ''} onChange={e => setContact(p => ({ ...p, description: e.target.value }))} />
          </div>
        </div>
        <button className="btn-save-section" onClick={() => handleSave('contact', contact)}><FaSave /> Save Contact</button>

        <h3 style={{ marginTop: '2.5rem' }}>Footer</h3>
        <div className="form-group" style={{ maxWidth: '500px' }}>
          <label>Copyright Text</label>
          <input type="text" value={footer.copyrightText || ''} onChange={e => setFooter(p => ({ ...p, copyrightText: e.target.value }))} />
        </div>
        <button className="btn-save-section" onClick={() => handleSave('footer', footer)}><FaSave /> Save Footer</button>
      </div>
    )
  }

  // ── SERVICES ──────────────────────────────────────────────
  const ServicesTab = () => {
    const [services, setServices] = useState(content.services?.items || [])
    const updateService = (i, key, val) => { const s = [...services]; s[i] = { ...s[i], [key]: val }; setServices(s) }
    return (
      <div className="content-tab-pane">
        <h3>Services Content</h3>
        {services.map((svc, i) => (
          <div key={i} className="service-editor glass-card">
            <div className="form-grid-2">
              <div className="form-group"><label>Icon (emoji)</label><input type="text" value={svc.icon || ''} onChange={e => updateService(i, 'icon', e.target.value)} /></div>
              <div className="form-group"><label>Title</label><input type="text" value={svc.title || ''} onChange={e => updateService(i, 'title', e.target.value)} /></div>
              <div className="form-group full-width"><label>Description</label><textarea rows={2} value={svc.description || ''} onChange={e => updateService(i, 'description', e.target.value)} /></div>
            </div>
          </div>
        ))}
        <button className="btn-save-section" onClick={() => handleSave('services', { ...content.services, items: services })}><FaSave /> Save Services</button>
      </div>
    )
  }

  const TAB_COMPONENTS = { general: GeneralTab, home: HomeTab, about: AboutTab, team: TeamTab, skills: SkillsTab, services: ServicesTab, contact: ContactTab }
  const ActiveComponent = TAB_COMPONENTS[activeTab]

  return (
    <div className="admin-content-page admin-page admin-content">
      <div className="content-header">
        <h1>Page Content Manager</h1>
        <p>Edit every section of your website from here</p>
        {saved && (
          <motion.div className="saved-badge" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            ✅ Saved!
          </motion.div>
        )}
      </div>

      <div className="content-layout">
        {/* Sidebar */}
        <nav className="content-sidebar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`content-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Main Panel */}
        <div className="content-main">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdminContent
