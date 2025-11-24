import React from "react";
import Image from "next/image";
import styles from './Products.module.scss';

export default function ProductCard({ product, onProductClick }) {
    return (
        <div
            className={styles.productGridItem}
            onClick={() => onProductClick(product._id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onProductClick(product._id); }}
        >
            <div className={styles.productGridInner}>
                <div className={styles.imgContentBlock}>
                    <div className={styles.imgBlock}>
                        {Array.isArray(product.images) && product.images.length > 0 ? (
                            product.images.map((image) => (
                                <Image
                                    key={image._id || image.url}
                                    src={image.url}
                                    width={218}
                                    height={218}
                                    alt={image.alt_text || product.title || "Product Image"}
                                />
                            ))
                        ) : (
                            <Image
                                src="https://res.cloudinary.com/dd1na5drh/image/upload/v1734679442/IMG_2915_uxq8np.png" 
                                width={218}
                                height={218}
                                alt={product.title || "Product Image"}
                            />
                        )}
                    </div>
                    <p>{product.title}</p>
                </div>
                <div className={styles.productButtonWrapper}>
                    <a
                        onClick={(e) => { e.stopPropagation(); onProductClick(product._id); }}
                        className="border-btn"
                    >
                        See Details
                    </a>
                    <a
                        href={product.shopNowUrl}
                        onClick={(e) => e.stopPropagation()}
                        className="site-btn"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
}