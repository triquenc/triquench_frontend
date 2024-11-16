"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import InnerPageBanner from '@/components/commonComponents/innerpagebanner';
import { useRouter } from 'next/navigation';

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor");
    const [products, setProducts] = useState([]);
    const router = useRouter();

    const categories = [
        'CNC Spindle Motor',
        'Spindle Servo Motor',
        'AC Servo Motor',
        'CNC Router Accessories',
        'Spindle Bearing',
        'Gearbox',
        'Spindle Accessories',
        'Laser Parts',
        'Controller',
        'Chiller',
        'Engraving Tools'
    ];

    const handleCategoryClick = (category) => {
        event.preventDefault();
        setActiveCategory(category);
    };

    const handleSeeDetailsClick = (id) => {
        // Programmatically navigate to the product detail page
        router.push(`/product/${id}`);
    };

    // Fetch products based on selected category
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://triquench-backend.vercel.app/api/product/all?category=${encodeURIComponent(activeCategory)}`);
                const data = await response.json();
                setProducts(data || []); // Assuming the data is an array of products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [activeCategory]); // Re-fetch when the category changes

    return (
        <div>
            <InnerPageBanner
                title="OUR PRODUCTS"
                subtitle="CATALOGUE"
                paragraph="In India, Known for our Active and Dynamic Customer Service Practices and catering to a broad assortment of product categories"
                bannerImage="/images/product-banner.png"
                className="product-banner"
                buttonText="Shop Now"
                buttonUrl="/product"
            />
            <section className="product-listing">
                <div className="container">
                    <div className="product-listing-grid">
                        <div className="product-listing-left">
                            <span className="filter-title">Filters</span>
                            <ul>
                                {categories.map((category) => (
                                    <li key={category}>
                                        <a
                                            href="#"
                                            className={activeCategory === category ? "active" : ""}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-listing-right">
                            <div className="product-heading">
                                <span className="product-count">{products.length} products</span>
                            </div>
                            <div className="product-grid">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <div key={product?._id} className="product-grid-item">
                                            <div className="product-grid-inner">
                                                <div className="img-content-block">
                                                    <div className="img-block">
                                                        {/* Loop through the product images */}
                                                        {product.images.map((image, index) => (
                                                            <Image
                                                                key={image._id}
                                                                src={image?.url}
                                                                width={218}
                                                                height={218}
                                                                alt={image?.alt_text || "Product Image"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>{product.title}</p>
                                                </div>
                                                <div className="product-button-wrapper">
            {/* See Details button with programmatic navigation */}
            <a onClick={()=>handleSeeDetailsClick(product?._id)} className="border-btn">
                See Details
            </a>
            
            {/* Shop Now button with normal link */}
            <a href={product?.shopNowUrl} className="site-btn">Shop Now</a>
        </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{
                                        margin: "auto"
                                    }}>No products found for this category.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
