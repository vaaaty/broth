import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnhancedOrderManagement.css';

const EnhancedOrderManagement = ({ user }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(orderHistory);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const reorderItems = (order) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    order.items.forEach(item => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.push({...item, quantity: item.quantity});
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Items added to cart!');
    navigate('/cart');
  };

  const requestReturn = (order, item) => {
    const returnRequest = {
      id: Date.now(),
      orderId: order.id,
      itemId: item.id,
      itemName: item.name,
      reason: '',
      status: 'pending',
      date: new Date().toISOString()
    };
    
    const returns = JSON.parse(localStorage.getItem('returnRequests') || '[]');
    localStorage.setItem('returnRequests', JSON.stringify([...returns, returnRequest]));
    
    alert(`Return requested for ${item.name}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'preparing': return '#8b5cf6';
      case 'out_for_delivery': return '#ec4899';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { id: 'pending', label: 'Order Placed', completed: true },
      { id: 'confirmed', label: 'Confirmed', completed: ['confirmed', 'preparing', 'out_for_delivery', 'delivered'].includes(status) },
      { id: 'preparing', label: 'Preparing', completed: ['preparing', 'out_for_delivery', 'delivered'].includes(status) },
      { id: 'out_for_delivery', label: 'Out for Delivery', completed: ['out_for_delivery', 'delivered'].includes(status) },
      { id: 'delivered', label: 'Delivered', completed: status === 'delivered' }
    ];
    return steps;
  };

  return (
    <div className="enhanced-order-management">
      <div className="orders-header">
        <h2>Your Orders</h2>
        <p>Manage your orders, returns, and subscriptions</p>
      </div>

      <div className="orders-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
      </div>

      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-icon">📦</div>
            <h3>No orders found</h3>
            <p>{activeTab === 'all' ? 'You haven\'t placed any orders yet.' : `No ${activeTab} orders.`}</p>
            <button onClick={() => navigate('/search')} className="shop-now">Start Shopping</button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card-enhanced">
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.id}</h4>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ background: getStatusColor(order.status) }}
                  >
                    {order.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="action-btn track-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    📦 Track Order
                  </button>
                  
                  <div className="dropdown">
                    <button className="action-btn more-btn">⋮</button>
                    <div className="dropdown-content">
                      <button onClick={() => reorderItems(order)}>
                        🔄 Reorder All
                      </button>
                      <button onClick={() => alert('Contact support for replacement')}>
                        🔄 Request Replacement
                      </button>
                      <button onClick={() => alert('Contact support for refund')}>
                        💰 Request Refund
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h5>{item.name}</h5>
                      <p>Quantity: {item.quantity} × ₹{item.price}</p>
                    </div>
                    
                    <div className="item-actions">
                      {order.status === 'delivered' && (
                        <button 
                          className="return-btn"
                          onClick={() => requestReturn(order, item)}
                        >
                          🔄 Return
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                Total: ₹{order.summary.total}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay">
          <div className="tracking-modal">
            <div className="modal-header">
              <h3>Track Order #{selectedOrder.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            
            <div className="tracking-progress">
              <h4>Order Status</h4>
              <div className="progress-steps">
                {getStatusSteps(selectedOrder.status).map((step, index) => (
                  <div key={step.id} className="step-container">
                    <div className="step-content">
                      <div 
                        className={`step-icon ${step.completed ? 'completed' : ''}`}
                        style={{ background: step.completed ? getStatusColor(selectedOrder.status) : '#e5e7eb' }}
                      >
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <span className="step-label">{step.label}</span>
                    </div>
                    {index < 4 && (
                      <div 
                        className={`step-connector ${step.completed ? 'completed' : ''}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-details-modal">
              <h4>Order Details</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Order Date:</strong>
                  <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <strong>Total Amount:</strong>
                  <span>₹{selectedOrder.summary.total}</span>
                </div>
                <div className="detail-item">
                  <strong>Delivery Address:</strong>
                  <span>123 Main Street, {user?.data?.location || 'Your Location'}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="reorder-btn"
                onClick={() => reorderItems(selectedOrder)}
              >
                🔄 Reorder All Items
              </button>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedOrderManagement;

/*import React, { useState, useEffect } from 'react';
import './EnhancedOrderManagement.css';

const EnhancedOrderManagement = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(orderHistory);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const reorderItems = (order) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    order.items.forEach(item => {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.push({...item, quantity: item.quantity});
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Items added to cart!');
    window.location.href = '/cart';
  };

  const requestReturn = (order, item) => {
    const returnRequest = {
      id: Date.now(),
      orderId: order.id,
      itemId: item.id,
      itemName: item.name,
      reason: '',
      status: 'pending',
      date: new Date().toISOString()
    };
    
    const returns = JSON.parse(localStorage.getItem('returnRequests') || '[]');
    localStorage.setItem('returnRequests', JSON.stringify([...returns, returnRequest]));
    
    alert(`Return requested for ${item.name}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'preparing': return '#8b5cf6';
      case 'out_for_delivery': return '#ec4899';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { id: 'pending', label: 'Order Placed', completed: true },
      { id: 'confirmed', label: 'Confirmed', completed: ['confirmed', 'preparing', 'out_for_delivery', 'delivered'].includes(status) },
      { id: 'preparing', label: 'Preparing', completed: ['preparing', 'out_for_delivery', 'delivered'].includes(status) },
      { id: 'out_for_delivery', label: 'Out for Delivery', completed: ['out_for_delivery', 'delivered'].includes(status) },
      { id: 'delivered', label: 'Delivered', completed: status === 'delivered' }
    ];
    return steps;
  };

  return (
    <div className="enhanced-order-management">
      <div className="orders-header">
        <h2>Your Orders</h2>
        <p>Manage your orders, returns, and subscriptions</p>
      </div>

      <div className="orders-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
      </div>

      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <div className="empty-icon">📦</div>
            <h3>No orders found</h3>
            <p>{activeTab === 'all' ? 'You haven\'t placed any orders yet.' : `No ${activeTab} orders.`}</p>
            <a href="/search" className="shop-now">Start Shopping</a>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card-enhanced">
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.id}</h4>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ background: getStatusColor(order.status) }}
                  >
                    {order.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="order-actions">
                  <button 
                    className="action-btn track-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    📦 Track Order
                  </button>
                  
                  <div className="dropdown">
                    <button className="action-btn more-btn">⋮</button>
                    <div className="dropdown-content">
                      <button onClick={() => reorderItems(order)}>
                        🔄 Reorder All
                      </button>
                      <button onClick={() => alert('Contact support for replacement')}>
                        🔄 Request Replacement
                      </button>
                      <button onClick={() => alert('Contact support for refund')}>
                        💰 Request Refund
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h5>{item.name}</h5>
                      <p>Quantity: {item.quantity} × ₹{item.price}</p>
                    </div>
                    
                    <div className="item-actions">
                      {order.status === 'delivered' && (
                        <button 
                          className="return-btn"
                          onClick={() => requestReturn(order, item)}
                        >
                          🔄 Return
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                Total: ₹{order.summary.total}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay">
          <div className="tracking-modal">
            <div className="modal-header">
              <h3>Track Order #{selectedOrder.id}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>
            
            <div className="tracking-progress">
              <h4>Order Status</h4>
              <div className="progress-steps">
                {getStatusSteps(selectedOrder.status).map((step, index) => (
                  <div key={step.id} className="step-container">
                    <div className="step-content">
                      <div 
                        className={`step-icon ${step.completed ? 'completed' : ''}`}
                        style={{ background: step.completed ? getStatusColor(selectedOrder.status) : '#e5e7eb' }}
                      >
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <span className="step-label">{step.label}</span>
                    </div>
                    {index < 4 && (
                      <div 
                        className={`step-connector ${step.completed ? 'completed' : ''}`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-details-modal">
              <h4>Order Details</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>Order Date:</strong>
                  <span>{new Date(selectedOrder.date).toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <strong>Total Amount:</strong>
                  <span>₹{selectedOrder.summary.total}</span>
                </div>
                <div className="detail-item">
                  <strong>Delivery Address:</strong>
                  <span>123 Main Street, {user?.data?.location || 'Your Location'}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="reorder-btn"
                onClick={() => reorderItems(selectedOrder)}
              >
                🔄 Reorder All Items
              </button>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedOrderManagement;
*/
