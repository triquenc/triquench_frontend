import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from './Products.module.scss';

export default function ProductControls({
    totalProducts,
    firstItemIndex,
    lastItemIndex,
    searchQuery,
    onSearchChange,
    sortingOption,
    onSortChange
}) {
    return (
        <div className={styles.productHeading}>
            <span className={styles.productCount}>
                Showing {firstItemIndex} - {lastItemIndex} of {totalProducts} products
            </span>
            <div className={styles.controlsWrapper}>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={onSearchChange}
                    />
                </div>
                <div className={styles.sortingDropdown}>
                    <label htmlFor="sorting-options">Sort By: </label>
                    <select
                        id="sorting-options"
                        value={sortingOption}
                        onChange={onSortChange}
                    >
                        <option value="AtoZ">A to Z</option>
                        <option value="ZtoA">Z to A</option>
                        <option value="Popular">Popular</option>
                        <option value="Latest">Latest</option>
                        <option value="Rating">Rating</option>
                    </select>
                </div>
            </div>
        </div>
    );
}