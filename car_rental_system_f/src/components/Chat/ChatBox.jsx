import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBox.css';
import { showAlert } from '../../utils/SwalUtils';

const ChatBox = ({ bookingId, user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/chat/${bookingId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post('http://localhost:8080/api/chat', {
        bookingId: bookingId,
        senderId: user.id,
        senderName: user.name,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      showAlert('Chat Error', 'Failed to send message. Please check your connection.', 'error');
    }
  };

  return (
    <div className="chat-overlay">
      <div className="chat-window shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="chat-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
          <h6 className="mb-0 fw-bold">Chat for Booking #{bookingId}</h6>
          <button className="btn-close btn-close-white" onClick={onClose}></button>
        </div>
        
        <div className="chat-body p-3 bg-light">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper d-flex mb-3 ${msg.senderId === user.id ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`message-bubble p-3 rounded-4 shadow-sm ${msg.senderId === user.id ? 'bg-primary text-white' : 'bg-white text-dark'}`}>
                <div className="small fw-bold mb-1" style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {msg.senderId === user.id ? 'You' : msg.senderName}
                </div>
                <div className="message-content">{msg.content}</div>
                <div className="text-end mt-1" style={{ fontSize: '0.6rem', opacity: 0.6 }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-footer p-3 bg-white border-top d-flex gap-2" onSubmit={handleSend}>
          <input 
            type="text" 
            className="form-control rounded-pill border-light-subtle bg-light px-4" 
            placeholder="Type your message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
