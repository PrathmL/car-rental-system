import React, { useState } from 'react';
import './CarCard.css';
import ImageModal from '../../utils/ImageModal';

const CarCard = ({ car, onViewDetails }) => {
  const [showModal, setShowModal] = useState(false);

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/400x250?text=Premium+Vehicle';
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url}`;
  };

  const fullImg = getImageUrl(car.image);

  return (
    <>
      <div className="single-car-item shadow-sm h-100">
        <div className="car-image cursor-zoom-in" onClick={() => setShowModal(true)}>
          <img src={fullImg} alt={car.name} />
        </div>
        <div className="car-content p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="m-0 text-dark fw-bold">{car.brand} {car.name}</h3>
            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 small fw-bold">{car.year}</span>
          </div>
          
          <div className="car-meta mb-4 d-flex gap-3 text-muted small">
            <span>📍 {car.location || 'Pan India'}</span>
          </div>

          <div className="car-footer d-flex justify-content-between align-items-center pt-3 border-top">
            <div className="car-price">
              <span className="text-primary fw-800 fs-4">₹{car.price}</span>
              <small className="text-muted ms-1">/ Day</small>
            </div>
            <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold" onClick={onViewDetails}>
              Rent Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ImageModal 
          src={fullImg} 
          alt={`${car.brand} ${car.name}`} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default CarCard;
