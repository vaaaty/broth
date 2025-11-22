//GEMINI

import React, { useState, useEffect } from 'react';
import './NotificationSystem.css';

/**
 * NotificationSystem component.
 * Manages notification preferences and displays recent notifications for order updates.
 */
const NotificationSystem = ({ order, user }) => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    sms: true,
    email: true,
    push: true,
    orderUpdates: true,
    promotions: false,
    stockAlerts: true
  });
  const [showTestModal, setShowTestModal] = useState(false); // Custom modal state

  // Use a mock/placeholder Firebase setup for compatibility checks
  // NOTE: Per instructions, we avoid using Firebase/Firestore here, relying on localStorage and mock data.
  useEffect(() => {
    // Load notification preferences from a more persistent storage solution
    // We are keeping localStorage here as per the original snippet, although Firestore is preferred.
    const savedPrefs = localStorage.getItem('notificationPrefs');
    if (savedPrefs) {
      setPreferences(JSON.parse(savedPrefs));
    }

    // Load mock initial notifications
    setNotifications([
      {
        id: 99,
        type: 'welcome',
        title: 'Welcome!',
        message: 'Explore your notification settings here.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
        sent: true
      },
    ]);

    // Generate order notifications if a new order prop is passed
    if (order && order.id) {
      generateOrderNotifications(order);
    }
  }, [order]);

  const generateOrderNotifications = (currentOrder) => {
    const orderNotifications = [
      {
        id: currentOrder.id + 100, // Unique ID generation
        type: 'order_placed',
        title: 'Order Confirmed!',
        message: `Your order #${currentOrder.id} has been placed successfully.`,
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: currentOrder.id + 101,
        type: 'order_processing',
        title: 'Order Being Prepared',
        message: `Seller is preparing your order #${currentOrder.id} for shipment.`,
        timestamp: new Date(Date.now() + 300000).toISOString(),
        read: false
      },
      {
        id: currentOrder.id + 102,
        type: 'order_shipped',
        title: 'Order Shipped!',
        message: `Your order #${currentOrder.id} is out for delivery.`,
        timestamp: new Date(Date.now() + 900000).toISOString(),
        read: false
      }
    ];

    setNotifications(prev => [...orderNotifications, ...prev].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    simulateDelivery(orderNotifications);
  };

  const simulateDelivery = (newNotifications) => {
    newNotifications.forEach((notification, index) => {
      setTimeout(() => {
        // In a real app, this would trigger external services (SMS, Email APIs)
        if (preferences.sms) {
          console.log(`📱 [Simulated] SMS Sent: ${notification.message}`);
        }
        if (preferences.email) {
          console.log(`📧 [Simulated] Email Sent: ${notification.message}`);
        }

        // Update notification status in the state
        setNotifications(prev =>
          prev.map(notif =>
            notif.id === notification.id ? { ...notif, sent: true } : notif
          ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        );
      }, (index + 1) * 3000); // Stagger notifications for effect
    });
  };

  const updatePreferences = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    // Update preferences in local storage
    localStorage.setItem('notificationPrefs', JSON.stringify(newPreferences));
  };

  const sendTestNotification = () => {
    // Show custom modal detailing which notifications would be sent
    setShowTestModal(true);
  };

  const TestModal = () => (
    <div className="custom-modal-backdrop">
      <div className="custom-modal-content">
        <h4>Test Notification Sent!</h4>
        <p>The following simulated notifications were triggered based on your settings:</p>
        <ul className="test-results-list">
          {preferences.sms && <li>📱 SMS to your phone (Simulated)</li>}
          {preferences.email && <li>📧 Email to {user?.data?.email || 'your email'} (Simulated)</li>}
          {preferences.push && <li>🔔 In-App Push Notification</li>}
          {!preferences.sms && !preferences.email && !preferences.push && <li>(No external channels are enabled)</li>}
        </ul>
        <button onClick={() => setShowTestModal(false)} className="modal-close-btn">
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="notification-system">
      {showTestModal && <TestModal />}
      <h3>🔔 Notifications</h3>

      {/* Notification Preferences */}
      <div className="preferences-section">
        <h4>Communication Channels</h4>
        <div className="preference-options">
          <label>
            <input
              type="checkbox"
              checked={preferences.sms}
              onChange={(e) => updatePreferences('sms', e.target.checked)}
            />
            SMS Notifications
          </label>

          <label>
            <input
              type="checkbox"
              checked={preferences.email}
              onChange={(e) => updatePreferences('email', e.target.checked)}
            />
            Email Notifications
          </label>

          <label>
            <input
              type="checkbox"
              checked={preferences.push}
              onChange={(e) => updatePreferences('push', e.target.checked)}
            />
            In-App (Push) Notifications
          </label>
        </div>

        <h4>Content Settings</h4>
        <div className="preference-options">
          <label>
            <input
              type="checkbox"
              checked={preferences.orderUpdates}
              onChange={(e) => updatePreferences('orderUpdates', e.target.checked)}
            />
            Order Updates (Essential)
          </label>

          <label>
            <input
              type="checkbox"
              checked={preferences.promotions}
              onChange={(e) => updatePreferences('promotions', e.target.checked)}
            />
            Promotions & Offers
          </label>

          <label>
            <input
              type="checkbox"
              checked={preferences.stockAlerts}
              onChange={(e) => updatePreferences('stockAlerts', e.target.checked)}
            />
            Stock Alerts (e.g., favorite items back in stock)
          </label>
        </div>


        <button className="test-notification" onClick={sendTestNotification}>
          Send Test Notification
        </button>
      </div>

      {/* Recent Notifications */}
      <div className="notifications-list">
        <h4>Recent Notifications ({notifications.filter(n => !n.read).length} unread)</h4>
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications yet</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
              <div className="notification-icon">
                {notification.type.includes('order') ? '📦' : notification.type.includes('welcome') ? '👋' : '🔔'}
              </div>
              <div className="notification-content">
                <h5>{notification.title}</h5>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </span>
              </div>
              {notification.sent && <span className="sent-badge">Sent</span>}
            </div>
          ))
        )}
      </div>

      {/* Delivery Confirmation */}
      {order && (
        <div className="delivery-confirmation">
          <h4>Delivery Confirmation Summary</h4>
          <p>Order status updates will be sent via:</p>
          <ul className="confirmation-list">
            {preferences.sms && <li>📱 SMS to {user?.data?.phone || 'your phone'}</li>}
            {preferences.email && <li>📧 Email to {user?.data?.email || 'your email'}</li>}
            {preferences.push && <li>🔔 In-App Push</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;

