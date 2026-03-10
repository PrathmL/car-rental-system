import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyCars.css';

const MyCars = ({ onEdit }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch Owner's cars from Spring Boot
  useEffect(() => {
    const fetchMyCars = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cars/owner/${user.id}`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching owner cars:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchMyCars();
  }, [user.id]);

  const toggleMaintenance = async (car) => {
    const newStatus = car.availability === 'MAINTENANCE' ? 'AVAILABLE' : 'MAINTENANCE';
    try {
      await axios.put(`http://localhost:8080/api/cars/${car.carId}`, {
        pricePerDay: car.pricePerDay,
        availability: newStatus,
        description: car.description
      });
      setCars(cars.map(c => c.carId === car.carId ? { ...c, availability: newStatus } : c));
    } catch (error) {
      alert('Failed to update maintenance status.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this car listing?')) {
      try {
        // Real API: DELETE /api/cars/{id}
        await axios.delete(`http://localhost:8080/api/cars/${id}`);
        setCars(cars.filter(car => car.carId !== id));
        alert('Listing removed.');
      } catch (error) {
        alert('Failed to delete listing.');
      }
    }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x180?text=No+Image';
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url}`;
  };

  if (loading) return <div>Loading your cars...</div>;

  return (
    <div className="my-cars-section fade-in-up">
      <div className="section-header">
        <h2>My Listed Cars</h2>
      </div>
      <div className="owner-cars-grid">
        {cars.length > 0 ? cars.map(car => (
          <div key={car.carId} className="card-modern owner-car-card hover-lift">
            <div className="car-card-img">
              <img src={getImageUrl(car.imageUrl)} alt={car.model} />
              <span className={`card-status-badge ${car.availability.toLowerCase()}`}>{car.availability}</span>
            </div>
            <div className="car-card-body">
              <h4>{car.brand} {car.model}</h4>
              <p className="car-loc">📍 {car.location}</p>
              <p className="car-price"><strong>₹{car.pricePerDay}</strong> <span>/ day</span></p>
              <div className="card-actions d-flex flex-wrap gap-2">
                <button className="edit-btn w-100 mb-1" onClick={() => onEdit(car)}>Edit Details</button>
                <button 
                  className="btn btn-sm btn-outline-warning w-100 mb-1 fw-bold" 
                  onClick={() => toggleMaintenance(car)}
                >
                  {car.availability === 'MAINTENANCE' ? '🔧 End Maintenance' : '🔧 Send to Maintenance'}
                </button>
                <button className="delete-btn w-100" onClick={() => handleDelete(car.carId)}>Remove Listing</button>
              </div>
            </div>
          </div>
        )) : (
          <div className="card-modern" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1/-1' }}>
             <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You haven't added any cars yet. Use the "Add New Car" tab to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;
