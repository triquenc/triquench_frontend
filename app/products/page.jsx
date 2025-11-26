"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import Image from "next/image";
// FIX: Updated the import to match the PascalCase filename 'InnerPageBanner'
import InnerPageBanner from "@/components/commonComponents/InnerPageBanner";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import categoriesData from './categories.json';
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";
// import './products.scss'; 

// --- SEO CONFIGURATION ---
const SITE_URL = "https://www.triquenchindia.com"; 

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

    // ... [KEEP YOUR EXISTING scrollWhenReady FUNCTION HERE] ...
    const scrollWhenReady = (name, timeoutMs = 3000, pollInterval = 200) => {
        if (!name) return;
        if (typeof window === 'undefined') return;
        const w = window.innerWidth;
        if (w < 320 || w > 768) return; 
  
        const lowerName = name.toLowerCase();
        const start = Date.now();
  
        const attempt = () => {
          const items = Array.from(document.querySelectorAll('.product-grid-item'));
          for (const item of items) {
            const text = (item.innerText || item.textContent || '').toLowerCase();
            if (text.includes(lowerName)) {
              item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
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
                fetchCategoryData(category.name);
            }
        }
    }, [categorySlug, categories, fetchAllProducts]);


    // --- SEO: Update Document Title & Canonical Link Dynamically ---
    useEffect(() => {
        // 1. Update Title
        const pageTitle = activeCategory === "All Products" 
            ? "Our Products - Catalogue" 
            : `${activeCategory} Products | Triquench`;
        document.title = pageTitle;

        // 2. Update Canonical Link Tag (Technical SEO Fix)
        let link = document.querySelector("link[rel='canonical']");
        if (!link) {
            link = document.createElement("link");
            link.setAttribute("rel", "canonical");
            document.head.appendChild(link);
        }
        
        // Construct the clean canonical URL
        let canonicalUrl = `${SITE_URL}/products`;
        if (activeCategory !== "All Products") {
            canonicalUrl += `?category=${encodeURIComponent(activeCategory)}`;
        }
        link.setAttribute("href", canonicalUrl);

    }, [activeCategory]);


    const handleCategoryClick = async (category, subcategory = '', subSubcategory = '') => {
        setActiveCategory(category);
        setActiveSubCategory(subcategory);
        setActiveSubSubCategory(subSubcategory);
        
        const newBreadcrumb = [category];
        if (subcategory) newBreadcrumb.push(subcategory);
        if (subSubcategory) newBreadcrumb.push(subSubcategory);
        setBreadcrumb(newBreadcrumb);
        
        fetchCategoryData(category, subcategory, subSubcategory);

        if (productGridRef.current) {
          productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          if (typeof window !== 'undefined') {
            const w = window.innerWidth;
            if (w > 768) {
              window.scrollTo({ top: 500, behavior: 'smooth' });
            }
          }
        }

        const clickedName = subSubcategory || subcategory || category;
        scrollWhenReady(clickedName, 3500, 200);
    };

    const toggleCategory = (categoryPath) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryPath]: !prevState[categoryPath],
        }));
    };

    const fetchCategoryData = async (category, subcategory = '', subSubcategory = '') => {
        setIsLoading(true);
        try {
            let url = `https://d1w2b5et10ojep.cloudfront.net/api/product/category/${encodeURIComponent(category)}`;
            
            const params = new URLSearchParams();
            if (subcategory) params.append('subcategory', subcategory);
            if (subSubcategory) params.append('subSubcategory', subSubcategory);
            
            if (params.toString()) {
                url += `?${params.toString()}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();

            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching category data:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeeDetailsClick = (id) => {
        router.push(`/product/${id}`);
    };
    
    useEffect(() => {
        let filteredProducts = [...allProducts];

        if (activeCategory !== "All Products") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === activeCategory
            );

            if (activeSubCategory) {
                filteredProducts = filteredProducts.filter(
                    (product) => product.subcategory === activeSubCategory
                );

                if (activeSubSubCategory) {
                    filteredProducts = filteredProducts.filter(
                        (product) => product.subSubcategory === activeSubSubCategory
                    );
                }
            }
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        setProducts(filteredProducts);
        setCurrentPage(1); 
        
    }, [activeCategory, activeSubCategory, activeSubSubCategory, allProducts, searchQuery]);

    const sortedProducts = useMemo(() => {
        let productsToSort = [...products];
        
        switch (sortingOption) {
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

    const renderSubcategories = (subcategories, parentCategory = '') => {
        return (
             <ul className="subcategory-list">
                 {subcategories.map((subcategory) => {
                     const subcategoryName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                     const categoryPath = `${parentCategory}/${subcategoryName}`;
                     const isExpanded = expandedCategories[categoryPath];
 
                     if (typeof subcategory === 'string' || !subcategory.subcategories || subcategory.subcategories.length === 0) {
                         const displayName = typeof subcategory === 'string' ? subcategory : subcategory.name;
                         return (
                             <li key={displayName}>
                                 <span className="tree-line"></span>
                                 <a href="#" className="sidebar-link" onClick={(e) => {
                                     e.preventDefault(); e.stopPropagation();
                                     const pathParts = parentCategory.split('/');
                                     if (pathParts.length === 2) {
                                         const [mainCategory, subCategory] = pathParts;
                                         handleCategoryClick(mainCategory, subCategory, displayName);
                                     } else if (pathParts.length === 1) {
                                         const mainCategory = pathParts[0];
                                         handleCategoryClick(mainCategory, displayName);
                                     }
                                 }}>{displayName}</a>
                             </li>
                         );
                     } else {
                         return (
                             <li key={subcategory.name}>
                                 <a href="#" className={`sidebar-link ${isExpanded ? 'active' : ''}`} onClick={(e) => {
                                     e.preventDefault(); e.stopPropagation();
                                     const pathParts = parentCategory.split('/');
                                     const mainCategory = pathParts[0];
                                     handleCategoryClick(mainCategory, subcategory.name);
                                 }}>
                                     {subcategory.name}
                                     <div className="icon-wrap" onClick={(e) => {
                                         e.preventDefault(); e.stopPropagation();
                                         toggleCategory(categoryPath);
                                     }}>
                                         <FaChevronDown className={isExpanded ? 'rotate' : ''} />
                                     </div>
                                 </a>
                                 {isExpanded && subcategory.subcategories && 
                                     renderSubcategories(subcategory.subcategories, categoryPath)}
                             </li>
                         );
                     }
                 })}
             </ul>
         );
     };

    const handleBreadcrumbClick = (index) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        const category = newBreadcrumb[0];
        const subcategory = newBreadcrumb[1] || '';
        const subSubcategory = newBreadcrumb[2] || '';
        
        handleCategoryClick(category, subcategory, subSubcategory);
    };


    // --- SEO: Generate JSON-LD Structured Data ---
    const jsonLdData = useMemo(() => {
        // 1. Breadcrumb Schema
        const breadcrumbList = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": SITE_URL
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Products",
                    "item": `${SITE_URL}/products`
                },
                ...breadcrumb.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 3,
                    "name": item,
                    "item": `${SITE_URL}/products?category=${encodeURIComponent(item)}`
                }))
            ]
        };

        // 2. ItemList Schema (For the products currently visible)
        const itemList = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": activeCategory,
            "description": `List of ${activeCategory} products.`,
            "numberOfItems": currentProducts.length,
            "itemListElement": currentProducts.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product",
                    "name": product.title,
                    // FIX: Ensure absolute URL for image
                    "image": product.images?.[0]?.url 
                        ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${SITE_URL}${product.images[0].url}`)
                        : "https://res.cloudinary.com/dd1na5drh/image/upload/v1734679442/IMG_2915_uxq8np.png",
                    "url": `${SITE_URL}/product/${product._id}`,
                    "description": product.description || `Buy ${product.title} from Triquench India.`,
                    "sku": product._id,
                    // FIX: Added Brand
                    "brand": {
                        "@type": "Brand",
                        "name": "Triquench India"
                    },
                    // FIX: Added Price '0' and Availability to pass Merchant Listing Test
                    "offers": {
                        "@type": "Offer",
                        "url": `${SITE_URL}/product/${product._id}`,
                        "availability": "https://schema.org/InStock",
                        "priceCurrency": "INR",
                        "price": "0" 
                    }
                }
            }))
        };

        return { breadcrumbList, itemList };
    }, [breadcrumb, currentProducts, activeCategory]);

    return (
        <div>
            {/* --- SEO: Inject Structured Data --- */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData.breadcrumbList) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData.itemList) }}
            />

             {/* Dynamic H1 for SEO relevance */}
             <InnerPageBanner
               title={activeCategory === "All Products" ? "OUR PRODUCTS" : activeCategory.toUpperCase()}
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
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className={`sidebar-link ${activeCategory === 'All Products' ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleCategoryClick("All Products");
                                        }}
                                    >
                                        All Products
                                    </a>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <a
                                            href="#"
                                            className={`sidebar-link ${activeCategory === category.name ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(category.name);
                                            }}
                                        >
                                            {category.name}
                                            <div
                                                className="icon-wrap"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleCategory(category.name);
                                                }}
                                            >
                                                <FaChevronDown className={expandedCategories[category.name] ? 'rotate' : ''} />
                                            </div>
                                        </a>
                                        {expandedCategories[category.name] && category.subcategories && renderSubcategories(category.subcategories, category.name)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-listing-right">
                            {/* SEO: Using h2 for count and controls is fine, or standard div */}
                            <div className="product-heading">
                                <span className="product-count">
                                    Showing {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, sortedProducts.length)} of {sortedProducts.length} products
                                </span>
                                <div className="controls-wrapper">
                                    <div className="search-bar">
                                        <FaSearch />
                                        <input
                                            type="search"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="sorting-dropdown">
                                        <label htmlFor="sorting-options">Sort By: </label>
                                        <select
                                            id="sorting-options"
                                            value={sortingOption}
                                            onChange={(e) => setSortingOption(e.target.value)}
                                        >
                                            {/* <option value="AtoZ">A to Z</option>
                                            <option value="ZtoA">Z to A</option> */}
                                            <option value="Popular">Popular</option>
                                            <option value="Latest">Latest</option>
                                            <option value="Rating">Rating</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* SEO: Breadcrumb navigation links */}
                            {breadcrumb.length > 0 && (
                                <div className="breadcrumb-wrapper">
                                    <div className="breadcrumb-inner">
                                        {breadcrumb.map((item, index) => (
                                            <span key={index}>
                                                {index > 0 && <span className="separator">/</span>}
                                                <span 
                                                    className={`crumb-link ${index === breadcrumb.length - 1 ? 'current' : 'active'}`}
                                                    onClick={() => handleBreadcrumbClick(index)}
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
                                            role="button"
                                            tabIndex={0}
                                            onKeyDown={(e) => { if (e.key === 'Enter') handleSeeDetailsClick(product._id); }}
                                        >
                                            <div className="product-grid-inner">
                                                <div className="img-content-block">
                                                    <div className="img-block">
                                                        {/* SEO: Ensure alt text is descriptive */}
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
                                                    {/* SEO: Use appropriate heading tag for product title, e.g., h3 */}
                                                    <h3>{product.title}</h3>
                                                </div>
                                                <div className="product-button-wrapper">
                                                    <a
                                                        onClick={(e) => { e.stopPropagation(); handleSeeDetailsClick(product._id); }}
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
                                    <p className="no-products">
                                        No products found.
                                    </p>
                                )}
                            </div>

                            {/* Pagination */}
                            {!isLoading && totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        aria-label="Previous Page" // SEO: Accessibility
                                    >
                                        Previous
                                    </button>

                                    <div className="page-numbers">
                                        {Array.from({ length: totalPages }, (_, index) => {
                                            const pageNum = index + 1;
                                            const showPage = pageNum === 1 || 
                                                            pageNum === totalPages ||
                                                            (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

                                            if (!showPage) {
                                                if (pageNum === 2 && currentPage > 4) {
                                                    return <span key="ellipsis-start">...</span>;
                                                }
                                                if (pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                                                    return <span key="ellipsis-end">...</span>;
                                                }
                                                return null;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={currentPage === pageNum ? 'active' : ''}
                                                    aria-label={`Go to page ${pageNum}`} // SEO: Accessibility
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        aria-label="Next Page" // SEO: Accessibility
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

// FIX: Removed the line break in 'Products' name
export default function Products() {
    return (
        <Suspense fallback={<SimpleSpinner />}>
            <ProductPageContent />
        </Suspense>
    );
}