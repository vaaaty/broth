import React, { useState } from 'react';
import './DashboardCarousel.css';

const DashboardCarousel = ({ userType }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const customerCarouselItems = [
    {
      id: 1,
      type: 'local_spotlight',
      title: '🌟 Local Business Spotlight',
      description: 'Meet the families behind your favorite local stores',
      icon: '🏪',
      link: '/local-businesses'
    },
    {
      id: 2, 
      type: 'community_goals',
      title: '🎯 Community Goals',
      description: 'See how we\'re supporting local economy together',
      icon: '🤝',
      link: '/community-impact'
    },
    {
      id: 3,
      type: 'economic_impact',
      title: '💰 Your Local Impact',
      description: 'See how your shopping supports the community',
      icon: '🌱',
      link: '/my-impact'
    },
    {
      id: 4,
      type: 'local_products_map',
      title: '🗺️ Local Products Map',
      description: 'Discover where your products come from',
      icon: '📍',
      link: '/local-map'
    },
    {
      id: 5,
      type: 'local_events',
      title: '🗓️ Local Events & Markets',
      description: 'Farmers markets and community gatherings near you',
      icon: '🎪',
      link: '/events'
    },
    {
      id: 6,
      type: 'community_stories',
      title: '💖 Community Stories',
      description: 'Hear from neighbors supporting local businesses',
      icon: '👥',
      link: '/community-stories'
    },
    {
      id: 7,
      type: 'why_shop_local',
      title: '🤔 Why Shop Local?',
      description: 'Learn about the impact of supporting local businesses',
      icon: '💡',
      link: '/why-local'
    },
    {
      id: 8,
      type: 'about_us',
      title: '🌟 Our Mission',
      description: 'Learn how we empower local businesses in the digital age',
      icon: '💝',
      link: '/about'
    }
  ];

  const LocalBusinessPreview = () => (
    <div className="slide-content">
      <div className="slide-icon">🏪</div>
      <h4>Local Business Spotlight</h4>
      <p>This week featuring <strong>Fresh Mart</strong> - Family owned since 2010</p>
      <div className="preview-business">
        <div className="business-avatar">FM</div>
        <p>"We believe in quality and community" - The Sharma Family</p>
      </div>
    </div>
  );

  const LocalImpactPreview = () => {
    const impactStats = {
      moneyStayedLocal: 12500,
      localBusinessesSupported: 8,
      carbonReduced: 45
    };
    
    return (
      <div className="slide-content">
        <div className="slide-icon">💰</div>
        <h4>Your Local Impact</h4>
        <div className="impact-preview">
          <div className="impact-stat">
            <strong>₹{impactStats.moneyStayedLocal}</strong>
            <span>stayed in local economy</span>
          </div>
          <div className="impact-stat">
            <strong>{impactStats.localBusinessesSupported}</strong>
            <span>local businesses supported</span>
          </div>
        </div>
      </div>
    );
  };

  const CommunityGoalsPreview = () => (
    <div className="slide-content">
      <div className="slide-icon">🎯</div>
      <h4>Community Goals</h4>
      <p>We're 42/50 businesses supported this month!</p>
      <div className="goal-progress-mini">
        <div className="progress-bar">
          <div className="progress" style={{width: '84%'}}></div>
        </div>
        <p>Unlock free delivery for everyone at 50!</p>
      </div>
    </div>
  );

  const AboutUsPreview = () => (
    <div className="slide-content">
      <div className="slide-icon">💝</div>
      <h4>Our Mission</h4>
      <p>Empowering local and family-run businesses to thrive in modern markets</p>
      <div className="preview-stats">
        <div className="preview-stat">500+ Local Businesses</div>
        <div className="preview-stat">₹2.5Cr+ Local Economy</div>
      </div>
    </div>
  );

  const getPreviewComponent = (type) => {
    switch(type) {
      case 'local_spotlight': return <LocalBusinessPreview />;
      case 'economic_impact': return <LocalImpactPreview />;
      case 'community_goals': return <CommunityGoalsPreview />;
      case 'about_us': return <AboutUsPreview />;
      default: return (
        <div className="slide-content">
          <div className="slide-icon">{customerCarouselItems[activeSlide].icon}</div>
          <h4>{customerCarouselItems[activeSlide].title}</h4>
          <p>{customerCarouselItems[activeSlide].description}</p>
        </div>
      );
    }
  };

  return (
    <div className="dashboard-carousel">
      <div className="carousel-header">
        <h3>Discover Live MART</h3>
        <div className="carousel-controls">
          <button 
            onClick={() => setActiveSlide(prev => prev > 0 ? prev - 1 : customerCarouselItems.length - 1)}
            className="carousel-arrow"
          >
            ◀
          </button>
          <span className="slide-counter">{activeSlide + 1} / {customerCarouselItems.length}</span>
          <button 
            onClick={() => setActiveSlide(prev => prev < customerCarouselItems.length - 1 ? prev + 1 : 0)}
            className="carousel-arrow"
          >
            ▶
          </button>
        </div>
      </div>

      <div className="carousel-slide">
        {getPreviewComponent(customerCarouselItems[activeSlide].type)}
        <a href={customerCarouselItems[activeSlide].link} className="explore-btn">
          Explore More →
        </a>
      </div>

      <div className="carousel-indicators">
        {customerCarouselItems.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCarousel;
