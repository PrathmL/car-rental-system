import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './OwnerDashboard.css';
import MyCars from './MyCars';
import AddCar from './AddCar';
import BookingRequests from './BookingRequests';
import OwnerBookings from './OwnerBookings';
import Earnings from './Earnings';
import EditCar from './EditCar';
import Profile from '../Profile/Profile';
import Alerts from '../Alerts/Alerts';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-cars');
  const [editingCar, setEditingCar] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <div className="p-5 text-center">Unauthorized. Please Login.</div>;

  const handleEdit = (car) => {
    setEditingCar(car);
    setActiveTab('edit-car');
  };

  const handleUpdateSuccess = () => {
    setEditingCar(null);
    setActiveTab('my-cars');
  };

  const menuItems = [
    { id: 'my-cars', label: 'My Listed Cars', icon: '🚗' },
    { id: 'add-car', label: 'List New Car', icon: '➕' },
    { id: 'requests', label: 'Booking Requests', icon: '🔔' },
    { id: 'history', label: 'Rentals History', icon: '📜' },
    { id: 'earnings', label: 'Financials', icon: '💰' },
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
        staggerChildren: 0.08,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="customer-dashboard-wrapper">
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
            <div className="bg-primary rounded-3 p-2 text-white fw-bold">RR</div>
            <span className="fs-4 fw-bold text-dark tracking-tight">RentRide</span>
          </motion.div>
        </div>
        
        <nav className="sidebar-nav-list">
          {menuItems.map(item => (
            <motion.button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-link-btn ${activeTab === item.id ? 'active' : ''}`}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="fs-5">{item.icon}</span>
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
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
          <p className="text-muted small mt-1">Manage your business and grow your fleet.</p>
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
              {activeTab === 'my-cars' && <MyCars onEdit={handleEdit} />}
              {activeTab === 'add-car' && <AddCar onSuccess={() => setActiveTab('my-cars')} />}
              {activeTab === 'requests' && <BookingRequests onAction={() => {}} />}
              {activeTab === 'history' && <OwnerBookings />}
              {activeTab === 'earnings' && <Earnings />}
              {activeTab === 'profile' && <Profile />}
              {activeTab === 'edit-car' && editingCar && (
                <EditCar 
                  car={editingCar} 
                  onCancel={() => setActiveTab('my-cars')} 
                  onSuccess={handleUpdateSuccess}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
