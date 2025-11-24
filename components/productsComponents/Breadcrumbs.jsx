import React from "react";
import styles from './Products.module.scss'

export default function Breadcrumbs({ breadcrumb, onBreadcrumbClick }) {
    return (
        <div className={styles.breadcrumbContainer}>
            <div className={styles.breadcrumb}>
                {breadcrumb.map((item, index) => (
                    <span key={index} className={styles.breadcrumbItem}>
                        {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                        <span
                            onClick={() => onBreadcrumbClick(index)}
                            className={index === breadcrumb.length - 1 ? styles.breadcrumbActive : styles.breadcrumbLink}
                        >
                            {item}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}