import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import './Earnings.css';

const Earnings = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalEarnings: 0,
    rawBookings: [],
    rawCars: []
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        const [carsRes, bookingsRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/cars/owner/${user.id}`),
          axios.get(`http://localhost:8080/api/bookings/owner/${user.id}`)
        ]);

        const confirmedBookings = bookingsRes.data.filter(b => b.bookingStatus === 'CONFIRMED');
        const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

        setStats({
          totalCars: carsRes.data.length,
          totalBookings: confirmedBookings.length,
          totalEarnings: totalRevenue,
          rawBookings: bookingsRes.data,
          rawCars: carsRes.data
        });
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchEarningsData();
  }, [user.id]);

  // Data for Revenue Trend (Last 7 Days)
  const getRevenueTrend = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const trend = days.map(day => ({ name: day, revenue: 0 }));
    
    stats.rawBookings
      .filter(b => b.bookingStatus === 'CONFIRMED')
      .forEach(b => {
        const dayName = days[new Date(b.startDate).getDay()];
        const entry = trend.find(t => t.name === dayName);
        if (entry) entry.revenue += b.totalPrice;
      });
    return trend;
  };

  // Data for Revenue by Car
  const getRevenueByCar = () => {
    const carRev = {};
    stats.rawBookings
      .filter(b => b.bookingStatus === 'CONFIRMED')
      .forEach(b => {
        const name = b.carName || `Car #${b.carId}`;
        carRev[name] = (carRev[name] || 0) + b.totalPrice;
      });
    return Object.keys(carRev).map(name => ({ name, revenue: carRev[name] })).slice(0, 5);
  };

  // Data for Booking Status
  const getStatusData = () => {
    const statuses = {};
    stats.rawBookings.forEach(b => {
      statuses[b.bookingStatus] = (statuses[b.bookingStatus] || 0) + 1;
    });
    return Object.keys(statuses).map(name => ({ name, value: statuses[name] }));
  };

  const COLORS = ['#0d6efd', '#ffc107', '#dc3545', '#6c757d'];

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="earnings-section fade-in-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Financial Overview</h2>
        <div className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">
          Account Balance: ₹{stats.totalEarnings.toLocaleString()}
        </div>
      </div>

      <div className="stats-grid mb-5">
        <div className="card-modern stat-card hover-lift p-4 text-center">
          <p className="text-muted small fw-bold text-uppercase mb-1">Active Fleet</p>
          <h3 className="fw-bold text-dark">{stats.totalCars}</h3>
        </div>
        <div className="card-modern stat-card hover-lift p-4 text-center">
          <p className="text-muted small fw-bold text-uppercase mb-1">Successful Rides</p>
          <h3 className="fw-bold text-dark">{stats.totalBookings}</h3>
        </div>
        <div className="card-modern stat-card highlight hover-lift p-4 text-center">
          <p className="text-muted small fw-bold text-uppercase mb-1">Total Earnings</p>
          <h3 className="fw-bold text-success">₹{stats.totalEarnings.toLocaleString()}</h3>
        </div>
      </div>

      <div className="row g-4">
        {/* 1. Revenue Trend */}
        <div className="col-lg-8">
          <div className="card-modern p-4 h-100">
            <h5 className="fw-bold mb-4">Income Flow (Weekly)</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={getRevenueTrend()}>
                  <defs>
                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={3} fill="url(#colorEarnings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2. Status Breakdown */}
        <div className="col-lg-4">
          <div className="card-modern p-4 h-100 text-center">
            <h5 className="fw-bold mb-4">Request Status</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={getStatusData()} innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {getStatusData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 3. Top Earning Cars */}
        <div className="col-12">
          <div className="card-modern p-4">
            <h5 className="fw-bold mb-4">Top Earning Vehicles</h5>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={getRevenueByCar()}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Bar dataKey="revenue" fill="#0dcaf0" radius={[10, 10, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
