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
      // Vijaya Foods
      { id: 1, name: "Brown Bread", category: "Bakery", price: 45, stock: 45, local: true, rating: 4.5, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 2, name: "White Sugar", category: "Pantry", price: 60, stock: 30, local: false, rating: 4.3, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 3, name: "Basmati Rice", category: "Grains", price: 120, stock: 25, local: true, rating: 4.7, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 4, name: "Toor Dal", category: "Pulses", price: 85, stock: 20, local: true, rating: 4.4, retailer: "Vijaya Foods", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },

      // Whole Foods
      { id: 5, name: "Organic Apples", category: "Fruits", price: 120, stock: 35, local: true, rating: 4.6, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&fit=crop" },
      { id: 6, name: "Whole Wheat Bread", category: "Bakery", price: 55, stock: 28, local: true, rating: 4.5, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 7, name: "Brown Sugar", category: "Pantry", price: 75, stock: 15, local: false, rating: 4.2, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 8, name: "Organic Spinach", category: "Vegetables", price: 40, stock: 22, local: true, rating: 4.8, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&h=150&fit=crop" },

      // The Honey Co.
      { id: 9, name: "Wildflower Honey", category: "Pantry", price: 200, stock: 18, local: true, rating: 4.9, retailer: "The Honey Co.", image: "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=150&h=150&fit=crop" },
      { id: 10, name: "Manuka Honey", category: "Pantry", price: 350, stock: 12, local: false, rating: 4.7, retailer: "The Honey Co.", image: "https://images.unsplash.com/photo-1558645836-e44122a743ee?w=150&h=150&fit=crop" },

      // Healthy Living Pvt Ltd.
      { id: 11, name: "Organic Quinoa", category: "Grains", price: 180, stock: 20, local: false, rating: 4.4, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 12, name: "Almond Milk", category: "Dairy Alternatives", price: 95, stock: 25, local: true, rating: 4.3, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 13, name: "Chia Seeds", category: "Health Foods", price: 120, stock: 18, local: false, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },

      // Vegetable Farm
      { id: 14, name: "Fresh Tomatoes", category: "Vegetables", price: 35, stock: 40, local: true, rating: 4.5, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1546470427-e212b7d31075?w=150&h=150&fit=crop" },
      { id: 15, name: "Carrots", category: "Vegetables", price: 25, stock: 35, local: true, rating: 4.4, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=150&h=150&fit=crop" },
      { id: 16, name: "Bell Peppers", category: "Vegetables", price: 50, stock: 28, local: true, rating: 4.6, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1525607551107-68e20c75b1a8?w=150&h=150&fit=crop" },
      { id: 17, name: "Potatoes", category: "Vegetables", price: 20, stock: 50, local: true, rating: 4.3, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop" },

      // Good Food Co.
      { id: 18, name: "White Bread", category: "Bakery", price: 40, stock: 32, local: true, rating: 4.2, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 19, name: "Multigrain Bread", category: "Bakery", price: 65, stock: 26, local: true, rating: 4.5, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&h=150&fit=crop" },
      { id: 20, name: "Croissants", category: "Bakery", price: 30, stock: 15, local: true, rating: 4.7, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1555507038-44d78bf15b00?w=150&h=150&fit=crop" },

      // PetCare
      { id: 21, name: "Dog Food", category: "Pet Supplies", price: 450, stock: 20, local: false, rating: 4.5, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 22, name: "Cat Food", category: "Pet Supplies", price: 380, stock: 18, local: false, rating: 4.4, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 23, name: "Bird Seeds", category: "Pet Supplies", price: 120, stock: 22, local: true, rating: 4.3, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },

      // Healthy&Organic
      { id: 24, name: "Organic Bananas", category: "Fruits", price: 45, stock: 38, local: true, rating: 4.6, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop" },
      { id: 25, name: "Organic Oranges", category: "Fruits", price: 60, stock: 30, local: true, rating: 4.5, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=150&h=150&fit=crop" },
      { id: 26, name: "Organic Milk", category: "Dairy", price: 70, stock: 25, local: true, rating: 4.7, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 27, name: "Organic Eggs", category: "Dairy", price: 90, stock: 20, local: true, rating: 4.8, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&h=150&fit=crop" },

     // Grain Bakery
      { id: 28, name: "Sponge Cake", category: "Bakery", price: 30, stock: 20, local: true, rating: 4.6, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=150&h=150&fit=crop" },
      { id: 29, name: "Bagels", category: "Bakery", price: 40, stock: 0, local: true, rating: 4.4, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1555507038-44d78bf15b00?w=150&h=150&fit=crop" },
      { id: 30, name: "Muffins", category: "Bakery", price: 25, stock: 1, local: true, rating: 4.7, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=150&h=150&fit=crop" },
      // The Everything Store
      { id: 31, name: "Cooking Oil", category: "Pantry", price: 180, stock: 28, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=150&h=150&fit=crop" },
      { id: 32, name: "Pasta", category: "Pantry", price: 65, stock: 32, local: false, rating: 4.2, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=150&h=150&fit=crop" },
      { id: 33, name: "Canned Beans", category: "Pantry", price: 45, stock: 26, local: false, rating: 4.1, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1596040033221-9ae77d51f2c1?w=150&h=150&fit=crop" },
      { id: 34, name: "Flour", category: "Pantry", price: 55, stock: 30, local: true, rating: 4.4, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },

      // Additional products
      { id: 35, name: "Greek Yogurt", category: "Dairy", price: 85, stock: 22, local: true, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=150&h=150&fit=crop" },
      { id: 36, name: "Cheese Slices", category: "Dairy", price: 110, stock: 19, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=150&h=150&fit=crop" },
      { id: 37, name: "Butter", category: "Dairy", price: 65, stock: 24, local: true, rating: 4.5, retailer: "Good Food Co.", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=150&h=150&fit=crop" },
      { id: 38, name: "Orange Juice", category: "Beverages", price: 95, stock: 20, local: true, rating: 4.4, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=150&h=150&fit=crop" },
      { id: 39, name: "Green Tea", category: "Beverages", price: 120, stock: 25, local: false, rating: 4.6, retailer: "Healthy Living Pvt Ltd.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150&h=150&fit=crop" },
      { id: 40, name: "Coffee Beans", category: "Beverages", price: 250, stock: 18, local: false, rating: 4.7, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=150&h=150&fit=crop" },
      { id: 41, name: "Cucumbers", category: "Vegetables", price: 15, stock: 35, local: true, rating: 4.3, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1563225407847-817866e6beb7?w=150&h=150&fit=crop" },
      { id: 42, name: "Onions", category: "Vegetables", price: 30, stock: 40, local: true, rating: 4.2, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=150&h=150&fit=crop" },
      { id: 43, name: "Garlic", category: "Vegetables", price: 40, stock: 32, local: true, rating: 4.5, retailer: "Vegetable Farm", image: "https://images.unsplash.com/photo-1594282386621-99e80f5ceb9e?w=150&h=150&fit=crop" },
      { id: 44, name: "Grapes", category: "Fruits", price: 80, stock: 26, local: true, rating: 4.6, retailer: "Whole Foods", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=150&h=150&fit=crop" },
      { id: 45, name: "Strawberries", category: "Fruits", price: 150, stock: 18, local: true, rating: 4.8, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=150&h=150&fit=crop" },
      { id: 46, name: "Blueberries", category: "Fruits", price: 200, stock: 15, local: false, rating: 4.7, retailer: "Healthy&Organic", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=150&h=150&fit=crop" },
      { id: 47, name: "Fish Food", category: "Pet Supplies", price: 85, stock: 20, local: false, rating: 4.2, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 48, name: "Cat Litter", category: "Pet Supplies", price: 220, stock: 16, local: false, rating: 4.3, retailer: "PetCare", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop" },
      { id: 49, name: "Oats", category: "Grains", price: 75, stock: 28, local: true, rating: 4.4, retailer: "Grain Bakery", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
      { id: 50, name: "Cereal", category: "Breakfast", price: 95, stock: 24, local: false, rating: 4.3, retailer: "The Everything Store", image: "https://images.unsplash.com/photo-1627485937980-221c6ab67d6f?w=150&h=150&fit=crop" }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.retailer.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search for products, categories, retailers..."
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
              <option value="200-500">₹200 - ₹500</option>
              <option value="500-1000">Over ₹500</option>
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
                  <img src={product.image} alt={product.name} />
                  {product.local && <span className="local-badge">🏪 Local</span>}
                  {isSubscriptionEligible(product) && (
                    <span className="subscription-badge">🔔 Subscribe & Save</span>
                  )}
                  {product.stock === 0 && <span className="out-of-stock">Out of Stock</span>}
                </div>
                
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                  <p className="retailer">{product.retailer}</p>
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
