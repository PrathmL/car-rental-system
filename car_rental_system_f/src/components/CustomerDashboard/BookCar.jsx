import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookCar.css';
import { showAlert } from '../../utils/SwalUtils';

const BookCar = ({ car, onBack, onSuccess }) => {
  const savedDates = JSON.parse(localStorage.getItem('selectedDates')) || { pickup: '', return: '' };
  
  const [dates, setDates] = useState(savedDates);
  const [basePrice, setBasePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (dates.pickup && dates.return) {
      const start = new Date(dates.pickup);
      const end = new Date(dates.return);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setBasePrice(diffDays * car.pricePerDay);
    }
  }, [dates, car.pricePerDay]);

  const totalPrice = basePrice - discount;

  const handleInputChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'RENTQ20') {
      const discountValue = basePrice * 0.20;
      setDiscount(discountValue);
      showAlert('Promo Applied!', 'You saved 20% on your booking.', 'success');
    } else {
      setDiscount(0);
      showAlert('Invalid Code', 'The promo code entered is not valid.', 'error');
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!dates.pickup || !dates.return) {
      showAlert('Missing Dates', 'Please select both dates', 'warning');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/bookings', {
        customerId: user.id,
        carId: car.carId,
        startDate: dates.pickup,
        endDate: dates.return,
        totalPrice: totalPrice, // Send discounted price
        bookingStatus: 'PENDING'
      });

      showAlert('Success!', 'Booking request sent to the owner! Keep an eye on your alerts.', 'success');
      localStorage.removeItem('selectedDates');
      onSuccess();
    } catch (error) {
      console.error('Booking error:', error);
      showAlert('Availability Conflict', 'This car was just booked by someone else for these dates. Please try another car.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page fade-in-up">
      <button className="back-link" onClick={onBack}>&larr; Back to Details</button>
      
      <div className="booking-container">
        <div className="booking-summary card-modern">
          <h3 className="fw-bold text-dark mb-4">Booking Summary</h3>
          <div className="summary-item border-bottom pb-2 mb-3">
            <span className="text-muted">Car:</span> <strong className="text-dark">{car.brand} {car.model}</strong>
          </div>
          <div className="summary-item border-bottom pb-2 mb-3">
            <span className="text-muted">Rate:</span> <strong className="text-dark">₹{car.pricePerDay} / day</strong>
          </div>
          
          <div className="promo-section my-4">
            <label className="small fw-bold text-muted text-uppercase mb-2">Have a Promo Code?</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control bg-light border-light-subtle" 
                placeholder="Try RENTQ20" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn btn-outline-primary fw-bold" type="button" onClick={applyPromoCode}>Apply</button>
            </div>
          </div>

          <div className="total-breakdown mt-4 pt-3 border-top border-2">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Base Price:</span>
              <span className="fw-bold">₹{basePrice}</span>
            </div>
            {discount > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span className="fw-bold">Discount (20%):</span>
                <span className="fw-bold">- ₹{discount}</span>
              </div>
            )}
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <span className="fw-bold fs-5 text-dark">Total Price:</span>
              <span className="amount fs-3 text-primary fw-800">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        <form className="booking-form card-modern" onSubmit={handleConfirm}>
          <div className="form-group mb-4">
            <label className="small fw-bold text-muted text-uppercase mb-2">Trip Start</label>
            <input 
              type="date" 
              name="pickup" 
              className="form-control form-control-lg bg-light border-light-subtle"
              value={dates.pickup} 
              onChange={handleInputChange} 
              readOnly={!!savedDates.pickup}
              required 
            />
          </div>
          <div className="form-group mb-4">
            <label className="small fw-bold text-muted text-uppercase mb-2">Trip End</label>
            <input 
              type="date" 
              name="return" 
              className="form-control form-control-lg bg-light border-light-subtle"
              value={dates.return} 
              onChange={handleInputChange} 
              readOnly={!!savedDates.return}
              required 
            />
          </div>
          <p className="small text-muted mb-4 p-3 bg-light rounded-3 border">
            <span className="fw-bold text-dark">Note:</span> Your dates are locked based on your availability search. If you want to change dates, please go back to the search page.
          </p>
          <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm & Request Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookCar;
