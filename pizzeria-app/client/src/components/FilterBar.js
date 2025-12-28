import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    const filters = {
      search: search || undefined,
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
    onFilter(filters);
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onFilter({});
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        {/* Search Input */}
        <div className="filter-item search-box">
          <span className="filter-icon"></span>
          <input
            type="text"
            placeholder="Search pizza name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div className="filter-item">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Seafood">Seafood</option>
            <option value="Specialty">Specialty</option>
          </select>
        </div>

        {/* Price Inputs */}
        <div className="filter-item price-inputs">
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="price-dash">-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="filter-buttons">
          <button onClick={handleFilter} className="btn-apply-small">Apply</button>
          <button onClick={handleReset} className="btn-reset-small">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;