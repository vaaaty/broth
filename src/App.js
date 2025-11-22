import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import OTPAuth from './components/auth/OTPAuth';
import CustomerDashboard from './components/customer/CustomerDashboard';
import RetailerDashboard from './components/retailer/RetailerDashboard';
import WholesalerDashboard from './components/wholesaler/WholesalerDashboard';
import Header from './components/layout/Header';
import ProductSearch from './components/customer/ProductSearch';
import ShoppingCart from './components/customer/ShoppingCart';
import EnhancedOrderManagement from './components/customer/EnhancedOrderManagement';
import SubscriptionManagement from './components/customer/SubscriptionManagement';
import AboutUs from './components/pages/AboutUs';
import LocalBusinesses from './components/pages/LocalBusinesses';
import CommunityImpact from './components/pages/CommunityImpact';
import LocalMap from './components/pages/LocalMap';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const userData = localStorage.getItem('userData');
    
    if (userType && userData) {
      setUser({
        type: userType,
        data: JSON.parse(userData)
      });
    }
    setLoading(false);
  }, []);

  const handleLogin = (userType, userData) => {
    setUser({ type: userType, data: userData });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading Live MART...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Header user={user} onLogout={handleLogout} />}
        
        <Routes>
          {/* Auth Route */}
          <Route 
            path="/auth" 
            element={!user ? <OTPAuth onLogin={handleLogin} /> : <Navigate to={`/${user.type}-dashboard`} />} 
          />
          
          {/* Customer Routes */}
          <Route 
            path="/customer-dashboard" 
            element={user?.type === 'customer' ? <CustomerDashboard user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/search" 
            element={user?.type === 'customer' ? <ProductSearch user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/cart" 
            element={user?.type === 'customer' ? <ShoppingCart user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/orders" 
            element={user?.type === 'customer' ? <EnhancedOrderManagement user={user} /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/subscriptions" 
            element={user?.type === 'customer' ? <SubscriptionManagement user={user} /> : <Navigate to="/auth" />} 
          />
          
          {/* Retailer Route */}
          <Route 
            path="/retailer-dashboard" 
            element={user?.type === 'retailer' ? <RetailerDashboard user={user} /> : <Navigate to="/auth" />} 
          />
          
          {/* Wholesaler Route */}
          <Route 
            path="/wholesaler-dashboard" 
            element={user?.type === 'wholesaler' ? <WholesalerDashboard user={user} /> : <Navigate to="/auth" />} 
          />
          
          {/* Public Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/local-businesses" element={<LocalBusinesses />} />
          <Route path="/community-impact" element={<CommunityImpact />} />
          <Route path="/local-map" element={<LocalMap />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to={user ? `/${user.type}-dashboard` : "/auth"} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
