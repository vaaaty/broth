import React, { useState, useEffect } from 'react';
import './ProductSearch.css';

const ProductSearch = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    inStock: false,
    localOnly: false,
    localBusinessesOnly: false,
    sortBy: 'name'
  });

  const isSubscriptionEligible = (product) => {
    const subscriptionCategories = [
      'pet food', 'tissues', 'milk', 'bread', 'eggs', 
      'cleaning supplies', 'personal care', 'beverages'
    ];
    return subscriptionCategories.some(category => 
      product.name.toLowerCase().includes(category) || 
      product.category.toLowerCase().includes(category)
    );
  };

  useEffect(() => {
    const mockProducts = [
      { id: 1, name: "Organic Apples", category: "Fruits", price: 120, stock: 45, local: true, rating: 4.5 },
      { id: 2, name: "Premium Dog Food", category: "Pet Supplies", price: 800, stock: 0, local: false, rating: 4.2 },
      { id: 3, name: "Whole Wheat Bread", category: "Bakery", price: 45, stock: 23, local: true, rating: 4.7 },
      { id: 4, name: "Dairy Milk", category: "Dairy", price: 60, stock: 8, local: false, rating: 4.3 },
      { id: 5, name: "Local Honey", category: "Condiments", price: 200, stock: 15, local: true, rating: 4.8 },
      { id: 6, name: "Facial Tissues", category: "Personal Care", price: 80, stock: 30, local: false, rating: 4.1 },
      { id: 7, name: "Fresh Spinach", category: "Vegetables", price: 30, stock: 20, local: true, rating: 4.6 },
      { id: 8, name: "Farm Eggs", category: "Dairy", price: 90, stock: 12, local: true, rating: 4.9 },
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.inStock) {
      results = results.filter(product => product.stock > 0);
    }

    if (filters.localOnly) {
      results = results.filter(product => product.local);
    }

    if (filters.localBusinessesOnly) {
      results = results.filter(product => product.local);
    }

    results = sortProducts(results, filters.sortBy);
    setFilteredProducts(results);
  }, [searchTerm, filters, products]);

  const sortProducts = (products, sortBy) => {
    switch(sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      case 'name':
      default:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const trackSearch = (term) => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const newSearch = {
      term,
      timestamp: new Date().toISOString(),
      category: 'search'
    };
    const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)];
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const subscribeToProduct = (product) => {
    const subscription = {
      id: Date.now(),
      productId: product.id,
      productName: product.name,
      frequency: 'weekly',
      quantity: 1,
      discount: 15,
      nextDelivery: calculateNextDelivery('weekly'),
      status: 'active'
    };
    
    const subscriptions = JSON.parse(localStorage.getItem('productSubscriptions') || '[]');
    localStorage.setItem('productSubscriptions', JSON.stringify([...subscriptions, subscription]));
    
    alert(`Subscribed to ${product.name}! You'll save 15% and get automatic deliveries.`);
  };

  const calculateNextDelivery = (frequency) => {
    const nextDate = new Date();
    switch(frequency) {
      case 'weekly': nextDate.setDate(nextDate.getDate() + 7); break;
      case 'bi-weekly': nextDate.setDate(nextDate.getDate() + 14); break;
      case 'monthly': nextDate.setMonth(nextDate.getMonth() + 1); break;
    }
    return nextDate.toISOString();
  };

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="product-search">
      <div className="search-header">
        <h2>Search Products</h2>
        
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for products, categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value) trackSearch(e.target.value);
            }}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
            >
              <option value="">Any Price</option>
              <option value="0-50">Under ₹50</option>
              <option value="50-100">₹50 - ₹100</option>
              <option value="100-200">₹100 - ₹200</option>
              <option value="200-1000">Over ₹200</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
              />
              In Stock Only
            </label>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.localOnly}
                onChange={(e) => setFilters({...filters, localOnly: e.target.checked})}
              />
              Local Products Only
            </label>
          </div>

          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.localBusinessesOnly}
                onChange={(e) => setFilters({...filters, localBusinessesOnly: e.target.checked})}
              />
              🏪 Local Businesses Only
            </label>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <button 
            className="clear-filters"
            onClick={() => setFilters({
              category: '',
              priceRange: '',
              inStock: false,
              localOnly: false,
              localBusinessesOnly: false,
              sortBy: 'name'
            })}
          >
            Clear All Filters
          </button>
        </div>

        <div className="products-results">
          <div className="results-info">
            <p>Found {filteredProducts.length} products</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="enhanced-product-card">
                <div className="product-image">
                  {product.local && <span className="local-badge">🏪 Local</span>}
                  {isSubscriptionEligible(product) && (
                    <span className="subscription-badge">🔔 Subscribe & Save</span>
                  )}
                  {product.stock === 0 && <span className="out-of-stock">Out of Stock</span>}
                </div>
                
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                  <div className="rating">
                    {'⭐'.repeat(Math.floor(product.rating))} ({product.rating})
                  </div>
                  <p className="price">₹{product.price}</p>
                  <p className={`stock ${product.stock === 0 ? 'out' : 'in'}`}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} available`}
                  </p>
                </div>

                <div className="product-actions">
                  <button 
                    className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  
                  {isSubscriptionEligible(product) && product.stock > 0 && (
                    <button 
                      className="subscribe-cta"
                      onClick={() => subscribeToProduct(product)}
                    >
                      🔔 Subscribe & Save 15%
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
