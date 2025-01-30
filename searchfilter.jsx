import React, { useState } from 'react';
import './SearchFilter.css';

const filterOptions = [
  { label: 'Status', type: 'dropdown', values: ['Pending', 'Approved', 'Rejected'], multiSelect: false },
  { label: 'Name', type: 'text' },
  { label: 'Date', type: 'text' }
];

const SearchFilter = () => {
  const [filters, setFilters] = useState([
    { key: 'Status', value: ['Pending'] },
    { key: 'Name', value: [] }
  ]);

  const addFilter = () => {
    setFilters([...filters, { key: '', value: [] }]);
  };

  const updateFilter = (index, key, value) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index] = { key, value };
      return newFilters;
    });
  };

  const removeFilter = (index) => {
    setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
  };

  const search = () => {
    console.log('Searching with filters:', filters);
  };

  return (
    <div className="search-filter-container">
      <h2>Search Filter</h2>
      {filters.map((filter, index) => (
        <div key={index} className="filter-row">
          <select
            className="dropdown"
            value={filter.key}
            onChange={(e) => updateFilter(index, e.target.value, [])}
          >
            <option value="">Select Filter</option>
            {filterOptions.map((option) => (
              <option key={option.label} value={option.label}>{option.label}</option>
            ))}
          </select>
          {filter.key && filterOptions.find((opt) => opt.label === filter.key)?.type === 'dropdown' ? (
            <select
              className="dropdown"
              value={filter.value[0] || ''}
              onChange={(e) => updateFilter(index, filter.key, [e.target.value])}
            >
              <option value="">Select Value</option>
              {filterOptions.find((opt) => opt.label === filter.key)?.values.map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          ) : (
            <input
              className="text-input"
              type="text"
              placeholder="Enter Value"
              value={filter.value.join(', ')}
              onChange={(e) => updateFilter(index, filter.key, e.target.value.split(',').map(val => val.trim()))}
            />
          )}
          <button className="remove-btn" onClick={() => removeFilter(index)}>Remove</button>
        </div>
      ))}
      <div className="button-group">
        <button className="add-btn" onClick={addFilter}>Add Filter</button>
        <button className="search-btn" onClick={search}>Search</button>
      </div>
    </div>
  );
};

export default SearchFilter;
