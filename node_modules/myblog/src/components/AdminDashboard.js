import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchContacts = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyAuth = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      fetchContacts();
    } catch (err) {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  }, [navigate, fetchContacts]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const updateContactStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update contact status');
      }
      
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="admin-error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Contact Form Submissions</h1>
      
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div key={contact._id} className={`contact-card status-${contact.status}`}>
            <div className="contact-header">
              <h3>{contact.subject}</h3>
              <span className="contact-date">
                {new Date(contact.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="contact-info">
              <p><strong>From:</strong> {contact.name} ({contact.email})</p>
              <p className="contact-message">{contact.message}</p>
            </div>
            
            <div className="contact-actions">
              <select
                value={contact.status}
                onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                className={`status-select status-${contact.status}`}
              >
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
              
              <button
                onClick={() => deleteContact(contact._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {contacts.length === 0 && (
          <div className="no-contacts">
            No contact form submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;