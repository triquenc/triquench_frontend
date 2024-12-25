"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import InnerPageBanner from "@/components/commonComponents/innerpagebanner";
//import { useRouter } from "next/compat/router";
import { useRouter } from "next/navigation";
import { FaSearch, FaChevronDown } from "react-icons/fa"; // Import the search and dropdown icons
import categoriesData from './categories.json';

export default function Products() {
    const [categorySlug, setCategorySlug] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setCategorySlug(searchParams.get('category'));
    }, []);

    const [activeCategory, setActiveCategory] = useState("All Products"); // Pre-selected category
    const [expandedCategories, setExpandedCategories] = useState({});
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [sortingOption, setSortingOption] = useState("AtoZ");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [breadcrumb, setBreadcrumb] = useState([]);
    const productsPerPage = 15;
    const router = useRouter();

    const categories = categoriesData.categories;

    useEffect(() => {
        if (categorySlug && categories.length > 0) {
            const category = categories.find(cat => cat.slug === categorySlug);
            if (category) {
                setActiveCategory(category.name);
                fetchCategoryData(category.name);
            }
        }
    }, [categorySlug, categories]);

    const handleCategoryClick = (category, subcategory = '', subSubcategory = '') => {
        console.log("Category clicked:", { category, subcategory, subSubcategory });
        setActiveCategory(category);
        setCurrentPage(1);
        window.scrollTo({ top: 500, behavior: 'smooth' });
        
        const newBreadcrumb = [category];
        if (subcategory) newBreadcrumb.push(subcategory);
        if (subSubcategory) newBreadcrumb.push(subSubcategory);
        setBreadcrumb(newBreadcrumb);
        
        fetchCategoryData(category, subcategory, subSubcategory);
    };

    const toggleCategory = (categoryPath) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryPath]: !prevState[categoryPath],
        }));
    };

    const fetchCategoryData = async (category, subcategory = '', subSubcategory = '') => {
        try {
            let url = `https://d1w2b5et10ojep.cloudfront.net/api/product/category/${encodeURIComponent(category)}`;
            
            // Add query parameters
            const params = new URLSearchParams();
            if (subcategory) params.append('subcategory', subcategory);
            if (subSubcategory) params.append('subSubcategory', subSubcategory);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }

            console.log("Fetching URL:", url);
            console.log("Parameters:", { category, subcategory, subSubcategory });
            
            const response = await fetch(url);
            const data = await response.json();
            console.log("Received data:", data);
            
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching category data:", error);
            setProducts([]);
        }
    };

    const handleSeeDetailsClick = (id) => {
        router.push(`/product/${id}`);
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

    // Filter products based on category and search
    useEffect(() => {
        let filteredProducts = [...allProducts];
        
        // Apply category filter
        if (activeCategory !== "All Products") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === activeCategory
            );
        }

        // Apply search filter
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setProducts(filteredProducts);
    }, [activeCategory, allProducts, searchQuery]);

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
        window.scrollTo({ top: 500, behavior: 'smooth' }); // Scroll to top
    };

    // Calculate total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    const renderSubcategories = (subcategories, parentCategory = '') => {
        return (
            <ul style={{ listStyle: 'none', paddingLeft: '40px', marginTop: '5px', position: 'relative' }}>
                {subcategories.map((subcategory) => {
                    const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                    const categoryPath = `${parentCategory}/${subcategoryName}`;
                    const isExpanded = expandedCategories[categoryPath];

                    if (typeof subcategory === 'string') {
                        return (
                            <li key={subcategory} style={{ marginBottom: '5px', position: 'relative' }}>
                                <span style={{
                                    position: 'absolute',
                                    left: '-15px',
                                    top: '50%',
                                    width: '10px',
                                    height: '1px',
                                    backgroundColor: '#ddd'
                                }}></span>
                                <a
                                    href="#"
                                    style={{ 
                                        color: '#006098',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.3s',
                                        display: 'block',
                                        padding: '8px 16px'
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        // Extract category hierarchy from path
                                        const [mainCategory, subCategory] = parentCategory.split('/');
                                        handleCategoryClick(mainCategory, subCategory, subcategory);
                                    }}
                                >
                                    {subcategory}
                                </a>
                            </li>
                        );
                    } else {
                        return (
                            <li key={subcategory.name} style={{ marginBottom: '5px', position: 'relative' }}>
                                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                                    <a
                                        href="#"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#006098',
                                            backgroundColor: isExpanded ? '#f1fafe' : '',
                                            borderColor: isExpanded ? '#f1fafe' : '',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'color 0.3s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            width: '100%'
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Extract category hierarchy from path
                                            const [mainCategory] = parentCategory ? parentCategory.split('/') : [parentCategory];
                                            handleCategoryClick(mainCategory || subcategory.name, subcategory.name);
                                        }}
                                    >
                                        {subcategory.name}
                                        <div
                                            style={{
                                                marginLeft: 'auto',
                                                cursor: 'pointer'
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleCategory(categoryPath);
                                            }}
                                        >
                                            <FaChevronDown
                                                style={{
                                                    transition: 'transform 0.3s',
                                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                                }}
                                            />
                                        </div>
                                    </a>
                                </div>
                                {isExpanded && subcategory.subcategories && 
                                    renderSubcategories(subcategory.subcategories, categoryPath)}
                            </li>
                        );
                    }
                })}
            </ul>
        );
    };

    // Add this function to handle breadcrumb navigation
    const handleBreadcrumbClick = (index) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        setBreadcrumb(newBreadcrumb);
        
        // Get the category info based on clicked breadcrumb level
        const category = newBreadcrumb[0];
        const subcategory = newBreadcrumb[1] || '';
        const subSubcategory = newBreadcrumb[2] || '';
        
        // Update active category and fetch data
        setActiveCategory(category);
        fetchCategoryData(category, subcategory, subSubcategory);
    };

    return (
        <div>
             <InnerPageBanner
                title="OUR PRODUCTS"
                subtitle="CATALOGUE"
                paragraph="In India, Known for our Active and Dynamic Customer Service Practices and catering to a broad assortment of product categories"
                bannerImage="https://res.cloudinary.com/dd1na5drh/image/upload/v1734679442/IMG_2915_uxq8np.png"
                className="product-banner"
                buttonText="Shop Now"
                buttonUrl="/products"
            />
            <section className="product-listing">
                <div className="container">
                    <div className="product-listing-grid">
                        <div className="product-listing-left">
                            <span className="filter-title">Filters</span>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {categories.map((category) => (
                                    <li key={category.name} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                                            <a
                                                href="#"
                                                className={`${activeCategory === category.name ? 'active' : ''}`}
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: '#006098',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.3s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    width: '100%'
                                                }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCategoryClick(category.name);
                                                }}
                                            >
                                                {category.name}
                                                <div
                                                    style={{
                                                        marginLeft: 'auto',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleCategory(category.name);
                                                    }}
                                                >
                                                    <FaChevronDown
                                                        style={{
                                                            transition: 'transform 0.3s',
                                                            transform: expandedCategories[category.name] ? 'rotate(180deg)' : 'rotate(0deg)'
                                                        }}
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                        {expandedCategories[category.name] && category.subcategories && renderSubcategories(category.subcategories, category.name)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-listing-right">
                            <div className="product-heading">
                                <span className="product-count">
                                    Showing {currentProducts.length} of {products.length} products
                                </span>
                                <div className="controls-wrapper" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                    <div className="search-bar" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <FaSearch style={{ position: 'absolute', left: '10px', color: '#888' }} />
                                        <input
                                            type="search"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                padding: '8px 12px 8px 30px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                width: '250px',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
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
                            </div>
                            {breadcrumb.length > 0 && (
                                <div style={{
                                    padding: '10px 0',
                                    marginTop: '10px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: '#666',
                                        fontSize: '14px',
                                        justifyContent: "right"
                                    }}>
                                        {breadcrumb.map((item, index) => (
                                            <span key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                                {index > 0 && <span style={{ margin: '0 8px', color: '#999' }}>/</span>}
                                                <span 
                                                    onClick={() => handleBreadcrumbClick(index)}
                                                    style={{ 
                                                        color: index === breadcrumb.length - 1 ? '#006098' : '#666',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.3s ease',
                                                        '&:hover': {
                                                            color: '#006098',
                                                            textDecoration: 'underline'
                                                        }
                                                    }}
                                                >
                                                    {item}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="product-grid">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <div key={product._id} className="product-grid-item">
                                            <div className="product-grid-inner">
                                                <div className="img-content-block">
                                                    <div className="img-block" onClick={() => handleSeeDetailsClick(product._id)}>
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
                            <div 
                                className="pagination" 
                                style={{
                                    width: '100%',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '20px',
                                    gap: '10px',
                                    marginTop: '60px',
                                    marginBottom: '80px'
                                }}
                            >
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '10px 15px',
                                        border: '2px solid #006098',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        background: '#006098',
                                        color: '#ffffff',
                                        opacity: currentPage === 1 ? 0.5 : 1,
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        minWidth: '100px',
                                        '@media (max-width: 600px)': {
                                            minWidth: '80px',
                                            padding: '8px 12px',
                                            fontSize: '12px'
                                        }
                                    }}
                                >
                                    Previous
                                </button>

                                <div 
                                    className="page-numbers" 
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px',
                                        '@media (max-width: 600px)': {
                                            gap: '4px'
                                        }
                                    }}
                                >
                                    {Array.from({ length: totalPages }, (_, index) => {
                                        const pageNum = index + 1;
                                        const showPage = pageNum === 1 || 
                                                    pageNum === totalPages ||
                                                    Math.abs(currentPage - pageNum) <= 2 ||
                                                    (currentPage <= 4 && pageNum <= 5) ||
                                                    (currentPage >= totalPages - 3 && pageNum >= totalPages - 4);

                                        if (!showPage && (pageNum === 2 || pageNum === totalPages - 1)) {
                                            return (
                                                <span 
                                                    key={`ellipsis-${index}`} 
                                                    style={{
                                                        color: '#666',
                                                        fontSize: '16px',
                                                        margin: '0 5px',
                                                        '@media (max-width: 600px)': {
                                                            fontSize: '14px'
                                                        }
                                                    }}
                                                >
                                                    ...
                                                </span>
                                            );
                                        }

                                        return showPage ? (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                style={{
                                                    padding: '10px 15px',
                                                    border: '2px solid #006098',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    transition: 'all 0.3s ease',
                                                    background: currentPage === pageNum ? '#006098' : '#ffffff',
                                                    color: currentPage === pageNum ? '#ffffff' : '#006098',
                                                    minWidth: '48px',
                                                    boxShadow: currentPage === pageNum 
                                                        ? '0 4px 8px rgba(59,130,246,0.3)' 
                                                        : '0 3px 6px rgba(0,0,0,0.12)',
                                                    transform: currentPage === pageNum ? 'scale(1.1)' : 'scale(1)',
                                                    '@media (max-width: 600px)': {
                                                        padding: '8px 12px',
                                                        fontSize: '12px',
                                                        minWidth: '40px'
                                                    }
                                                }}
                                            >
                                                {pageNum}
                                            </button>
                                        ) : null;
                                    })}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '10px 15px',
                                        border: '2px solid #006098',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        background: '#006098',
                                        color: '#ffffff',
                                        opacity: currentPage === totalPages ? 0.5 : 1,
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        minWidth: '100px',
                                        '@media (max-width: 600px)': {
                                            minWidth: '80px',
                                            padding: '8px 12px',
                                            fontSize: '12px'
                                        }
                                    }}
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

