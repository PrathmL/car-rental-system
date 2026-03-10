import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaMapMarkerAlt, FaBolt, FaShieldAlt } from 'react-icons/fa';
import './Login.css';
import { showAlert } from '../../utils/SwalUtils';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Reset Password',
      input: 'email',
      inputLabel: 'Registered email address',
      confirmButtonColor: '#0066ff',
      showCancelButton: true,
      borderRadius: '24px'
    });

    if (!email) return;

    try {
      const qRes = await axios.get(`http://localhost:8080/api/auth/security-question/${email}`);
      const question = qRes.data.question;

      const { value: resetData } = await Swal.fire({
        title: 'Security Check',
        html: `
          <div class="text-start">
            <p class="mb-2 text-muted small fw-bold">QUESTION:</p>
            <p class="mb-3 fw-bold">${question}</p>
            <input id="swal-answer" class="swal2-input m-0 w-100 mb-3" style="border-radius: 12px;" placeholder="Your Answer">
            <input id="swal-password" type="password" class="swal2-input m-0 w-100" style="border-radius: 12px;" placeholder="New Password">
          </div>
        `,
        focusConfirm: false,
        confirmButtonText: 'Reset Password',
        confirmButtonColor: '#0066ff',
        borderRadius: '24px',
        preConfirm: () => {
          return {
            answer: document.getElementById('swal-answer').value,
            newPassword: document.getElementById('swal-password').value
          };
        }
      });

      if (resetData) {
        await axios.post('http://localhost:8080/api/auth/reset-password', {
          email,
          answer: resetData.answer,
          newPassword: resetData.newPassword
        });
        showAlert("Success", "Access restored! Try logging in.", "success");
      }
    } catch (err) {
      showAlert("Error", "Account not found or incorrect answer.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      onLoginSuccess(response.data);
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 403 && error.response?.data === 'PENDING_APPROVAL') {
        setApprovalMessage(true);
      } else {
        showAlert("Access Denied", "Invalid email or password.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Visual Side */}
      <div className="login-side-visual">
        <div data-aos="fade-right">
          <span className="badge-new shadow-sm">ESTABLISHED 2026</span>
          <h1 className="text-dark">Sign In <br/> to Your <span className="text-primary">Adventure.</span></h1>
          <p className="lead mb-5 text-muted fw-bold">Your premium fleet is waiting. Join 12,000+ happy riders today.</p>
          
          <div className="login-benefit-card d-flex align-items-center gap-4">
            <div className="login-benefit-icon shadow-sm"><FaMapMarkerAlt /></div>
            <div>
              <h6 className="fw-800 text-dark mb-0">50+ Active Hubs</h6>
              <p className="small text-muted mb-0">Pick up anywhere in India.</p>
            </div>
          </div>

          <div className="login-benefit-card d-flex align-items-center gap-4">
            <div className="login-benefit-icon shadow-sm"><FaBolt /></div>
            <div>
              <h6 className="fw-800 text-dark mb-0">Instant Access</h6>
              <p className="small text-muted mb-0">Real-time booking confirmation.</p>
            </div>
          </div>

          <div className="login-benefit-card d-flex align-items-center gap-4">
            <div className="login-benefit-icon shadow-sm"><FaShieldAlt /></div>
            <div>
              <h6 className="fw-800 text-dark mb-0">Secure Transit</h6>
              <p className="small text-muted mb-0">Verified owners & vehicles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="login-side-form">
        <div className="moving-road-mini"></div>
        
        <div className="login-card-creative">
          <div className="login-car-anim">🚗</div>
          
          <div className="text-center mb-5 mt-2">
            <h2 className="fw-800 text-dark mb-1">Sign In</h2>
            <p className="text-muted small">Enter your credentials to continue</p>
          </div>

          {approvalMessage ? (
            <div className="text-center">
              <div className="p-4 bg-light rounded-4 mb-4 border">
                <div className="fs-1 mb-2">🚦</div>
                <h5 className="fw-bold text-dark">Account Pending</h5>
                <p className="small text-muted mb-0">Your profile is currently under review by our admin team.</p>
              </div>
              <button className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold" onClick={() => setApprovalMessage(false)}>
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group-animate mb-3">
                <input 
                  type="email" 
                  name="email" 
                  className="form-control form-control-modern" 
                  placeholder="Email Address" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group-animate mb-4">
                <input 
                  type="password" 
                  name="password" 
                  className="form-control form-control-modern" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group-animate mb-4 d-flex justify-content-between">
                <label className="d-flex align-items-center gap-2 small text-muted fw-bold">
                  <input type="checkbox" className="form-check-input m-0 shadow-none" /> Remember
                </label>
                <button type="button" className="btn btn-link link-muted p-0 fw-bold text-decoration-none" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>

              <div className="form-group-animate">
                <button type="submit" className="btn-login-premium shadow-sm" disabled={loading}>
                  {loading ? 'Verifying...' : 'Sign In Now'}
                </button>
              </div>

              <div className="text-center mt-5">
                <p className="text-muted small mb-0">New to RentRide?</p>
                <Link to="/register" className="text-primary fw-800 text-decoration-none">Create Account</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
