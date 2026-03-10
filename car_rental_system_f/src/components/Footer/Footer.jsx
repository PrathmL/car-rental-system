import React from 'react';
import './Footer.css';
import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const platformLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Meet the Team', path: '/developers' },
    { label: 'List Your Car', path: '/register' },
    { label: 'Safety FAQ', path: '/faq' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Insurance Details', path: '/insurance' },
  ];

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="row g-5">
          {/* Brand Column */}
          <FooterBrand />

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <FooterLinks title="Platform" links={platformLinks} />
          </div>

          {/* Legal Links */}
          <div className="col-lg-3 col-md-6">
            <FooterLinks title="Legal & Safety" links={legalLinks} />
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-12">
            <h6 className="footer-heading">Reach Out</h6>
            <div className="contact-info-item">
              <span className="contact-icon"><FaMapMarkerAlt /></span>
              <p className="small mb-0">123 Car Street, Automall Hub,<br/>Mumbai, Maharashtra 400001</p>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaPhoneAlt /></span>
              <p className="small mb-0">+91 98765 43210</p>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon"><FaEnvelope /></span>
              <p className="small mb-0">support@rentride.in</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="row align-items-center g-3">
            <div className="col-md-6 text-center text-md-start">
              <p className="footer-bottom-text mb-0">
                &copy; 2026 RentRide India. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="status-badge">
                ● System Sync Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
