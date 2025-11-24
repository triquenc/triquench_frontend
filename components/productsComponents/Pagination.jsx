import React from "react";
import styles from './Products.module.scss';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                Previous
            </button>

            <div className={styles.pageNumbers}>
                {pageNumbers.map((pageNum) => {
                    const showPage = pageNum === 1 || 
                                     pageNum === totalPages ||
                                     (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

                    if (!showPage) {
                        if (pageNum === 2 && currentPage > 4) {
                            return <span key="ellipsis-start" className={styles.paginationEllipsis}>...</span>;
                        }
                        if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                            return <span key="ellipsis-end" className={styles.paginationEllipsis}>...</span>;
                        }
                        return null;
                    }

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`${styles.paginationButton} ${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                Next
            </button>
        </div>
    );
}