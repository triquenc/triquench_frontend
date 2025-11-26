"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InnerPageBanner from "@/components/commonComponents/InnerPageBanner";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";
import categoriesData from './categories.json'; // Make sure this path is correct relative to this file

// Importing the new separate components
import ProductSidebar from "@/components/productsComponents/ProductSidebar";
import ProductHeaderControls from "@/components/productsComponents/ProductHeaderControls";
import ProductBreadcrumbs from "@/components/productsComponents/ProductBreadcrumbs";
import ProductGrid from "@/components/productsComponents/ProductGrid";
import ProductPagination from "@/components/productsComponents/ProductPagination";

const SITE_URL = "https://www.triquenchindia.com";

function ProductPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get('category');
    
    // --- State ---
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

    // --- Helper: Scroll logic ---
    const scrollWhenReady = (name, timeoutMs = 3000, pollInterval = 200) => {
        if (!name || typeof window === 'undefined') return;
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
            if (attempt()) { clearInterval(id); return; }
            if (Date.now() - start > timeoutMs) clearInterval(id);
        }, pollInterval);
    };

    // --- API Calls ---
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

    const fetchCategoryData = async (category, subcategory = '', subSubcategory = '') => {
        setIsLoading(true);
        try {
            let url = `https://d1w2b5et10ojep.cloudfront.net/api/product/category/${encodeURIComponent(category)}`;
            const params = new URLSearchParams();
            if (subcategory) params.append('subcategory', subcategory);
            if (subSubcategory) params.append('subSubcategory', subSubcategory);
            if (params.toString()) url += `?${params.toString()}`;
            
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

    // --- Effects ---
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

    useEffect(() => {
        const pageTitle = activeCategory === "All Products" ? "Our Products - Catalogue" : `${activeCategory} Products | Triquench`;
        document.title = pageTitle;

        let link = document.querySelector("link[rel='canonical']");
        if (!link) {
            link = document.createElement("link");
            link.setAttribute("rel", "canonical");
            document.head.appendChild(link);
        }
        let canonicalUrl = `${SITE_URL}/products`;
        if (activeCategory !== "All Products") canonicalUrl += `?category=${encodeURIComponent(activeCategory)}`;
        link.setAttribute("href", canonicalUrl);
    }, [activeCategory]);

    // --- Handlers ---
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
        } else if (typeof window !== 'undefined' && window.innerWidth > 768) {
            window.scrollTo({ top: 500, behavior: 'smooth' });
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

    const handleSeeDetailsClick = (id) => {
        router.push(`/product/${id}`);
    };

    const handleBreadcrumbClick = (index) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        handleCategoryClick(newBreadcrumb[0], newBreadcrumb[1] || '', newBreadcrumb[2] || '');
    };

    // --- Data Processing ---
    useEffect(() => {
        let filteredProducts = [...allProducts];
        if (activeCategory !== "All Products") {
            filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
            if (activeSubCategory) filteredProducts = filteredProducts.filter(p => p.subcategory === activeSubCategory);
            if (activeSubSubCategory) filteredProducts = filteredProducts.filter(p => p.subSubcategory === activeSubSubCategory);
        }
        if (searchQuery) {
            filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setProducts(filteredProducts);
        setCurrentPage(1); 
    }, [activeCategory, activeSubCategory, activeSubSubCategory, allProducts, searchQuery]);

    const sortedProducts = useMemo(() => {
        let productsToSort = [...products];
        switch (sortingOption) {
            case "Popular": productsToSort.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); break;
            case "Latest": productsToSort.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)); break;
            case "Rating": productsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
        }
        return productsToSort;
    }, [products, sortingOption]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (productGridRef.current && typeof window !== 'undefined' && window.innerWidth > 768) {
            productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- Structured Data ---
    const jsonLdData = useMemo(() => {
        const breadcrumbList = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE_URL}/products` },
                ...breadcrumb.map((item, index) => ({
                    "@type": "ListItem",
                    "position": index + 3,
                    "name": item,
                    "item": `${SITE_URL}/products?category=${encodeURIComponent(item)}`
                }))
            ]
        };
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
                    "image": product.images?.[0]?.url ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${SITE_URL}${product.images[0].url}`) : "https://res.cloudinary.com/dd1na5drh/image/upload/v1734679442/IMG_2915_uxq8np.png",
                    "url": `${SITE_URL}/product/${product._id}`,
                    "description": product.description || `Buy ${product.title} from Triquench India.`,
                    "sku": product._id,
                    "brand": { "@type": "Brand", "name": "Triquench India" },
                    "offers": { "@type": "Offer", "url": `${SITE_URL}/product/${product._id}`, "availability": "https://schema.org/InStock", "priceCurrency": "INR", "price": "0" }
                }
            }))
        };
        return { breadcrumbList, itemList };
    }, [breadcrumb, currentProducts, activeCategory]);

    return (
        <div>
            {/* Inject Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData.breadcrumbList) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData.itemList) }} />

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
                        
                        {/* 1. Sidebar */}
                        <ProductSidebar 
                            categories={categories}
                            activeCategory={activeCategory}
                            expandedCategories={expandedCategories}
                            onToggleCategory={toggleCategory}
                            onCategoryClick={handleCategoryClick}
                        />

                        <div className="product-listing-right">
                            {/* 2. Header Controls */}
                            <ProductHeaderControls 
                                start={indexOfFirstProduct + 1}
                                end={Math.min(indexOfLastProduct, sortedProducts.length)}
                                total={sortedProducts.length}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                sortingOption={sortingOption}
                                setSortingOption={setSortingOption}
                            />

                            {/* 3. Breadcrumbs */}
                            <ProductBreadcrumbs 
                                breadcrumb={breadcrumb} 
                                onBreadcrumbClick={handleBreadcrumbClick} 
                            />

                            {/* 4. Grid */}
                            <ProductGrid 
                                products={currentProducts}
                                isLoading={isLoading}
                                onProductClick={handleSeeDetailsClick}
                                gridRef={productGridRef}
                            />

                            {/* 5. Pagination */}
                            {!isLoading && (
                                <ProductPagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function Products() {
    return (
        <Suspense fallback={<SimpleSpinner />}>
            <ProductPageContent />
        </Suspense>
    );
}