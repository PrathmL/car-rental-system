import React, { useState } from 'react';
import axios from 'axios';
import './AddCar.css';
import { showAlert } from '../../utils/SwalUtils';

const AddCar = ({ onSuccess }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    location: '',
    description: '',
  });

  const [files, setFiles] = useState({
    image: null,
    rcBook: null,
    puc: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.image || !files.rcBook || !files.puc) {
      showAlert("Incomplete", "Please upload all required documents (Image, RC Book, and PUC).", "warning");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('brand', formData.brand);
    data.append('model', formData.model);
    data.append('year', formData.year);
    data.append('pricePerDay', formData.price);
    data.append('location', formData.location);
    data.append('description', formData.description);
    data.append('ownerId', user.id);
    data.append('image', files.image);
    data.append('rcBook', files.rcBook);
    data.append('puc', files.puc);

    try {
      await axios.post('http://localhost:8080/api/cars', data);
      showAlert('Success!', 'Car registration request submitted! It will be visible once Admin approves it.', 'success');
      onSuccess();
    } catch (error) {
      console.error('Error adding car:', error);
      showAlert('Error', 'Failed to submit car request.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car-section fade-in-up">
      <h2>Register Your Car</h2>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Provide car details and legal documents for verification.</p>
      
      <form className="card-modern add-car-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Brand</label>
            <input className="form-control-modern" type="text" name="brand" placeholder="e.g. Tesla" value={formData.brand} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Model</label>
            <input className="form-control-modern" type="text" name="model" placeholder="e.g. Model 3" value={formData.model} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Year</label>
            <input className="form-control-modern" type="number" name="year" value={formData.year} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price Per Day (₹)</label>
            <input className="form-control-modern" type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="form-control-modern" type="text" name="location" placeholder="City" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Car Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
          </div>
          <div className="form-group">
            <label>RC Book (PDF/Image)</label>
            <input type="file" name="rcBook" accept=".pdf,image/*" onChange={handleFileChange} required />
          </div>
          <div className="form-group">
            <label>PUC Certificate (PDF/Image)</label>
            <input type="file" name="puc" accept=".pdf,image/*" onChange={handleFileChange} required />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea className="form-control-modern" name="description" rows="4" placeholder="Features, safety, rules..." value={formData.description} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="submit-car-btn" disabled={loading}>
          {loading ? 'Uploading Application...' : 'Submit for Approval'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
