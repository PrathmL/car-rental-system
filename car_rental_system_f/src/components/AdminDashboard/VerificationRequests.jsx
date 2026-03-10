import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../../utils/SwalUtils';

const VerificationRequests = ({ role }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/admin/pending/${role}`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [role]);

  const handleAction = async (userId, action) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${userId}/${action}`);
      showAlert('Success', `User ${action === 'approve' ? 'Approved' : 'Rejected'}!`, 'success');
      fetchRequests();
    } catch (error) {
      showAlert('Error', "Failed to process request.", 'error');
    }
  };

  if (loading) return <div>Checking pending {role}s...</div>;

  return (
    <div className="admin-section">
      <h2 className="section-title">Pending {role} Verifications</h2>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? requests.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <a 
                    href={`http://localhost:8080${user.documentUrl}`} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{color: '#3498db', fontWeight: 'bold'}}
                  >
                    View Document
                  </a>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="approve-btn" onClick={() => handleAction(user.id, 'approve')}>Approve</button>
                    <button className="reject-btn" onClick={() => handleAction(user.id, 'reject')}>Reject</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No pending requests for {role}s.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequests;
