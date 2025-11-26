"use client";
import React from 'react';
import { FaChevronDown } from "react-icons/fa";

export default function ProductSidebar({ 
  categories, 
  activeCategory, 
  expandedCategories, 
  onToggleCategory, 
  onCategoryClick 
}) {
  const renderSubcategories = (subcategories, parentCategory = '') => {
    return (
      <ul className="subcategory-list">
        {subcategories.map((subcategory) => {
          const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
          const categoryPath = `${parentCategory}/${subcategoryName}`;
          const isExpanded = expandedCategories[categoryPath];

          if (typeof subcategory === 'string' || !subcategory.subcategories || subcategory.subcategories.length === 0) {
            const displayName = typeof subcategory === 'string' ? subcategory : subcategory.name;
            return (
              <li key={displayName}>
                <span className="tree-line"></span>
                <a 
                  href="#" 
                  className="sidebar-link" 
                  onClick={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    const pathParts = parentCategory.split('/');
                    if (pathParts.length === 2) {
                       onCategoryClick(pathParts[0], pathParts[1], displayName);
                    } else if (pathParts.length === 1) {
                       onCategoryClick(pathParts[0], displayName);
                    }
                  }}
                >
                  {displayName}
                </a>
              </li>
            );
          } else {
            return (
              <li key={subcategory.name}>
                <a 
                  href="#" 
                  className={`sidebar-link ${isExpanded ? 'active' : ''}`} 
                  onClick={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    onCategoryClick(parentCategory.split('/')[0], subcategory.name);
                  }}
                >
                  {subcategory.name}
                  <div className="icon-wrap" onClick={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    onToggleCategory(categoryPath);
                  }}>
                    <FaChevronDown className={isExpanded ? 'rotate' : ''} />
                  </div>
                </a>
                {isExpanded && subcategory.subcategories && 
                  renderSubcategories(subcategory.subcategories, categoryPath)}
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="product-listing-left">
      <span className="filter-title">Filters</span>
      <ul>
        <li>
          <a
            href="#"
            className={`sidebar-link ${activeCategory === 'All Products' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onCategoryClick("All Products"); }}
          >
            All Products
          </a>
        </li>
        {categories.map((category) => (
          <li key={category.name}>
            <a
              href="#"
              className={`sidebar-link ${activeCategory === category.name ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onCategoryClick(category.name); }}
            >
              {category.name}
              <div
                className="icon-wrap"
                onClick={(e) => {
                  e.preventDefault(); e.stopPropagation();
                  onToggleCategory(category.name);
                }}
              >
                <FaChevronDown className={expandedCategories[category.name] ? 'rotate' : ''} />
              </div>
            </a>
            {expandedCategories[category.name] && category.subcategories && 
              renderSubcategories(category.subcategories, category.name)}
          </li>
        ))}
      </ul>
    </div>
  );
}
