'use client';
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SimpleSpinner from "../commonComponents/SimpleSpinner";

const useClickOutside = (refs, handler) => {
  useEffect(() => {
    const listener = (event) => {
      const isInside = refs.some((ref) => ref.current && ref.current.contains(event.target));
      if (isInside) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};

const generateProductSchema = (products, activeCategory) => {
  if (!products || products.length === 0) return null;
  const DOMAIN = "https://www.triquenchindia.com"; 

  const itemListElement = products.map((product, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": product.title,
      "image": product?.images?.[0]?.url || undefined,
      "description": product.description || undefined,
      "sku": product._id,
      "url": `${DOMAIN}/product/${product._id}`,
      "brand": { "@type": "Brand", "name": "Triquench" }
    }
  }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Trending Products - ${activeCategory}`,
    "itemListElement": itemListElement,
  });
};

const HomeProductList = forwardRef(() => {
  const [categoryOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [isSuperSmall, setIsSuperSmall] = useState(false);
  const [is1024, setIs1024] = useState(false);
  const listBarRef = useRef(null);
  const categoryTitleRef = useRef(null);
  const productSchema = generateProductSchema(products, activeCategory);

  const categories = [
    "CNC Spindle Motor", "Spindle Servo Motor", "AC Servo Motor",
    "CNC Router Accessories", "Spindle Bearing", "Gearbox",
    "Spindle Accessories", "Laser Parts", "Controller",
    "Chiller", "Engraving Tools",
  ];

  const fetchProducts = useCallback(async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://triquench-backend.vercel.app/api/product/all?category=${encodeURIComponent(category)}&trending=true`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory, fetchProducts]);

  // Responsive Logic
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const mobile = w <= 480;
      const superSmall = w < 375;
      const around1024 = w >= 1000 && w <= 1100;

      setIsMobile(mobile);
      setIsSuperSmall(superSmall);
      setIs1024(around1024);

      let newItemsToShow = 4;
      if (superSmall) newItemsToShow = 1;
      else if (mobile) newItemsToShow = 1;
      else if (around1024) newItemsToShow = 3;
      else if (w <= 768) newItemsToShow = 2;

      setItemsToShow(newItemsToShow);

      setCurrentCategoryIndex((idx) => {
        const maxStart = Math.max(0, categories.length - newItemsToShow);
        return Math.min(idx, maxStart);
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [categories.length]);

  // Event Listeners
  useClickOutside([listBarRef, categoryTitleRef], () => setMenuOpen(false));

  useEffect(() => {
    if (categoryOpen) document.body.classList.add("open-category");
    else document.body.classList.remove("open-category");
    return () => document.body.classList.remove("open-category");
  }, [categoryOpen]);

  // Navigation Handlers
  const handleCategoryClick = (cat) => { setActiveCategory(cat); setMenuOpen(false); };
  const step = isMobile ? 1 : itemsToShow;
  const handleNext = () => setCurrentCategoryIndex((prev) => Math.min(prev + step, Math.max(0, categories.length - (isMobile ? 1 : itemsToShow))));
  const handlePrev = () => setCurrentCategoryIndex((prev) => Math.max(prev - step, 0));

  const visibleCategories = categories.slice(currentCategoryIndex, currentCategoryIndex + itemsToShow);

  // Scroll into view
  useEffect(() => {
    if (!listBarRef.current) return;
    const btns = listBarRef.current.querySelectorAll("button");
    if (btns.length > 0 && btns[0].scrollIntoView) {
      try { btns[0].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); } catch (e) {}
    }
  }, [currentCategoryIndex, visibleCategories]);

  // Dynamic Classes for SCSS
  const navClasses = `category-nav-wrapper ${isMobile ? 'is-mobile' : ''} ${isSuperSmall ? 'is-super-small' : ''} ${is1024 ? 'is-1024' : ''}`;
  const prevDisabled = currentCategoryIndex === 0;
  const nextDisabled = currentCategoryIndex + step >= categories.length;

  return (
    <>
      <Head>
        {productSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productSchema }} />
        )}
      </Head>

      <section className="home-product-list">
        <div className="container product-list-container">
          <div className="title-block">
            <h2 ref={categoryTitleRef} className="has-green-bar section-title">
              We have the best quality products
            </h2>
          </div>

          {/* Category Navigation */}
          <div className={navClasses}>
            <button
              onClick={handlePrev}
              disabled={prevDisabled}
              aria-label="Previous categories"
              className={`nav-arrow prev ${prevDisabled ? 'disabled' : ''}`}
            >
              <FaArrowLeft />
            </button>

            <div ref={listBarRef} className="category-list">
              {visibleCategories.map((category, i) => (
                <button
                  key={i + currentCategoryIndex}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={nextDisabled}
              aria-label="Next categories"
              className={`nav-arrow next ${nextDisabled ? 'disabled' : ''}`}
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Product Grid */}
          <div className="home-product-grid">
            {isLoading ? (
              <SimpleSpinner />
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="home-product-grid-item">
                  <Link href={`/product/${product._id}`} className="home-product-grid-inner">
                    <div className="normal-div">
                      <div className="img-block">
                        <Image
                          src={product?.images?.[0]?.url}
                          width={228}
                          height={228}
                          alt={product?.title || "Product"}
                        />
                      </div>
                      <p className="product-title">
                        {product?.title}
                      </p>
                    </div>
                    <div className="hover-div">
                      <p className="title">{product?.title}</p>
                      <p>{product?.description}</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-data-msg">
                No trending products available for this category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

HomeProductList.displayName = "HomeProductList";
export default HomeProductList;