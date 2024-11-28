"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import InnerPageBanner from "@/components/commonComponents/innerpagebanner";
import { useRouter } from "next/navigation";

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor"); // Pre-selected category
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [sortingOption, setSortingOption] = useState("AtoZ");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const router = useRouter();

    const categories = [
        "CNC Spindle Motor",
        "Spindle Servo Motor", 
        "AC Servo Motor",
        "CNC Router Accessories",
        "Spindle Bearing",
        "Gearbox",
        "Spindle Accessories",
        "Laser Parts",
        "Controller",
        "Chiller",
        "Engraving Tools",
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleSeeDetailsClick = (id) => {
        router.push(/product/`${id}`);
    };

    // Fetch all products for total count
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch("https://triquench-backend.vercel.app/api/product/all");
                const data = await response.json();
                setAllProducts(data || []);
                setProducts(data || []);
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        fetchAllProducts();
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        if (activeCategory === "All Products") {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) => product.category === activeCategory
            );
            setProducts(filteredProducts);
        }
    }, [activeCategory, allProducts]);

    // Sorting products based on selected option
    useEffect(() => {
        let sortedProducts = [...products];

        switch (sortingOption) {
            case "AtoZ":
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "ZtoA":
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "Popular":
                sortedProducts.sort((a, b) => b.popularity - a.popularity);
                break;
            case "Latest":
                sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "Rating":
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setProducts(sortedProducts);
    }, [sortingOption]);

    // Get current products based on page and productsPerPage
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

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
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(category);
                                            }}
                                        >
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-listing-right">
                            <div className="product-heading">
                                <span className="product-count">
                                    Showing {currentProducts.length} of {products.length} products
                                </span>
                                <div className="sorting-dropdown" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <label htmlFor="sorting-options" style={{fontSize: '14px', color: '#333'}}>Sort By: </label>
                                    <select
                                        id="sorting-options"
                                        value={sortingOption}
                                        onChange={(e) => setSortingOption(e.target.value)}
                                        style={{
                                            padding: '8px 12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            backgroundColor: '#fff',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="AtoZ">A to Z</option>
                                        <option value="ZtoA">Z to A</option>
                                        <option value="Popular">Popular</option>
                                        <option value="Latest">Latest</option>
                                        <option value="Rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-grid">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <div key={product._id} className="product-grid-item">
                                            <div className="product-grid-inner">
                                                <div className="img-content-block">
                                                    <div className="img-block">
                                                        {product.images.map((image) => (
                                                            <Image
                                                                key={image._id}
                                                                src={image.url}
                                                                width={218}
                                                                height={218}
                                                                alt={image.alt_text || "Product Image"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p>{product.title}</p>
                                                </div>
                                                <div className="product-button-wrapper">
                                                    <a
                                                        onClick={() => handleSeeDetailsClick(product._id)}
                                                        className="border-btn"
                                                    >
                                                        See Details
                                                    </a>
                                                    <a href={product.shopNowUrl} className="site-btn">
                                                        Shop Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ margin: "auto" }}>
                                        No products found for this category.
                                    </p>
                                )}
                            </div>
{/* Pagination */}
<div className="pagination flex justify-center items-center mt-20 mb-12">
    <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn prev-next-btn"
        style={{
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
    >
        Previous
    </button>
    <div className="page-numbers flex items-center">
        {Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`pagination-btn page-num-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
                {index + 1}
            </button>
        ))}
    </div>
    <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn prev-next-btn"
        style={{
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
    >
        Next
    </button>
</div>

<style jsx>{`
    .pagination {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 60px;
        margin-bottom: 80px;
    }

    .page-numbers {
        display: flex;
        gap: 12px;
    }

    .pagination-btn {
        padding: 10px 20px;
        border: 2px solid #006098;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
        transition: all 0.3s ease;
        background: #ffffff;
        color: #006098;
        min-width: 48px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.12);
    }

    .pagination-btn:hover:not(:disabled) {
        background: #006098;
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(59,130,246,0.25);
    }

    .prev-next-btn {
        background: #006098;
        color: #ffffff;
        font-weight: 500;
        min-width: 120px;
        letter-spacing: 0.5px;
    }

    .prev-next-btn:hover:not(:disabled) {
        background: #006098;
        border-color: #2563eb;
    }

    .page-num-btn {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-num-btn.active {
        background: #006098;
        color: #ffffff;
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(59,130,246,0.3);
    }
`}</style>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}