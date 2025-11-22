//GEMINI PRO FIXED

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocalBusinesses.css';

const LocalBusinesses = () => {
  const navigate = useNavigate();
  const localBusinesses = [
    {
      id: 1,
      name: "Fresh Mart",
      owner: "The Sharma Family",
      story: "Started in 2010 with just one small shop, we've grown by focusing on quality and community. Our commitment to fresh, locally-sourced products has made us a neighborhood favorite for over a decade.",
      years: "14 years in business",
      specialties: ["Organic Produce", "Homemade Breads", "Local Dairy", "Fresh Vegetables"],
      impact: "Supports 5 local farms, employs 8 community members",
      location: "2km from you",
      rating: 4.7,
      products: 45,
      joined: "2018"
    },
    {
      id: 2,
      name: "Green Valley Organic Farm",
      owner: "The Patel Family",
      story: "Three generations of farming expertise come together at Green Valley. We practice sustainable farming methods and deliver the freshest organic produce directly to your local stores.",
      years: "35 years in business",
      specialties: ["Organic Vegetables", "Seasonal Fruits", "Farm Fresh Eggs", "Herbs"],
      impact: "Family-run since 1989, supplies 12 local stores",
      location: "12km from you",
      rating: 4.9,
      products: 28,
      joined: "2020"
    },
    {
      id: 3,
      name: "Happy Cow Dairy",
      owner: "The Kumar Family",
      story: "Small-scale ethical dairy farming at its best. Our cows are pasture-raised and hormone-free, producing the highest quality milk and dairy products for our community.",
      years: "8 years in business",
      specialties: ["Fresh Milk", "Artisan Cheese", "Yogurt", "Butter"],
      impact: "Ethical farming practices, supports local agriculture",
      location: "8km from you",
      rating: 4.8,
      products: 15,
      joined: "2019"
    }
  ];

  return (
    <div className="local-businesses-page">
      <div className="page-header">
        <h1>🌟 Local Business Directory</h1>
        <p>Meet the amazing local businesses in your community</p>
      </div>

      <div className="businesses-stats">
        <div className="stat-card">
          <div className="stat-number">{localBusinesses.length}</div>
          <div className="stat-label">Local Businesses</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">57</div>
          <div className="stat-label">Total Years in Business</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">88</div>
          <div className="stat-label">Local Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">25+</div>
          <div className="stat-label">Jobs Supported</div>
        </div>
      </div>

      <div className="businesses-grid">
        {localBusinesses.map(business => (
          <div key={business.id} className="business-profile-card">
            <div className="business-hero">
              <div className="business-avatar">
                {business.name.split(' ').map(word => word[0]).join('')}
              </div>
              <div className="business-badge">🏪 Local Family Business</div>
            </div>
            
            <div className="business-info">
              <h2>{business.name}</h2>
              <p className="owner">{business.owner} • {business.years}</p>
              
              <div className="business-stats">
                <span className="rating">⭐ {business.rating}</span>
                <span className="products">🛍️ {business.products} products</span>
                <span className="location">📍 {business.location}</span>
              </div>

              <div className="business-story">
                <h4>Their Story</h4>
                <p>{business.story}</p>
              </div>

              <div className="specialties">
                <h4>Specialties</h4>
                <div className="specialty-tags">
                  {business.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>

              <div className="community-impact">
                <h4>Community Impact</h4>
                <p>{business.impact}</p>
              </div>

              <div className="business-meta">
                <span className="joined-date">Member since {business.joined}</span>
              </div>

              <div className="business-actions">
                <button 
                  className="shop-here-btn"
                  onClick={() => navigate('/search')}
                >
                  Shop Here
                </button>
                <button className="contact-btn">Contact Business</button>
                <button className="share-btn">Share Their Story</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="community-callout">
        <div className="callout-content">
          <h3>Support Your Local Economy</h3>
          <p>When you shop at these local businesses, you're not just buying products - you're investing in your community, creating local jobs, and keeping your neighborhood unique.</p>
          <div className="impact-facts">
            <div className="fact">💰 3x more money stays in local economy</div>
            <div className="fact">👥 Creates local jobs and opportunities</div>
            <div className="fact">🌍 Reduces environmental impact</div>
            <div className="fact">🎨 Unique products you can't find elsewhere</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBusinesses;


/*import React from 'react';
import './LocalBusinesses.css';

const LocalBusinesses = () => {
  const localBusinesses = [
    {
      id: 1,
      name: "Fresh Mart",
      owner: "The Sharma Family",
      story: "Started in 2010 with just one small shop, we've grown by focusing on quality and community. Our commitment to fresh, locally-sourced products has made us a neighborhood favorite for over a decade.",
      years: "14 years in business",
      specialties: ["Organic Produce", "Homemade Breads", "Local Dairy", "Fresh Vegetables"],
      impact: "Supports 5 local farms, employs 8 community members",
      location: "2km from you",
      rating: 4.7,
      products: 45,
      joined: "2018"
    },
    {
      id: 2,
      name: "Green Valley Organic Farm",
      owner: "The Patel Family",
      story: "Three generations of farming expertise come together at Green Valley. We practice sustainable farming methods and deliver the freshest organic produce directly to your local stores.",
      years: "35 years in business",
      specialties: ["Organic Vegetables", "Seasonal Fruits", "Farm Fresh Eggs", "Herbs"],
      impact: "Family-run since 1989, supplies 12 local stores",
      location: "12km from you",
      rating: 4.9,
      products: 28,
      joined: "2020"
    },
    {
      id: 3,
      name: "Happy Cow Dairy",
      owner: "The Kumar Family",
      story: "Small-scale ethical dairy farming at its best. Our cows are pasture-raised and hormone-free, producing the highest quality milk and dairy products for our community.",
      years: "8 years in business",
      specialties: ["Fresh Milk", "Artisan Cheese", "Yogurt", "Butter"],
      impact: "Ethical farming practices, supports local agriculture",
      location: "8km from you",
      rating: 4.8,
      products: 15,
      joined: "2019"
    }
  ];

  return (
    <div className="local-businesses-page">
      <div className="page-header">
        <h1>🌟 Local Business Directory</h1>
        <p>Meet the amazing local businesses in your community</p>
      </div>

      <div className="businesses-stats">
        <div className="stat-card">
          <div className="stat-number">{localBusinesses.length}</div>
          <div className="stat-label">Local Businesses</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">57</div>
          <div className="stat-label">Total Years in Business</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">88</div>
          <div className="stat-label">Local Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">25+</div>
          <div className="stat-label">Jobs Supported</div>
        </div>
      </div>

      <div className="businesses-grid">
        {localBusinesses.map(business => (
          <div key={business.id} className="business-profile-card">
            <div className="business-hero">
              <div className="business-avatar">
                {business.name.split(' ').map(word => word[0]).join('')}
              </div>
              <div className="business-badge">🏪 Local Family Business</div>
            </div>
            
            <div className="business-info">
              <h2>{business.name}</h2>
              <p className="owner">{business.owner} • {business.years}</p>
              
              <div className="business-stats">
                <span className="rating">⭐ {business.rating}</span>
                <span className="products">🛍️ {business.products} products</span>
                <span className="location">📍 {business.location}</span>
              </div>

              <div className="business-story">
                <h4>Their Story</h4>
                <p>{business.story}</p>
              </div>

              <div className="specialties">
                <h4>Specialties</h4>
                <div className="specialty-tags">
                  {business.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>

              <div className="community-impact">
                <h4>Community Impact</h4>
                <p>{business.impact}</p>
              </div>

              <div className="business-meta">
                <span className="joined-date">Member since {business.joined}</span>
              </div>

              <div className="business-actions">
                <button 
                  className="shop-here-btn"
                  onClick={() => window.location.href = '/search'}
                >
                  Shop Here
                </button>
                <button className="contact-btn">Contact Business</button>
                <button className="share-btn">Share Their Story</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="community-callout">
        <div className="callout-content">
          <h3>Support Your Local Economy</h3>
          <p>When you shop at these local businesses, you're not just buying products - you're investing in your community, creating local jobs, and keeping your neighborhood unique.</p>
          <div className="impact-facts">
            <div className="fact">💰 3x more money stays in local economy</div>
            <div className="fact">👥 Creates local jobs and opportunities</div>
            <div className="fact">🌍 Reduces environmental impact</div>
            <div className="fact">🎨 Unique products you can't find elsewhere</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalBusinesses;
*/
