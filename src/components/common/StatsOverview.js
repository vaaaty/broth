import React from 'react';
import './StatsOverview.css';

const StatsOverview = ({ userType }) => {
  const customerStats = {
    ordersThisMonth: 8,
    moneySaved: 1200,
    localBusinessesSupported: 5,
    carbonReduced: 45
  };

  return (
    <div className="stats-overview">
      <h3>Your Impact Overview</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{customerStats.ordersThisMonth}</div>
          <div className="stat-label">Orders This Month</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">₹{customerStats.moneySaved}</div>
          <div className="stat-label">Supporting Local Economy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{customerStats.localBusinessesSupported}</div>
          <div className="stat-label">Local Businesses Supported</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{customerStats.carbonReduced}kg</div>
          <div className="stat-label">Carbon Reduced</div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
