import React from 'react';
import './StockAlerts.css';

const StockAlerts = ({ inventory, onStockUpdate }) => {
  const lowStockItems = inventory.filter(item => item.stock > 0 && item.stock <= item.minStock);
  const outOfStockItems = inventory.filter(item => item.stock === 0);

  const autoReorder = (product) => {
    const newStock = product.stock + 50;
    onStockUpdate(product.id, newStock);
    alert(`Auto-ordered 50 units of ${product.name} from wholesaler`);
  };

  return (
    <div className="stock-alerts">
      <h3>Stock Alerts</h3>
      
      {outOfStockItems.length > 0 && (
        <div className="alert-section critical">
          <h4>🛑 Out of Stock</h4>
          {outOfStockItems.map(item => (
            <div key={item.id} className="alert-item">
              <span className="product-name">{item.name}</span>
              <span className="stock-status">0 in stock</span>
              <button 
                className="reorder-btn"
                onClick={() => autoReorder(item)}
              >
                Reorder Now
              </button>
            </div>
          ))}
        </div>
      )}

      {lowStockItems.length > 0 && (
        <div className="alert-section warning">
          <h4>⚠️ Low Stock</h4>
          {lowStockItems.map(item => (
            <div key={item.id} className="alert-item">
              <span className="product-name">{item.name}</span>
              <span className="stock-status">
                {item.stock} left (min: {item.minStock})
              </span>
              <button 
                className="reorder-btn"
                onClick={() => autoReorder(item)}
              >
                Reorder
              </button>
            </div>
          ))}
        </div>
      )}

      {lowStockItems.length === 0 && outOfStockItems.length === 0 && (
        <div className="no-alerts">
          <p>✅ All products are adequately stocked</p>
        </div>
      )}

      <div className="stock-summary">
        <div className="summary-item">
          <span>Total Products:</span>
          <span>{inventory.length}</span>
        </div>
        <div className="summary-item">
          <span>Well Stocked:</span>
          <span>{inventory.length - lowStockItems.length - outOfStockItems.length}</span>
        </div>
        <div className="summary-item warning">
          <span>Low Stock:</span>
          <span>{lowStockItems.length}</span>
        </div>
        <div className="summary-item critical">
          <span>Out of Stock:</span>
          <span>{outOfStockItems.length}</span>
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;
