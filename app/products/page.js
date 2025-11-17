"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import Image from "next/image";
import InnerPageBanner from "@/components/commonComponents/innerpagebanner";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import categoriesData from './categories.json';
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";


function ProductPageContent() {
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory'); 
    const subSubCategoryParam = searchParams.get('subSubcategory');

    const [activeCategory, setActiveCategory] = useState("All Products");
    const [activeSubCategory, setActiveSubCategory] = useState("");
    const [activeSubSubCategory, setActiveSubSubCategory] = useState("");

    const [expandedCategories, setExpandedCategories] = useState({});
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]); 
    const [sortingOption, setSortingOption] = useState("AtoZ");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [breadcrumb, setBreadcrumb] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const productsPerPage = 15;

    const categories = categoriesData.categories;
    const productGridRef = useRef(null);

    /**
     * Robust helper: poll for the first product image element and scroll/highlight it.
     * This will wait until elements are rendered (useful after filter change / URL replace).
     */
    const scrollToFirstProductImage = (timeoutMs = 3000, pollInterval = 150) => {
        if (typeof window === 'undefined') return;
        const start = Date.now();

        // Attempt function: find first .product-grid-item .img-block (or fallback to .product-grid)
        const attempt = () => {
            const grid = productGridRef.current || document.querySelector('.product-grid');
            if (!grid) return false;

            // Prefer first product image block
            const firstImgBlock = grid.querySelector('.product-grid-item .img-block, .product-grid-item img, .product-grid-item .product-grid-inner .img-block');
            const firstItem = grid.querySelector('.product-grid-item');

            if (firstImgBlock) {
                // Scroll grid into view first to position correctly
                try {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } catch (e) {}

                // Then scroll the specific image block into center
                try {
                    firstImgBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                } catch (e) {}

                // flash highlight on the product item (if available) for user clarity
                const target = firstItem || firstImgBlock;
                if (target) {
                    const el = target;
                    const prevTransition = el.style.transition;
                    const prevBox = el.style.boxShadow;
                    el.style.transition = 'box-shadow 0.35s ease';
                    el.style.boxShadow = '0 6px 22px rgba(0,96,152,0.18)';
                    setTimeout(() => {
                        el.style.boxShadow = prevBox || '';
                        el.style.transition = prevTransition || '';
                    }, 1600);
                }
                return true;
            }

            // If no product items yet but grid exists, scroll grid into view as fallback
            if (grid) {
                try {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } catch (e) {}
                return false;
            }
            return false;
        };

        if (attempt()) return;

        const id = setInterval(() => {
            if (attempt()) {
                clearInterval(id);
                return;
            }
            if (Date.now() - start > timeoutMs) {
                clearInterval(id);
            }
        }, pollInterval);
    };

    // legacy/mobile-focused scrollWhenReady removed restriction, keep if used elsewhere
    const scrollWhenReady = (name, timeoutMs = 3000, pollInterval = 200) => {
        if (!name) return;
        if (typeof window === 'undefined') return;

        const lowerName = name.toLowerCase();
        const start = Date.now();

        const attempt = () => {
            const items = Array.from(document.querySelectorAll('.product-grid-item'));
            for (const item of items) {
                const text = (item.innerText || item.textContent || '').toLowerCase();
                if (text.includes(lowerName)) {
                    try { item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }); } catch(e) {}
                    const prevBoxShadow = item.style.boxShadow;
                    item.style.transition = 'box-shadow 0.35s ease';
                    item.style.boxShadow = '0 6px 18px rgba(0,96,152,0.12)';
                    setTimeout(() => { item.style.boxShadow = prevBoxShadow || ''; }, 1800);
                    return true;
                }
            }
            return false;
        };

        if (attempt()) return;

        const id = setInterval(() => {
            if (attempt()) {
                clearInterval(id);
                return;
            }
            if (Date.now() - start > timeoutMs) {
                clearInterval(id);
            }
        }, pollInterval);
    };

    const fetchAllProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://triquench-backend.vercel.app/api/product/all");
            const data = await response.json();
            setAllProducts(data || []);
            
        } catch (error) {
            console.error("Error fetching all products:", error);
            setAllProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    
    useEffect(() => {
        
        fetchAllProducts();

       
        if (categorySlug && categories.length > 0) {
            const category = categories.find(cat => cat.slug === categorySlug);
            if (category) {
                
                setActiveCategory(category.name);
                
                const newBreadcrumb = [category.name];
                
                if (subCategoryParam) {
                    setActiveSubCategory(subCategoryParam);
                    newBreadcrumb.push(subCategoryParam);
                }
                if (subSubCategoryParam) {
                    setActiveSubSubCategory(subSubCategoryParam);
                    newBreadcrumb.push(subSubCategoryParam);
                }
                setBreadcrumb(newBreadcrumb);
            }
        } else {
            // No category in URL, ensure filters are reset
            setActiveCategory("All Products");
            setActiveSubCategory("");
            setActiveSubSubCategory("");
            setBreadcrumb([]);
        }
    }, [categorySlug, subCategoryParam, subSubCategoryParam, categories, fetchAllProducts]);



    const handleCategoryClick = (category, subcategory = '', subSubcategory = '') => {
        
        const categoryObj = categories.find(cat => cat.name === category);
        
        if (category === "All Products" || !categoryObj) {
            // Clicked "All Products". Reset state and update URL.
            setActiveCategory("All Products");
            setActiveSubCategory("");
            setActiveSubSubCategory("");
            setBreadcrumb([]);
            router.push('/products'); 
            // scroll product grid into view and highlight first image
            setTimeout(() => scrollToFirstProductImage(), 120);
            return;
        }

    
        
        // 1. Update active filter state
        setActiveCategory(category);
        setActiveSubCategory(subcategory);
        setActiveSubSubCategory(subSubcategory);
        
      
        const newBreadcrumb = [category];
        if (subcategory) newBreadcrumb.push(subcategory);
        if (subSubcategory) newBreadcrumb.push(subSubcategory);
        setBreadcrumb(newBreadcrumb);
        
        const params = new URLSearchParams();
        params.set('category', categoryObj.slug);
        if (subcategory) params.set('subcategory', subcategory);
        if (subSubcategory) params.set('subSubcategory', subSubcategory);
        // We use 'replace' instead of 'push' to avoid cluttering browser history
        router.replace(`/products?${params.toString()}`);
       
        // Scroll the grid into view immediately (makes UX feel snappy)
        if (productGridRef.current) {
            try { productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(e) {}
        }

        // Poll and scroll to first product image element (waits for render after filter)
        // small timeout to let React render filtered products, then poll
        setTimeout(() => {
            scrollToFirstProductImage(3500, 150);
            // also try name-based highlight if specific sub-subcategory provided
            if (subSubcategory || subcategory) {
                scrollWhenReady(subSubcategory || subcategory, 3500, 150);
            }
        }, 120);
    };
    // --- END OF MODIFICATION ---


    const toggleCategory = (categoryPath) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryPath]: !prevState[categoryPath],
        }));
    };

    // === KEEP existing behavior for See Details (internal product page) ===
    const handleSeeDetailsClick = (id) => {
        router.push(`/product/${id}`);
    };
    
    useEffect(() => {
        let filteredProducts = [...allProducts];

        // 1. Filter by Category
        if (activeCategory !== "All Products") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === activeCategory
            );

            // 2. Filter by Subcategory (if one is selected)
            if (activeSubCategory) {
                filteredProducts = filteredProducts.filter(
                    (product) => product.subcategory === activeSubCategory
                );

                // 3. Filter by Sub-Subcategory (if one is selected)
                if (activeSubSubCategory) {
                    filteredProducts = filteredProducts.filter(
                        (product) => product.subSubcategory === activeSubSubCategory
                    );
                }
            }
        }

        // 4. Filter by Search Query
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setProducts(filteredProducts);
        setCurrentPage(1); // Reset to first page on any filter change
        
    }, [activeCategory, activeSubCategory, activeSubSubCategory, allProducts, searchQuery]);
    // --- END OF MODIFICATION ---

    // Sorting (no changes)
    const sortedProducts = useMemo(() => {
        let productsToSort = [...products];
        
        switch (sortingOption) {
            case "AtoZ":
                productsToSort.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "ZtoA":
                productsToSort.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "Popular":
                productsToSort.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case "Latest":
                productsToSort.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                break;
            case "Rating":
                productsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }
        return productsToSort;
    }, [products, sortingOption]);


    // Pagination (no changes)
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (productGridRef.current && typeof window !== 'undefined') {
            const w = window.innerWidth;
            if (w > 768) {
                productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    // --- Subcategory Rendering (no changes needed, logic is correct) ---
    const renderSubcategories = (subcategories, parentCategory = '') => {
        return (
            <ul style={{ listStyle: 'none', paddingLeft: '40px', marginTop: '5px', position: 'relative' }}>
                {subcategories.map((subcategory) => {
                    const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                    const categoryPath = `${parentCategory}/${subcategoryName}`;
                    const isExpanded = expandedCategories[categoryPath];

                    if (typeof subcategory === 'string' || !subcategory.subcategories || subcategory.subcategories.length === 0) {
                        const displayName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                        return (
                            <li key={displayName} style={{ marginBottom: '5px', position: 'relative' }}>
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
                                        const pathParts = parentCategory.split('/');
                                        if (pathParts.length === 2) {
                                            const [mainCategory, subCategory] = pathParts;
                                            handleCategoryClick(mainCategory, subCategory, displayName);
                                        } else if (pathParts.length === 1) {
                                            const mainCategory = pathParts[0];
                                            handleCategoryClick(mainCategory, displayName);
                                        }
                                    }}
                                >
                                    {displayName}
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
                                            const pathParts = parentCategory.split('/');
                                            const mainCategory = pathParts[0];
                                            handleCategoryClick(mainCategory, subcategory.name);
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
                                            {subcategory.subcategories && subcategory.subcategories.length > 0 ? (
                                                <FaChevronDown
                                                    style={{
                                                        transition: 'transform 0.3s',
                                                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                                                    }}
                                                />
                                            ) : null}
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

    // --- Breadcrumb Click (no changes needed, it correctly calls handleCategoryClick) ---
    const handleBreadcrumbClick = (index) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        const category = newBreadcrumb[0];
        const subcategory = newBreadcrumb[1] || '';
        const subSubcategory = newBreadcrumb[2] || '';
        
        handleCategoryClick(category, subcategory, subSubcategory);
    };

    // --- RETURN JSX (no changes) ---
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
                                <li style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                                        <a
                                            href="#"
                                            className={`${activeCategory === 'All Products' ? 'active' : ''}`}
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
                                                handleCategoryClick("All Products");
                                            }}
                                        >
                                            All Products
                                        </a>
                                    </div>
                                </li>
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
                            <div 
                                className="product-heading"
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '20px',
                                    marginBottom: '20px'
                                }}
                            >
                                <span 
                                    className="product-count"
                                    style={{
                                        flex: '1 0 auto',
                                        fontSize: '18px', 
                                        fontWeight: '600'
                                    }}
                                >
                                    {/* Showing {currentProducts.length} of {sortedProducts.length} products */}
                                    Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
                                </span>
                                <div 
                                    className="controls-wrapper" 
                                    style={{
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '20px', 
                                        flexWrap: 'wrap',
                                        flex: '1 1 300px',
                                        maxWidth: '100%',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <div 
                                        className="search-bar" 
                                        style={{ 
                                            position: 'relative', 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            flex: '1 1 200px',
                                            minWidth: '200px'
                                        }}
                                    >
                                        <FaSearch style={{ position: 'absolute', left: '10px', color: '#888', zIndex: 1 }} />
                                        <input
                                            type="search"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{
                                                padding: '8px 12px 8px 30px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                width: '100%',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                    <div 
                                        className="sorting-dropdown" 
                                        style={{
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px',
                                            flex: '0 0 auto'
                                        }}
                                    >
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
                                        justifyContent: "right",
                                        flexWrap: "wrap"
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
                                                    }}
                                                    onMouseOver={(e) => { 
                                                        if (index !== breadcrumb.length - 1) {
                                                            e.target.style.color = '#006098';
                                                            e.target.style.textDecoration = 'underline';
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (index !== breadcrumb.length - 1) {
                                                            e.target.style.color = '#666';
                                                            e.target.style.textDecoration = 'none';
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

                            <div className="product-grid" ref={productGridRef}>
                                {isLoading ? (
                                   <SimpleSpinner/>
                                ) : currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className="product-grid-item"
                                            onClick={() => handleSeeDetailsClick(product._id)}
                                            style={{ cursor: 'pointer' }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSeeDetailsClick(product._id); }}
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
                                                <div className="product-button-wrapper">
                                                    <a
                                                        onClick={(e) => { e.stopPropagation(); handleSeeDetailsClick(product._id); }}
                                                        className="border-btn"
                                                        style={{ cursor: 'pointer' }}
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
                                    <p style={{ margin: "auto", textAlign: "center", padding: "40px" }}>
                                        No products found.
                                    </p>
                                )}
                            </div>

                            {/* Pagination */}
                            {!isLoading && totalPages > 1 && (
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
                                        }}
                                    >
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNum = index + 1;
                                            const showPage = pageNum === 1 || 
                                                             pageNum === totalPages ||
                                                             (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

                                            if (!showPage) {
                                                if (pageNum === 2 && currentPage > 4) {
                                                    return <span key="ellipsis-start" style={{ color: '#666', fontSize: '16px', margin: '0 5px' }}>...</span>;
                                                }
                                                if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                                                    return <span key="ellipsis-end" style={{ color: '#666', fontSize: '16px', margin: '0 5px' }}>...</span>;
                                                }
                                                return null;
                                            }

                                            return (
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
                                                        cursor: 'pointer', 
                                                    }}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
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
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// This wrapper component is REQUIRED for useSearchParams to work
export default function Products() {
    return (
        <Suspense fallback={<SimpleSpinner />}>
            <ProductPageContent />
        </Suspense>
    );
}
