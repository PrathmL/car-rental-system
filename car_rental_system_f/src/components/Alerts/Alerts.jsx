import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Alerts.css';

const Alerts = ({ userId, onNewConfirmation }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/notifications/${userId}`);
      if (response.data.length > 0) {
        setNotifications(response.data);
        
        // Special logic for customer bookings
        if (response.data.some(n => n.type === 'BOOKING_CONFIRMED')) {
          if (onNewConfirmation) onNewConfirmation();
        }
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  }, [userId, onNewConfirmation]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); 
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    try {
      await axios.put(`http://localhost:8080/api/notifications/${id}/read`);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'USER_REGISTRATION_REQUEST': return '👤';
      case 'CAR_REGISTRATION_REQUEST': return '🚗';
      case 'BOOKING_REQUEST': return '🔔';
      case 'CHAT_MESSAGE': return '💬';
      case 'BOOKING_CONFIRMED': return '✅';
      case 'CONTACT_MESSAGE': return '📩';
      default: return '📢';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="alerts-container">
      {notifications.map(note => (
        <div key={note.id} className={`alert-card ${note.type.toLowerCase()}`}>
          <div className="alert-content">
            <span className="alert-icon">
              {getIcon(note.type)}
            </span>
            <div className="alert-text">
              <div className="alert-type">{note.type.replace(/_/g, ' ')}</div>
              <div className="alert-message">{note.message}</div>
            </div>
          </div>
          <button className="close-alert-btn" onClick={() => markAsRead(note.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alerts;
