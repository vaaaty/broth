import React, { useState, useEffect } from 'react';
import './SubscriptionManagement.css';

const SubscriptionManagement = ({ user }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem('productSubscriptions') || '[]');
    setSubscriptions(savedSubscriptions);
  }, []);

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (activeTab === 'all') return true;
    return sub.status === activeTab;
  });

  const updateSubscription = (subscriptionId, updates) => {
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === subscriptionId ? { ...sub, ...updates } : sub
    );
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('productSubscriptions', JSON.stringify(updatedSubscriptions));
  };

  const cancelSubscription = (subscriptionId) => {
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== subscriptionId);
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('productSubscriptions', JSON.stringify(updatedSubscriptions));
    alert('Subscription cancelled successfully');
  };

  const calculateNextDelivery = (frequency) => {
    const nextDate = new Date();
    switch(frequency) {
      case 'weekly': nextDate.setDate(nextDate.getDate() + 7); break;
      case 'bi-weekly': nextDate.setDate(nextDate.getDate() + 14); break;
      case 'monthly': nextDate.setMonth(nextDate.getMonth() + 1); break;
    }
    return nextDate;
  };

  const getSubscriptionProducts = () => {
    return [
      { id: 1, name: "Premium Dog Food", category: "Pet Supplies", price: 800 },
      { id: 2, name: "Facial Tissues", category: "Personal Care", price: 80 },
      { id: 3, name: "Dairy Milk", category: "Dairy", price: 60 },
      { id: 4, name: "Whole Wheat Bread", category: "Bakery", price: 45 },
      { id: 5, name: "Farm Eggs", category: "Dairy", price: 90 }
    ];
  };

  const subscribeToProduct = (product, frequency = 'weekly') => {
    const subscription = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      category: product.category,
      frequency: frequency,
      quantity: 1,
      price: product.price,
      discount: 15,
      discountedPrice: product.price * 0.85,
      nextDelivery: calculateNextDelivery(frequency).toISOString(),
      status: 'active'
    };
    
    const updatedSubscriptions = [...subscriptions, subscription];
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem('productSubscriptions', JSON.stringify(updatedSubscriptions));
    
    alert(`Subscribed to ${product.name}! You'll save 15% and get automatic ${frequency} deliveries.`);
  };

  return (
    <div className="subscription-management">
      <div className="subscription-header">
        <h2>🔔 Your Subscriptions</h2>
        <p>Save time and money with automatic deliveries</p>
      </div>

      <div className="subscription-tabs">
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`tab-btn ${activeTab === 'paused' ? 'active' : ''}`}
          onClick={() => setActiveTab('paused')}
        >
          Paused
        </button>
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Subscriptions
        </button>
      </div>

      {filteredSubscriptions.length === 0 ? (
        <div className="empty-subscriptions">
          <div className="empty-icon">📦</div>
          <h3>No {activeTab !== 'all' ? activeTab : ''} Subscriptions</h3>
          <p>
            {activeTab === 'active' 
              ? "Subscribe to frequently purchased items to save 15% and never run out!"
              : "No subscriptions match your current filter."
            }
          </p>
          {activeTab === 'active' && (
            <div className="subscription-cta">
              <h4>Popular Subscription Products</h4>
              <div className="suggested-products">
                {getSubscriptionProducts().map(product => (
                  <div key={product.id} className="suggested-product">
                    <h5>{product.name}</h5>
                    <p className="category">{product.category}</p>
                    <div className="pricing">
                      <span className="original-price">₹{product.price}</span>
                      <span className="discounted-price">₹{(product.price * 0.85).toFixed(0)}</span>
                      <span className="save-badge">Save 15%</span>
                    </div>
                    <div className="frequency-options">
                      <button onClick={() => subscribeToProduct(product, 'weekly')}>
                        Weekly
                      </button>
                      <button onClick={() => subscribeToProduct(product, 'bi-weekly')}>
                        Every 2 Weeks
                      </button>
                      <button onClick={() => subscribeToProduct(product, 'monthly')}>
                        Monthly
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="subscriptions-grid">
          {filteredSubscriptions.map(subscription => (
            <div key={subscription.id} className="subscription-card">
              <div className="subscription-header">
                <div className="product-info">
                  <h4>{subscription.productName}</h4>
                  <span className="category">{subscription.category}</span>
                </div>
                <div className="discount-badge">
                  Save {subscription.discount}%
                </div>
              </div>
              
              <div className="subscription-details">
                <div className="detail-row">
                  <strong>Frequency:</strong>
                  <select 
                    value={subscription.frequency}
                    onChange={(e) => updateSubscription(subscription.id, { 
                      frequency: e.target.value,
                      nextDelivery: calculateNextDelivery(e.target.value).toISOString()
                    })}
                    className="frequency-dropdown"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Every 2 Weeks</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="detail-row">
                  <strong>Quantity:</strong>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateSubscription(subscription.id, { 
                        quantity: Math.max(1, subscription.quantity - 1)
                      })}
                    >
                      -
                    </button>
                    <span className="quantity">{subscription.quantity}</span>
                    <button 
                      onClick={() => updateSubscription(subscription.id, { 
                        quantity: subscription.quantity + 1
                      })}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="detail-row">
                  <strong>Next Delivery:</strong>
                  <span className="delivery-date">
                    {new Date(subscription.nextDelivery).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="detail-row">
                  <strong>Price:</strong>
                  <div className="price-details">
                    <span className="original-price">₹{subscription.price * subscription.quantity}</span>
                    <span className="discounted-price">
                      ₹{(subscription.discountedPrice * subscription.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
                
                <div className="detail-row">
                  <strong>Status:</strong>
                  <span className={`status ${subscription.status}`}>
                    {subscription.status}
                  </span>
                </div>
              </div>

              <div className="subscription-actions">
                {subscription.status === 'active' ? (
                  <>
                    <button 
                      className="pause-btn"
                      onClick={() => updateSubscription(subscription.id, { status: 'paused' })}
                    >
                      ⏸️ Pause
                    </button>
                    <button 
                      className="skip-btn"
                      onClick={() => {
                        const nextDelivery = calculateNextDelivery(subscription.frequency);
                        updateSubscription(subscription.id, { nextDelivery: nextDelivery.toISOString() });
                        alert('Delivery skipped! Next delivery rescheduled.');
                      }}
                    >
                      ⏭️ Skip Next
                    </button>
                  </>
                ) : (
                  <button 
                    className="resume-btn"
                    onClick={() => updateSubscription(subscription.id, { status: 'active' })}
                  >
                    ▶️ Resume
                  </button>
                )}
                <button 
                  className="cancel-btn"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this subscription?')) {
                      cancelSubscription(subscription.id);
                    }
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="subscription-benefits">
        <h3>Why Subscribe? 🤔</h3>
        <div className="benefits-grid">
          <div className="benefit">
            <div className="benefit-icon">💰</div>
            <h4>Save 15%</h4>
            <p>Automatic discount on every delivery</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">⏰</div>
            <h4>Never Run Out</h4>
            <p>Automatic deliveries so you're always stocked</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">📦</div>
            <h4>Free Delivery</h4>
            <p>Free delivery on all subscription orders</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">⚡</div>
            <h4>Easy Management</h4>
            <p>Pause, skip, or cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
