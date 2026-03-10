import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-rentq sticky-top">
      <div className="container">
        <Link className="navbar-brand brand-rentq d-flex align-items-center" to="/">
          <span className="text-primary">Rent</span>
          <span className="text-dark">Ride</span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link nav-link-rentq" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-rentq" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-rentq" to="/faq">FAQs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-rentq" to="/contact">Contact</Link>
            </li>
          </ul>
          
          <div className="d-flex gap-3 align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                {/* Modern User Display in Navbar */}
                <Link to="/dashboard" className="text-decoration-none d-flex align-items-center gap-2 pe-2 border-end border-light-subtle">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: '35px', height: '35px', fontSize: '0.85rem'}}>
                    {user.name.charAt(0)}
                  </div>
                  <span className="fw-800 text-dark small">{user.name}</span>
                </Link>
                <button className="btn btn-link text-muted fw-bold text-decoration-none small" onClick={handleLogoutClick}>Logout</button>
              </div>
            ) : (
              <>
                <Link className="btn btn-rentq-outline text-decoration-none" to="/login">Login</Link>
                {/* <Link className="btn-rentq-primary text-decoration-none" to="/register">Sign Up</Link> */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
