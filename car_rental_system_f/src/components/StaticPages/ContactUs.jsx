import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaClock } from 'react-icons/fa';
import { showAlert } from '../../utils/SwalUtils';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/contact', formData);
      showAlert('Message Sent', 'Our team will contact you soon.', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      showAlert('Error', 'Failed to send message. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-wrapper overflow-hidden">
      {/* 1. Page Header */}
      <section className="bg-light py-5 mb-5">
        <div className="container py-5 text-center">
          <div data-aos="fade-down">
            <span className="badge bg-primary-soft text-primary rounded-pill px-3 py-2 mb-3 fw-bold tracking-widest uppercase">Get In Touch</span>
            <h1 className="display-3 fw-900 text-dark mb-3">We'd Love to <span className="text-primary">Hear From You</span></h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Have a question about our fleet or interested in listing your car? Our team is available 24/7 to assist you.
            </p>
          </div>
        </div>
      </section>

      <div className="container pb-5">
        <div className="row justify-content-center g-5">
          
          {/* 2. Contact Info - Now in one column */}
          <div className="col-lg-10">
            <div className="row g-4 mb-5">
              <div className="col-md-6 col-xl-3" data-aos="fade-up" data-aos-delay="100">
                <div className="p-4 bg-white rounded-5 shadow-soft border-0 h-100 text-center hover-lift">
                  <div className="stat-icon-wrapper icon-blue mx-auto mb-3" style={{ width: '60px', height: '60px', borderRadius: '18px' }}>
                    <FaMapMarkerAlt />
                  </div>
                  <h6 className="fw-800 text-dark mb-2">Headquarters</h6>
                  <p className="small text-muted mb-0">Mumbai, MH 400001</p>
                </div>
              </div>

              <div className="col-md-6 col-xl-3" data-aos="fade-up" data-aos-delay="200">
                <div className="p-4 bg-white rounded-5 shadow-soft border-0 h-100 text-center hover-lift">
                  <div className="stat-icon-wrapper icon-purple mx-auto mb-3" style={{ width: '60px', height: '60px', borderRadius: '18px' }}>
                    <FaPhoneAlt />
                  </div>
                  <h6 className="fw-800 text-dark mb-2">Call Us</h6>
                  <p className="small text-muted mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="col-md-6 col-xl-3" data-aos="fade-up" data-aos-delay="300">
                <div className="p-4 bg-white rounded-5 shadow-soft border-0 h-100 text-center hover-lift">
                  <div className="stat-icon-wrapper icon-green mx-auto mb-3" style={{ width: '60px', height: '60px', borderRadius: '18px' }}>
                    <FaEnvelope />
                  </div>
                  <h6 className="fw-800 text-dark mb-2">Email Support</h6>
                  <p className="small text-muted mb-0">support@rentride.in</p>
                </div>
              </div>

              <div className="col-md-6 col-xl-3" data-aos="fade-up" data-aos-delay="400">
                <div className="p-4 bg-white rounded-5 shadow-soft border-0 h-100 text-center hover-lift">
                  <div className="stat-icon-wrapper icon-orange mx-auto mb-3" style={{ width: '60px', height: '60px', borderRadius: '18px' }}>
                    <FaClock />
                  </div>
                  <h6 className="fw-800 text-dark mb-2">Working Hours</h6>
                  <p className="small text-muted mb-0">24/7 Availability</p>
                </div>
              </div>
            </div>

            {/* 3. Message Form - Centered below info */}
            <div className="col-lg-10 mx-auto" data-aos="fade-up">
              <div className="card-modern p-5 bg-white border-0 shadow-lg rounded-5">
                <h3 className="fw-900 text-dark mb-4 text-center">Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input type="text" name="name" className="form-control rounded-4 border-light-subtle bg-light px-4" id="nameInput" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        <label htmlFor="nameInput" className="px-4">Full Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input type="email" name="email" className="form-control rounded-4 border-light-subtle bg-light px-4" id="emailInput" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                        <label htmlFor="emailInput" className="px-4">Email Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-4">
                        <textarea name="message" className="form-control rounded-4 border-light-subtle bg-light px-4" style={{ height: '150px' }} id="messageInput" placeholder="How can we help?" value={formData.message} onChange={handleChange} required></textarea>
                        <label htmlFor="messageInput" className="px-4">Your Message</label>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg d-inline-flex align-items-center gap-3 transition-all" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                        {!loading && <FaPaperPlane />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Map Section */}
      <section className="container py-5 mb-5" data-aos="fade-up">
        <div className="bg-dark rounded-5 p-2 shadow-lg overflow-hidden" style={{ height: '400px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.313414011145!2d73.9142143148933!3d18.5510129873904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b2075d%3A0x27efadcf9e9d276b!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1679912000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '25px', filter: 'grayscale(1) invert(1) contrast(1.2)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
