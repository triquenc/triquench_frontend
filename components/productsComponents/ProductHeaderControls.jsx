"use client";
import React from 'react';
import { FaSearch } from "react-icons/fa";

export default function ProductHeaderControls({ 
  start, 
  end, 
  total, 
  searchQuery, 
  setSearchQuery, 
  sortingOption, 
  setSortingOption 
}) {
  return (
    <div className="product-heading">
      <span className="product-count">
        Showing {start} - {end} of {total} products
      </span>
      <div className="controls-wrapper">
        <div className="search-bar">
          <FaSearch />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sorting-dropdown">
          <label htmlFor="sorting-options">Sort By: </label>
          <select
            id="sorting-options"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="Popular">Popular</option>
            <option value="Latest">Latest</option>
            <option value="Rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}