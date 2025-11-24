import React from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from './Products.module.scss'
// This recursive function lives inside the component that uses it
function renderSubcategories(subcategories, parentCategory, onCategoryClick, onToggleCategory, expandedCategories) {
    return (
        <ul className={styles.filterSublist}>
            {subcategories.map((subcategory) => {
                const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                const categoryPath = `${parentCategory}/${subcategoryName}`;
                const isExpanded = expandedCategories[categoryPath];

                // Item is just a string (final leaf)
                if (typeof subcategory === 'string' || !subcategory.subcategories || subcategory.subcategories.length === 0) {
                    const displayName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                    return (
                        <li key={displayName} className={styles.filterSubItem}>
                            <a
                                href="#"
                                className={styles.filterSubLink}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const pathParts = parentCategory.split('/');
                                    if (pathParts.length === 2) {
                                        const [mainCategory, subCategory] = pathParts;
                                        onCategoryClick(mainCategory, subCategory, displayName);
                                    } else if (pathParts.length === 1) {
                                        const mainCategory = pathParts[0];
                                        onCategoryClick(mainCategory, displayName);
                                    }
                                }}
                            >
                                {displayName}
                            </a>
                        </li>
                    );
                } else {
                    // Item is an object with its own subcategories
                    return (
                        <li key={subcategory.name} className={styles.filterSubItem}>
                            <div className={styles.filterSubcategoryToggle}>
                                <a
                                    href="#"
                                    className={styles.filterSubLinkBold}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const pathParts = parentCategory.split('/');
                                        const mainCategory = pathParts[0];
                                        onCategoryClick(mainCategory, subcategory.name);
                                    }}
                                >
                                    {subcategory.name}
                                    <div
                                        className={styles.filterChevronWrapper}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onToggleCategory(categoryPath);
                                        }}
                                    >
                                        <FaChevronDown
                                            className={`${styles.filterChevron} ${isExpanded ? styles.expanded : ''}`}
                                        />
                                    </div>
                                </a>
                            </div>
                            {isExpanded && subcategory.subcategories && 
                                renderSubcategories(subcategory.subcategories, categoryPath, onCategoryClick, onToggleCategory, expandedCategories)}
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default function FilterSidebar({ categories, activeCategory, expandedCategories, onCategoryClick, onToggleCategory }) {
    return (
        <>
            <span className={styles.filterTitle}>Filters</span>
            <ul className={styles.filterList}>
                <li className={styles.filterItem}>
                    <div className={styles.filterCategoryToggle}>
                        <a
                            href="#"
                            className={`${styles.filterLink} ${activeCategory === 'All Products' ? styles.active : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onCategoryClick("All Products");
                            }}
                        >
                            All Products
                        </a>
                    </div>
                </li>
                {categories.map((category) => {
                    const isExpanded = expandedCategories[category.name];
                    return (
                        <li key={category.name} className={styles.filterItem}>
                            <div className={styles.filterCategoryToggle}>
                                <a
                                    href="#"
                                    className={`${styles.filterLink} ${activeCategory === category.name ? styles.active : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onCategoryClick(category.name);
                                    }}
                                >
                                    {category.name}
                                    <div
                                        className={styles.filterChevronWrapper}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onToggleCategory(category.name);
                                        }}
                                    >
                                        <FaChevronDown
                                            className={`${styles.filterChevron} ${isExpanded ? styles.expanded : ''}`}
                                        />
                                    </div>
                                </a>
                            </div>
                            {isExpanded && category.subcategories && 
                                renderSubcategories(category.subcategories, category.name, onCategoryClick, onToggleCategory, expandedCategories)}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}