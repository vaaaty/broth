//GEMINI

import React, { useState, useEffect } from 'react';
import './GoogleMaps.css';

/**
 * GoogleMaps component (Mock Integration)
 * Displays nearby shops and wholesalers based on a user's location.
 */
const GoogleMaps = ({ userLocation, onShopSelect }) => {
  const [nearbyShops, setNearbyShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    // Mock nearby shops data - in real app this comes from Google Maps API
    const mockShops = [
      {
        id: 1,
        name: "Fresh Mart",
        type: "retailer",
        distance: 0.8,
        rating: 4.5,
        address: "123 Downtown Street",
        open: true,
        deliveryTime: "15-25 mins",
        localProducts: ["Organic Apples", "Local Honey", "Fresh Spinach"]
      },
      {
        id: 2,
        name: "Local Grocery",
        type: "retailer",
        distance: 1.2,
        rating: 4.2,
        address: "456 City Center",
        open: true,
        deliveryTime: "20-30 mins",
        localProducts: ["Farm Eggs", "Whole Wheat Bread"]
      },
      {
        id: 3,
        name: "Mega Wholesale",
        type: "wholesaler",
        distance: 2.5,
        rating: 4.7,
        address: "789 Industrial Area",
        open: true,
        deliveryTime: "45-60 mins",
        localProducts: ["Apple Crates", "Milk Cans"]
      }
    ];

    setNearbyShops(mockShops);
  }, [userLocation]);

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    // Call the provided callback function
    if (onShopSelect) {
      onShopSelect(shop);
    }
  };

  const handleViewProducts = (shopName) => {
    // In a real application, this would navigate to the shop's product page
    console.log(`Navigating to products for: ${shopName}`);
  };

  const handleGetDirections = (shopAddress) => {
    // In a real application, this would open a map app for directions
    console.log(`Getting directions to: ${shopAddress}`);
  };

  return (
    <div className="google-maps-integration">
      <div className="maps-header">
        <h3>📍 Nearby Shops & Wholesalers</h3>
        <p>Showing shops near: <strong>{userLocation || "Your Location"}</strong></p>
      </div>

      <div className="maps-content">
        {/* Map Visualization Placeholder */}
        <div className="map-visualization">
          <div className="map-container">
            <div className="mock-map">
              <div className="user-location">📍 You are here</div>
              {nearbyShops.map(shop => (
                <div
                  key={shop.id}
                  className={`shop-marker ${shop.type} ${selectedShop?.id === shop.id ? 'selected' : ''}`}
                  // Simple, deterministic positioning for mock data
                  style={{
                    left: `${20 + shop.distance * 25}%`,
                    top: `${30 + (shop.id * 15)}%`
                  }}
                  onClick={() => handleShopSelect(shop)}
                  title={shop.name}
                >
                  {shop.type === 'retailer' ? '🏪' : '📦'}
                </div>
              ))}
            </div>
          </div>
          <div className="map-legend">
            <div className="legend-item">
              <span className="marker retailer">🏪</span>
              <span>Retailer</span>
            </div>
            <div className="legend-item">
              <span className="marker wholesaler">📦</span>
              <span>Wholesaler</span>
            </div>
          </div>
        </div>

        {/* Shops List */}
        <div className="shops-list">
          <h4>Nearby Locations ({nearbyShops.length})</h4>
          <div className="shops-container">
            {nearbyShops.map(shop => (
              <div
                key={shop.id}
                className={`shop-card ${selectedShop?.id === shop.id ? 'selected' : ''}`}
                onClick={() => handleShopSelect(shop)}
              >
                <div className="shop-header">
                  <h5>{shop.name}</h5>
                  <span className={`status ${shop.open ? 'open' : 'closed'}`}>
                    {shop.open ? '🟢 Open' : '🔴 Closed'}
                  </span>
                </div>

                <div className="shop-details">
                  <p className="address">🗺️ {shop.address}</p>
                  <p className="distance">📏 {shop.distance} km away</p>
                  <p className="rating">⭐ {shop.rating} • 🚚 {shop.deliveryTime}</p>

                  {shop.localProducts.length > 0 && (
                    <div className="local-products">
                      <strong>Local Products:</strong>
                      <div className="product-tags">
                        {shop.localProducts.map((product, index) => (
                          <span key={index} className="product-tag">{product}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="shop-actions">
                  <button className="view-shop-btn" onClick={(e) => { e.stopPropagation(); handleViewProducts(shop.name); }}>View Products</button>
                  <button className="directions-btn" onClick={(e) => { e.stopPropagation(); handleGetDirections(shop.address); }}>Get Directions</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Shop Details */}
      {selectedShop && (
        <div className="selected-shop-details">
          <h4>Selected: {selectedShop.name}</h4>
          <div className="shop-info-grid">
            <div className="info-item">
              <strong>Type:</strong> <span className={`type-tag ${selectedShop.type}`}>{selectedShop.type}</span>
            </div>
            <div className="info-item">
              <strong>Distance:</strong> {selectedShop.distance} km
            </div>
            <div className="info-item">
              <strong>Delivery Time:</strong> {selectedShop.deliveryTime}
            </div>
            <div className="info-item">
              <strong>Rating:</strong> ⭐ {selectedShop.rating}
            </div>
          </div>

          <div className="action-buttons">
            <button className="primary-btn">Shop Here</button>
            <button className="secondary-btn">Contact Store</button>
            <button className="secondary-btn">Share Location</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMaps;
