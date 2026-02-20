import { useState, useEffect } from 'react';
import './AdminNewsletter.css';

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [composing, setComposing] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    recipients: 'all'
  });

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    const newsletterData = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    setSubscribers(newsletterData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendNewsletter = (e) => {
    e.preventDefault();
    
    const recipientList = emailData.recipients === 'all' 
      ? subscribers.map(s => s.email)
      : emailData.recipients.split(',').map(e => e.trim());

    // In a real app, this would send emails via EmailJS or backend API
    console.log('Sending newsletter to:', recipientList);
    console.log('Subject:', emailData.subject);
    console.log('Content:', emailData.content);

    alert(`Newsletter would be sent to ${recipientList.length} subscribers. (EmailJS integration pending)`);
    
    // Reset form
    setEmailData({
      subject: '',
      content: '',
      recipients: 'all'
    });
    setComposing(false);
  };

  const handleUnsubscribe = (email) => {
    if (window.confirm(`Remove ${email} from newsletter?`)) {
      const updated = subscribers.filter(s => s.email !== email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(updated));
      setSubscribers(updated);
    }
  };

  const exportSubscribers = () => {
    const csv = 'Email,Date\n' + subscribers.map(s => `${s.email},${s.date}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
  };

  return (
    <div className="admin-newsletter">
      <div className="admin-newsletter-header">
        <h1>Newsletter Management</h1>
        <div className="header-actions">
          <button className="btn-compose" onClick={() => setComposing(true)}>
            ✉️ Compose Newsletter
          </button>
          <button className="btn-export" onClick={exportSubscribers}>
            ⬇️ Export Subscribers
          </button>
        </div>
      </div>

      <div className="newsletter-stats">
        <div className="stat-card">
          <span className="stat-value">{subscribers.length}</span>
          <span className="stat-label">Total Subscribers</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {subscribers.filter(s => {
              const date = new Date(s.date);
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return date > thirtyDaysAgo;
            }).length}
          </span>
          <span className="stat-label">New (Last 30 Days)</span>
        </div>
      </div>

      {composing && (
        <div className="compose-newsletter">
          <div className="compose-header">
            <h2>Compose Newsletter</h2>
            <button className="btn-close" onClick={() => setComposing(false)}>×</button>
          </div>

          <form onSubmit={handleSendNewsletter} className="newsletter-form">
            <div className="form-group">
              <label>Recipients</label>
              <select
                name="recipients"
                value={emailData.recipients}
                onChange={handleInputChange}
              >
                <option value="all">All Subscribers ({subscribers.length})</option>
                <option value="custom">Custom List (comma-separated emails)</option>
              </select>
            </div>

            {emailData.recipients === 'custom' && (
              <div className="form-group">
                <label>Email Addresses (comma-separated)</label>
                <textarea
                  name="recipients"
                  value={emailData.recipients}
                  onChange={handleInputChange}
                  placeholder="email1@example.com, email2@example.com"
                  rows="3"
                />
              </div>
            )}

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                required
                placeholder="Newsletter subject line"
              />
            </div>

            <div className="form-group">
              <label>Email Content *</label>
              <textarea
                name="content"
                value={emailData.content}
                onChange={handleInputChange}
                required
                placeholder="Newsletter content (HTML supported)"
                rows="12"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-send">
                Send Newsletter
              </button>
              <button type="button" className="btn-cancel" onClick={() => setComposing(false)}>
                Cancel
              </button>
            </div>
          </form>

          <div className="newsletter-note">
            <strong>Note:</strong> EmailJS integration pending. Configure EmailJS service to send actual emails.
          </div>
        </div>
      )}

      <div className="subscribers-section">
        <h2>Subscribers List</h2>
        
        {subscribers.length === 0 ? (
          <div className="no-subscribers">
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <div className="subscribers-table">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribed Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={index}>
                    <td>{subscriber.email}</td>
                    <td>{new Date(subscriber.date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn-unsubscribe"
                        onClick={() => handleUnsubscribe(subscriber.email)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletter;
