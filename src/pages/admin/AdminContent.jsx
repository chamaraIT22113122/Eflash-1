import { useState, useEffect, useContext } from 'react';
import { SiteContentContext } from '../../context/SiteContentContext';
import './AdminContent.css';

const AdminContent = () => {
  const { content, updateContent, isLoading } = useContext(SiteContentContext);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  // Show loading state while content is being fetched
  if (isLoading || !content) {
    return (
      <div className="admin-content">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  const contentSections = [
    {
      id: 'hero',
      title: 'Hero Section',
      fields: [
        { key: 'title', label: 'Main Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
        { key: 'ctaText', label: 'CTA Button Text', type: 'text' }
      ]
    },
    {
      id: 'about',
      title: 'About Section',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'yearsExperience', label: 'Years of Experience', type: 'number' }
      ]
    },
    {
      id: 'services',
      title: 'Services Section',
      fields: [
        { key: 'heading', label: 'Heading', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'textarea' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Information',
      fields: [
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'phone', label: 'Phone', type: 'tel' },
        { key: 'address', label: 'Address', type: 'textarea' },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'tel' }
      ]
    },
    {
      id: 'social',
      title: 'Social Media Links',
      fields: [
        { key: 'facebook', label: 'Facebook URL', type: 'url' },
        { key: 'instagram', label: 'Instagram URL', type: 'url' },
        { key: 'twitter', label: 'Twitter URL', type: 'url' },
        { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
        { key: 'youtube', label: 'YouTube URL', type: 'url' }
      ]
    }
  ];

  const handleEdit = (section) => {
    setEditing(section.id);
    setFormData(content[section.id] || {});
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (sectionId) => {
    updateContent(sectionId, formData);
    setEditing(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditing(null);
    setFormData({});
  };

  return (
    <div className="admin-content">
      <div className="admin-content-header">
        <h1>Content Management</h1>
        <p>Edit your website content here. Changes will be reflected immediately across the site.</p>
      </div>

      <div className="content-sections">
        {contentSections.map(section => (
          <div key={section.id} className="content-section-card">
            <div className="section-header">
              <h2>{section.title}</h2>
              {editing !== section.id && (
                <button className="btn-edit" onClick={() => handleEdit(section)}>
                  ✏️ Edit
                </button>
              )}
            </div>

            {editing === section.id ? (
              <div className="section-editor">
                <form onSubmit={(e) => { e.preventDefault(); handleSave(section.id); }}>
                  {section.fields.map(field => (
                    <div key={field.key} className="form-group">
                      <label>{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          rows="4"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.key] || ''}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}

                  <div className="form-actions">
                    <button type="submit" className="btn-save">
                      Save Changes
                    </button>
                    <button type="button" className="btn-cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="section-content">
                {section.fields.map(field => {
                  const value = content[section.id]?.[field.key];
                  return (
                    <div key={field.key} className="content-item">
                      <strong>{field.label}:</strong>
                      <span>{value || <em className="empty">Not set</em>}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="content-tips">
        <h3>💡 Tips</h3>
        <ul>
          <li>Keep headings concise and impactful (under 60 characters)</li>
          <li>Write descriptions that clearly communicate your value proposition</li>
          <li>Use consistent tone and voice across all sections</li>
          <li>Test all URLs to ensure they're working correctly</li>
          <li>Update contact information regularly to keep it current</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminContent;
