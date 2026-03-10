import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaShieldAlt, FaCarCrash, FaUserShield, FaClock, 
  FaFileInvoiceDollar, FaHandsHelping, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';

const InsuranceDetails = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  const coveragePlans = [
    {
      title: "Third-Party Liability",
      icon: <FaUserShield />,
      desc: "Mandatory protection covering legal liability for injury or damage to third parties. This is included in every rental to ensure compliance with Indian traffic laws.",
      included: true
    },
    {
      title: "Theft Protection",
      icon: <FaShieldAlt />,
      desc: "Relieves you of financial responsibility if the rental vehicle is stolen. Requires a valid police FIR and original vehicle keys to be submitted.",
      included: true
    },
    {
      title: "Collision Damage",
      icon: <FaCarCrash />,
      desc: "Limits your financial responsibility for damage to the vehicle's bodywork. Does not cover tires, glass, or undercarriage unless specified in premium plans.",
      included: false
    },
    {
      title: "24/7 Roadside",
      icon: <FaClock />,
      desc: "Emergency assistance for breakdowns, flat tires, battery jump-starts, or fuel delivery anywhere across our supported city hubs.",
      included: true
    }
  ];

  const premiumFeatures = [
    "Zero Depreciation Cover",
    "Personal Accident Cover for Passengers",
    "Engine & Gearbox Protection",
    "Consumables Cover (Oil, Coolant, etc.)",
    "Key Replacement Assistance",
    "Tire and Windshield Protection"
  ];

  return (
    <div className="insurance-details-page-wrapper overflow-hidden">
      {/* 1. Hero Header */}
      <section className="bg-primary text-white py-5 mb-5" style={{ borderRadius: '0 0 60px 60px', position: 'relative' }}>
        <div className="container py-5 text-center">
          <div data-aos="fade-down">
            <span className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3 fw-bold uppercase tracking-widest">Premium Protection</span>
            <h1 className="display-3 fw-800 mb-3" data-aos="fade-up" data-aos-delay="100">Insurance & <span className="text-white opacity-75">Coverage</span></h1>
            <p className="lead opacity-90 mx-auto mb-0" style={{ maxWidth: '800px', fontWeight: '500' }} data-aos="fade-up" data-aos-delay="200">
              Drive with total peace of mind. Our comprehensive insurance ecosystem is built to shield you from unexpected costs and keep you moving forward.
            </p>
          </div>
        </div>
      </section>

      <div className="container pb-5">
        {/* 2. Core Coverage Section */}
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-800 text-dark">Standard Coverage Included</h2>
          <p className="text-muted">Every RentRide journey comes with a safety net of basic protections.</p>
        </div>

        <div className="row g-4 mb-5">
          {coveragePlans.map((plan, i) => (
            <div key={i} className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="card-modern p-4 h-100 border-0 shadow-sm text-center bg-white rounded-5 hover-lift">
                <div className="stat-icon-wrapper icon-blue mx-auto mb-4" style={{ width: '70px', height: '70px', borderRadius: '20px' }}>
                  {plan.icon}
                </div>
                <h5 className="fw-bold text-dark mb-3">{plan.title}</h5>
                <p className="text-muted small lh-lg mb-4">{plan.desc}</p>
                <div className={`mt-auto pt-3 fw-bold small ${plan.included ? 'text-success' : 'text-primary'}`}>
                  {plan.included ? '✓ Included by Default' : '⚡ Available Upgrade'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Detailed Liability Breakdown */}
        <div className="row align-items-center g-5 py-5">
          <div className="col-lg-6">
            <div className="pe-lg-4">
              <h2 className="fw-800 text-dark mb-4" data-aos="fade-right">Financial <span className="text-primary">Responsibility</span></h2>
              <p className="text-muted mb-5" data-aos="fade-right" data-aos-delay="100">We maintain a transparent damage policy. Your maximum liability is capped based on the protection level you select at the start of your booking.</p>
              
              <div className="row g-3">
                <div className="col-12" data-aos="fade-right" data-aos-delay="200">
                  <div className="p-4 bg-white rounded-4 shadow-soft border-start border-primary border-5">
                    <h6 className="fw-bold text-dark mb-2">Standard Protection Plan</h6>
                    <p className="small text-muted mb-0">Liability limited up to ₹10,000 for bodywork damage. Ideal for experienced drivers on short city trips.</p>
                  </div>
                </div>
                <div className="col-12" data-aos="fade-right" data-aos-delay="300">
                  <div className="p-4 bg-white rounded-4 shadow-soft border-start border-success border-5">
                    <h6 className="fw-bold text-dark mb-2">Premium 'Zero-Debt' Plan</h6>
                    <p className="small text-muted mb-0">Total damage waiver reducing your liability to ₹0. We recommend this for long-distance highway travel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="p-5 bg-dark rounded-5 text-white shadow-2xl position-relative overflow-hidden" data-aos="fade-left">
              <div className="position-absolute top-0 end-0 p-4 opacity-10" style={{ fontSize: '12rem' }}>🛡️</div>
              <h3 className="fw-800 mb-4" data-aos="fade-down" data-aos-delay="200">How to File a Claim</h3>
              <div className="d-flex flex-column gap-4 position-relative z-10">
                {[
                  { n: "1", t: "Secure the Area", d: "Prioritize safety. Contact emergency services if needed and move to a safe spot." },
                  { n: "2", t: "Visual Evidence", d: "Capture high-resolution photos/videos of the damage and the other vehicle's plate." },
                  { n: "3", t: "2-Hour Notification", d: "Call our Claims Concierge at +91 1800-RENT-SAFE or use the in-app SOS button." }
                ].map((step, idx) => (
                  <div className="d-flex gap-3" key={idx} data-aos="fade-left" data-aos-delay={300 + (idx * 100)}>
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>{step.n}</div>
                    <div>
                      <h6 className="fw-bold mb-1">{step.t}</h6>
                      <p className="small opacity-75 mb-0">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Premium Add-ons Section */}
        <section className="bg-light rounded-5 p-5 my-5" data-aos="zoom-out">
          <div className="row g-4 align-items-center">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <h3 className="fw-800 text-dark mb-3">Maximize Your <br/> <span className="text-primary">Safety Net</span></h3>
              <p className="text-muted small">Our premium add-ons provide an extra layer of security for those who want no surprises.</p>
              <div className="stat-icon-wrapper icon-purple ms-0 mt-4" style={{ width: '60px', height: '60px', borderRadius: '15px' }}>
                <FaHandsHelping />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-3">
                {premiumFeatures.map((feature, i) => (
                  <div key={i} className="col-md-6" data-aos="fade-left" data-aos-delay={i * 50}>
                    <div className="d-flex align-items-center gap-3 bg-white p-3 rounded-4 shadow-sm border border-white">
                      <FaCheckCircle className="text-success" />
                      <span className="small fw-bold text-dark">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Exclusions Section */}
        <div className="mt-5" data-aos="fade-up">
          <div className="p-5 bg-white rounded-5 border-dashed border-2 shadow-soft">
            <div className="d-flex align-items-center gap-3 mb-4" data-aos="fade-down">
              <FaExclamationTriangle className="text-warning fs-3" />
              <h4 className="fw-800 text-dark mb-0">Important Exclusions</h4>
            </div>
            <p className="text-muted mb-4" data-aos="fade-up" data-aos-delay="100">Please note that insurance and protection plans are rendered VOID under the following circumstances:</p>
            <div className="row g-4">
              {[
                { t: "Unauthorized Drivers", d: "Allowing anyone other than the registered user to drive the vehicle." },
                { t: "Off-Roading & Racing", d: "Using the car for racing, towing, or driving on non-tarred/mountain trails." },
                { t: "Substance Abuse", d: "Driving under the influence of alcohol, narcotics, or any illegal substances." }
              ].map((exc, idx) => (
                <div className="col-md-4" key={idx} data-aos="zoom-in" data-aos-delay={200 + (idx * 100)}>
                  <div className="p-3 bg-light rounded-4 h-100">
                    <h6 className="fw-bold small text-dark mb-2">{exc.t}</h6>
                    <p className="x-small text-muted mb-0">{exc.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. CTA Footer */}
        <div className="mt-5 p-5 bg-primary rounded-5 text-center text-white shadow-lg" data-aos="zoom-in">
          <div data-aos="fade-down" data-aos-delay="200">
            <FaFileInvoiceDollar className="display-4 mb-4 opacity-50" />
            <h3 className="fw-800 mb-3">Still Have Questions?</h3>
            <p className="opacity-75 mb-5 mx-auto" style={{ maxWidth: '600px' }}>Our specialized insurance team is available to walk you through the fine print. Your safety is our primary concern.</p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/contact" className="btn btn-light rounded-pill px-5 py-3 fw-800 text-primary shadow-sm">Talk to an Agent</a>
              <a href="/terms" className="btn btn-outline-light rounded-pill px-5 py-3 fw-800">Read Full Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
