//GEMINI PRO FIXED

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentSimulation from '../common/PaymentSimulation';
import './ShoppingCart.css';

const ShoppingCart = ({ user }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    delivery: 0,
    tax: 0,
    total: 0
  });
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    calculateSummary(savedCart);
  };

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05;
    const total = subtotal + delivery + tax;

    setOrderSummary({
      subtotal: Math.round(subtotal),
      delivery,
      tax: Math.round(tax),
      total: Math.round(total)
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    const order = {
      id: Date.now(),
      items: cartItems,
      summary: orderSummary,
      payment: paymentDetails,
      status: 'pending',
      date: new Date().toISOString(),
      tracking: {
        steps: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'],
        current: 'pending'
      }
    };

    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([order, ...orderHistory]));
    
    localStorage.removeItem('cart');
    setCartItems([]);
    setShowPayment(false);
    
    alert(`Order placed successfully! Order ID: #${order.id}`);
    navigate('/customer-dashboard');
  };

  const handlePaymentFailure = (error) => {
    alert(`Payment failed: ${error}`);
  };

  if (cartItems.length === 0 && !showPayment) {
    return (
      <div className="shopping-cart empty-cart">
        <h2>Your Shopping Cart</h2>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <Link to="/search" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="shopping-cart">
        <div className="payment-header">
          <h2>Complete Your Order</h2>
          <button 
            className="back-to-cart"
            onClick={() => setShowPayment(false)}
          >
            ← Back to Cart
          </button>
        </div>
        <PaymentSimulation 
          orderTotal={orderSummary.total}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                {item.local && <span className="local-badge">Local</span>}
              </div>
              
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price} each</p>
              </div>

              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                ₹{item.price * item.quantity}
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>₹{orderSummary.subtotal}</span>
          </div>
          
          <div className="summary-line">
            <span>Delivery:</span>
            <span>{orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}</span>
          </div>
          
          <div className="summary-line">
            <span>Tax (5%):</span>
            <span>₹{orderSummary.tax}</span>
          </div>
          
          <div className="summary-line total">
            <span>Total:</span>
            <span>₹{orderSummary.total}</span>
          </div>

          {orderSummary.subtotal < 500 && (
            <div className="delivery-note">
              🚚 Add ₹{500 - orderSummary.subtotal} more for FREE delivery!
            </div>
          )}

          <button 
            className="checkout-btn" 
            onClick={() => setShowPayment(true)}
          >
            Proceed to Checkout
          </button>

          <Link to="/search" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

/*import React, { useState, useEffect } from 'react';
import PaymentSimulation from '../common/PaymentSimulation';
import './ShoppingCart.css';

const ShoppingCart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    delivery: 0,
    tax: 0,
    total: 0
  });
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    calculateSummary(savedCart);
  };

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const tax = subtotal * 0.05;
    const total = subtotal + delivery + tax;

    setOrderSummary({
      subtotal: Math.round(subtotal),
      delivery,
      tax: Math.round(tax),
      total: Math.round(total)
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    const order = {
      id: Date.now(),
      items: cartItems,
      summary: orderSummary,
      payment: paymentDetails,
      status: 'pending',
      date: new Date().toISOString(),
      tracking: {
        steps: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'],
        current: 'pending'
      }
    };

    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([order, ...orderHistory]));
    
    localStorage.removeItem('cart');
    setCartItems([]);
    setShowPayment(false);
    
    alert(`Order placed successfully! Order ID: #${order.id}`);
    window.location.href = '/customer-dashboard';
  };

  const handlePaymentFailure = (error) => {
    alert(`Payment failed: ${error}`);
  };

  if (cartItems.length === 0 && !showPayment) {
    return (
      <div className="shopping-cart empty-cart">
        <h2>Your Shopping Cart</h2>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <a href="/search" className="continue-shopping">Continue Shopping</a>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="shopping-cart">
        <div className="payment-header">
          <h2>Complete Your Order</h2>
          <button 
            className="back-to-cart"
            onClick={() => setShowPayment(false)}
          >
            ← Back to Cart
          </button>
        </div>
        <PaymentSimulation 
          orderTotal={orderSummary.total}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                {item.local && <span className="local-badge">Local</span>}
              </div>
              
              <div className="item-details">
                <h4>{item.name}</h4>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price} each</p>
              </div>

              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <div className="item-total">
                ₹{item.price * item.quantity}
              </div>

              <button 
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>₹{orderSummary.subtotal}</span>
          </div>
          
          <div className="summary-line">
            <span>Delivery:</span>
            <span>{orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery}`}</span>
          </div>
          
          <div className="summary-line">
            <span>Tax (5%):</span>
            <span>₹{orderSummary.tax}</span>
          </div>
          
          <div className="summary-line total">
            <span>Total:</span>
            <span>₹{orderSummary.total}</span>
          </div>

          {orderSummary.subtotal < 500 && (
            <div className="delivery-note">
              🚚 Add ₹{500 - orderSummary.subtotal} more for FREE delivery!
            </div>
          )}

          <button 
            className="checkout-btn" 
            onClick={() => setShowPayment(true)}
          >
            Proceed to Checkout
          </button>

          <a href="/search" className="continue-shopping">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
*/
