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
      // Vijaya Foods
      { id: 1, name: "Brown Bread", category: "Bakery", price: 45, local: true, rating: 4.5, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 2, name: "White Sugar", category: "Pantry", price: 60, local: false, rating: 4.3, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 3, name: "Basmati Rice", category: "Grains", price: 120, local: true, rating: 4.7, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 4, name: "Toor Dal", category: "Pulses", price: 85, local: true, rating: 4.4, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },

      // Whole Foods
      { id: 5, name: "Organic Apples", category: "Fruits", price: 120, local: true, rating: 4.6, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop" },
      { id: 6, name: "Whole Wheat Bread", category: "Bakery", price: 55, local: true, rating: 4.5, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 7, name: "Brown Sugar", category: "Pantry", price: 75, local: false, rating: 4.2, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 8, name: "Organic Spinach", category: "Vegetables", price: 40, local: true, rating: 4.8, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop" },

      // The Honey Co.
      { id: 9, name: "Wildflower Honey", category: "Pantry", price: 200, local: true, rating: 4.9, retailer: "The Honey Co.", image: "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=150&h=150&fit=crop" },
      { id: 10, name: "Manuka Honey", category: "Pantry", price: 350, local: false, rating: 4.7, retailer: "The Honey Co.", image: "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=150&h=150&fit=crop" },

      // Healthy Living Pvt Ltd.
      { id: 11, name: "Organic Quinoa", category: "Grains", price: 180, local: false, rating: 4.4, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 12, name: "Almond Milk", category: "Dairy Alternatives", price: 95, local: true, rating: 4.3, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 13, name: "Chia Seeds", category: "Health Foods", price: 120, local: false, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },

      // Vegetable Farm
      { id: 14, name: "Fresh Tomatoes", category: "Vegetables", price: 35, local: true, rating: 4.5, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1546470427-e212b7d31075?w=150&h=150&fit=crop" },
      { id: 15, name: "Carrots", category: "Vegetables", price: 25, local: true, rating: 4.4, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop" },
      { id: 16, name: "Bell Peppers", category: "Vegetables", price: 50, local: true, rating: 4.6, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1525607551107-68e20c75b1a8?w=150&h=150&fit=crop" },
      { id: 17, name: "Potatoes", category: "Vegetables", price: 20, local: true, rating: 4.3, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop" },

      // Good Food Co.
      { id: 18, name: "White Bread", category: "Bakery", price: 40, local: true, rating: 4.2, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 19, name: "Multigrain Bread", category: "Bakery", price: 65, local: true, rating: 4.5, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 20, name: "Croissants", category: "Bakery", price: 30, local: true, rating: 4.7, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1555507038-44d78bf15b00?w=150&h=150&fit=crop" },

      // PetCare
      { id: 21, name: "Dog Food", category: "Pet Supplies", price: 450, local: false, rating: 4.5, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 22, name: "Cat Food", category: "Pet Supplies", price: 380, local: false, rating: 4.4, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 23, name: "Bird Seeds", category: "Pet Supplies", price: 120, local: true, rating: 4.3, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },

      // Healthy&Organic
      { id: 24, name: "Organic Bananas", category: "Fruits", price: 45, local: true, rating: 4.6, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop" },
      { id: 25, name: "Organic Oranges", category: "Fruits", price: 60, local: true, rating: 4.5, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=150&h=150&fit=crop" },
      { id: 26, name: "Organic Milk", category: "Dairy", price: 70, local: true, rating: 4.7, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 27, name: "Organic Eggs", category: "Dairy", price: 90, local: true, rating: 4.8, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop" },

      // Grain Bakery
      { id: 28, name: "Sourdough Bread", category: "Bakery", price: 85, local: true, rating: 4.6, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 29, name: "Bagels", category: "Bakery", price: 35, local: true, rating: 4.4, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1555507038-44d78bf15b00?w=150&h=150&fit=crop" },
      { id: 30, name: "Muffins", category: "Bakery", price: 25, local: true, rating: 4.7, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=150&h=150&fit=crop" },

      // The Everything Store
      { id: 31, name: "Cooking Oil", category: "Pantry", price: 180, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=150&h=150&fit=crop" },
      { id: 32, name: "Pasta", category: "Pantry", price: 65, local: false, rating: 4.2, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=150&h=150&fit=crop" },
      { id: 33, name: "Canned Beans", category: "Pantry", price: 45, local: false, rating: 4.1, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },
      { id: 34, name: "Flour", category: "Pantry", price: 55, local: true, rating: 4.4, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },

      // Additional products to reach 50
      { id: 35, name: "Greek Yogurt", category: "Dairy", price: 85, local: true, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 36, name: "Cheese Slices", category: "Dairy", price: 110, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=150&h=150&fit=crop" },
      { id: 37, name: "Butter", category: "Dairy", price: 65, local: true, rating: 4.5, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=150&h=150&fit=crop" },
      { id: 38, name: "Orange Juice", category: "Beverages", price: 95, local: true, rating: 4.4, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=150&h=150&fit=crop" },
      { id: 39, name: "Green Tea", category: "Beverages", price: 120, local: false, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150&h=150&fit=crop" },
      { id: 40, name: "Coffee Beans", category: "Beverages", price: 250, local: false, rating: 4.7, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=150&h=150&fit=crop" },
      { id: 41, name: "Cucumbers", category: "Vegetables", price: 15, local: true, rating: 4.3, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1563225407847-817866e6beb7?w=150&h=150&fit=crop" },
      { id: 42, name: "Onions", category: "Vegetables", price: 30, local: true, rating: 4.2, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=150&h=150&fit=crop" },
      { id: 43, name: "Garlic", category: "Vegetables", price: 40, local: true, rating: 4.5, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1594282386621-99e80f5ceb9e?w=150&h=150&fit=crop" },
      { id: 44, name: "Grapes", category: "Fruits", price: 80, local: true, rating: 4.6, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=150&h=150&fit=crop" },
      { id: 45, name: "Strawberries", category: "Fruits", price: 150, local: true, rating: 4.8, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=150&h=150&fit=crop" },
      { id: 46, name: "Blueberries", category: "Fruits", price: 200, local: false, rating: 4.7, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=150&h=150&fit=crop" },
      { id: 47, name: "Fish Food", category: "Pet Supplies", price: 85, local: false, rating: 4.2, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 48, name: "Cat Litter", category: "Pet Supplies", price: 220, local: false, rating: 4.3, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 49, name: "Oats", category: "Grains", price: 75, local: true, rating: 4.4, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 50, name: "Cereal", category: "Breakfast", price: 95, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1627485937980-221c6ab67d6f?w=150&h=150&fit=crop" }
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
                <div className="mini-product-image">
                  <img src={product.image} alt={product.name} />
                  {product.local && <span className="local-badge">Local</span>}
                </div>
                <h5>{product.name}</h5>
                <p className="retailer">{product.retailer}</p>
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
                  <img src={product.image} alt={product.name} />
                  {product.local && <span className="local-badge">Local</span>}
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                  <p className="retailer">{product.retailer}</p>
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
