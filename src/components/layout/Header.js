//GEMINI PRO FIXED CODE
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const getRoleColor = () => {
    switch(user.type) {
      case 'customer': return '#0d9488'; // Teal
      case 'retailer': return '#a78bfa'; // Lavender
      case 'wholesaler': return '#f472b6'; // Pink
      default: return '#1e3a8a';
    }
  };

  const getDashboardLink = () => {
    return `/${user.type}-dashboard`;
  };

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: getDashboardLink(), label: 'Dashboard' },
      { href: '/about', label: 'About Us' }
    ];

    if (user.type === 'customer') {
      return [
        ...baseLinks,
        { href: '/search', label: 'Search' },
        { href: '/cart', label: 'Cart' },
        { href: '/orders', label: 'Orders' },
        { href: '/subscriptions', label: 'Subscriptions' },
        { href: '/local-businesses', label: 'Local Businesses' }
      ];
    } else if (user.type === 'retailer') {
      return [
        ...baseLinks,
        { href: '/local-businesses', label: 'Business Directory' }
      ];
    } else {
      return baseLinks;
    }
  };

  return (
    <header className="header" style={{ borderBottom: `3px solid ${getRoleColor()}` }}>
      <div className="header-content">
        <div className="logo">
          <h1>🛒 Live MART</h1>
          <span className="tagline">Group 102</span>
        </div>
        
        <div className="user-info">
          <div className="user-badge" style={{ background: getRoleColor() }}>
            <span className="user-role">{user.type}</span>
            <span className="user-name">{user.data.name}</span>
          </div>
          
          <nav className="nav-links">
            {getNavigationLinks().map(link => (
              <Link 
                key={link.href} 
                to={link.href}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


/*import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const getRoleColor = () => {
    switch(user.type) {
      case 'customer': return '#0d9488'; // Teal
      case 'retailer': return '#a78bfa'; // Lavender
      case 'wholesaler': return '#f472b6'; // Pink
      default: return '#1e3a8a';
    }
  };

  const getDashboardLink = () => {
    return `/${user.type}-dashboard`;
  };

  const getNavigationLinks = () => {
    const baseLinks = [
      { href: getDashboardLink(), label: 'Dashboard' },
      { href: '/about', label: 'About Us' }
    ];

    if (user.type === 'customer') {
      return [
        ...baseLinks,
        { href: '/search', label: 'Search' },
        { href: '/cart', label: 'Cart' },
        { href: '/orders', label: 'Orders' },
        { href: '/subscriptions', label: 'Subscriptions' },
        { href: '/local-businesses', label: 'Local Businesses' }
      ];
    } else if (user.type === 'retailer') {
      return [
        ...baseLinks,
        { href: '/local-businesses', label: 'Business Directory' }
      ];
    } else {
      return baseLinks;
    }
  };

  return (
    <header className="header" style={{ borderBottom: `3px solid ${getRoleColor()}` }}>
      <div className="header-content">
        <div className="logo">
          <h1>🛒 Live MART</h1>
          <span className="tagline">Group 102</span>
        </div>
        
        <div className="user-info">
          <div className="user-badge" style={{ background: getRoleColor() }}>
            <span className="user-role">{user.type}</span>
            <span className="user-name">{user.data.name}</span>
          </div>
          
          <nav className="nav-links">
            {getNavigationLinks().map(link => (
              <a 
                key={link.href} 
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
*/
