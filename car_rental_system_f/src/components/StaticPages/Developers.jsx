import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Developers.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaServer, FaDatabase, FaShieldAlt, FaTerminal } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Developers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  const devs = [
    { 
      name: "Prathm", 
      role: "Lead Full Stack Developer", 
      speciality: "System Architecture & UI/UX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
      bio: "Crafting the core logic and visual identity of RentRide with a focus on seamless user experiences.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      icon: <FaCode />
    },
    { 
      name: "Developer 2", 
      role: "Backend Architect", 
      speciality: "API Design & Security",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
      bio: "Building robust server-side infrastructures and ensuring high-availability for global scaling.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      icon: <FaServer />
    },
    { 
      name: "Developer 3", 
      role: "Frontend Engineer", 
      speciality: "React & Animations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
      bio: "Bringing the interface to life with modern React patterns and cinematic AOS scroll interactions.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      icon: <FaTerminal />
    },
    { 
      name: "Developer 4", 
      role: "Database Specialist", 
      speciality: "Data Integrity & Speed",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974",
      bio: "Optimizing relational models and ensuring every millisecond of query time is utilized effectively.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      icon: <FaDatabase />
    },
    { 
      name: "Developer 5", 
      role: "DevOps Engineer", 
      speciality: "CI/CD & Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974",
      bio: "Automating the delivery pipeline and maintaining the rock-solid stability of our cloud servers.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      icon: <FaShieldAlt />
    }
  ];

  return (
    <div className="developers-page-wrapper overflow-hidden">
      {/* 1. Hero Section */}
      <section className="dev-hero-section bg-dark text-white py-5 position-relative" style={{ borderRadius: '0 0 60px 60px' }}>
        <div className="container py-5 text-center position-relative z-10">
          <div data-aos="fade-down">
            <span className="badge bg-primary px-3 py-2 rounded-pill mb-3 fw-bold tracking-widest uppercase">The Engineering Team</span>
            <h1 className="display-3 fw-900 mb-3">Meet the <span className="text-primary">Architects</span></h1>
            <p className="lead mx-auto opacity-75" style={{ maxWidth: '800px' }}>
              We are a passionate team of developers dedicated to building the future of shared mobility. 
              Our diverse skills come together to create the RentRide platform.
            </p>
          </div>
        </div>
        <div className="bg-pattern opacity-10"></div>
      </section>

      {/* 2. Team Stats (New Content) */}
      <section className="container py-5 mt-n5 position-relative z-20">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-10">
            <div className="stats-section-box shadow-lg" data-aos="fade-up" data-aos-delay="200" style={{ marginTop: '0' }}>
              <div className="row text-center g-0">
                <div className="col-md-4 stat-divider">
                  <div className="stat-item p-3">
                    <h2 className="mb-0">500+</h2>
                    <p className="small text-muted mb-0">Hours of Coding</p>
                  </div>
                </div>
                <div className="col-md-4 stat-divider">
                  <div className="stat-item p-3">
                    <h2 className="mb-0">1.2k+</h2>
                    <p className="small text-muted mb-0">Commits Pushed</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-item p-3">
                    <h2 className="mb-0">100%</h2>
                    <p className="small text-muted mb-0">Passion Reflected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Developer Cards */}
      <section className="container py-5">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-800 text-dark">Our Core Team</h2>
          <p className="text-muted">The brilliant minds behind every line of code.</p>
        </div>

        <div className="row g-5 justify-content-center">
          {devs.map((dev, i) => (
            <div key={i} className="col-lg-4 col-md-6" data-aos="zoom-in-up" data-aos-delay={i * 100}>
              <div className="dev-card-premium h-100 bg-white">
                <div className="dev-card-inner">
                  <div className="dev-image-container">
                    <img src={dev.image} alt={dev.name} className="dev-profile-img" />
                    <div className="dev-overlay-badge icon-blue">
                      {dev.icon}
                    </div>
                  </div>
                  
                  <div className="p-4 p-xl-5 text-center">
                    <h3 className="fw-900 text-dark mb-1">{dev.name}</h3>
                    <p className="text-primary small fw-bold text-uppercase tracking-wider mb-2">{dev.role}</p>
                    <span className="badge bg-light text-muted rounded-pill px-3 py-1 mb-4 small border">
                      {dev.speciality}
                    </span>
                    <p className="text-muted small lh-lg mb-4">{dev.bio}</p>
                    
                    <div className="dev-social-actions d-flex justify-content-center gap-3 pt-4 border-top">
                      <a href={dev.github} target="_blank" rel="noreferrer" className="dev-social-btn github" title="GitHub">
                        <FaGithub />
                      </a>
                      <a href={dev.linkedin} target="_blank" rel="noreferrer" className="dev-social-btn linkedin" title="LinkedIn">
                        <FaLinkedin />
                      </a>
                      <a href={`mailto:contact@rentride.in`} className="dev-social-btn email" title="Email">
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA / Footer Join (New Content) */}
      <section className="container mb-5 pt-5" data-aos="fade-up">
        <div className="bg-primary rounded-5 p-5 text-center text-white shadow-lg">
          <h2 className="fw-800 mb-3">Want to Join the Team?</h2>
          <p className="opacity-75 mb-4">We are always looking for talented engineers to help us scale.</p>
          <Link to="/contact" className="btn btn-light rounded-pill px-5 py-3 fw-800 text-primary">Send Your CV</Link>
        </div>
      </section>
    </div>
  );
};

export default Developers;
