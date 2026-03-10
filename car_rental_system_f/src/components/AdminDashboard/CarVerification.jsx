import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert } from '../../utils/SwalUtils';

const CarVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/cars/pending');
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching car requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (carId, action) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/cars/${carId}/${action}`);
      showAlert('Success', `Car ${action === 'approve' ? 'Approved' : 'Rejected'}!`, 'success');
      fetchRequests();
    } catch (error) {
      showAlert('Error', "Failed to process car request.", 'error');
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary border-3"></div></div>;

  return (
    <div className="table-responsive">
      <table className="table table-modern align-middle">
        <thead>
          <tr>
            <th className="ps-4">Vehicle Assets</th>
            <th>Owner Info</th>
            <th>RC Book / PUC</th>
            <th className="pe-4 text-end">Validation</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? requests.map(car => (
            <tr key={car.carId}>
              <td className="ps-4">
                <div className="d-flex align-items-center gap-3">
                  <img src={`http://localhost:8080${car.imageUrl}`} alt="Car" className="rounded-3" style={{width: '60px', height: '40px', objectFit: 'cover'}} />
                  <div>
                    <div className="fw-bold text-dark">{car.brand} {car.model}</div>
                    <div className="x-small text-muted">{car.year} Model • {car.location}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge bg-light text-dark border rounded-pill px-3">Owner #{car.ownerId}</span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <a href={`http://localhost:8080${car.rcBookUrl}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-light border px-2 py-1 small fw-bold">RC</a>
                  <a href={`http://localhost:8080${car.pucUrl}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-light border px-2 py-1 small fw-bold">PUC</a>
                </div>
              </td>
              <td className="pe-4 text-end">
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-sm btn-primary rounded-pill px-3 fw-bold" onClick={() => handleAction(car.carId, 'approve')}>Approve</button>
                  <button className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold" onClick={() => handleAction(car.carId, 'reject')}>Reject</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4" className="text-center py-5 text-muted bg-white rounded-4">No pending vehicle registrations.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarVerification;
