//GEMINI PRO FIXED

import React, { useState, useEffect } from 'react';
import StockAlerts from './StockAlerts';
import WholesalerOrdering from './WholesalerOrdering';
import './RetailerDashboard.css';

const RetailerDashboard = ({ user }) => {
  // Initialize state from LocalStorage if available, otherwise use Mock Data
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('retailer_inventory');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: "Organic Apples", category: "Fruits", price: 120, stock: 45, minStock: 10 },
      { id: 2, name: "Whole Wheat Bread", category: "Bakery", price: 45, stock: 23, minStock: 5 },
      { id: 3, name: "Dairy Milk", category: "Dairy", price: 60, stock: 8, minStock: 15 },
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('retailer_orders');
    if (saved) return JSON.parse(saved);
    return [
      { id: 101, customer: "John Doe", items: ["Apples", "Bread"], total: 165, status: "pending" },
      { id: 102, customer: "Jane Smith", items: ["Milk"], total: 60, status: "completed" }
    ];
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });
  const [activeTab, setActiveTab] = useState('inventory');

  // Save to LocalStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem('retailer_inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Save to LocalStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('retailer_orders', JSON.stringify(orders));
  }, [orders]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(), // Use timestamp for unique ID
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      minStock: 10
    };
    
    setInventory([...inventory, product]);
    setNewProduct({ name: '', category: '', price: '', stock: '', description: '' });
    setShowAddForm(false);
  };

  const updateStock = (productId, newStock) => {
    setInventory(inventory.map(item => 
      item.id === productId ? { ...item, stock: parseInt(newStock) || 0 } : item
    ));
  };

  const deleteProduct = (productId) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      setInventory(inventory.filter(item => item.id !== productId));
    }
  };

  const lowStockItems = inventory.filter(item => item.stock > 0 && item.stock <= item.minStock);
  const outOfStockItems = inventory.filter(item => item.stock === 0);

  return (
    <div className="retailer-dashboard">
      <div className="dashboard-header retailer-header">
        <h2>Retailer Dashboard</h2>
        <p>Welcome back, {user?.data?.businessName || user?.data?.name}!</p>
      </div>

      <div className="retailer-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{inventory.length}</p>
        </div>
        <div className="stat-card warning">
          <h3>Low Stock</h3>
          <p className="stat-number">{lowStockItems.length}</p>
        </div>
        <div className="stat-card critical">
          <h3>Out of Stock</h3>
          <p className="stat-number">{outOfStockItems.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-number">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
      </div>

      <div className="retailer-tabs">
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📦 Inventory Management
        </button>
        <button 
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          ⚠️ Stock Alerts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'wholesale' ? 'active' : ''}`}
          onClick={() => setActiveTab('wholesale')}
        >
          🛒 Wholesale Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Customer Orders
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <div className="section-header">
              <h3>Inventory Management</h3>
              <button 
                className="add-product-btn"
                onClick={() => setShowAddForm(true)}
              >
                + Add Product
              </button>
            </div>

            {showAddForm && (
              <div className="add-product-form">
                <h4>Add New Product</h4>
                <form onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Grains">Grains</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Price (₹)"
                    value={newProduct.price}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                      setNewProduct({...newProduct, price: numbersOnly});
                    }}
                    inputMode="decimal"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Stock Quantity"
                    value={newProduct.stock}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/\D/g, '');
                      setNewProduct({...newProduct, stock: numbersOnly});
                    }}
                    inputMode="numeric"
                    required
                  />
                  <textarea
                    placeholder="Product Description (Optional)"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows="3"
                  />
                  <div className="form-actions">
                    <button type="submit" className="save-btn">Save Product</button>
                    <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="inventory-table">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price (₹)</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(product => (
                    <tr key={product.id} className={product.stock <= product.minStock ? 'low-stock' : ''}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <input
                          type="text"
                          value={product.price}
                          onChange={(e) => {
                            const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                            setInventory(inventory.map(item => 
                              item.id === product.id ? { ...item, price: numbersOnly } : item
                            ));
                          }}
                          className="price-input"
                          inputMode="decimal"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.stock}
                          onChange={(e) => {
                            const numbersOnly = e.target.value.replace(/\D/g, '');
                            updateStock(product.id, numbersOnly);
                          }}
                          className="stock-input"
                          inputMode="numeric"
                        />
                      </td>
                      <td>
                        <span className={`stock-status ${product.stock === 0 ? 'out' : product.stock <= product.minStock ? 'low' : 'good'}`}>
                          {product.stock === 0 ? 'Out of Stock' : product.stock <= product.minStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <StockAlerts 
            inventory={inventory} 
            onStockUpdate={updateStock}
          />
        )}

        {activeTab === 'wholesale' && (
          <WholesalerOrdering retailerId={user?.data?.businessName} />
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h3>Customer Orders</h3>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <h4>Order #{order.id}</h4>
                    <p>Customer: {order.customer}</p>
                    <p>Items: {order.items.join(', ')}</p>
                    <p>Total: ₹{order.total}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                    <button className="view-order-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;

/*import React, { useState, useEffect } from 'react';
import StockAlerts from './StockAlerts';
import WholesalerOrdering from './WholesalerOrdering';
import './RetailerDashboard.css';

const RetailerDashboard = ({ user }) => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });
  const [activeTab, setActiveTab] = useState('inventory');

  useEffect(() => {
    const mockInventory = [
      { id: 1, name: "Organic Apples", category: "Fruits", price: 120, stock: 45, minStock: 10 },
      { id: 2, name: "Whole Wheat Bread", category: "Bakery", price: 45, stock: 23, minStock: 5 },
      { id: 3, name: "Dairy Milk", category: "Dairy", price: 60, stock: 8, minStock: 15 },
    ];
    
    const mockOrders = [
      { id: 101, customer: "John Doe", items: ["Apples", "Bread"], total: 165, status: "pending" },
      { id: 102, customer: "Jane Smith", items: ["Milk"], total: 60, status: "completed" }
    ];
    
    setInventory(mockInventory);
    setOrders(mockOrders);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: inventory.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      minStock: 10
    };
    
    setInventory([...inventory, product]);
    setNewProduct({ name: '', category: '', price: '', stock: '', description: '' });
    setShowAddForm(false);
  };

  const updateStock = (productId, newStock) => {
    setInventory(inventory.map(item => 
      item.id === productId ? { ...item, stock: parseInt(newStock) } : item
    ));
  };

  const deleteProduct = (productId) => {
    setInventory(inventory.filter(item => item.id !== productId));
  };

  const lowStockItems = inventory.filter(item => item.stock > 0 && item.stock <= item.minStock);
  const outOfStockItems = inventory.filter(item => item.stock === 0);

  return (
    <div className="retailer-dashboard">
      <div className="dashboard-header retailer-header">
        <h2>Retailer Dashboard</h2>
        <p>Welcome back, {user?.data?.businessName || user?.data?.name}!</p>
      </div>

      <div className="retailer-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">{inventory.length}</p>
        </div>
        <div className="stat-card warning">
          <h3>Low Stock</h3>
          <p className="stat-number">{lowStockItems.length}</p>
        </div>
        <div className="stat-card critical">
          <h3>Out of Stock</h3>
          <p className="stat-number">{outOfStockItems.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-number">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
      </div>

      <div className="retailer-tabs">
        <button 
          className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📦 Inventory Management
        </button>
        <button 
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          ⚠️ Stock Alerts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'wholesale' ? 'active' : ''}`}
          onClick={() => setActiveTab('wholesale')}
        >
          🛒 Wholesale Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Customer Orders
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'inventory' && (
          <div className="inventory-section">
            <div className="section-header">
              <h3>Inventory Management</h3>
              <button 
                className="add-product-btn"
                onClick={() => setShowAddForm(true)}
              >
                + Add Product
              </button>
            </div>

            {showAddForm && (
              <div className="add-product-form">
                <h4>Add New Product</h4>
                <form onSubmit={handleAddProduct}>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    required
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Grains">Grains</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Price (₹)"
                    value={newProduct.price}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                      setNewProduct({...newProduct, price: numbersOnly});
                    }}
                    inputMode="decimal"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Stock Quantity"
                    value={newProduct.stock}
                    onChange={(e) => {
                      const numbersOnly = e.target.value.replace(/\D/g, '');
                      setNewProduct({...newProduct, stock: numbersOnly});
                    }}
                    inputMode="numeric"
                    required
                  />
                  <textarea
                    placeholder="Product Description (Optional)"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows="3"
                  />
                  <div className="form-actions">
                    <button type="submit" className="save-btn">Save Product</button>
                    <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="inventory-table">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price (₹)</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(product => (
                    <tr key={product.id} className={product.stock <= product.minStock ? 'low-stock' : ''}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        <input
                          type="text"
                          value={product.price}
                          onChange={(e) => {
                            const numbersOnly = e.target.value.replace(/[^0-9.]/g, '');
                            setInventory(inventory.map(item => 
                              item.id === product.id ? { ...item, price: numbersOnly } : item
                            ));
                          }}
                          className="price-input"
                          inputMode="decimal"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={product.stock}
                          onChange={(e) => {
                            const numbersOnly = e.target.value.replace(/\D/g, '');
                            updateStock(product.id, numbersOnly);
                          }}
                          className="stock-input"
                          inputMode="numeric"
                        />
                      </td>
                      <td>
                        <span className={`stock-status ${product.stock === 0 ? 'out' : product.stock <= product.minStock ? 'low' : 'good'}`}>
                          {product.stock === 0 ? 'Out of Stock' : product.stock <= product.minStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <StockAlerts 
            inventory={inventory} 
            onStockUpdate={updateStock}
          />
        )}

        {activeTab === 'wholesale' && (
          <WholesalerOrdering retailerId={user?.data?.businessName} />
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h3>Customer Orders</h3>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <h4>Order #{order.id}</h4>
                    <p>Customer: {order.customer}</p>
                    <p>Items: {order.items.join(', ')}</p>
                    <p>Total: ₹{order.total}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                    <button className="view-order-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;
*/
