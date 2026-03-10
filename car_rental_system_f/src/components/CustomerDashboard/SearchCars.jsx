import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './SearchCars.css';
import CarCard from './CarCard';
import { showAlert } from '../../utils/SwalUtils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

const SearchCars = ({ onViewDetails }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [dates, setDates] = useState({ pickup: '', return: '' });
  
  // Advanced Filters State
  const [filters, setFilters] = useState({ location: '', brand: '', maxPrice: '' });

  const getLocalDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const today = getLocalDate();

  const fetchCars = useCallback(async (searchDates) => {
    setLoading(true);
    try {
      const url = `http://localhost:8080/api/cars/available?start=${searchDates.pickup}&end=${searchDates.return}`;
      const response = await axios.get(url);
      setCars(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Fetch error:", error);
      showAlert("System Error", "Failed to check vehicle availability.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDates(prev => {
      const newDates = { ...prev, [name]: value };
      if (name === 'pickup' && prev.return && new Date(value) >= new Date(prev.return)) {
        newDates.return = '';
      }
      return newDates;
    });
  };

  const handleSearch = async () => {
    if (!dates.pickup || !dates.return) {
      showAlert("Missing Dates", "Please select both Pickup and Return dates first.", "warning");
      return;
    }

    const pickupDate = new Date(dates.pickup);
    const returnDate = new Date(dates.return);
    const todayDate = new Date(today);

    pickupDate.setHours(0,0,0,0);
    todayDate.setHours(0,0,0,0);

    if (pickupDate < todayDate) {
      showAlert("Invalid Date", "You cannot select a date in the past.", "error");
      return;
    }

    if (returnDate <= pickupDate) {
      showAlert("Invalid Dates", "Return date must be after Pickup date.", "error");
      return;
    }

    fetchCars(dates);
    localStorage.setItem('selectedDates', JSON.stringify(dates));
  };

  // Filter options derived from fetched cars
  const uniqueLocations = useMemo(() => [...new Set(cars.map(c => c.location))], [cars]);
  const uniqueBrands = useMemo(() => [...new Set(cars.map(c => c.brand))], [cars]);

  // Apply Advanced Filters
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesLocation = filters.location ? car.location === filters.location : true;
      const matchesBrand = filters.brand ? car.brand === filters.brand : true;
      const matchesPrice = filters.maxPrice ? car.pricePerDay <= parseFloat(filters.maxPrice) : true;
      return matchesLocation && matchesBrand && matchesPrice;
    });
  }, [cars, filters]);

  return (
    <div className="search-cars-section">
      {/* 1. Date Selection Card - Always Visible */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="search-filter-box border-0 shadow-soft mb-4"
      >
        <div className="row g-4 align-items-end">
          <div className="col-lg-4">
            <div className="form-floating">
              <input type="date" name="pickup" className="form-control rounded-4" id="pickup" min={today} value={dates.pickup} onChange={handleDateChange} />
              <label htmlFor="pickup">Pick-Up Date</label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-floating">
              <input type="date" name="return" className="form-control rounded-4" id="return" min={dates.pickup || today} value={dates.return} onChange={handleDateChange} disabled={!dates.pickup} />
              <label htmlFor="return">Return Date</label>
            </div>
          </div>
          <div className="col-lg-4">
            <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm" onClick={handleSearch} disabled={loading}>
              {loading ? 'Scanning Fleet...' : 'Find Available Cars'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Advanced Filters - Hidden until Search */}
      <AnimatePresence>
        {hasSearched && cars.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="card-modern p-3 mb-4 bg-white border border-light overflow-hidden"
          >
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <div className="fw-bold text-muted small text-uppercase pe-2">Filters:</div>
              
              <select 
                className="form-select form-select-sm w-auto rounded-pill border-light-subtle bg-light px-3"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>

              <select 
                className="form-select form-select-sm w-auto rounded-pill border-light-subtle bg-light px-3"
                value={filters.brand}
                onChange={(e) => setFilters({...filters, brand: e.target.value})}
              >
                <option value="">All Brands</option>
                {uniqueBrands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>

              <div className="input-group input-group-sm w-auto">
                <span className="input-group-text bg-light border-light-subtle rounded-start-pill ps-3">Max ₹</span>
                <input 
                  type="number" 
                  className="form-control border-light-subtle bg-light rounded-end-pill pe-3" 
                  placeholder="Any" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  style={{maxWidth: '100px'}}
                />
              </div>
              
              {(filters.location || filters.brand || filters.maxPrice) && (
                <button 
                  className="btn btn-sm btn-link text-danger text-decoration-none fw-bold ms-auto"
                  onClick={() => setFilters({location: '', brand: '', maxPrice: ''})}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Results Section */}
      <AnimatePresence mode="wait">
        {hasSearched ? (
          <motion.div 
            key="results-grid"
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="col-12 mb-2 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold m-0 text-dark">Available for Your Dates</h4>
              <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">{filteredCars.length} Vehicles Found</span>
            </div>
            
            {filteredCars.length > 0 ? (
              filteredCars.map((car, i) => (
                <motion.div 
                  key={car.carId || i} 
                  className="col-md-6 col-xl-4"
                  variants={itemVariants}
                >
                  <CarCard 
                    car={{
                      ...car,
                      id: car.carId,
                      name: car.model,
                      image: car.imageUrl,
                      price: car.pricePerDay,
                      status: 'Available'
                    }} 
                    onViewDetails={() => onViewDetails(car)} 
                  />
                </motion.div>
              ))
            ) : (
              <motion.div className="col-12 text-center py-5" variants={itemVariants}>
                <div className="display-1 opacity-10">🚗</div>
                <h4 className="fw-bold mt-3">No rides match your filters</h4>
                <p className="text-muted">Try adjusting your advanced filters or search dates.</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* 4. Placeholder while waiting for user input */
          <motion.div 
            key="search-placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="text-center py-5 border-2 border-dashed rounded-5 mt-4"
          >
            <div className="display-4 mb-3">📅</div>
            <h4 className="fw-bold">Your Fleet is Waiting</h4>
            <p className="text-muted">Enter your trip dates above to reveal our available premium vehicles.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchCars;
