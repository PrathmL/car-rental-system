import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaGavel, FaUserCheck, FaClock, FaBan, FaFileSignature, 
  FaShieldAlt, FaGasPump, FaMoneyCheckAlt, FaTools, FaBalanceScale 
} from 'react-icons/fa';

const TermsOfService = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

  const termSections = [
    {
      icon: <FaFileSignature />,
      title: "1. Acceptance of Terms",
      content: "By accessing and using the RentRide platform, you acknowledge that you have read, understood, and agree to be bound by these terms. We reserve the right to update these terms at any time without prior notice. Continued use of the platform after changes constitutes acceptance of the updated terms."
    },
    {
      icon: <FaUserCheck />,
      title: "2. User Eligibility",
      content: "Customers must be at least 21 years old and possess a valid, original Indian Driving License. Owners must provide accurate vehicle details, maintain comprehensive insurance coverage, and ensure the vehicle is in roadworthy condition at all times."
    },
    {
      icon: <FaClock />,
      title: "3. Rental & Cancellation",
      content: "All bookings are subject to approval by the vehicle owner. Cancellations made 24 hours prior to the start time receive a full refund. Cancellations made within 24 hours will incur a service fee of 25% of the total booking value to compensate the owner."
    },
    {
      icon: <FaBan />,
      title: "4. Prohibited Activities",
      content: "Vehicles must not be used for racing, towing, off-roading, or any illegal activities. Smoking and pet transportation are strictly prohibited unless explicitly allowed by the owner. Any violation will result in an immediate fine of ₹5,000."
    },
    {
      icon: <FaGasPump />,
      title: "5. Fuel Policy",
      content: "RentRide operates on a 'Like-to-Like' fuel policy. The vehicle must be returned with the same fuel level as at the start of the rental. Discrepancies will be charged at actual fuel costs plus a convenience fee."
    },
    {
      icon: <FaShieldAlt />,
      title: "6. Insurance & Protection",
      content: "While basic insurance is provided, the user is liable for the insurance deductible amount in case of damage. Premium protection plans are available to reduce financial exposure. RentRide is not responsible for personal items left in the vehicle."
    }
  ];

  return (
    <div className="terms-page-wrapper overflow-hidden">
      {/* 1. Hero Header */}
      <section className="bg-dark text-white py-5 mb-5" style={{ borderRadius: '0 0 60px 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ background: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070) center/cover' }}></div>
        <div className="container py-5 text-center position-relative z-10">
          <div className="d-inline-flex align-items-center gap-2 mb-3 bg-primary bg-opacity-25 px-3 py-2 rounded-pill" data-aos="fade-down">
            <FaGavel className="text-primary" />
            <span className="small fw-800 text-primary text-uppercase tracking-widest">Legal Framework</span>
          </div>
          <h1 className="display-3 fw-800 mb-3" data-aos="fade-up" data-aos-delay="100">Terms of <span className="text-primary">Service</span></h1>
          <p className="lead text-primary mx-auto mb-4" style={{ maxWidth: '700px', fontWeight: '600' }} data-aos="fade-up" data-aos-delay="200">
            Please review our operational guidelines and user responsibilities to ensure a safe and seamless experience for the entire community.
          </p>
          <div className="mt-4 badge bg-primary-soft text-primary px-4 py-2 rounded-pill fw-800 small border border-primary border-opacity-25" data-aos="zoom-in" data-aos-delay="300">
            LAST UPDATED: MARCH 08, 2026
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* 2. Interactive Terms Grid */}
            <div className="row g-4">
              {termSections.map((section, i) => (
                <div key={i} className="col-md-6" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="card-modern p-5 h-100 border-0 shadow-sm hover-lift bg-white rounded-5">
                    <div className="stat-icon-wrapper icon-blue mb-4 ms-0" style={{ width: '60px', height: '60px', borderRadius: '15px' }}>
                      {section.icon}
                    </div>
                    <h4 className="fw-800 text-dark mb-3">{section.title}</h4>
                    <p className="text-muted lh-lg mb-0" style={{ fontSize: '0.95rem' }}>{section.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Detailed Clause Section: Liability */}
            <div className="mt-5 pt-5">
              <div className="p-5 bg-light rounded-5 border border-white shadow-soft" data-aos="fade-right">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="fs-2 text-primary"><FaBalanceScale /></div>
                  <h3 className="fw-800 text-dark mb-0">7. Liability & Damage Clauses</h3>
                </div>
                <p className="text-muted mb-4 lead">RentRide acts as a facilitator. By renting, you agree to the following liability structure:</p>
                <div className="row g-3">
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="p-4 bg-white rounded-4 shadow-sm border-start border-primary border-4 h-100">
                      <h6 className="fw-bold text-dark mb-2">Traffic Violations</h6>
                      <p className="small text-muted mb-0">Users are 100% responsible for any traffic violations, speeding tickets, or parking fines incurred during the rental period.</p>
                    </div>
                  </div>
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div className="p-4 bg-white rounded-4 shadow-sm border-start border-primary border-4 h-100">
                      <h6 className="fw-bold text-dark mb-2">Accident Reporting</h6>
                      <p className="small text-muted mb-0">In case of any accident, the user must notify RentRide and the vehicle owner within 2 hours and provide a valid police FIR.</p>
                    </div>
                  </div>
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div className="p-4 bg-white rounded-4 shadow-sm border-start border-danger border-4 h-100">
                      <h6 className="fw-bold text-dark mb-2">Negligence Fine</h6>
                      <p className="small text-muted mb-0">Intentional damage, drunk driving, or gross negligence will result in full financial liability and permanent account termination.</p>
                    </div>
                  </div>
                  <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div className="p-4 bg-white rounded-4 shadow-sm border-start border-success border-4 h-100">
                      <h6 className="fw-bold text-dark mb-2">Mechanical Issues</h6>
                      <p className="small text-muted mb-0">Owners are responsible for mechanical failures (engine, brakes) not caused by the user's driving behavior.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Payment Terms */}
            <div className="mt-5 pt-4" data-aos="fade-left">
              <div className="p-5 bg-white rounded-5 shadow-soft border border-light">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="fs-2 text-primary"><FaMoneyCheckAlt /></div>
                  <h3 className="fw-800 text-dark mb-0">8. Payment & Refund Policy</h3>
                </div>
                <ul className="list-unstyled d-flex flex-column gap-3">
                  <li className="d-flex gap-3 align-items-start">
                    <div className="text-primary mt-1">✔</div>
                    <p className="text-muted mb-0">All payments are processed securely via encrypted gateways. Rental fees must be paid in full to confirm the booking.</p>
                  </li>
                  <li className="d-flex gap-3 align-items-start">
                    <div className="text-primary mt-1">✔</div>
                    <p className="text-muted mb-0">Refunds for approved cancellations will be processed within 5-7 business days to the original payment method.</p>
                  </li>
                  <li className="d-flex gap-3 align-items-start">
                    <div className="text-primary mt-1">✔</div>
                    <p className="text-muted mb-0">Security deposits (if applicable) are released within 24 hours of successful car return without damage.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5. Support Contact */}
            <div className="mt-5 p-5 bg-primary rounded-5 text-center text-white shadow-lg" data-aos="zoom-in">
              <h3 className="fw-800 mb-3">Questions about these Terms?</h3>
              <p className="opacity-75 mb-4">Our legal and support teams are available 24/7 to help you understand your rights and responsibilities.</p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/contact" className="btn btn-light rounded-pill px-5 py-3 fw-800 text-primary">Contact Legal Support</a>
                <a href="/faq" className="btn btn-outline-light rounded-pill px-5 py-3 fw-800">Review Safety FAQs</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
