import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert, showConfirm } from '../../utils/SwalUtils';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real cars list for Admin
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    const result = await showConfirm(
      "Remove Listing?",
      "This will remove the car from our platform permanently.",
      "Yes, remove it"
    );

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/cars/${id}`);
        setCars(cars.filter(c => c.carId !== id));
        showAlert('Removed', 'Car listing removed successfully.', 'success');
      } catch (error) {
        showAlert('Error', 'Failed to remove car.', 'error');
      }
    }
  };

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white py-3 border-bottom">
        <h5 className="fw-bold mb-0 text-dark">Manage All Car Listings</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Owner</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price/Day</th>
                <th>Location</th>
                <th>Availability</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.carId}>
                  <td className="ps-4"><strong>{car.carId}</strong></td>
                  <td>{car.ownerName || `Owner #${car.ownerId}`}</td>
                  <td className="fw-semibold text-dark">{car.brand}</td>
                  <td className="text-dark">{car.model}</td>
                  <td className="fw-bold text-primary">₹{car.pricePerDay}</td>
                  <td>{car.location}</td>
                  <td>
                    <span className={`badge rounded-pill bg-${car.availability === 'AVAILABLE' ? 'success' : 'warning'} bg-opacity-10 text-${car.availability === 'AVAILABLE' ? 'success' : 'warning'} px-3`}>
                      {car.availability}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleDelete(car.carId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
