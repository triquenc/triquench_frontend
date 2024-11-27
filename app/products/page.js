"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import InnerPageBanner from "@/components/commonComponents/innerpagebanner";
import { useRouter } from "next/navigation";

export default function Products() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Store all products for total count
    const [sortingOption, setSortingOption] = useState("AtoZ"); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const productsPerPage = 15; // Show 15 products per page
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
        router.push(`/product/${id}`);
    };

    // Fetch all products for total count
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`https://d1w2b5et10ojep.cloudfront.net/api/product/all?category=${encodeURIComponent(activeCategory)}`);
                const data = await response.json();
                setAllProducts(data || []); // Set all products
                setProducts(data || []); // Default to showing all products
            } catch (error) {
                console.error("Error fetching all products:", error);
            }
        };

        fetchAllProducts();
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        if (activeCategory === "All Products") {
            setProducts(allProducts); // Show all products when "All Products" is selected
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
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A to Z
                break;
            case "ZtoA":
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title Z to A
                break;
            case "Popular":
                sortedProducts.sort((a, b) => b.popularity - a.popularity); // Sort by popularity (assuming `popularity` field exists)
                break;
            case "Latest":
                sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date (latest first)
                break;
            case "Rating":
                sortedProducts.sort((a, b) => b.rating - a.rating); // Sort by rating (highest first)
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
                                {/* Exclude 'All Products' from the category list */}
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
                                <div className="sorting-dropdown">
                                    <label htmlFor="sorting-options">Sort By: </label>
                                    <select
                                        id="sorting-options"
                                        value={sortingOption}
                                        onChange={(e) => setSortingOption(e.target.value)}
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
<div className="pagination flex justify-center items-center space-x-2 mt-6">
    <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
            currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
        Previous
    </button>
    {Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border rounded-md text-sm font-medium ${
                currentPage === index + 1
                    ? "bg-blue-600 text-white"  // Active page styling
                    : "bg-white text-blue-500 hover:bg-blue-100"
            }`}
        >
            {index + 1}
        </button>
    ))}
    <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md text-sm font-medium ${
            currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
    >
        Next
    </button>
</div>


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
