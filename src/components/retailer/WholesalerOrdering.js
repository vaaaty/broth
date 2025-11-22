import React, { useState, useEffect } from 'react';
import './WholesalerOrdering.css';

const WholesalerOrdering = ({ retailerId }) => {
  const [wholesalers, setWholesalers] = useState([]);
  const [selectedWholesaler, setSelectedWholesaler] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const mockWholesalers = [
      {
        id: 1,
        name: "Mega Wholesale Distributors",
        rating: 4.7,
        deliveryTime: "2-3 days",
        minOrder: 5000,
        categories: ["Fruits", "Vegetables", "Dairy", "Grains"],
        products: [
          { id: 101, name: "Apple Crate", category: "Fruits", price: 1000, unit: "crate", minOrder: 1 },
          { id: 102, name: "Wheat Flour Sack", category: "Grains", price: 800, unit: "sack", minOrder: 1 },
          { id: 103, name: "Milk Can", category: "Dairy", price: 1200, unit: "can", minOrder: 1 }
        ]
      },
      {
        id: 2,
        name: "Fresh Produce Wholesale",
        rating: 4.5,
        deliveryTime: "1-2 days", 
        minOrder: 3000,
        categories: ["Fruits", "Vegetables", "Organic"],
        products: [
          { id: 201, name: "Organic Vegetable Box", category: "Vegetables", price: 1500, unit: "box", minOrder: 1 },
          { id: 202, name: "Seasonal Fruit Crate", category: "Fruits", price: 1800, unit: "crate", minOrder: 1 }
        ]
      }
    ];

    setWholesalers(mockWholesalers);
    
    const mockHistory = [
      {
        id: 1001,
        wholesaler: "Mega Wholesale Distributors",
        date: "2024-01-10",
        amount: 12500,
        status: "delivered",
        items: ["Apple Crates", "Milk Cans", "Flour Sacks"]
      }
    ];
    
    setOrderHistory(mockHistory);
  }, []);

  const addToWholesaleCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const placeWholesaleOrder = () => {
    if (cart.length === 0) {
      alert('Your wholesale cart is empty!');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (selectedWholesaler && total < selectedWholesaler.minOrder) {
      alert(`Minimum order for ${selectedWholesaler.name} is ₹${selectedWholesaler.minOrder}`);
      return;
    }

    const order = {
      id: Date.now(),
      retailerId,
      wholesalerId: selectedWholesaler?.id,
      wholesalerName: selectedWholesaler?.name,
      items: cart,
      total: total,
      date: new Date().toISOString(),
      status: 'pending'
    };

    setOrderHistory([order, ...orderHistory]);
    setCart([]);
    alert(`Order placed with ${selectedWholesaler.name} for ₹${order.total}`);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="wholesaler-ordering">
      <h3>🛒 Order from Wholesalers</h3>

      <div className="ordering-content">
        <div className="wholesalers-section">
          <h4>Available Wholesalers</h4>
          <div className="wholesalers-list">
            {wholesalers.map(wholesaler => (
              <div 
                key={wholesaler.id}
                className={`wholesaler-card ${selectedWholesaler?.id === wholesaler.id ? 'selected' : ''}`}
                onClick={() => setSelectedWholesaler(wholesaler)}
              >
                <div className="wholesaler-header">
                  <h5>{wholesaler.name}</h5>
                  <span className="rating">⭐ {wholesaler.rating}</span>
                </div>
                <div className="wholesaler-details">
                  <p>🚚 Delivery: {wholesaler.deliveryTime}</p>
                  <p>💰 Min Order: ₹{wholesaler.minOrder}</p>
                  <p>📦 Categories: {wholesaler.categories.join(', ')}</p>
                </div>
                
                {selectedWholesaler?.id === wholesaler.id && (
                  <div className="wholesaler-products">
                    <h6>Available Products:</h6>
                    {wholesaler.products.map(product => (
                      <div key={product.id} className="product-item">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">₹{product.price}/{product.unit}</span>
                        <button 
                          className="add-to-wholesale-cart"
                          onClick={() => addToWholesaleCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="order-cart-section">
          <h4>Wholesale Order Cart</h4>
          {cart.length === 0 ? (
            <p className="empty-cart">Add items from wholesaler catalog</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">₹{item.price}/{item.unit}</span>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="item-total">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-total">
                  Total: ₹{cartTotal}
                </div>
                {selectedWholesaler && cartTotal < selectedWholesaler.minOrder && (
                  <div className="min-order-warning">
                    ⚠️ Minimum order: ₹{selectedWholesaler.minOrder}
                  </div>
                )}
                <button 
                  className="place-order-btn"
                  onClick={placeWholesaleOrder}
                  disabled={cart.length === 0 || (selectedWholesaler && cartTotal < selectedWholesaler.minOrder)}
                >
                  Place Wholesale Order
                </button>
              </div>
            </>
          )}
        </div>

        <div className="order-history-section">
          <h4>Previous Wholesale Orders</h4>
          {orderHistory.map(order => (
            <div key={order.id} className="history-item">
              <div className="order-info">
                <strong>Order #{order.id}</strong>
                <span>with {order.wholesalerName}</span>
              </div>
              <div className="order-details">
                <span>Amount: ₹{order.amount}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
                <span>Date: {new Date(order.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WholesalerOrdering;
