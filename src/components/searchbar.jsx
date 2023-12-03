import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
      />
      <button className="search-icon" onClick={() => onSearch('')}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
