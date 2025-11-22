import React from 'react';
import './CommunityImpact.css';

const CommunityImpact = () => {
  const communityData = {
    overall: {
      totalLocalBusinesses: 127,
      jobsSupported: 450,
      moneyInLocalEconomy: "2.5Cr+",
      carbonReduced: "12,500 kg"
    },
    yourImpact: {
      localBusinessesSupported: 8,
      moneyStayedLocal: 12500,
      carbonReduced: 45,
      communityRank: "Top 15%"
    },
    goals: {
      current: "Support 50 local businesses this month",
      progress: 42,
      target: 50,
      rewards: [
        "Free delivery for everyone for a week",
        "Community celebration event",
        "Special discounts at all local businesses"
      ]
    },
    monthlyTrend: [
      { month: 'Jan', businesses: 35, impact: 45000 },
      { month: 'Feb', businesses: 42, impact: 58000 },
      { month: 'Mar', businesses: 38, impact: 52000 },
      { month: 'Apr', businesses: 45, impact: 62000 }
    ]
  };

  return (
    <div className="community-impact-page">
      <div className="page-header">
        <h1>💰 Community Impact Dashboard</h1>
        <p>See how our community is growing together</p>
      </div>

      <div className="impact-sections">
        {/* Overall Community Impact */}
        <section className="community-overview">
          <h2>Our Community's Impact</h2>
          <div className="community-stats-grid">
            <div className="community-stat">
              <div className="stat-value">{communityData.overall.totalLocalBusinesses}</div>
              <div className="stat-label">Local Businesses Supported</div>
            </div>
            <div className="community-stat">
              <div className="stat-value">{communityData.overall.jobsSupported}</div>
              <div className="stat-label">Local Jobs Supported</div>
            </div>
            <div className="community-stat">
              <div className="stat-value">{communityData.overall.moneyInLocalEconomy}</div>
              <div className="stat-label">In Local Economy</div>
            </div>
            <div className="community-stat">
              <div className="stat-value">{communityData.overall.carbonReduced}</div>
              <div className="stat-label">Carbon Footprint Reduced</div>
            </div>
          </div>
        </section>

        {/* Personal Impact */}
        <section className="personal-impact">
          <h2>Your Personal Impact</h2>
          <div className="personal-stats">
            <div className="personal-stat">
              <div className="stat-icon">🏪</div>
              <div className="stat-content">
                <div className="stat-value">{communityData.yourImpact.localBusinessesSupported}</div>
                <div className="stat-label">Local Businesses You've Supported</div>
              </div>
            </div>
            <div className="personal-stat">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <div className="stat-value">₹{communityData.yourImpact.moneyStayedLocal}</div>
                <div className="stat-label">Stayed in Local Economy</div>
              </div>
            </div>
            <div className="personal-stat">
              <div className="stat-icon">🌍</div>
              <div className="stat-content">
                <div className="stat-value">{communityData.yourImpact.carbonReduced}kg</div>
                <div className="stat-label">Carbon Reduced</div>
              </div>
            </div>
            <div className="personal-stat">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <div className="stat-value">{communityData.yourImpact.communityRank}</div>
                <div className="stat-label">Community Rank</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Goals */}
        <section className="community-goals-detailed">
          <h2>Current Community Goal</h2>
          <div className="goal-card">
            <h3>{communityData.goals.current}</h3>
            <div className="goal-progress">
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{width: `${(communityData.goals.progress/communityData.goals.target)*100}%`}}
                ></div>
              </div>
              <div className="progress-text">
                {communityData.goals.progress} / {communityData.goals.target} businesses supported
                <span className="progress-percent">
                  {Math.round((communityData.goals.progress/communityData.goals.target)*100)}%
                </span>
              </div>
            </div>
            
            <div className="goal-rewards">
              <h4>🎁 Unlock when goal reached:</h4>
              <ul>
                {communityData.goals.rewards.map((reward, index) => (
                  <li key={index}>{reward}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Impact Trends */}
        <section className="impact-trends">
          <h2>Monthly Impact Trends</h2>
          <div className="trends-chart">
            {communityData.monthlyTrend.map((month, index) => (
              <div key={month.month} className="trend-bar">
                <div className="bar-container">
                  <div 
                    className="businesses-bar"
                    style={{height: `${(month.businesses/50)*100}%`}}
                    title={`${month.businesses} businesses`}
                  ></div>
                  <div 
                    className="impact-bar"
                    style={{height: `${(month.impact/70000)*100}%`}}
                    title={`₹${month.impact} impact`}
                  ></div>
                </div>
                <span className="month-label">{month.month}</span>
                <div className="bar-stats">
                  <span>{month.businesses} biz</span>
                  <span>₹{(month.impact/1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color businesses"></div>
              <span>Businesses Supported</span>
            </div>
            <div className="legend-item">
              <div className="legend-color impact"></div>
              <span>Economic Impact (₹)</span>
            </div>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="impact-stories">
          <h2>Community Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-avatar">FM</div>
              <h4>Fresh Mart's Digital Transformation</h4>
              <p>"Live MART helped us reach 3x more customers while staying true to our local roots. Our sales have grown by 40% in just 6 months!"</p>
              <div className="story-meta">- The Sharma Family, Fresh Mart</div>
            </div>
            <div className="story-card">
              <div className="story-avatar">GV</div>
              <h4>Green Valley Farm Expansion</h4>
              <p>"We've been able to hire 3 more local workers and expand our organic farming operations thanks to the consistent demand from Live MART."</p>
              <div className="story-meta">- The Patel Family, Green Valley Farm</div>
            </div>
            <div className="story-card">
              <div className="story-avatar">HC</div>
              <h4>Happy Cow Dairy Revival</h4>
              <p>"After struggling to compete with big dairy brands, Live MART gave us a platform to showcase our ethical farming practices. We're now supplying 15 local stores!"</p>
              <div className="story-meta">- The Kumar Family, Happy Cow Dairy</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityImpact;
