import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'teal' }) => {
  const colorClass = `spinner-${color}`;
  
  return (
    <div className={`loading-spinner ${size} ${colorClass}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
