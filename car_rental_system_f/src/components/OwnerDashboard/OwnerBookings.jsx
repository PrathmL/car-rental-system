import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBox from '../Chat/ChatBox';

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/owner/${user.id}`);
        setBookings(response.data.filter(b => b.bookingStatus !== 'PENDING'));
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchBookings();
  }, [user.id]);

  const handleCheckOut = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${id}/checkout`);
      setBookings(prev => prev.map(b => b.bookingId === id ? { ...b, bookingStatus: 'COMPLETED' } : b));
      alert('Trip completed successfully!');
    } catch (error) {
      alert('Failed to complete checkout.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="admin-section fade-in-up">
      <h2 className="fw-bold mb-4 text-dark">Rental History</h2>
      
      {activeChatBooking && (
        <ChatBox 
          bookingId={activeChatBooking} 
          user={user} 
          onClose={() => setActiveChatBooking(null)} 
        />
      )}

      <div className="card-modern">
        <div className="table-responsive p-0 m-0">
          <table className="table table-hover align-middle mb-0 border-0">
            <thead className="table-light">
              <tr>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">ID</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Customer</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Car</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Dates</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Total</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Status</th>
                <th className="border-0 px-4 py-3 text-muted small text-uppercase text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map(b => (
                <tr key={b.bookingId}>
                  <td className="px-4 py-3 border-bottom-0"><strong className="text-primary">#{b.bookingId}</strong></td>
                  <td className="px-4 py-3 border-bottom-0 fw-semibold text-dark">{b.customerName || `User #${b.customerId}`}</td>
                  <td className="px-4 py-3 border-bottom-0">{b.carName || `Car #${b.carId}`}</td>
                  <td className="px-4 py-3 border-bottom-0 text-muted small">{b.startDate} to {b.endDate}</td>
                  <td className="px-4 py-3 border-bottom-0 fw-bold text-success">₹{b.totalPrice}</td>
                  <td className="px-4 py-3 border-bottom-0">
                    <span className={`badge rounded-pill ${
                      b.bookingStatus === 'CONFIRMED' ? 'bg-success bg-opacity-10 text-success' : 
                      b.bookingStatus === 'ACTIVE' ? 'bg-primary bg-opacity-10 text-primary' :
                      'bg-danger bg-opacity-10 text-danger'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-bottom-0 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      {(b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'ACTIVE') && (
                        <button 
                          className="btn btn-sm btn-primary rounded-pill px-3 fw-bold shadow-sm" 
                          onClick={() => setActiveChatBooking(b.bookingId)}
                        >
                          💬 Chat
                        </button>
                      )}
                      {b.bookingStatus === 'ACTIVE' && (
                        b.endDate === today ? (
                          <button 
                            className="btn btn-sm btn-success rounded-pill px-3 fw-bold shadow-sm" 
                            onClick={() => handleCheckOut(b.bookingId)}
                          >
                            🏁 Check-out
                          </button>
                        ) : (
                          <span className="badge bg-light text-muted small border px-2 py-1 rounded-pill mt-1">Ends on {b.endDate}</span>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="text-center py-5 text-muted border-0">No rental history yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerBookings;
