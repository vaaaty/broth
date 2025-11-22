import React from 'react';
import './LocalMap.css';

const LocalMap = () => {
  const localProducers = [
    {
      id: 1,
      name: "Green Valley Organic Farm",
      type: "farm",
      location: "12km North",
      products: ["Organic Apples", "Fresh Spinach", "Seasonal Vegetables"],
      story: "Family-run organic farm since 1985. Three generations of farming expertise with sustainable practices.",
      delivery: "Daily to local stores",
      distance: "12km",
      established: "1985"
    },
    {
      id: 2,
      name: "Happy Cow Dairy",
      type: "dairy",
      location: "8km East", 
      products: ["Fresh Milk", "Yogurt", "Farm Cheese"],
      story: "Small-scale ethical dairy farming. Our cows are pasture-raised and hormone-free.",
      delivery: "Twice weekly",
      distance: "8km",
      established: "2016"
    },
    {
      id: 3,
      name: "Sunrise Poultry Farm",
      type: "farm",
      location: "15km South",
      products: ["Farm Eggs", "Free-range Chicken"],
      story: "Free-range poultry farm focusing on animal welfare and natural feeding practices.",
      delivery: "Weekly deliveries",
      distance: "15km",
      established: "2010"
    },
    {
      id: 4,
      name: "Mountain Honey Co.",
      type: "producer",
      location: "20km West",
      products: ["Local Honey", "Bee Pollen", "Propolis"],
      story: "Sustainable beekeeping preserving local bee populations and producing pure honey.",
      delivery: "Bi-weekly",
      distance: "20km",
      established: "2018"
    }
  ];

  const localBusinesses = [
    {
      id: 5,
      name: "Fresh Mart",
      type: "retailer",
      location: "2km Downtown",
      products: ["All local products", "Organic selection", "Daily fresh"],
      story: "Family-owned grocery store serving the community for over a decade.",
      delivery: "Same day delivery",
      distance: "2km",
      established: "2010"
    },
    {
      id: 6,
      name: "Local Corner Store",
      type: "retailer",
      location: "1.5km City Center",
      products: ["Local dairy", "Fresh produce", "Artisan bread"],
      story: "Neighborhood store with focus on local and artisanal products.",
      delivery: "2-hour delivery",
      distance: "1.5km",
      established: "2015"
    }
  ];

  const allLocations = [...localProducers, ...localBusinesses];

  return (
    <div className="local-map-page">
      <div className="page-header">
        <h1>🗺️ Local Products Journey Map</h1>
        <p>Discover where your products come from and the stories behind them</p>
      </div>

      <div className="map-controls">
        <div className="filter-buttons">
          <button className="filter-btn active">All Locations</button>
          <button className="filter-btn">Farms & Producers</button>
          <button className="filter-btn">Local Stores</button>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search locations..." />
          <button>🔍</button>
        </div>
      </div>

      <div className="map-content">
        {/* Interactive Map Visualization */}
        <div className="interactive-map">
          <div className="map-container">
            <div className="map-background">
              <div className="roads">
                <div className="road horizontal"></div>
                <div className="road vertical"></div>
                <div className="road diagonal"></div>
              </div>
              
              <div className="user-location-marker">
                <div className="pulse-ring"></div>
                <div className="location-pin">📍</div>
                <div className="location-label">You are here</div>
              </div>
              
              {allLocations.map(location => (
                <div 
                  key={location.id}
                  className={`location-marker ${location.type} ${location.distance.replace('km', '')}`}
                  style={{
                    left: `${getRandomPosition(20, 80)}%`,
                    top: `${getRandomPosition(20, 80)}%`
                  }}
                >
                  <div className="marker-icon">
                    {location.type === 'farm' ? '🚜' : 
                     location.type === 'dairy' ? '🐄' : 
                     location.type === 'producer' ? '🏭' : '🏪'}
                  </div>
                  <div className="location-tooltip">
                    <strong>{location.name}</strong>
                    <span>{location.distance} away</span>
                    <span>{location.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="locations-list">
          <div className="producers-section">
            <h3>🌱 Local Farms & Producers</h3>
            <div className="locations-grid">
              {localProducers.map(producer => (
                <div key={producer.id} className="location-card producer">
                  <div className="location-header">
                    <div className="location-icon">
                      {producer.type === 'farm' ? '🚜' : 
                       producer.type === 'dairy' ? '🐄' : '🏭'}
                    </div>
                    <div className="location-info">
                      <h4>{producer.name}</h4>
                      <p className="location-distance">📍 {producer.distance} away</p>
                    </div>
                  </div>
                  
                  <div className="location-details">
                    <p className="location-story">{producer.story}</p>
                    
                    <div className="location-products">
                      <strong>Products:</strong>
                      <div className="product-tags">
                        {producer.products.map(product => (
                          <span key={product} className="product-tag">{product}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="location-meta">
                      <span>🏠 {producer.location}</span>
                      <span>📅 Est. {producer.established}</span>
                      <span>🚚 {producer.delivery}</span>
                    </div>
                  </div>

                  <div className="location-actions">
                    <button className="view-products">View Products</button>
                    <button className="learn-more">Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="businesses-section">
            <h3>🏪 Local Retail Stores</h3>
            <div className="locations-grid">
              {localBusinesses.map(business => (
                <div key={business.id} className="location-card business">
                  <div className="location-header">
                    <div className="location-icon">🏪</div>
                    <div className="location-info">
                      <h4>{business.name}</h4>
                      <p className="location-distance">📍 {business.distance} away</p>
                    </div>
                  </div>
                  
                  <div className="location-details">
                    <p className="location-story">{business.story}</p>
                    
                    <div className="location-products">
                      <strong>Features:</strong>
                      <div className="product-tags">
                        {business.products.map(product => (
                          <span key={product} className="product-tag">{product}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="location-meta">
                      <span>🏠 {business.location}</span>
                      <span>📅 Est. {business.established}</span>
                      <span>⚡ {business.delivery}</span>
                    </div>
                  </div>

                  <div className="location-actions">
                    <button className="shop-here">Shop Here</button>
                    <button className="visit-store">Visit Store</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="map-legend">
        <h4>Map Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">🚜</span>
            <span>Farm</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🐄</span>
            <span>Dairy</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏭</span>
            <span>Producer</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🏪</span>
            <span>Retail Store</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📍</span>
            <span>Your Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for random positioning (for demo purposes)
const getRandomPosition = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default LocalMap;
