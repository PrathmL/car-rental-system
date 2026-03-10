import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { showAlert, showConfirm } from '../../utils/SwalUtils';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAction = async (id, type) => {
    if (type === 'delete') {
      const result = await showConfirm(
        "Are you sure?",
        `This will permanently remove user #${id}.`,
        "Yes, delete user"
      );

      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
          setUsers(users.filter(u => u.id !== id));
          showAlert("Deleted", "User has been removed.", "success");
        } catch (error) {
          showAlert("Error", "Action failed. Check console for details.", "error");
        }
      }
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white py-3 border-bottom">
        <h5 className="fw-bold mb-0 text-dark">Manage Registered Users</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th className="pe-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="ps-4"><strong>{user.id}</strong></td>
                  <td className="fw-semibold text-dark">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td><span className={`badge rounded-pill ${user.role === 'ADMIN' ? 'bg-danger' : user.role === 'OWNER' ? 'bg-primary' : 'bg-info'} bg-opacity-10 text-${user.role === 'ADMIN' ? 'danger' : user.role === 'OWNER' ? 'primary' : 'info'} px-3`}>{user.role}</span></td>
                  <td>
                    <span className={`badge rounded-pill bg-success bg-opacity-10 text-success px-3`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleAction(user.id, 'delete')}>
                      Delete
                    </button>
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

export default ManageUsers;
