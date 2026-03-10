import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend, ComposedChart, Line
} from 'recharts';
import './ReportsStats.css';

const ReportsStats = () => {
  const [data, setData] = useState({
    users: [],
    cars: [],
    bookings: [],
    revenue: 0,
    summary: { users: 0, cars: 0, bookings: 0 }
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [userRes, carRes, bookRes] = await Promise.all([
        axios.get('http://localhost:8080/api/admin/users'),
        axios.get('http://localhost:8080/api/admin/cars'),
        axios.get('http://localhost:8080/api/admin/bookings')
      ]);

      const totalRevenue = bookRes.data.reduce((sum, b) => sum + b.totalPrice, 0);

      setData({
        users: userRes.data,
        cars: carRes.data,
        bookings: bookRes.data,
        revenue: totalRevenue,
        summary: {
          users: userRes.data.length,
          cars: carRes.data.length,
          bookings: bookRes.data.length
        }
      });
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Poll every 10 seconds for "real-time" updates
    return () => clearInterval(interval);
  }, [fetchStats]);

  // --- Real-Time Data Processing Logic ---

  const getRevenueTrend = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const trend = days.map(day => ({ name: day, revenue: 0 }));
    
    data.bookings.forEach(b => {
      const dayName = days[new Date(b.startDate).getDay()];
      const entry = trend.find(t => t.name === dayName);
      if (entry) entry.revenue += b.totalPrice;
    });
    return trend;
  };

  const getInventoryStatus = () => [
    { name: 'Available', value: data.cars.filter(c => c.availability === 'AVAILABLE').length },
    { name: 'Booked', value: data.cars.filter(c => c.availability === 'BOOKED').length },
    { name: 'Pending', value: data.cars.filter(c => c.availability === 'PENDING').length },
  ];

  const getUserRoles = () => [
    { name: 'Customers', value: data.users.filter(u => u.role === 'CUSTOMER').length },
    { name: 'Owners', value: data.users.filter(u => u.role === 'OWNER').length },
  ];

  const getCityDistribution = () => {
    const cities = {};
    data.cars.forEach(c => {
      cities[c.location] = (cities[c.location] || 0) + 1;
    });
    return Object.keys(cities).map(city => ({ name: city, count: cities[city] })).slice(0, 5);
  };

  const COLORS = ['#0d6efd', '#0dcaf0', '#ffc107', '#dc3545'];

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;

  const statCards = [
    { label: 'Total Users', value: data.summary.users, icon: '👥', color: '#0d6efd' },
    { label: 'Fleet Assets', value: data.summary.cars, icon: '🚗', color: '#0dcaf0' },
    { label: 'Total Bookings', value: data.summary.bookings, icon: '📅', color: '#ffc107' },
    { label: 'Net Revenue', value: `₹${data.revenue.toLocaleString()}`, icon: '💰', color: '#198754' },
  ];

  return (
    <div className="reports-stats-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0 text-dark">Live Platform Monitoring</h4>
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill">
          <span className="pulsate-dot me-2 bg-success"></span> Live Sync Active
        </span>
      </div>

      <div className="row g-4 mb-5">
        {statCards.map((stat, i) => (
          <div key={i} className="col-md-3 fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-modern p-4 h-100 hover-lift">
              <div className="stat-icon-bg mb-3" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
              <h6 className="text-muted fw-bold small text-uppercase mb-1">{stat.label}</h6>
              <h3 className="fw-bold mb-0 text-dark">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="card-modern p-4 h-100">
            <h5 className="fw-bold mb-4 text-dark">Real-Time Revenue Flow</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={getRevenueTrend()}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#0d6efd" strokeWidth={3} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="card-modern p-4 h-100 text-center">
            <h5 className="fw-bold mb-4 text-dark">Inventory Status</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={getInventoryStatus()} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                    {getInventoryStatus().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6 fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="card-modern p-4 h-100">
            <h5 className="fw-bold mb-4 text-dark">User Distribution</h5>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={getUserRoles()} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{fill: '#6c757d'}} />
                  <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Bar dataKey="value" fill="#0d6efd" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-6 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="card-modern p-4 h-100">
            <h5 className="fw-bold mb-4 text-dark">Top City Hubs</h5>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={getCityDistribution()}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#6c757d'}} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
                  <Bar dataKey="count" fill="#0dcaf0" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsStats;
