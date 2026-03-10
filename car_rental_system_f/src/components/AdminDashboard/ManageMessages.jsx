import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert, showConfirm } from '../../utils/SwalUtils';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/contact-messages');
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const result = await showConfirm(
      "Delete Message?",
      "This will permanently remove this support request.",
      "Yes, delete"
    );

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/contact-messages/${id}`);
        setMessages(messages.filter(m => m.id !== id));
        showAlert("Deleted", "Message has been removed.", "success");
      } catch (error) {
        showAlert("Error", "Delete failed.", "error");
      }
    }
  };

  if (loading) return <div>Loading support messages...</div>;

  return (
    <div className="admin-section">
      <h2 className="section-title">Support & Contact Messages</h2>
      <div className="row g-4 mt-2">
        {messages.length > 0 ? messages.map(msg => (
          <div className="col-md-6 col-lg-4" key={msg.id}>
            <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span className="badge bg-primary rounded-pill">Support Request</span>
                <button className="btn btn-sm btn-outline-danger border-0" onClick={() => handleDelete(msg.id)}>🗑️</button>
              </div>
              <h6 className="fw-bold mb-1">{msg.name}</h6>
              <p className="small text-primary mb-3">{msg.email}</p>
              <div className="p-3 bg-light rounded-3 small text-muted lh-base flex-grow-1 mb-3">
                "{msg.message}"
              </div>
              <p className="x-small text-muted mb-0">Received: {new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No messages found in your inbox.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMessages;
