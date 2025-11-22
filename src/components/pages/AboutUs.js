//GEMINI PRO FIXED

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Live MART</h1>
          <p className="tagline">Empowering Local Businesses in the Digital Age</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Local Businesses Empowered</p>
            </div>
            <div className="stat">
              <h3>₹2.5Cr+</h3>
              <p>Revenue Generated for Local Economy</p>
            </div>
            <div className="stat">
              <h3>45+</h3>
              <p>Cities & Communities Served</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p className="mission-statement">
            At Live MART, we believe that <strong>local and family-run businesses are the heart of our communities</strong>. 
            In today's rapidly evolving market landscape, we're committed to providing these cherished establishments 
            with the digital tools and platform they need to thrive alongside major retailers.
          </p>
          
          <div className="mission-highlights">
            <div className="highlight-card">
              <div className="highlight-icon">💝</div>
              <h4>Community First</h4>
              <p>We prioritize local business growth over corporate expansion, ensuring profits stay within communities.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <h4>Digital Empowerment</h4>
              <p>Modern e-commerce tools tailored for small businesses, not tech giants.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🤝</div>
              <h4>Partnership Approach</h4>
              <p>We work alongside business owners, understanding their unique challenges and goals.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="story-text">
              <p>
                Founded in 2024, Live MART emerged from a simple observation: while e-commerce giants flourished, 
                our neighborhood stores—the ones that remembered our names, supported local schools, and formed the 
                fabric of our communities—struggled to maintain their digital presence.
              </p>
              <p>
                We watched as family-run businesses that had served communities for generations found themselves 
                unable to compete in the digital marketplace. That's when we decided to build a bridge between 
                tradition and innovation.
              </p>
              <p>
                Today, we're proud to be the platform that helps these cherished establishments not just survive, 
                but thrive in the modern marketscape. From the corner kirana store to the local organic farm, 
                we're here to ensure that convenience doesn't come at the cost of community.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                🏪📱💻
                <p>Local Business Digital Transformation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🏪</div>
              <h4>Community First</h4>
              <p>Every decision we make prioritizes the growth and sustainability of local businesses over corporate expansion.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h4>Innovation with Purpose</h4>
              <p>We leverage technology to solve real challenges faced by small business owners, not just chase trends.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Partnership, Not Competition</h4>
              <p>We work alongside local businesses, understanding their unique needs and challenges as partners.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h4>Sustainable Growth</h4>
              <p>Building a platform that grows with our partners, ensuring long-term success for everyone involved.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="team-commitment">
        <div className="container">
          <h2>Our Commitment</h2>
          <div className="commitment-content">
            <p>
              <strong>We're not just building a platform; we're building a movement.</strong> A movement that believes 
              in preserving the character of our neighborhoods while embracing the convenience of modern technology.
            </p>
            <div className="commitment-points">
              <div className="point">
                <span className="point-icon">✅</span>
                <span>No hidden fees that hurt small businesses</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>Transparent pricing that benefits both businesses and customers</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>Tools designed for non-technical business owners</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>24/7 support that actually understands small business challenges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="join-movement">
        <div className="container">
          <h2>Join the Movement</h2>
          <p>
            Whether you're a customer who wants to support local businesses, or a local business owner ready to 
            grow in the digital age, we invite you to join us in building stronger, more sustainable communities.
          </p>
          <div className="cta-buttons">
            <button 
              className="cta-btn primary"
              onClick={() => navigate('/auth')}
            >
              Sign Up as Customer
            </button>
            <button 
              className="cta-btn secondary"
              onClick={() => navigate('/auth')}
            >
              Register Your Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;


/*import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Live MART</h1>
          <p className="tagline">Empowering Local Businesses in the Digital Age</p>
          <div className="hero-stats">
            <div className="stat">
              <h3>500+</h3>
              <p>Local Businesses Empowered</p>
            </div>
            <div className="stat">
              <h3>₹2.5Cr+</h3>
              <p>Revenue Generated for Local Economy</p>
            </div>
            <div className="stat">
              <h3>45+</h3>
              <p>Cities & Communities Served</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p className="mission-statement">
            At Live MART, we believe that <strong>local and family-run businesses are the heart of our communities</strong>. 
            In today's rapidly evolving market landscape, we're committed to providing these cherished establishments 
            with the digital tools and platform they need to thrive alongside major retailers.
          </p>
          
          <div className="mission-highlights">
            <div className="highlight-card">
              <div className="highlight-icon">💝</div>
              <h4>Community First</h4>
              <p>We prioritize local business growth over corporate expansion, ensuring profits stay within communities.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🚀</div>
              <h4>Digital Empowerment</h4>
              <p>Modern e-commerce tools tailored for small businesses, not tech giants.</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">🤝</div>
              <h4>Partnership Approach</h4>
              <p>We work alongside business owners, understanding their unique challenges and goals.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="story-text">
              <p>
                Founded in 2024, Live MART emerged from a simple observation: while e-commerce giants flourished, 
                our neighborhood stores—the ones that remembered our names, supported local schools, and formed the 
                fabric of our communities—struggled to maintain their digital presence.
              </p>
              <p>
                We watched as family-run businesses that had served communities for generations found themselves 
                unable to compete in the digital marketplace. That's when we decided to build a bridge between 
                tradition and innovation.
              </p>
              <p>
                Today, we're proud to be the platform that helps these cherished establishments not just survive, 
                but thrive in the modern marketscape. From the corner kirana store to the local organic farm, 
                we're here to ensure that convenience doesn't come at the cost of community.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                🏪📱💻
                <p>Local Business Digital Transformation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🏪</div>
              <h4>Community First</h4>
              <p>Every decision we make prioritizes the growth and sustainability of local businesses over corporate expansion.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h4>Innovation with Purpose</h4>
              <p>We leverage technology to solve real challenges faced by small business owners, not just chase trends.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h4>Partnership, Not Competition</h4>
              <p>We work alongside local businesses, understanding their unique needs and challenges as partners.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h4>Sustainable Growth</h4>
              <p>Building a platform that grows with our partners, ensuring long-term success for everyone involved.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="team-commitment">
        <div className="container">
          <h2>Our Commitment</h2>
          <div className="commitment-content">
            <p>
              <strong>We're not just building a platform; we're building a movement.</strong> A movement that believes 
              in preserving the character of our neighborhoods while embracing the convenience of modern technology.
            </p>
            <div className="commitment-points">
              <div className="point">
                <span className="point-icon">✅</span>
                <span>No hidden fees that hurt small businesses</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>Transparent pricing that benefits both businesses and customers</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>Tools designed for non-technical business owners</span>
              </div>
              <div className="point">
                <span className="point-icon">✅</span>
                <span>24/7 support that actually understands small business challenges</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="join-movement">
        <div className="container">
          <h2>Join the Movement</h2>
          <p>
            Whether you're a customer who wants to support local businesses, or a local business owner ready to 
            grow in the digital age, we invite you to join us in building stronger, more sustainable communities.
          </p>
          <div className="cta-buttons">
            <button 
              className="cta-btn primary"
              onClick={() => window.location.href = '/auth'}
            >
              Sign Up as Customer
            </button>
            <button 
              className="cta-btn secondary"
              onClick={() => window.location.href = '/auth'}
            >
              Register Your Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
*/
