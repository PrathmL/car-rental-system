import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdminDashboard.css';
import ManageUsers from './ManageUsers';
import ManageCars from './ManageCars';
import ManageBookings from './ManageBookings';
import UserVerification from './UserVerification';
import OwnerVerification from './OwnerVerification';
import CarVerification from './CarVerification';
import ManageMessages from './ManageMessages';
import ReportsStats from './ReportsStats';
import Alerts from '../Alerts/Alerts';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('reports');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <div className="p-5 text-center">Unauthorized. Please Login.</div>;

  const menuItems = [
    { id: 'reports', label: 'Platform Overview', icon: '📊' },
    { id: 'cust-verify', label: 'User Verification', icon: '👤' },
    { id: 'owner-verify', label: 'Owner Verification', icon: '🏢' },
    { id: 'car-verify', label: 'Car Verification', icon: '🛡️' },
    { id: 'messages', label: 'Contact Messages', icon: '📩' },
    { id: 'users', label: 'Manage Users', icon: '👥' },
    { id: 'cars', label: 'Manage Cars', icon: '🚗' },
    { id: 'bookings', label: 'All Bookings', icon: '📅' },
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
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="dashboard-wrapper">
      <Alerts userId={user.id} />
      
      {/* Modern Sidebar with Entrance Animation */}
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
            <div className="bg-primary rounded-3 p-2 text-white fw-bold">AC</div>
            <span className="fs-4 fw-bold text-dark tracking-tight">AdminControl</span>
          </motion.div>
        </div>
        
        <nav className="sidebar-nav-list">
          {menuItems.map(item => (
            <motion.button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`sidebar-link-btn ${activeSection === item.id ? 'active' : ''}`}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="fs-5">{item.icon}</span>
              <span className="small">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <motion.div 
          className="sidebar-user-card"
          variants={itemVariants}
        >
          <div className="overflow-hidden">
            <p className="small fw-bold mb-0 text-truncate text-dark">{user.name}</p>
            <p className="x-small text-muted mb-0">System Administrator</p>
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
            {menuItems.find(m => m.id === activeSection)?.label || 'Dashboard'}
          </h2>
          <p className="text-muted small mt-1">Platform-wide management and analytics control center.</p>
        </motion.div>

        <div className="content-container" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              className="content-fade-in"
            >
              {activeSection === 'reports' && <ReportsStats />}
              {activeSection === 'cust-verify' && <UserVerification />}
              {activeSection === 'owner-verify' && <OwnerVerification />}
              {activeSection === 'car-verify' && <CarVerification />}
              {activeSection === 'messages' && <ManageMessages />}
              {activeSection === 'users' && <ManageUsers />}
              {activeSection === 'cars' && <ManageCars />}
              {activeSection === 'bookings' && <ManageBookings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
