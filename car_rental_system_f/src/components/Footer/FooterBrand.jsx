import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const FooterBrand = () => {
  return (
    <div className="col-lg-4 col-md-12">
      <div className="d-flex align-items-center gap-2 mb-4">
        <div className="bg-primary rounded-3 p-2 text-white fw-800">RR</div>
        <h3 className="fw-800 m-0 text-white tracking-tight">RentRide</h3>
      </div>
      <p className="lh-lg mb-4" style={{ maxWidth: '350px' }}>
        India's most trusted premium car sharing community. We provide seamless self-drive experiences with 100% verified vehicles and owners.
      </p>
      <div className="d-flex gap-3 mt-4">
        <Link to="#" className="social-icon" aria-label="Facebook">
          <FaFacebookF />
        </Link>
        <Link to="#" className="social-icon" aria-label="Twitter">
          <FaTwitter />
        </Link>
        <Link to="#" className="social-icon" aria-label="Instagram">
          <FaInstagram />
        </Link>
        <Link to="#" className="social-icon" aria-label="LinkedIn">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};

export default FooterBrand;
