//FIXED GEMINI PRO VERSION 

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardCarousel from '../common/DashboardCarousel';
import QuickActions from '../common/QuickActions';
import ActivityFeed from '../common/ActivityFeed';
import StatsOverview from '../common/StatsOverview';
import './CustomerDashboard.css';

const CustomerDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState([]);

  const trackActivity = (product, action) => {
    const activity = {
      productId: product.id,
      action: action,
      timestamp: new Date().toISOString(),
      category: product.category
    };
    setSearchHistory(prev => [activity, ...prev.slice(0, 9)]);
    localStorage.setItem('customerActivity', JSON.stringify(searchHistory));
  };

  const getPersonalizedProducts = () => {
    const frequentCategories = searchHistory
      .map(activity => activity.category)
      .reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

    const topCategory = Object.keys(frequentCategories)
      .sort((a, b) => frequentCategories[b] - frequentCategories[a])[0];

    return products.filter(product => 
      product.category === topCategory
    ).slice(0, 4);
  };

  useEffect(() => {
    const mockProducts = [
      { id: 1, name: "Organic Apples", category: "Fruits", price: 120, local: true, rating: 4.5 },
      { id: 2, name: "Whole Wheat Bread", category: "Bakery", price: 45, local: true, rating: 4.7 },
      { id: 3, name: "Dairy Milk", category: "Dairy", price: 60, local: false, rating: 4.3 },
      { id: 4, name: "Local Honey", category: "Fruits", price: 200, local: true, rating: 4.8 },
    ];
    setProducts(mockProducts);
    
    const savedHistory = JSON.parse(localStorage.getItem('customerActivity') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  useEffect(() => {
    setPersonalizedSuggestions(getPersonalizedProducts());
  }, [searchHistory, products]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="enhanced-customer-dashboard">
      {/* Welcome Header */}
      <div className="welcome-header customer-theme">
        <h2>Welcome back, {user?.data?.name || 'Customer'}! 👋</h2>
        <p>Here's what's happening in your community today</p>
      </div>

      {/* Main Carousel */}
      <DashboardCarousel userType="customer" />

      {/* Quick Stats Row */}
      <div className="dashboard-row">
        <StatsOverview userType="customer" />
        <QuickActions user={user} />
      </div>

      {/* Activity & Recommendations */}
      <div className="dashboard-row">
        <ActivityFeed />
        <div className="recommendations-preview">
          <h3>Recommended For You</h3>
          <div className="mini-products">
            {personalizedSuggestions.map(product => (
              <div key={product.id} className="mini-product-card">
                <h5>{product.name}</h5>
                <p className="price">₹{product.price}</p>
                <button 
                  className="mini-add-btn"
                  onClick={() => {
                    addToCart(product);
                    trackActivity(product, 'view');
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <Link to="/search" className="view-all-link">View All Recommendations →</Link>
        </div>
      </div>

      {/* Personalized Section */}
      {personalizedSuggestions.length > 0 && (
        <div className="personalized-section">
          <h3>Based on Your Interests</h3>
          <div className="products-grid">
            {personalizedSuggestions.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.local && <span className="local-badge">Local</span>}
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                  <p className="price">₹{product.price}</p>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(product);
                    trackActivity(product, 'view');
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
