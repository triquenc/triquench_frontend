"use client";
import React from 'react';
import Image from "next/image";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";

export default function ProductGrid({ products, isLoading, onProductClick, gridRef }) {
  return (
    <div className="product-grid" ref={gridRef}>
      {isLoading ? (
        <SimpleSpinner />
      ) : products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="product-grid-item"
            onClick={() => onProductClick(product._id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onProductClick(product._id); }}
          >
            <div className="product-grid-inner">
              <div className="img-content-block">
                <div className="img-block">
                  {Array.isArray(product.images) && product.images.length > 0 ? (
                    product.images.map((image) => (
                      <Image
                        key={image._id || image.url}
                        src={image.url}
                        width={218}
                        height={218}
                        alt={image.alt_text || product.title + " - Triquench India"}
                      />
                    ))
                  ) : (
                    <Image
                      src="https://res.cloudinary.com/dd1na5drh/image/upload/v1734679442/IMG_2915_uxq8np.png"
                      width={218}
                      height={218}
                      alt={product.title || "Product Image Placeholder"}
                    />
                  )}
                </div>
                <h3>{product.title}</h3>
              </div>
              <div className="product-button-wrapper">
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
        ))
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
}