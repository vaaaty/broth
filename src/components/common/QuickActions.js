//GEMINI PRO FIXED 

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

const QuickActions = ({ user }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: '🔍',
      title: 'Quick Search',
      description: 'Find products instantly',
      action: () => navigate('/search'),
      color: '#3B82F6'
    },
    {
      icon: '📦',
      title: 'Order Tracking',
      description: 'Check order status',
      action: () => navigate('/orders'),
      color: '#10B981'
    },
    {
      icon: '🏪',
      title: 'Nearby Stores',
      description: 'Find local businesses',
      action: () => navigate('/local-businesses'),
      color: '#8B5CF6'
    },
    {
      icon: '📅',
      title: 'Subscriptions',
      description: 'Manage your subscriptions',
      action: () => navigate('/subscriptions'),
      color: '#F59E0B'
    },
    {
      icon: '🎧',
      title: 'Support',
      description: 'Get help quickly',
      action: () => alert('Support: Call 1-800-LIVE-MART or email support@livemart.com'),
      color: '#EC4899'
    },
    {
      icon: '⭐',
      title: 'Rate App',
      description: 'Share your experience',
      action: () => alert('Thank you for your feedback!'),
      color: '#06B6D4'
    }
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {quickActions.map((action, index) => (
          <button 
            key={index} 
            className="action-card" 
            onClick={action.action}
          >
            <div 
              className="action-icon" 
              style={{background: action.color}}
            >
              {action.icon}
            </div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;



/*import React from 'react';
import './QuickActions.css';

const QuickActions = ({ user }) => {
  const quickActions = [
    {
      icon: '🔍',
      title: 'Quick Search',
      description: 'Find products instantly',
      action: () => window.location.href = '/search',
      color: '#3B82F6'
    },
    {
      icon: '📦',
      title: 'Order Tracking',
      description: 'Check order status',
      action: () => window.location.href = '/orders',
      color: '#10B981'
    },
    {
      icon: '🏪',
      title: 'Nearby Stores',
      description: 'Find local businesses',
      action: () => window.location.href = '/local-businesses',
      color: '#8B5CF6'
    },
    {
      icon: '🔔',
      title: 'Subscriptions',
      description: 'Manage your subscriptions',
      action: () => window.location.href = '/subscriptions',
      color: '#F59E0B'
    },
    {
      icon: '💬',
      title: 'Support',
      description: 'Get help quickly',
      action: () => alert('Support: Call 1-800-LIVE-MART or email support@livemart.com'),
      color: '#EC4899'
    },
    {
      icon: '⭐',
      title: 'Rate App',
      description: 'Share your experience',
      action: () => alert('Thank you for your feedback!'),
      color: '#06B6D4'
    }
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {quickActions.map((action, index) => (
          <button 
            key={index} 
            className="action-card" 
            onClick={action.action}
          >
            <div 
              className="action-icon" 
              style={{background: action.color}}
            >
              {action.icon}
            </div>
            <div className="action-content">
              <h4>{action.title}</h4>
              <p>{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
*/
