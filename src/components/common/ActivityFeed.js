import React, { useState, useEffect } from 'react';
import './ActivityFeed.css';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'order',
        message: 'Order #1234 delivered successfully',
        time: '2 hours ago',
        icon: '📦',
        read: false
      },
      {
        id: 2,
        type: 'promotion',
        message: 'New local products added from Fresh Mart',
        time: '5 hours ago', 
        icon: '🆕',
        read: true
      },
      {
        id: 3,
        type: 'community',
        message: 'Community goal 80% complete - free delivery unlocked soon!',
        time: '1 day ago',
        icon: '🎯',
        read: true
      },
      {
        id: 4,
        type: 'subscription',
        message: 'Your monthly dog food subscription will be delivered tomorrow',
        time: '1 day ago',
        icon: '🔔',
        read: true
      }
    ];
    
    setActivities(mockActivities);
  }, []);

  const markAsRead = (activityId) => {
    setActivities(activities.map(activity => 
      activity.id === activityId ? { ...activity, read: true } : activity
    ));
  };

  const unreadCount = activities.filter(activity => !activity.read).length;

  return (
    <div className="activity-feed">
      <div className="feed-header">
        <h3>Recent Activity</h3>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </div>
      
      <div className="activities-list">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`activity-item ${activity.read ? 'read' : 'unread'}`}
            onClick={() => markAsRead(activity.id)}
          >
            <div className="activity-icon">{activity.icon}</div>
            <div className="activity-content">
              <p>{activity.message}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
            {!activity.read && <div className="unread-dot"></div>}
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="no-activities">
          <p>No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
