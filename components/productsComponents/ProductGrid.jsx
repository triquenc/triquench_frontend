import React from "react";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";
import ProductCard from "./ProductCard";
import styles from './Products.module.scss';

// Use React.forwardRef to pass the ref down to the div
const ProductGrid = React.forwardRef(({ products, isLoading, onProductClick }, ref) => {
    return (
        <div className={styles.productGrid} ref={ref}>
            {isLoading ? (
                <SimpleSpinner />
            ) : products.length > 0 ? (
                products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onProductClick={onProductClick}
                    />
                ))
            ) : (
                <p className={styles.noProductsFound}>
                    No products found.
                </p>
            )}
        </div>
    );
});

// Set display name for React DevTools
ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;