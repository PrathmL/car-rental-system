import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../../utils/SwalUtils';

const OwnerVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/pending/owner');
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching owner requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/users/${userId}/${action}`);
      showAlert('Success', `Owner ${action === 'approve' ? 'Approved' : 'Rejected'}!`, 'success');
      fetchRequests();
    } catch (error) {
      showAlert('Error', "Action failed.", 'error');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary border-3"></div></div>;

  return (
    <div className="table-responsive">
      <table className="table table-modern align-middle">
        <thead>
          <tr>
            <th className="ps-4">Partner Name</th>
            <th>Email Contact</th>
            <th>Identity Proof</th>
            <th className="pe-4 text-end">Action Center</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? requests.map(user => (
            <tr key={user.id}>
              <td className="ps-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: '40px', height: '40px'}}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="fw-bold text-dark">{user.name}</div>
                </div>
              </td>
              <td className="text-muted small">{user.email}</td>
              <td>
                <a href={`http://localhost:8080${user.documentUrl}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold">
                  Review ID Proof
                </a>
              </td>
              <td className="pe-4 text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-primary rounded-pill px-3 fw-bold" onClick={() => handleAction(user.id, 'approve')}>Approve</button>
                  <button className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold" onClick={() => handleAction(user.id, 'reject')}>Reject</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4" className="text-center py-5 text-muted bg-white rounded-4">No pending partner applications.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerVerification;
