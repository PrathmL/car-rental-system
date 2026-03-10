import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingRequests.css';
import { showAlert } from '../../utils/SwalUtils';

const BookingRequests = ({ onAction }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/bookings/owner/${user.id}`);
      setRequests(response.data.filter(b => b.bookingStatus === 'PENDING'));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchRequests();
  }, [user.id]);

  const handleAction = async (bookingId, action) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${bookingId}/${action}`);
      showAlert('Success', `Booking ${action === 'confirm' ? 'Approved' : 'Rejected'}!`, 'success');
      fetchRequests();
      if (onAction) onAction(); 
    } catch (error) {
      showAlert('Error', `Failed to ${action} booking.`, 'error');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="booking-requests-section fade-in-up">
      <h2 className="fw-bold mb-4 text-dark">Pending Requests</h2>
      <div className="card-modern">
        <div className="table-responsive p-0 m-0">
          <table className="table table-hover align-middle mb-0 border-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">ID</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Customer</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Documents</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Car</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Dates</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? requests.map(req => (
                <tr key={req.bookingId}>
                  <td className="px-4 py-3 border-bottom-0"><strong className="text-primary">#{req.bookingId}</strong></td>
                  <td className="px-4 py-3 border-bottom-0">
                    <div className="fw-bold text-dark">{req.customerName || `User #${req.customerId}`}</div>
                  </td>
                  <td className="px-4 py-3 border-bottom-0">
                    {req.customerDocumentUrl ? (
                      <a 
                        href={`http://localhost:8080${req.customerDocumentUrl}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold"
                      >
                        👁️ View DL/ID
                      </a>
                    ) : <span className="text-muted small italic">Not Uploaded</span>}
                  </td>
                  <td className="px-4 py-3 border-bottom-0 text-dark">{req.carName || `Car #${req.carId}`}</td>
                  <td className="px-4 py-3 border-bottom-0 text-muted small">{req.startDate} to {req.endDate}</td>
                  <td className="px-4 py-3 border-bottom-0 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <button className="btn btn-sm btn-success rounded-pill px-3 fw-bold shadow-sm" onClick={() => handleAction(req.bookingId, 'confirm')}>Approve</button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold" onClick={() => handleAction(req.bookingId, 'reject')}>Reject</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center py-5 text-muted border-0">No pending requests at the moment.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingRequests;
