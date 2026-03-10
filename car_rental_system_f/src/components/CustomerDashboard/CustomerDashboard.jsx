import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomerDashboard.css';
import SearchCars from './SearchCars';
import MyBookings from './MyBookings';
import Profile from '../Profile/Profile';
import CarDetails from './CarDetails';
import BookCar from './BookCar';
import Alerts from '../Alerts/Alerts';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCar, setSelectedCar] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <div className="p-5 text-center">Unauthorized. Please Login.</div>;

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setActiveTab('details');
  };

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setActiveTab('book');
  };

  const handleBookingConfirmed = () => {
    setActiveTab('bookings');
  };

  const menuItems = [
    { id: 'search', label: 'Explore Fleet', icon: '🔍' },
    { id: 'bookings', label: 'My Bookings', icon: '📅' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
  ];

  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="customer-dashboard-wrapper">
      <Alerts userId={user.id} onNewConfirmation={handleBookingConfirmed} />
      
      {/* Modern Sidebar with Animation */}
      <motion.aside 
        className="glass-sidebar"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <div className="sidebar-brand-box">
          <motion.div 
            className="d-flex align-items-center gap-2"
            variants={itemVariants}
          >
            <div className="bg-primary rounded-3 p-2 text-white fw-bold">RR</div>
            <span className="fs-4 fw-bold text-dark tracking-tight">RentRide</span>
          </motion.div>
        </div>
        
        <nav className="sidebar-nav-list">
          {menuItems.map(item => (
            <motion.button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link-btn ${
                (activeTab === item.id || (item.id === 'search' && ['details', 'book'].includes(activeTab)))
                ? 'active' : ''
              }`}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="fs-5">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <motion.div 
          className="sidebar-user-card"
          variants={itemVariants}
        >
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: '45px', height: '45px'}}>
            {user.name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="small fw-bold mb-0 text-truncate text-dark">{user.name}</p>
            <p className="x-small text-muted mb-0">Verified User</p>
          </div>
        </motion.div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="fw-bold m-0 text-dark">
            {menuItems.find(m => m.id === activeTab)?.label || 'Car Details'}
          </h2>
          <p className="text-muted small mt-1">Manage your travels and explore India's best fleet.</p>
        </motion.div>

        <div className="content-container" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              className="content-fade-in"
            >
              {activeTab === 'search' && (
                <SearchCars onViewDetails={handleViewDetails} />
              )}
              
              {activeTab === 'details' && selectedCar && (
                <CarDetails 
                  car={selectedCar} 
                  onBack={() => setActiveTab('search')} 
                  onBook={() => handleBookNow(selectedCar)}
                />
              )}

              {activeTab === 'book' && selectedCar && (
                <BookCar 
                  car={selectedCar} 
                  onBack={() => setActiveTab('details')}
                  onSuccess={() => setActiveTab('bookings')}
                />
              )}

              {activeTab === 'bookings' && <MyBookings />}
              
              {activeTab === 'profile' && <Profile />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
