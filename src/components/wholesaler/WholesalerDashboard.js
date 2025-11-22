//GEMINI PRO FIXED

import React, { useState, useEffect } from 'react';
import './WholesalerDashboard.css';

const WholesalerDashboard = ({ user }) => {
  const [bulkInventory, setBulkInventory] = useState(() => {
    const saved = localStorage.getItem('wholesaler_inventory');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: "Apple Crate", category: "Fruits", price: 1000, stock: 150, minStock: 50, unit: "crate" },
      { id: 2, name: "Wheat Flour Sack", category: "Grains", price: 800, stock: 80, minStock: 20, unit: "sack" },
      { id: 3, name: "Milk Can", category: "Dairy", price: 1200, stock: 45, minStock: 15, unit: "can" },
      { id: 4, name: "Organic Vegetable Box", category: "Vegetables", price: 1500, stock: 60, minStock: 25, unit: "box" },
    ];
  });

  const [retailerOrders, setRetailerOrders] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');

  useEffect(() => {
    // Mock data for orders/transactions (could also be persisted if needed)
    const mockRetailerOrders = [
      { 
        id: 201, 
        retailer: "Fresh Mart", 
        items: [{product: "Apple Crate", quantity: 2}], 
        total: 2000, 
        status: "pending", 
        orderDate: "2024-01-15",
        contact: "9876543210",
        location: "Downtown"
      },
      { 
        id: 202, 
        retailer: "Local Store", 
        items: [{product: "Wheat Flour Sack", quantity: 1}], 
        total: 800, 
        status: "shipped", 
        orderDate: "2024-01-14",
        contact: "9876543211",
        location: "City Center"
      },
      { 
        id: 203, 
        retailer: "Corner Market", 
        items: [{product: "Milk Can", quantity: 3}, {product: "Apple Crate", quantity: 1}], 
        total: 4600, 
        status: "processing", 
        orderDate: "2024-01-16",
        contact: "9876543212",
        location: "West End"
      }
    ];
    
    const mockRetailers = [
      { id: 1, name: "Fresh Mart", location: "Downtown", contact: "9876543210", orders: 15, joined: "2023" },
      { id: 2, name: "Local Store", location: "City Center", contact: "9876543211", orders: 8, joined: "2023" },
      { id: 3, name: "Corner Market", location: "West End", contact: "9876543212", orders: 12, joined: "2024" },
    ];
    
    const mockTransactions = [
      { id: 301, retailer: "Fresh Mart", amount: 5000, date: "2024-01-13", items: ["Apple Crate", "Milk Can"] },
      { id: 302, retailer: "Local Store", amount: 2400, date: "2024-01-12", items: ["Wheat Flour Sack"] },
      { id: 303, retailer: "Corner Market", amount: 8200, date: "2024-01-10", items: ["Milk Can", "Organic Vegetable Box"] },
    ];

    setRetailerOrders(mockRetailerOrders);
    setRetailers(mockRetailers);
    setTransactionHistory(mockTransactions);
  }, []);

  // Save bulk inventory changes
  useEffect(() => {
    localStorage.setItem('wholesaler_inventory', JSON.stringify(bulkInventory));
  }, [bulkInventory]);

  const updateOrderStatus = (orderId, newStatus) => {
    setRetailerOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateBulkStock = (productId, newStock) => {
    setBulkInventory(inventory => 
      inventory.map(item => 
        item.id === productId ? { ...item, stock: parseInt(newStock) || 0 } : item
      )
    );
  };

  const updateBulkPrice = (productId, newPrice) => {
    setBulkInventory(inventory => 
      inventory.map(item => 
        item.id === productId ? { ...item, price: parseFloat(newPrice) || 0 } : item
      )
    );
  };

  const totalInventoryValue = bulkInventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const pendingOrders = retailerOrders.filter(order => order.status === 'pending').length;
  const activeRetailers = retailers.length;
  const lowStockItems = bulkInventory.filter(item => item.stock <= item.minStock).length;

  return (
    <div className="wholesaler-dashboard">
      <div className="dashboard-header wholesaler-header">
        <h2>Wholesaler Dashboard</h2>
        <p>Welcome back, {user?.data?.businessName || user?.data?.name}!</p>
      </div>

      <div className="wholesale-stats">
        <div className="stat-card wholesale-stat">
          <h3>Total Inventory Value</h3>
          <p className="stat-number">₹{totalInventoryValue.toLocaleString()}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Active Retailers</h3>
          <p className="stat-number">{activeRetailers}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Pending Orders</h3>
          <p className="stat-number">{pendingOrders}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Low Stock Items</h3>
          <p className="stat-number alert">{lowStockItems}</p>
        </div>
      </div>

      <div className="wholesaler-tabs">
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📦 Bulk Inventory
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🛒 Retailer Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'retailers' ? 'active' : ''}`}
          onClick={() => setActiveTab('retailers')}
        >
          🏪 Retailer Network
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          💰 Transactions
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'inventory' && (
          <div className="bulk-inventory-section">
            <div className="section-header">
              <h3>Bulk Inventory Management</h3>
              <button 
                className="bulk-update-btn"
                onClick={() => setShowBulkUpdate(true)}
              >
                📦 Bulk Stock Update
              </button>
            </div>

            <div className="bulk-inventory-grid">
              {bulkInventory.map(item => (
                <div key={item.id} className="bulk-item-card">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <span className={`stock-indicator ${item.stock <= item.minStock ? 'low' : 'adequate'}`}>
                      {item.stock} {item.unit}s
                    </span>
                  </div>
                  <div className="item-details">
                    <div className="price-control">
                      <label>Price per {item.unit}:</label>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                          updateBulkPrice(item.id, numbersOnly);
                        }}
                        className="price-input"
                        inputMode="decimal"
                      />
                    </div>
                    <div className="stock-control">
                      <label>Stock:</label>
                      <input
                        type="text"
                        value={item.stock}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/\D/g, '');
                          updateBulkStock(item.id, numbersOnly);
                        }}
                        className="stock-input"
                        inputMode="numeric"
                      />
                    </div>
                    <p className="category">{item.category}</p>
                    <p className="min-stock">Min Stock: {item.minStock} {item.unit}s</p>
                  </div>
                  <div className="inventory-value">
                    Value: ₹{(item.price * item.stock).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="retailer-orders-section">
            <h3>Retailer Orders</h3>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Retailer</th>
                    <th>Items</th>
                    <th>Total (₹)</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {retailerOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="retailer-info">
                          <strong>{order.retailer}</strong>
                          <span>{order.location}</span>
                        </div>
                      </td>
                      <td>
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            {item.quantity} x {item.product}
                          </div>
                        ))}
                      </td>
                      <td>₹{order.total}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`status-select ${order.status}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td>
                        <button className="view-details-btn">Details</button>
                        <button className="invoice-btn">Invoice</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'retailers' && (
          <div className="retailers-section">
            <h3>Retailer Network</h3>
            <div className="retailers-grid">
              {retailers.map(retailer => (
                <div key={retailer.id} className="retailer-card">
                  <div className="retailer-header">
                    <h4>{retailer.name}</h4>
                    <span className="orders-count">{retailer.orders} orders</span>
                  </div>
                  <div className="retailer-details">
                    <p>📍 {retailer.location}</p>
                    <p>📞 {retailer.contact}</p>
                    <p>📅 Member since {retailer.joined}</p>
                  </div>
                  <div className="retailer-actions">
                    <button className="contact-retailer">Contact</button>
                    <button className="view-orders">View Orders</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transaction-history">
            <h3>Transaction History</h3>
            <div className="transactions-list">
              {transactionHistory.map(transaction => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-info">
                    <h4>Transaction #{transaction.id}</h4>
                    <p>Retailer: {transaction.retailer}</p>
                    <p>Amount: ₹{transaction.amount}</p>
                    <p>Date: {transaction.date}</p>
                  </div>
                  <div className="transaction-items">
                    <strong>Items:</strong> {transaction.items.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showBulkUpdate && (
        <div className="modal-overlay">
          <div className="bulk-update-modal">
            <h3>Bulk Stock Update</h3>
            <div className="bulk-update-form">
              {bulkInventory.map(item => (
                <div key={item.id} className="bulk-update-item">
                  <label>{item.name}</label>
                  <input 
                    type="text" 
                    placeholder={`Current: ${item.stock}`}
                    className="bulk-quantity-input"
                    inputMode="numeric"
                  />
                </div>
              ))}
              <div className="modal-actions">
                <button className="confirm-bulk-btn">Confirm Update</button>
                <button onClick={() => setShowBulkUpdate(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesalerDashboard;

/*import React, { useState, useEffect } from 'react';
import './WholesalerDashboard.css';

const WholesalerDashboard = ({ user }) => {
  const [bulkInventory, setBulkInventory] = useState([]);
  const [retailerOrders, setRetailerOrders] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');

  useEffect(() => {
    const mockBulkInventory = [
      { id: 1, name: "Apple Crate", category: "Fruits", price: 1000, stock: 150, minStock: 50, unit: "crate" },
      { id: 2, name: "Wheat Flour Sack", category: "Grains", price: 800, stock: 80, minStock: 20, unit: "sack" },
      { id: 3, name: "Milk Can", category: "Dairy", price: 1200, stock: 45, minStock: 15, unit: "can" },
      { id: 4, name: "Organic Vegetable Box", category: "Vegetables", price: 1500, stock: 60, minStock: 25, unit: "box" },
    ];
    
    const mockRetailerOrders = [
      { 
        id: 201, 
        retailer: "Fresh Mart", 
        items: [{product: "Apple Crate", quantity: 2}], 
        total: 2000, 
        status: "pending", 
        orderDate: "2024-01-15",
        contact: "9876543210",
        location: "Downtown"
      },
      { 
        id: 202, 
        retailer: "Local Store", 
        items: [{product: "Wheat Flour Sack", quantity: 1}], 
        total: 800, 
        status: "shipped", 
        orderDate: "2024-01-14",
        contact: "9876543211",
        location: "City Center"
      },
      { 
        id: 203, 
        retailer: "Corner Market", 
        items: [{product: "Milk Can", quantity: 3}, {product: "Apple Crate", quantity: 1}], 
        total: 4600, 
        status: "processing", 
        orderDate: "2024-01-16",
        contact: "9876543212",
        location: "West End"
      }
    ];
    
    const mockRetailers = [
      { id: 1, name: "Fresh Mart", location: "Downtown", contact: "9876543210", orders: 15, joined: "2023" },
      { id: 2, name: "Local Store", location: "City Center", contact: "9876543211", orders: 8, joined: "2023" },
      { id: 3, name: "Corner Market", location: "West End", contact: "9876543212", orders: 12, joined: "2024" },
    ];
    
    const mockTransactions = [
      { id: 301, retailer: "Fresh Mart", amount: 5000, date: "2024-01-13", items: ["Apple Crate", "Milk Can"] },
      { id: 302, retailer: "Local Store", amount: 2400, date: "2024-01-12", items: ["Wheat Flour Sack"] },
      { id: 303, retailer: "Corner Market", amount: 8200, date: "2024-01-10", items: ["Milk Can", "Organic Vegetable Box"] },
    ];

    setBulkInventory(mockBulkInventory);
    setRetailerOrders(mockRetailerOrders);
    setRetailers(mockRetailers);
    setTransactionHistory(mockTransactions);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setRetailerOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const updateBulkStock = (productId, newStock) => {
    setBulkInventory(inventory => 
      inventory.map(item => 
        item.id === productId ? { ...item, stock: parseInt(newStock) } : item
      )
    );
  };

  const updateBulkPrice = (productId, newPrice) => {
    setBulkInventory(inventory => 
      inventory.map(item => 
        item.id === productId ? { ...item, price: parseFloat(newPrice) } : item
      )
    );
  };

  const totalInventoryValue = bulkInventory.reduce((sum, item) => sum + (item.price * item.stock), 0);
  const pendingOrders = retailerOrders.filter(order => order.status === 'pending').length;
  const activeRetailers = retailers.length;
  const lowStockItems = bulkInventory.filter(item => item.stock <= item.minStock).length;

  return (
    <div className="wholesaler-dashboard">
      <div className="dashboard-header wholesaler-header">
        <h2>Wholesaler Dashboard</h2>
        <p>Welcome back, {user?.data?.businessName || user?.data?.name}!</p>
      </div>

      <div className="wholesale-stats">
        <div className="stat-card wholesale-stat">
          <h3>Total Inventory Value</h3>
          <p className="stat-number">₹{totalInventoryValue.toLocaleString()}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Active Retailers</h3>
          <p className="stat-number">{activeRetailers}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Pending Orders</h3>
          <p className="stat-number">{pendingOrders}</p>
        </div>
        <div className="stat-card wholesale-stat">
          <h3>Low Stock Items</h3>
          <p className="stat-number alert">{lowStockItems}</p>
        </div>
      </div>

      <div className="wholesaler-tabs">
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📦 Bulk Inventory
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🛒 Retailer Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'retailers' ? 'active' : ''}`}
          onClick={() => setActiveTab('retailers')}
        >
          🏪 Retailer Network
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          💰 Transactions
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'inventory' && (
          <div className="bulk-inventory-section">
            <div className="section-header">
              <h3>Bulk Inventory Management</h3>
              <button 
                className="bulk-update-btn"
                onClick={() => setShowBulkUpdate(true)}
              >
                📦 Bulk Stock Update
              </button>
            </div>

            <div className="bulk-inventory-grid">
              {bulkInventory.map(item => (
                <div key={item.id} className="bulk-item-card">
                  <div className="item-header">
                    <h4>{item.name}</h4>
                    <span className={`stock-indicator ${item.stock <= item.minStock ? 'low' : 'adequate'}`}>
                      {item.stock} {item.unit}s
                    </span>
                  </div>
                  <div className="item-details">
                    <div className="price-control">
                      <label>Price per {item.unit}:</label>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                          updateBulkPrice(item.id, numbersOnly);
                        }}
                        className="price-input"
                        inputMode="decimal"
                      />
                    </div>
                    <div className="stock-control">
                      <label>Stock:</label>
                      <input
                        type="text"
                        value={item.stock}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(/\D/g, '');
                          updateBulkStock(item.id, numbersOnly);
                        }}
                        className="stock-input"
                        inputMode="numeric"
                      />
                    </div>
                    <p className="category">{item.category}</p>
                    <p className="min-stock">Min Stock: {item.minStock} {item.unit}s</p>
                  </div>
                  <div className="inventory-value">
                    Value: ₹{(item.price * item.stock).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="retailer-orders-section">
            <h3>Retailer Orders</h3>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Retailer</th>
                    <th>Items</th>
                    <th>Total (₹)</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {retailerOrders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="retailer-info">
                          <strong>{order.retailer}</strong>
                          <span>{order.location}</span>
                        </div>
                      </td>
                      <td>
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            {item.quantity} x {item.product}
                          </div>
                        ))}
                      </td>
                      <td>₹{order.total}</td>
                      <td>{order.orderDate}</td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`status-select ${order.status}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td>
                        <button className="view-details-btn">Details</button>
                        <button className="invoice-btn">Invoice</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'retailers' && (
          <div className="retailers-section">
            <h3>Retailer Network</h3>
            <div className="retailers-grid">
              {retailers.map(retailer => (
                <div key={retailer.id} className="retailer-card">
                  <div className="retailer-header">
                    <h4>{retailer.name}</h4>
                    <span className="orders-count">{retailer.orders} orders</span>
                  </div>
                  <div className="retailer-details">
                    <p>📍 {retailer.location}</p>
                    <p>📞 {retailer.contact}</p>
                    <p>📅 Member since {retailer.joined}</p>
                  </div>
                  <div className="retailer-actions">
                    <button className="contact-retailer">Contact</button>
                    <button className="view-orders">View Orders</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transaction-history">
            <h3>Transaction History</h3>
            <div className="transactions-list">
              {transactionHistory.map(transaction => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-info">
                    <h4>Transaction #{transaction.id}</h4>
                    <p>Retailer: {transaction.retailer}</p>
                    <p>Amount: ₹{transaction.amount}</p>
                    <p>Date: {transaction.date}</p>
                  </div>
                  <div className="transaction-items">
                    <strong>Items:</strong> {transaction.items.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showBulkUpdate && (
        <div className="modal-overlay">
          <div className="bulk-update-modal">
            <h3>Bulk Stock Update</h3>
            <div className="bulk-update-form">
              {bulkInventory.map(item => (
                <div key={item.id} className="bulk-update-item">
                  <label>{item.name}</label>
                  <input 
                    type="text" 
                    placeholder={`Current: ${item.stock}`}
                    className="bulk-quantity-input"
                    inputMode="numeric"
                  />
                </div>
              ))}
              <div className="modal-actions">
                <button className="confirm-bulk-btn">Confirm Update</button>
                <button onClick={() => setShowBulkUpdate(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesalerDashboard;
*/
