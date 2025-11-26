"use client";
import React from 'react';

export default function ProductBreadcrumbs({ breadcrumb, onBreadcrumbClick }) {
  if (breadcrumb.length === 0) return null;

  return (
    <div className="breadcrumb-wrapper">
      <div className="breadcrumb-inner">
        {breadcrumb.map((item, index) => (
          <span key={index}>
            {index > 0 && <span className="separator">/</span>}
            <span
              className={`crumb-link ${index === breadcrumb.length - 1 ? 'current' : 'active'}`}
              onClick={() => onBreadcrumbClick(index)}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}