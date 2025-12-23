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
    <div className="filter-bar">
      <h2>Filter Pizzas</h2>
      
      <div className="filter-group">
        <label>Search by Name:</label>
        <input
          type="text"
          placeholder="Search pizzas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Meat Lovers">Meat Lovers</option>
          <option value="Seafood">Seafood</option>
          <option value="Specialty">Specialty</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range:</label>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={handleFilter} className="btn-apply">Apply Filters</button>
        <button onClick={handleReset} className="btn-reset">Reset Filters</button>
      </div>
    </div>
  );
};

export default FilterBar;
