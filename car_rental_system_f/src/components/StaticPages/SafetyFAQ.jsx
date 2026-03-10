import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './SafetyFAQ.css';
import { FaSearch, FaCar, FaShieldAlt, FaWallet, FaUserPlus } from 'react-icons/fa';

const SafetyFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  const categories = [
    { name: 'All', icon: <FaSearch /> },
    { name: 'Rentals', icon: <FaCar /> },
    { name: 'Safety', icon: <FaShieldAlt /> },
    { name: 'Payments', icon: <FaWallet /> },
    { name: 'Account', icon: <FaUserPlus /> }
  ];

  const faqs = [
    {
      category: "Safety",
      q: "How do you verify cars?",
      a: "Every car listed on RentRide goes through a strict manual verification process where we check RC books, insurance, and PUC certificates. Our team personally reviews every document before a car goes live."
    },
    {
      category: "Rentals",
      q: "Is there a limit on kilometers?",
      a: "Most of our owners offer unlimited kilometers, but specific cars may have daily limits. You can see the details on the car's description page before booking."
    },
    {
      category: "Payments",
      q: "Can I cancel my booking?",
      a: "Yes, we offer a flexible cancellation policy. You can cancel up to 24 hours before your trip starts for a full refund. Cancellations within 24 hours may incur a small processing fee."
    },
    {
      category: "Safety",
      q: "How does document verification work?",
      a: "During registration, you must upload your Driving License (for Customers) or ID Proof (for Owners). Our admin team verifies these details within 24-48 hours to keep the community safe."
    },
    {
      category: "Account",
      q: "What are the age requirements?",
      a: "To rent a car, you must be at least 21 years old and possess a valid, original Indian Driving License."
    },
    {
      category: "Rentals",
      q: "What happens if the car breaks down?",
      a: "We provide 24/7 Roadside Assistance. In case of a mechanical failure not caused by the user, we will either repair the vehicle on-site or provide a replacement vehicle."
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    (activeCategory === 'All' || f.category === activeCategory) &&
    (f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="faq-page-wrapper overflow-hidden pb-5">
      {/* 1. Page Header */}
      <section className="bg-light py-5 mb-5">
        <div className="container py-5 text-center">
          <div data-aos="fade-down">
            <span className="badge bg-primary-soft text-primary rounded-pill px-3 py-2 mb-3 fw-bold uppercase tracking-widest">Help Center</span>
            <h1 className="display-4 fw-900 text-dark mb-4">Safety & <span className="text-primary">FAQ Center</span></h1>
            <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '700px' }}>
              Everything you need to know about the RentRide experience. Find answers to common questions about safety, bookings, and more.
            </p>
            
            {/* Search Box */}
            <div className="faq-search-box position-relative" data-aos="fade-up" data-aos-delay="200">
              <input 
                type="text" 
                className="form-control shadow-sm" 
                placeholder="Search for questions (e.g. 'verification', 'refund')..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="position-absolute top-50 end-0 translate-middle-y pe-4 text-primary">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* 2. Category Filters */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5" data-aos="fade-up">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              className={`faq-category-btn d-flex align-items-center gap-2 shadow-sm ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* 3. FAQ Accordion Grid */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="accordion border-0" id="faqAccordion">
              {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                <div 
                  className="accordion-item-modern shadow-soft" 
                  key={index} 
                  data-aos="fade-up" 
                  data-aos-delay={index * 50}
                >
                  <h2 className="accordion-header">
                    <button 
                      className={`accordion-button accordion-button-modern ${activeIndex === index ? '' : 'collapsed'}`} 
                      type="button"
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      <span className="badge bg-primary-soft text-primary me-3 small" style={{fontSize: '0.6rem'}}>{faq.category}</span>
                      {faq.q}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}>
                    <div className="accordion-body accordion-body-modern">
                      {faq.a}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-5" data-aos="zoom-in">
                  <div className="display-1 opacity-10 mb-3">🔍</div>
                  <h4 className="fw-bold text-muted">No matching questions found</h4>
                  <p className="text-muted small">Try searching for something else or browse categories.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Support Footer */}
        <div className="mt-5 p-5 bg-white rounded-5 border border-dashed text-center" data-aos="fade-up">
          <h4 className="fw-bold text-dark mb-3">Still haven't found what you're looking for?</h4>
          <p className="text-muted mb-4">Our dedicated support team is available 24/7 to help you with any queries.</p>
          <a href="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg">Contact Support 24/7</a>
        </div>
      </div>
    </div>
  );
};

export default SafetyFAQ;
