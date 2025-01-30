import React, { Component } from 'react';
import './SearchFilter.css';

const filterOptions = [
  { label: 'Status', type: 'dropdown', values: ['Pending', 'Approved', 'Rejected'], multiSelect: false },
  { label: 'Name', type: 'text' },
  { label: 'Date', type: 'text' }
];

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        { key: 'Status', value: ['Pending'] },
        { key: 'Name', value: [] }
      ]
    };
  }

  addFilter = () => {
    this.setState((prevState) => ({
      filters: [...prevState.filters, { key: '', value: [] }]
    }));
  };

  updateFilter = (index, key, value) => {
    this.setState((prevState) => {
      const newFilters = [...prevState.filters];
      newFilters[index] = { key, value };
      return { filters: newFilters };
    });
  };

  removeFilter = (index) => {
    this.setState((prevState) => ({
      filters: prevState.filters.filter((_, i) => i !== index)
    }));
  };

  search = () => {
    console.log('Searching with filters:', this.state.filters);
  };

  render() {
    return (
      <div className="search-filter-container">
        <h2>Search Filter</h2>
        {this.state.filters.map((filter, index) => (
          <div key={index} className="filter-row">
            <select
              className="dropdown"
              value={filter.key}
              onChange={(e) => this.updateFilter(index, e.target.value, [])}
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
                onChange={(e) => this.updateFilter(index, filter.key, [e.target.value])}
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
                onChange={(e) => this.updateFilter(index, filter.key, e.target.value.split(',').map(val => val.trim()))}
              />
            )}
            <button className="remove-btn" onClick={() => this.removeFilter(index)}>Remove</button>
          </div>
        ))}
        <div className="button-group">
          <button className="add-btn" onClick={this.addFilter}>Add Filter</button>
          <button className="search-btn" onClick={this.search}>Search</button>
        </div>
      </div>
    );
  }
}

export default SearchFilter;
