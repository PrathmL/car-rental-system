import React from 'react';
import './CarDetails.css';

const CarDetails = ({ car, onBack, onBook }) => {
  // Helper to handle backend vs frontend field names
  const availability = car.availability || car.status || 'AVAILABLE';
  const price = car.pricePerDay || car.price || 0;
  const image = car.imageUrl || car.image;

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/600x400?text=No+Image';
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url}`;
  };

  return (
    <div className="car-details-page">
      <button className="back-link" onClick={onBack}>&larr; Back to Listings</button>
      
      <div className="details-card">
        <div className="details-image">
          <img src={getImageUrl(image)} alt={car.model} />
        </div>
        
        <div className="details-info">
          <h2>{car.brand} {car.model} ({car.year})</h2>
          <span className={`status-tag ${availability.toLowerCase()}`}>
            {availability}
          </span>
          
          <div className="price-tag">
            <h3>₹{price} <span>per day</span></h3>
          </div>

          <div className="description">
            <h4>Description</h4>
            <p>{car.description || 'No description provided.'}</p>
          </div>

          <div className="features">
            <h4>Key Features</h4>
            <ul>
              <li>Location: {car.location}</li>
              <li>Year: {car.year}</li>
              <li>Full Tank Guaranteed</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          <button 
            className="book-now-btn" 
            disabled={availability !== 'AVAILABLE' && availability !== 'Available'}
            onClick={onBook}
          >
            {(availability === 'AVAILABLE' || availability === 'Available') ? 'Book This Car' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
