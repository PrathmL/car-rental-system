import React, { useState } from 'react';
import axios from 'axios';
import './EditCar.css';
import { showAlert } from '../../utils/SwalUtils';

const EditCar = ({ car, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    price: car.pricePerDay,
    status: car.availability,
    description: car.description,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/cars/${car.carId}`, {
        pricePerDay: parseFloat(formData.price),
        availability: formData.status,
        description: formData.description
      });

      showAlert('Updated', 'Car details updated successfully!', 'success');
      onSuccess();
    } catch (error) {
      showAlert('Error', 'Failed to update car details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-car-section">
      <h2>Edit Listing: {car.brand} {car.model}</h2>
      <form className="edit-car-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Price Per Day (₹)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="AVAILABLE">Available</option>
            <option value="BOOKED">Booked</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
        </div>
        
        <div className="edit-actions">
          <button type="submit" className="update-btn" disabled={loading}>
            {loading ? 'Updating...' : 'Update Car'}
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
