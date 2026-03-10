import React from 'react';
import { FaLock, FaUserShield, FaCookieBite, FaDatabase } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaDatabase />,
      title: "Data We Collect",
      content: "We collect personal information that you provide to us, such as name, email address, phone number, and official identification documents (Driving License/ID Proof). This data is essential for identity verification and secure rental transactions."
    },
    {
      icon: <FaUserShield />,
      title: "How We Use Data",
      content: "Your information is used to facilitate car bookings, process payments, provide customer support, and ensure platform safety. We never sell your personal data to third-party advertisers."
    },
    {
      icon: <FaCookieBite />,
      title: "Cookies & Tracking",
      content: "We use essential cookies to keep you logged in and analyze platform performance. You can manage your cookie preferences through your browser settings at any time."
    },
    {
      icon: <FaLock />,
      title: "Security Measures",
      content: "All sensitive data, including passwords and documents, are encrypted using industry-standard protocols. Our servers are monitored 24/7 to prevent unauthorized access and data breaches."
    }
  ];

  return (
    <div className="privacy-page">
      {/* 1. Hero Header */}
      <section className="bg-dark text-white py-5 mb-5" style={{ borderRadius: '0 0 60px 60px' }}>
        <div className="container py-5 text-center" data-aos="fade-down">
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-3 fw-bold tracking-widest">LEGAL & COMPLIANCE</span>
          <h1 className="display-3 fw-800 mb-3">Privacy <span className="text-primary">Policy</span></h1>
          <p className="lead opacity-75 mx-auto" style={{ maxWidth: '700px' }}>
            Your privacy is our priority. Learn how we protect your personal information and maintain transparency in our data practices.
          </p>
          <p className="small mt-4 opacity-50 fw-bold italic text-uppercase">Last Updated: March 8, 2026</p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* 2. Interactive Policy Grid */}
            <div className="row g-4">
              {sections.map((sec, i) => (
                <div key={i} className="col-md-6" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="card-modern p-5 h-100 border-0 shadow-sm hover-lift">
                    <div className="text-primary mb-4" style={{ fontSize: '2.5rem' }}>
                      {sec.icon}
                    </div>
                    <h4 className="fw-800 text-dark mb-3">{sec.title}</h4>
                    <p className="text-muted lh-lg mb-0">{sec.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Detailed Information Section */}
            <div className="mt-5 pt-5 animate-fade-in">
              <div className="p-5 bg-white rounded-5 shadow-soft border border-light">
                <h3 className="fw-800 text-dark mb-4">Your Rights & Control</h3>
                <p className="text-muted mb-4">As a RentRide user, you have complete control over your data. You may request to:</p>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-primary fw-bold">→</span>
                      <span className="fw-bold small text-dark">Access and export your personal information.</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-primary fw-bold">→</span>
                      <span className="fw-bold small text-dark">Request deletion of your account and data.</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-primary fw-bold">→</span>
                      <span className="fw-bold small text-dark">Update or correct inaccurate details.</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-primary fw-bold">→</span>
                      <span className="fw-bold small text-dark">Opt-out of non-essential communications.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Support Box */}
            <div className="mt-5 p-4 bg-primary-soft rounded-4 border border-primary border-opacity-10 text-center" data-aos="zoom-in">
              <p className="mb-0 text-dark small fw-medium">
                Questions about our privacy practices? Contact our Data Protection Officer at 
                <a href="mailto:privacy@rentride.in" className="text-primary fw-bold ms-2 text-decoration-none">privacy@rentride.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
