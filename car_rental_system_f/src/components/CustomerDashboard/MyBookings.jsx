import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './MyBookings.css';
import ChatBox from '../Chat/ChatBox';
import { showAlert, showConfirm } from '../../utils/SwalUtils';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${user.id}`);
        setBookings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user?.id]);

  const handleCheckIn = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/${id}/checkin`);
      setBookings(prev => prev.map(b => b.bookingId === id ? { ...b, bookingStatus: 'ACTIVE' } : b));
      showAlert('Checked In', 'You have successfully started your trip. Drive safe!', 'success');
    } catch (error) {
      showAlert('Error', 'Failed to check in.', 'error');
    }
  };

  const handleCancel = async (id) => {
    const result = await showConfirm(
      "Cancel Booking?",
      "Are you sure you want to cancel this booking request?",
      "Yes, cancel it"
    );

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/bookings/${id}`);
        setBookings(prev => prev.filter(b => b.bookingId !== id));
        showAlert('Cancelled', 'Booking cancelled successfully.', 'success');
      } catch (error) {
        showAlert('Error', 'Failed to cancel booking.', 'error');
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="bookings-section p-4">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fw-bold mb-4"
      >
        My Bookings
      </motion.h2>
      
      {activeChatBooking && (
        <ChatBox 
          bookingId={activeChatBooking} 
          user={user} 
          onClose={() => setActiveChatBooking(null)} 
        />
      )}

      <motion.div 
        className="table-responsive bg-white rounded-4 shadow-sm p-3 border-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="border-0">ID</th>
              <th className="border-0">Car</th>
              <th className="border-0">Dates</th>
              <th className="border-0">Total</th>
              <th className="border-0">Status</th>
              <th className="border-0 text-end">Actions</th>
            </tr>
          </thead>
          <motion.tbody
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {bookings.length > 0 ? bookings.map(booking => (
              <motion.tr key={booking.bookingId} variants={rowVariants}>
                <td className="fw-bold">#{booking.bookingId}</td>
                <td className="fw-semibold text-dark">{booking.carName || `Car #${booking.carId}`}</td>
                <td><small className="text-muted">{booking.startDate} to {booking.endDate}</small></td>
                <td className="fw-bold text-dark">₹{booking.totalPrice}</td>
                <td>
                  {booking.bookingStatus === 'PENDING' ? (
                    <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill">
                      ⏳ Waiting for Owner Approval
                    </span>
                  ) : (
                    <span className={`badge rounded-pill px-3 py-2 ${(booking.bookingStatus || 'PENDING').toLowerCase()}`}>
                      {booking.bookingStatus}
                    </span>
                  )}
                </td>
                <td className="text-end">
                  <div className="d-flex gap-2 justify-content-end">
                    {booking.bookingStatus === 'CONFIRMED' && (
                      <>
                        {booking.startDate === today ? (
                          <button 
                            className="btn btn-sm btn-success rounded-pill px-3 fw-bold" 
                            onClick={() => handleCheckIn(booking.bookingId)}
                          >
                            📍 Check-in
                          </button>
                        ) : (
                          <span className="badge bg-light text-muted small border px-2 py-1 rounded-pill mt-1">Available on {booking.startDate}</span>
                        )}
                        <button 
                          className="btn btn-sm btn-primary rounded-pill px-3 fw-bold" 
                          onClick={() => setActiveChatBooking(booking.bookingId)}
                        >
                          💬 Chat
                        </button>
                      </>
                    )}
                    {booking.bookingStatus === 'ACTIVE' && (
                      <button 
                        className="btn btn-sm btn-primary rounded-pill px-3 fw-bold" 
                        onClick={() => setActiveChatBooking(booking.bookingId)}
                      >
                        💬 Chat
                      </button>
                    )}
                    {(booking.bookingStatus === 'PENDING' || booking.bookingStatus === 'REJECTED') && (
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold" onClick={() => handleCancel(booking.bookingId)}>
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            )) : (
              <tr><td colSpan="6" className="text-center py-5 text-muted">No bookings found.</td></tr>
            )}
          </motion.tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyBookings;
