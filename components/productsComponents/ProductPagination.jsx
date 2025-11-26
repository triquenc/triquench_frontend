"use client";
import React from 'react';

export default function ProductPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        Previous
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          const showPage = pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

          if (!showPage) {
            if (pageNum === 2 && currentPage > 4) {
              return <span key="ellipsis-start">...</span>;
            }
            if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
              return <span key="ellipsis-end">...</span>;
            }
            return null;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={currentPage === pageNum ? 'active' : ''}
              aria-label={`Go to page ${pageNum}`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}