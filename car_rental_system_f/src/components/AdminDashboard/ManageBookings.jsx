import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings for Admin
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div>Loading platform bookings...</div>;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white py-3 border-bottom">
        <h5 className="fw-bold mb-0 text-dark">All Platform Bookings</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Pickup</th>
                <th>Return</th>
                <th>Total</th>
                <th className="pe-4 text-end">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map(booking => (
                <tr key={booking.bookingId}>
                  <td className="ps-4"><strong>#{booking.bookingId}</strong></td>
                  <td className="fw-semibold text-dark">{booking.customerName || `User #${booking.customerId}`}</td>
                  <td>{booking.carName || `Car #${booking.carId}`}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.endDate}</td>
                  <td className="fw-bold text-primary">₹{booking.totalPrice}</td>
                  <td className="pe-4 text-end">
                    <span className={`badge rounded-pill bg-${booking.bookingStatus === 'CONFIRMED' ? 'success' : booking.bookingStatus === 'CANCELLED' ? 'danger' : 'warning'} bg-opacity-10 text-${booking.bookingStatus === 'CONFIRMED' ? 'success' : booking.bookingStatus === 'CANCELLED' ? 'danger' : 'warning'} px-3`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="text-center py-5 text-muted">No bookings made yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
