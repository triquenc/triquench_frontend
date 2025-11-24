"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InnerPageBanner from "@/components/commonComponents/innerpagebanner";
import categoriesData from '../../app/products/categories.json'
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";

// Import the new UI components
import FilterSidebar from "./FilterSidebar";
import ProductControls from "./ProductControls";
import Breadcrumbs from "./Breadcrumbs";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

// Import the SCSS module
import styles from './Products.module.scss';

export default function ProductPageClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categorySlug = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory');
    const subSubCategoryParam = searchParams.get('subSubcategory');

    const [activeCategory, setActiveCategory] = useState("All Products");
    const [activeSubCategory, setActiveSubCategory] = useState("");
    const [activeSubSubCategory, setActiveSubSubCategory] = useState("");

    const [expandedCategories, setExpandedCategories] = useState({});
    const [products, setProducts] = useState([]); // Filtered list
    const [allProducts, setAllProducts] = useState([]); // Single source of truth
    const [sortingOption, setSortingOption] = useState("AtoZ");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [breadcrumb, setBreadcrumb] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const productsPerPage = 15;

    const categories = categoriesData.categories;
    const productGridRef = useRef(null);

    // Scroll helper (no change)
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

    // Fetches all products
    const fetchAllProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://d1w2b5et10ojep.cloudfront.net/api/product/all");
            const data = await response.json();
            setAllProducts(data || []);
        } catch (error) {
            console.error("Error fetching all products:", error);
            setAllProducts([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect to fetch products and set initial filter state from URL
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
            setActiveCategory("All Products");
            setActiveSubCategory("");
            setActiveSubSubCategory("");
            setBreadcrumb([]);
        }
    }, [categorySlug, subCategoryParam, subSubCategoryParam, categories, fetchAllProducts]);


    // Filter effect
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
        setCurrentPage(1); // Reset to first page
    }, [activeCategory, activeSubCategory, activeSubSubCategory, allProducts, searchQuery]);

    // Sorting
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

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    // --- HANDLERS ---

    const handleCategoryClick = (category, subcategory = '', subSubcategory = '') => {
        const categoryObj = categories.find(cat => cat.name === category);
        
        if (category === "All Products" || !categoryObj) {
            setActiveCategory("All Products");
            setActiveSubCategory("");
            setActiveSubSubCategory("");
            setBreadcrumb([]);
            router.push('/products'); 
            return;
        }

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
        router.replace(`/products?${params.toString()}`);

        if (productGridRef.current) {
            productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    const handleBreadcrumbClick = (index) => {
        const newBreadcrumb = breadcrumb.slice(0, index + 1);
        const category = newBreadcrumb[0];
        const subcategory = newBreadcrumb[1] || '';
        const subSubcategory = newBreadcrumb[2] || '';
        
        handleCategoryClick(category, subcategory, subSubcategory);
    };

    const handleSeeDetailsClick = (id) => {
        router.push(`/product/${id}`);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (productGridRef.current && typeof window !== 'undefined') {
            const w = window.innerWidth;
            if (w > 768) {
                productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
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
            <section className={styles.productListing}>
                <div className="container">
                    <div className={styles.productListingGrid}>
                        <div className={styles.productListingLeft}>
                            <FilterSidebar
                                categories={categories}
                                activeCategory={activeCategory}
                                expandedCategories={expandedCategories}
                                onCategoryClick={handleCategoryClick}
                                onToggleCategory={toggleCategory}
                            />
                        </div>
                        
                        <div className={styles.productListingRight}>
                            <ProductControls
                                totalProducts={sortedProducts.length}
                                firstItemIndex={indexOfFirstProduct + 1}
                                lastItemIndex={Math.min(indexOfLastProduct, sortedProducts.length)}
                                searchQuery={searchQuery}
                                onSearchChange={(e) => setSearchQuery(e.target.value)}
                                sortingOption={sortingOption}
                                onSortChange={(e) => setSortingOption(e.target.value)}
                            />

                            {breadcrumb.length > 0 && (
                                <Breadcrumbs
                                    breadcrumb={breadcrumb}
                                    onBreadcrumbClick={handleBreadcrumbClick}
                                />
                            )}

                            <ProductGrid
                                ref={productGridRef}
                                products={currentProducts}
                                isLoading={isLoading}
                                onProductClick={handleSeeDetailsClick}
                            />

                            {!isLoading && totalPages > 1 && (
                                <Pagination
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