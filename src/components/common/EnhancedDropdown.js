import React, { useState, useRef, useEffect } from 'react';
import './EnhancedDropdown.css';

const EnhancedDropdown = ({ title, items, onSelect, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={`enhanced-dropdown ${variant}`} ref={dropdownRef}>
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-title">{title}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
            >
              {item.icon && <span className="item-icon">{item.icon}</span>}
              <span className="item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedDropdown;
