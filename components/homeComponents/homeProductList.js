import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback, // <-- Import useCallback
} from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// A simple, self-contained spinner component
const SimpleSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "200px", // Give the grid area some height while loading
      margin: "auto",
    }}
  >
    {/* Keyframes for the spin animation */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    {/* The spinner element */}
    <div
      style={{
        border: "4px solid #f3f3f3", // Light grey
        borderTop: "4px solid #006098", // Blue (from your button style)
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <span style={{ marginLeft: "10px", fontSize: "16px", color: "#333" }}>
      Please wait...
    </span>
  </div>
);

const HomeProductList = forwardRef((props, ref) => {
  const [categoryOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // <-- *** FIXED: Set initial state to true ***
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // desktop default
  const [isMobile, setIsMobile] = useState(false); // <=480
  const [isSuperSmall, setIsSuperSmall] = useState(false); // <375
  const listBarRef = useRef(null);
  const categoryTitleRef = useRef(null);

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

  // *** LINT FIX 1: Wrapped in useCallback to safely use in useEffect ***
  const fetchProducts = useCallback(async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://triquench-backend.vercel.app/api/product/all?category=${encodeURIComponent(
          category
        )}&trending=true`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []); // This function has no dependencies, so the array is empty

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory, fetchProducts]); // <-- Added fetchProducts to dependency array

  // Responsive detection & small-screen adjustments (<375)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const mobile = w <= 480;
      const superSmall = w < 375;
      setIsMobile(mobile);
      setIsSuperSmall(superSmall);

      if (superSmall) {
        setItemsToShow(1);
      } else if (mobile) {
        setItemsToShow(1); // mobile <=480 show 1 (you can change to 2 if desired)
      } else if (w <= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }

      // keep index valid
      setCurrentCategoryIndex((idx) => {
        const chunk = superSmall ? 1 : mobile ? 1 : w <= 768 ? 2 : 4;
        const maxStart = Math.max(0, categories.length - chunk);
        return Math.min(idx, maxStart);
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [categories.length]); // <-- *** LINT FIX 2: Added missing dependency ***

  // Close category list when clicking outside
  useEffect(() => {
    if (categoryOpen) document.body.classList.add("open-category");
    else document.body.classList.remove("open-category");

    const handleClickOutside = (event) => {
      if (
        listBarRef.current &&
        !listBarRef.current.contains(event.target) &&
        categoryTitleRef.current &&
        !categoryTitleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.classList.remove("open-category");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryOpen]);

  const toggleCategory = () => setMenuOpen((p) => !p);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setMenuOpen(false);
  };

  // step: mobile (<=480) and super small (<375) step by 1; desktop step by itemsToShow
  const step = isMobile ? 1 : itemsToShow;

  const handleNextCategory = () => {
    const maxIndex = categories.length - (isMobile ? 1 : itemsToShow);
    setCurrentCategoryIndex((prev) =>
      Math.min(prev + step, Math.max(0, maxIndex))
    );
  };

  const handlePreviousCategory = () => {
    setCurrentCategoryIndex((prev) => Math.max(prev - step, 0));
  };

  // Visible slice depends on currentCategoryIndex and itemsToShow
  const visibleCategories = categories.slice(
    currentCategoryIndex,
    currentCategoryIndex + itemsToShow
  );

  // Ensure index valid when itemsToShow changes
  useEffect(() => {
    const maxStart = Math.max(0, categories.length - itemsToShow);
    setCurrentCategoryIndex((idx) => Math.min(idx, maxStart));
  }, [itemsToShow, categories.length]);

  // When index/visibleCategories change, scroll the visible button into view (helps mobile arrows + swipe sync)
  useEffect(() => {
    if (!listBarRef.current) return;
    // listBarRef contains only the buttons for visibleCategories
    // find the first button in the container and scroll it to center
    const btns = listBarRef.current.querySelectorAll("button");
    if (btns.length === 0) return;
    // On super small we usually render 1 button, but still scroll center
    const target = btns[0];
    if (target && typeof target.scrollIntoView === "function") {
      try {
        target.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      } catch (e) {
        // ignore if browser can't do it
      }
    }
  }, [currentCategoryIndex, visibleCategories]);

  return (
    <>
      <section className="home-product-list">
        <div className="container" style={{ position: "relative" }}>
          <div className="title-block">
            <h2
              className="has-green-bar"
              style={{ fontFamily: "sans-serif", textTransform: "capitalize" }}
            >
              We have the best quality products
            </h2>
          </div>

          {/* Category navigation */}
          <div
            style={{
              position: "relative",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* Left arrow */}
            <button
              onClick={handlePreviousCategory}
              disabled={currentCategoryIndex === 0}
              aria-label="Previous categories"
              style={{
                backgroundColor: currentCategoryIndex === 0 ? "#ccc" : "#006098",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: isSuperSmall ? 38 : 40,
                height: isSuperSmall ? 38 : 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: currentCategoryIndex === 0 ? "not-allowed" : "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "absolute",
                left: isSuperSmall ? "6px" : isMobile ? "8px" : "10px",
                top: isMobile ? "50%" : undefined,
                transform: isMobile ? "translateY(-50%)" : undefined,
                zIndex: 2,
                transition: "all 0.2s ease",
                background:
                  isSuperSmall ? "#e6e6e6" :
                  currentCategoryIndex === 0 ? "#ccc" : "#006098",
                color: isSuperSmall ? "#333" : "#fff",
              }}
            >
              <FaArrowLeft style={{ fontSize: isSuperSmall ? 14 : 18 }} />
            </button>

            {/* Category list — desktop unchanged; mobile / super small scrollable and pill narrower */}
            <div
              ref={listBarRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isSuperSmall ? 10 : 15,
                padding: isSuperSmall ? "12px 8px" : "20px",
                overflowX: isMobile ? "auto" : "hidden",
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
                whiteSpace: "nowrap",
                maxWidth: "calc(100% - 100px)",
                justifyContent: "center",
                position: "relative",
                zIndex: 1, // <-- ADDED
              }}
            >
              {visibleCategories.map((category, i) => (
                <button
                  key={i + currentCategoryIndex}
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    padding: isSuperSmall ? "8px 14px" : "10px 25px",
                    backgroundColor:
                      activeCategory === category ? "#006098" : "#fff",
                    color: activeCategory === category ? "#fff" : "#333",
                    border: "1px solid #ddd",
                    borderRadius: 25,
                    cursor: "pointer",
                    fontSize: isSuperSmall ? 14 : 16,
                    transition: "all 0.2s ease",
                    minWidth:
                      isSuperSmall ? "68%" : isMobile ? "66%" : "240px",
                    textAlign: "center",
                    boxShadow:
                      activeCategory === category ? "0 6px 12px rgba(0,0,0,0.12)" :
                      "0 2px 4px rgba(0,0,0,0.06)",
                    flex: "0 0 auto",
                    userSelect: "none",
                    transform:
                      activeCategory === category ? "scale(1.03)" : "scale(1)",
                    opacity: activeCategory === category ? 1 : 0.85,
                    scrollSnapAlign: "center",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNextCategory}
              disabled={currentCategoryIndex + step >= categories.length}
              aria-label="Next categories"
              style={{
                backgroundColor:
                  currentCategoryIndex + step >= categories.length ?
                    "#ccc" :
                    "#006098",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: isSuperSmall ? 38 : 40,
                height: isSuperSmall ? 38 : 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  currentCategoryIndex + step >= categories.length ?
                    "not-allowed" :
                    "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "absolute",
                right: isSuperSmall ? "6px" : isMobile ? "8px" : "10px",
                top: isMobile ? "50%" : undefined,
                transform: isMobile ? "translateY(-50%)" : undefined,
                zIndex: 2,
                transition: "all 0.2s ease",
              }}
            >
              <FaArrowRight style={{ fontSize: isSuperSmall ? 14 : 18 }} />
            </button>
          </div>

          {/* Product grid */}
          <div className="home-product-grid">
            {isLoading ? (
              // Show spinner while loading
              <SimpleSpinner />
            ) : products.length > 0 ? (
              // Show products if they exist
              products.map((product) => (
                <div key={product._id} className="home-product-grid-item">
                  <a
                    href={`/product/${product._id}`}
                    className="home-product-grid-inner"
                  >
                    <div className="normal-div">
                      <div className="img-block">
                        <Image
                          src={product?.images?.[0]?.url}
                          width={228}
                          height={228}
                          alt={product?.title}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          maxWidth: "600px",
                        }}
                      >
                        {product?.title}
                      </p>
                    </div>
                    <div className="hover-div">
                      <p className="title">{product?.title}</p>
                      <p>{product?.description}</p>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              // Show "no products" message if loading is done and products array is empty
              <p style={{ margin: "auto" }}>
                No trending products available for this category.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

// Add display name for better debugging
HomeProductList.displayName = "HomeProductList";

export default HomeProductList;