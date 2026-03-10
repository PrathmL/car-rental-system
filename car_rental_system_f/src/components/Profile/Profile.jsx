import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Profile.css';
import { showAlert } from '../../utils/SwalUtils';

const Profile = ({ onUpdate }) => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ name: '', phone: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
      setProfileData({ name: savedUser.name || '', phone: savedUser.phone || '' });
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${user.id}/profile`, profileData);
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setIsEditing(false);
      if (onUpdate) onUpdate(response.data); // Notify parent component
      showAlert("Success", "Profile updated successfully!", "success");
    } catch (error) {
      console.error("Profile Update Error:", error);
      showAlert("Error", error.response?.data || "Failed to update profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert("Mismatch", "New passwords do not match!", "warning");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/users/${user.id}/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
      showAlert("Success", "Password updated successfully!", "success");
    } catch (error) {
      console.error("Password Update Error:", error);
      showAlert("Error", error.response?.data || "Failed to change password.", "error");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!user) return <div className="p-5 text-center">Loading profile...</div>;

  return (
    <motion.div 
      className="profile-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="row g-4">
        {/* LEFT SECTION: PROFILE INFO */}
        <motion.div className="col-lg-6" variants={cardVariants}>
          <div className="profile-card shadow-soft p-4 p-md-5 rounded-5 bg-white h-100">
            <div className="d-flex align-items-center gap-4 mb-5">
              <motion.div 
                className="profile-avatar-lg bg-primary text-white display-5 fw-bold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              >
                {user.name.charAt(0)}
              </motion.div>
              <div>
                <h3 className="fw-800 m-0 text-dark">{user.name}</h3>
                <span className="badge bg-primary-soft text-primary rounded-pill px-3 py-2 mt-2 text-uppercase small fw-bold">
                  {user.role} Verified
                </span>
              </div>
            </div>

            {!isEditing ? (
              <div className="text-center py-5 border-2 border-dashed rounded-4 bg-light bg-opacity-50">
                <p className="small text-muted mb-4 fw-bold text-uppercase tracking-tighter">Personal Information</p>
                <button className="btn btn-primary-modern rounded-pill px-5 py-3 fw-bold shadow-sm" onClick={() => setIsEditing(true)}>
                  Update Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">Email (Read-only)</label>
                  <input type="text" className="form-control form-control-modern bg-light border-0" value={user.email} readOnly style={{ cursor: 'not-allowed' }} />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-modern border-primary"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    required
                    autoFocus
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-control form-control-modern border-primary"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="d-flex gap-3 mt-5">
                  <button type="submit" className="btn btn-primary-modern px-5 py-3 shadow-sm" disabled={loading}>
                    {loading ? 'Saving...' : 'Edit Profile'}
                  </button>
                  <button type="button" className="btn btn-link text-muted text-decoration-none fw-bold" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* RIGHT SECTION: SECURITY */}
        <motion.div className="col-lg-6" variants={cardVariants}>
          <div className="profile-card shadow-soft p-4 p-md-5 rounded-5 bg-white h-100">
            <h4 className="fw-800 mb-4 d-flex align-items-center gap-3 text-dark">
              <span className="fs-3">🛡️</span> Security & Access
            </h4>
            <p className="text-muted small mb-5">Keep your account safe by updating your password regularly.</p>

            {!isChangingPassword ? (
              <div className="text-center py-5 border-2 border-dashed rounded-4 bg-light bg-opacity-50">
                <p className="small text-muted mb-4 fw-bold text-uppercase tracking-tighter">Account Protection</p>
                <button className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm" onClick={() => setIsChangingPassword(true)}>
                  Change Password
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordUpdate}>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">Current Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-modern border-primary" 
                    placeholder="••••••••"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">New Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-modern border-primary" 
                    placeholder="Min 6 characters"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-800 text-muted text-uppercase tracking-wider">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="form-control form-control-modern border-primary" 
                    placeholder="Re-type password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="d-flex gap-3 mt-5">
                  <button type="submit" className="btn btn-primary-modern px-5 py-3" disabled={loading}>
                    {loading ? 'Updating...' : 'Set New Password'}
                  </button>
                  <button type="button" className="btn btn-link text-muted text-decoration-none fw-bold" onClick={() => setIsChangingPassword(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
