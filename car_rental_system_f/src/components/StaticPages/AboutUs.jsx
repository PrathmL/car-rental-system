import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaHistory, FaGem, FaHandshake, FaShieldAlt, FaRocket, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="about-page-wrapper overflow-hidden">
      {/* --- Section 1: Hero Header --- */}
      <section className="bg-light py-5 mb-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary-soft text-primary rounded-pill px-3 py-2 mb-3 fw-bold uppercase tracking-wider" data-aos="fade-down">
                Premium Experience
              </span>
              <h1 className="display-3 fw-bold mb-4" data-aos="fade-right" data-aos-delay="100">
                About <span className="text-primary">RentRide</span>
              </h1>
              <p className="lead text-muted mb-4" data-aos="fade-right" data-aos-delay="200">
                We are on a mission to redefine the way people travel by providing a seamless, secure, and premium car rental experience.
              </p>
              <p className="text-muted lh-lg" data-aos="fade-right" data-aos-delay="300">
                Founded in 2026, RentRide was built on the principle of freedom. We believe that everyone should have access to a vehicle that fits their lifestyle and adventure, without the burden of ownership.
              </p>
            </div>
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="400">
              <img src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Premium Car" className="img-fluid rounded-5 shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Our Journey --- */}
      <section className="container py-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5 order-lg-2">
            <div className="ps-lg-5">
              <h2 className="fw-bold mb-4" data-aos="fade-left">Our Journey So Far</h2>
              <p className="text-muted mb-4" data-aos="fade-left" data-aos-delay="100">
                What started as a small fleet of five vehicles in a local garage has grown into India's most trusted community-driven car sharing platform.
              </p>
              <div className="d-flex align-items-start gap-3 mb-4" data-aos="fade-up" data-aos-delay="200">
                <div className="bg-primary text-white p-3 rounded-4 shadow-sm"><FaHistory /></div>
                <div>
                  <h6 className="fw-bold mb-1">Founded in 2026</h6>
                  <p className="small text-muted mb-0">Launched with a vision to democratize premium mobility.</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-3" data-aos="fade-up" data-aos-delay="300">
                <div className="bg-primary text-white p-3 rounded-4 shadow-sm"><FaRocket /></div>
                <div>
                  <h6 className="fw-bold mb-1">Hyper Growth</h6>
                  <p className="small text-muted mb-0">Connecting over 10,000+ happy travelers every month.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 order-lg-1">
            <div className="row g-3">
              <div className="col-6" data-aos="fade-right" data-aos-delay="100">
                <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid rounded-4 shadow-sm" alt="Fleet" />
              </div>
              <div className="col-6 mt-5" data-aos="fade-down" data-aos-delay="200">
                <img src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600" className="img-fluid rounded-4 shadow-sm" alt="Service" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Vision & Mission --- */}
      <section className="bg-dark text-white py-5 my-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6" data-aos="flip-left" data-aos-duration="1200">
              <div className="p-5 bg-white bg-opacity-10 rounded-5 h-100 border border-white border-opacity-10">
                <div className="display-4 mb-4 text-primary opacity-75">🎯</div>
                <h3 className="fw-bold mb-3">Our Vision</h3>
                <p className="lead opacity-75">To be the world's most trusted community-driven car rental platform, creating a future where travel is accessible, sustainable, and purely joyful for every adventurer.</p>
              </div>
            </div>
            <div className="col-md-6" data-aos="flip-right" data-aos-duration="1200" data-aos-delay="200">
              <div className="p-5 bg-white bg-opacity-10 rounded-5 h-100 border border-white border-opacity-10">
                <div className="display-4 mb-4 text-primary opacity-75">🛡️</div>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <p className="lead opacity-75">Connecting car owners with adventurous travelers through cutting-edge technology, rigorous safety standards, and a relentless focus on customer happiness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Core Values --- */}
      <section className="container py-5 mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold" data-aos="fade-up">The Values That Drive Us</h2>
          <p className="text-muted" data-aos="fade-up" data-aos-delay="100">Integrity, Safety, and Excellence are at the heart of everything we do.</p>
        </div>
        <div className="row g-4">
          {[
            { icon: <FaGem />, title: "Quality Fleet", desc: "Every car is hand-picked and manually verified for peak performance." },
            { icon: <FaShieldAlt />, title: "Safety First", desc: "Advanced security and insurance coverage for every single trip." },
            { icon: <FaHandshake />, title: "Absolute Trust", desc: "Transparent pricing with no hidden fees or surprise charges." },
            { icon: <FaHeart />, title: "User Happiness", desc: "Dedicated 24/7 VIP support to ensure your journey is flawless." }
          ].map((val, i) => (
            <div key={i} className="col-lg-3 col-sm-6" data-aos="zoom-in-up" data-aos-delay={i * 150}>
              <div className="text-center p-4 h-100">
                <div className="stat-icon-wrapper icon-blue mx-auto mb-4">{val.icon}</div>
                <h5 className="fw-bold">{val.title}</h5>
                <p className="small text-muted mb-0">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 5: CTA --- */}
      <section className="container mb-5">
        <div className="bg-primary rounded-5 p-5 text-center text-white shadow-lg" data-aos="zoom-out" data-aos-duration="800">
          <h2 className="display-5 fw-bold mb-3" data-aos="fade-up" data-aos-delay="200">Ready to Start Your Journey?</h2>
          <p className="mb-5 opacity-75" data-aos="fade-up" data-aos-delay="300">Join thousands of happy travelers who trust RentRide for their road trips.</p>
          <div className="d-flex justify-content-center gap-3" data-aos="fade-up" data-aos-delay="400">
            <Link to="/register" className="btn btn-light btn-lg rounded-pill px-5 py-3 fw-bold text-primary">Get Started Now</Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 fw-bold">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
