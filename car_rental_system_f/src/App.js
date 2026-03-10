import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { 
  FaCar, FaUsers, FaMapMarkerAlt, FaHeadset, 
  FaSearchLocation, FaCalendarCheck, FaKey 
} from 'react-icons/fa';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './utils/ScrollToTop';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

// Static Pages
import AboutUs from './components/StaticPages/AboutUs';
import ContactUs from './components/StaticPages/ContactUs';
import SafetyFAQ from './components/StaticPages/SafetyFAQ';
import PrivacyPolicy from './components/StaticPages/PrivacyPolicy';
import TermsOfService from './components/StaticPages/TermsOfService';
import InsuranceDetails from './components/StaticPages/InsuranceDetails';
import Developers from './components/StaticPages/Developers';

function App() {
  const [user, setUser] = useState(null);
  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const fetchFleet = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/cars');
        const available = res.data.filter(c => c.availability === 'AVAILABLE');
        setFleet(available);
      } catch (err) {
        console.error("Home fleet fetch error:", err);
      }
    };
    fetchFleet();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/400x250?text=Premium+Vehicle';
    if (url.startsWith('http')) return url;
    return `http://localhost:8080${url}`;
  };

  const HomeContent = () => (
    <div className="home-wrapper">
      {/* 1. HERO AREA */}
      <section className="hero-area">
        <div className="container">
          <div className="hero-content" data-aos="fade-right">
            <span className="section-subtitle-rentq text-white">Find your perfect ride</span>
            <h1 className="mb-4">Search, Book & Rent <br/> Anywhere Easily.</h1>
            <p className="fs-5 mb-5 opacity-75 pe-lg-5">
              We provide the most professional car rental service in India. 
              Choose from over 500+ premium vehicles at the best prices.
            </p>
            <div className="d-flex gap-3">
              <Link to="/register" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">Get Started Now</Link>
              <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <div className="container">
        <div className="stats-section-box" data-aos="fade-up" data-aos-delay="200">
          <div className="row text-center g-0">
            <div className="col-md-3 col-6 stat-divider">
              <div className="stat-item">
                <div className="stat-icon-wrapper icon-blue"><FaCar /></div>
                <h2>500+</h2>
                <p>Elite Cars</p>
              </div>
            </div>
            <div className="col-md-3 col-6 stat-divider">
              <div className="stat-item">
                <div className="stat-icon-wrapper icon-purple"><FaUsers /></div>
                <h2>10k+</h2>
                <p>Global Users</p>
              </div>
            </div>
            <div className="col-md-3 col-6 stat-divider">
              <div className="stat-item">
                <div className="stat-icon-wrapper icon-orange"><FaMapMarkerAlt /></div>
                <h2>25+</h2>
                <p>Premium Hubs</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <div className="stat-icon-wrapper icon-green"><FaHeadset /></div>
                <h2>24/7</h2>
                <p>VIP Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STEPS SECTION */}
      <section className="section-padding bg-white" data-aos="fade-up">
        <div className="container">
          <div className="section-title">
            <span>How it works</span>
            <h2>Follow 3 Easy Steps</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="single-step-box">
                <div className="step-number-bg">01</div>
                <div className="step-icon"><FaSearchLocation /></div>
                <h4>Choose Location</h4>
                <p>Pick your preferred pick-up point from our 50+ service hubs across India.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="single-step-box">
                <div className="step-number-bg">02</div>
                <div className="step-icon"><FaCalendarCheck /></div>
                <h4>Pick-Up Date</h4>
                <p>Select the date and time that fits your schedule. We offer 24/7 flexibility.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mx-auto" data-aos="zoom-in" data-aos-delay="300">
              <div className="single-step-box">
                <div className="step-number-bg">03</div>
                <div className="step-icon"><FaKey /></div>
                <h4>Book Your Car</h4>
                <p>Confirm your booking instantly and get ready for a premium travel experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROTATING FLEET SECTION */}
      <section className="section-padding bg-soft overflow-hidden" data-aos="fade-up">
        <div className="container">
          <div className="section-title">
            <span>Our Fleet</span>
            <h2>Premium Featured Vehicles</h2>
          </div>
        </div>
        
        <div className="fleet-scroll-container">
          <div className="fleet-track">
            {[...fleet, ...fleet].map((car, i) => (
              <div key={i} className="ticker-item">
                <div className="single-car-item shadow-sm">
                  <div className="car-image">
                    <img src={getImageUrl(car.imageUrl)} alt={car.model} />
                  </div>
                  <div className="car-content">
                    <h3 className="text-truncate">{car.brand} {car.model}</h3>
                    <div className="car-meta">
                      <span>👤 5 Seats</span>
                      <span>⚙️ {car.year} Model</span>
                    </div>
                    <div className="car-footer">
                      <div className="car-price">₹{car.pricePerDay} <span>/ Day</span></div>
                      <Link to="/register" className="btn btn-primary btn-sm rounded-pill px-3 fw-bold text-decoration-none">Rent</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section className="section-padding bg-white" data-aos="fade-up">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070" className="img-fluid shadow-lg rounded-5" alt="About" />
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-content">
                <span className="section-subtitle-rentq text-start d-block">Why Choose Us</span>
                <h2 className="section-title-rentq mb-4">Best Service With <br/> Affordable Price</h2>
                <p className="text-muted mb-5">
                  We are committed to providing you with the best car rental experience. 
                  Our platform connects you with top owners ensuring quality and safety at every turn.
                </p>
                <div className="about-feature-list">
                  <div className="about-feature-item">
                    <i>🛡️</i>
                    <h6 className="fw-bold m-0">Safe & Secure</h6>
                  </div>
                  <div className="about-feature-item">
                    <i>💰</i>
                    <h6 className="fw-bold m-0">Best Price</h6>
                  </div>
                  <div className="about-feature-item">
                    <i>🚗</i>
                    <h6 className="fw-bold m-0">Wide Range</h6>
                  </div>
                  <div className="about-feature-item">
                    <i>🎧</i>
                    <h6 className="fw-bold m-0">24/7 Support</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUESTIONS / CONTACT SECTION */}
      <section className="questions-banner" data-aos="fade-up">
        <div className="container">
          <div className="questions-card">
            <h2 className="fw-bold mb-3">Have Any Questions?</h2>
            <p className="text-muted mb-5">We're here to help you 24/7. Get in touch with our expert support team for any assistance.</p>
            <Link to="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">Contact Us Now</Link>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content" style={{ paddingTop: '0' }}>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<SafetyFAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/insurance" element={<InsuranceDetails />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={!user ? <Navigate to="/login" /> : user.role === 'CUSTOMER' ? <Navigate to="/customer-dashboard" /> : user.role === 'OWNER' ? <Navigate to="/owner-dashboard" /> : <Navigate to="/admin-dashboard" />} />
            <Route path="/customer-dashboard/*" element={user?.role === 'CUSTOMER' ? <CustomerDashboard /> : <Navigate to="/login" />} />
            <Route path="/owner-dashboard/*" element={user?.role === 'OWNER' ? <OwnerDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin-dashboard/*" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
