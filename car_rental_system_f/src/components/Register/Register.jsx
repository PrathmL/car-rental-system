import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCarSide, FaKey } from 'react-icons/fa';
import './Register.css';
import { showAlert } from '../../utils/SwalUtils';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', role: '', password: '', confirmPassword: '',
    securityQuestion: '', securityAnswer: ''
  });

  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const [emailTaken, setEmailTaken] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [phoneTaken, setPhoneTaken] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);

  // Dynamic Progress Calculation
  useEffect(() => {
    if (step === 2) {
      setProgress(100);
    } else {
      let currentProgress = 0;
      if (formData.fullName.trim().length > 2) currentProgress += 15;
      if (formData.email.includes('@') && formData.email.includes('.')) currentProgress += 15;
      if (formData.role) currentProgress += 30;
      setProgress(currentProgress);
    }
  }, [step, formData.fullName, formData.email, formData.role]);

  // Instant Email Check Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.email && formData.email.includes('@') && formData.email.includes('.')) {
        setCheckingEmail(true);
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/check-email?email=${formData.email.trim()}`);
          setEmailTaken(response.data);
        } catch (error) {
          console.error("Email verification service unavailable");
        } finally {
          setCheckingEmail(false);
        }
      } else {
        setEmailTaken(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [formData.email]);

  // Instant Phone Check Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.phone && formData.phone.length >= 10) {
        setCheckingPhone(true);
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/check-phone?phone=${formData.phone.trim()}`);
          setPhoneTaken(response.data);
        } catch (error) {
          console.error("Phone verification service unavailable");
        } finally {
          setCheckingPhone(false);
        }
      } else {
        setPhoneTaken(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [formData.phone]);

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is the name of your first school?",
    "In which city were you born?",
    "What is your favorite book?"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    if (errors.role) setErrors({ ...errors, role: '' });
  };

  const validateStep1 = () => {
    let e = {};
    if (!formData.fullName) e.fullName = "Name is required";
    if (!formData.email) e.email = "Email is required";
    if (!formData.role) e.role = "Please select your purpose";
    if (emailTaken) e.email = "This email is already in use";
    setErrors(e);
    return Object.keys(e).length === 0 && !emailTaken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailTaken || phoneTaken) {
      showAlert("Account Exists", "Details already registered. Please check email/phone.", "warning");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showAlert("Error", "Passwords do not match!", "error");
      return;
    }
    if (!document) {
      showAlert("Required", "Please upload the required document.", "warning");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', formData.fullName);
    data.append('email', formData.email.toLowerCase().trim());
    data.append('phone', formData.phone.trim());
    data.append('password', formData.password);
    data.append('role', formData.role);
    data.append('document', document);
    data.append('securityQuestion', formData.securityQuestion);
    data.append('securityAnswer', formData.securityAnswer);

    try {
      await axios.post('http://localhost:8080/api/auth/register', data);
      showAlert('Success!', 'Application submitted! We will verify your profile shortly.', 'success');
      navigate('/login');
    } catch (err) {
      showAlert("Failed", err.response?.data || "Registration failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* Left Visual Side */}
      <div className="register-side-visual">
        <div>
          <h1 className="text-white" data-aos="fade-down" data-aos-delay="100">Join India's Most <br/> Trusted Fleet.</h1>
          <p className="lead mb-5 opacity-75" data-aos="fade-down" data-aos-delay="200">Start your journey with RentRide and experience premium self-drive freedom.</p>
          
          <div className="benefit-item" data-aos="fade-right" data-aos-delay="400">
            <span className="fs-4 benefit-icon-pulse">🛡️</span>
            <div>
              <h6 className="fw-bold mb-0">Fully Verified</h6>
              <p className="small mb-0 opacity-75">Manual document audit for every user.</p>
            </div>
          </div>
          
          <div className="benefit-item" data-aos="fade-right" data-aos-delay="600">
            <span className="fs-4 benefit-icon-pulse">💎</span>
            <div>
              <h6 className="fw-bold mb-0">Premium Selection</h6>
              <p className="small mb-0 opacity-75">Access only high-quality, serviced vehicles.</p>
            </div>
          </div>
          
          <div className="benefit-item" data-aos="fade-right" data-aos-delay="800">
            <span className="fs-4 benefit-icon-pulse">⚡</span>
            <div>
              <h6 className="fw-bold mb-0">Instant Approval</h6>
              <p className="small mb-0 opacity-75">Get on the road faster with our quick review.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="register-side-form">
        <div className="register-card-modern" data-aos="fade-left">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <div className="bg-primary rounded-3 p-2 text-white fw-800">RR</div>
              <h4 className="fw-800 m-0 text-dark tracking-tight">RentRide</h4>
            </div>
            <h2 className="fw-800 text-dark mb-1">Create Account</h2>
            <p className="text-muted small">Step {step} of 2: {step === 1 ? 'Personal Profile' : 'Security Setup'}</p>
          </div>

          <div className="step-indicator-bar">
            <div className="step-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          {step === 1 ? (
            <div className="animate-fade-in">
              <div className="mb-4 text-center">
                <label className="small fw-800 text-muted text-uppercase mb-3 d-block">I am here to...</label>
                <div className="row g-3">
                  <div className="col-6">
                    <div className={`role-option-card ${formData.role === 'customer' ? 'active' : ''}`} onClick={() => handleRoleSelect('customer')}>
                      <div className="fs-2 mb-2 text-primary">
                        <FaCarSide />
                      </div>
                      <div className="fw-800 small text-dark">Rent a Car</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className={`role-option-card ${formData.role === 'owner' ? 'active' : ''}`} onClick={() => handleRoleSelect('owner')}>
                      <div className="fs-2 mb-2 text-primary">
                        <FaKey />
                      </div>
                      <div className="fw-800 small text-dark">Host a Car</div>
                    </div>
                  </div>
                </div>
                {errors.role && <div className="text-danger x-small mt-2">{errors.role}</div>}
              </div>

              <div className="form-group mb-3">
                <input type="text" name="fullName" className="form-control form-control-premium" placeholder="Your Full Name" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="form-group mb-1 position-relative">
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control form-control-premium ${emailTaken ? 'is-invalid border-danger' : ''}`} 
                  placeholder="Email Address" 
                  value={formData.email} 
                  onChange={handleChange}
                />
                {checkingEmail && <div className="spinner-border spinner-border-sm text-primary position-absolute end-0 top-50 translate-middle-y me-3"></div>}
              </div>
              <div className="mb-4">
                {emailTaken && <div className="text-danger x-small fw-bold ms-2 mt-1">⚠️ This email is already registered.</div>}
              </div>

              <button className="btn btn-primary-modern w-100 py-3 fw-800" onClick={() => validateStep1() && setStep(2)} disabled={emailTaken || checkingEmail}>
                Continue to Security
              </button>
              
              <div className="text-center mt-4">
                <span className="text-muted small">Already registered? </span>
                <Link to="/login" className="text-primary fw-bold text-decoration-none small">Sign in instead</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <div className="mb-4">
                <label className="small fw-800 text-muted text-uppercase mb-2">
                  {formData.role === 'customer' ? 'Driving License' : 'Identity Proof'}
                </label>
                <div className="upload-area-premium text-center">
                  <input type="file" className="d-none" id="docUpload" onChange={(e) => setDocument(e.target.files[0])} accept=".pdf,image/*" />
                  <label htmlFor="docUpload" className="mb-0 cursor-pointer d-block w-100">
                    <div className="fs-1 mb-2 text-primary">📂</div>
                    <div className="fw-800 text-dark small">{document ? document.name : 'Choose File to Upload'}</div>
                    <div className="text-muted x-small mt-1">Max file size: 5MB</div>
                  </label>
                </div>
              </div>

              <div className="form-group mb-3 position-relative">
                <input type="tel" name="phone" className={`form-control form-control-premium ${phoneTaken ? 'is-invalid border-danger' : ''}`} placeholder="Mobile Number" value={formData.phone} onChange={handleChange} required />
                {checkingPhone && <div className="spinner-border spinner-border-sm text-primary position-absolute end-0 top-50 translate-middle-y me-3"></div>}
              </div>
              <div className="mb-3">
                {phoneTaken && <div className="text-danger x-small fw-bold ms-2">⚠️ Number already registered.</div>}
              </div>

              <div className="form-group mb-3">
                <select name="securityQuestion" className="form-select form-control-premium" value={formData.securityQuestion} onChange={handleChange} required>
                  <option value="">Security Question...</option>
                  {securityQuestions.map((q, i) => <option key={i} value={q}>{q}</option>)}
                </select>
              </div>

              <div className="form-group mb-3">
                <input type="text" name="securityAnswer" className="form-control form-control-premium" placeholder="Security Answer" value={formData.securityAnswer} onChange={handleChange} required />
              </div>

              <div className="row g-2 mb-4">
                <div className="col-md-6">
                  <input type="password" name="password" className="form-control form-control-premium" placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <input type="password" name="confirmPassword" className="form-control form-control-premium" placeholder="Confirm" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>

              <div className="d-flex gap-3">
                <button type="button" className="btn btn-light rounded-pill px-4 fw-bold border" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="btn btn-primary-modern flex-grow-1 py-3 fw-800" disabled={loading || emailTaken || phoneTaken}>
                  {loading ? 'Submitting...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
