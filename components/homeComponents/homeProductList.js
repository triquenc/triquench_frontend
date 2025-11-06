import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const SimpleSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "200px",
      margin: "auto",
    }}
  >
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    <div
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #006098",
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // desktop default
  const [isMobile, setIsMobile] = useState(false); // <=480
  const [isSuperSmall, setIsSuperSmall] = useState(false); // <375
  const [is1024, setIs1024] = useState(false); // <-- NEW: flag for ~1024px laptop view
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
  }, []);

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory, fetchProducts]);

  // Responsive detection & small-screen adjustments (<375)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const mobile = w <= 480;
      const superSmall = w < 375;
      // set 1024-ish flag - covers slightly around 1024 so it doesn't flicker on tiny differences
      const around1024 = w >= 1000 && w <= 1100;

      setIsMobile(mobile);
      setIsSuperSmall(superSmall);
      setIs1024(around1024);

      if (superSmall) {
        setItemsToShow(1);
      } else if (mobile) {
        setItemsToShow(1); // mobile <=480 show 1 (you can change to 2 if desired)
      } else if (around1024) {
        // <-- TARGETED CHANGE: show 3 items on 1024-like laptop width
        setItemsToShow(3);
      } else if (w <= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }

      // keep index valid
      setCurrentCategoryIndex((idx) => {
        const chunk = superSmall ? 1 : mobile ? 1 : around1024 ? 3 : w <= 768 ? 2 : 4;
        const maxStart = Math.max(0, categories.length - chunk);
        return Math.min(idx, maxStart);
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [categories.length]);

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

  const visibleCategories = categories.slice(
    currentCategoryIndex,
    currentCategoryIndex + itemsToShow
  );

  useEffect(() => {
    const maxStart = Math.max(0, categories.length - itemsToShow);
    setCurrentCategoryIndex((idx) => Math.min(idx, maxStart));
  }, [itemsToShow, categories.length]);

  useEffect(() => {
    if (!listBarRef.current) return;
    const btns = listBarRef.current.querySelectorAll("button");
    if (btns.length === 0) return;
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
                left: isSuperSmall ? "6px" : isMobile ? "8px" : is1024 ? "12px" : "10px",
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

            {/* Category list */}
            <div
              ref={listBarRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isSuperSmall ? 10 : 15,
                padding: isSuperSmall ? "12px 8px" : is1024 ? "14px 12px" : "20px",
                overflowX: isMobile ? "auto" : "hidden",
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
                whiteSpace: "nowrap",
                maxWidth: is1024 ? "calc(100% - 140px)" : "calc(100% - 100px)",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {visibleCategories.map((category, i) => (
                <button
                  key={i + currentCategoryIndex}
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    padding: isSuperSmall ? "8px 14px" : is1024 ? "8px 18px" : "10px 25px",
                    backgroundColor:
                      activeCategory === category ? "#006098" : "#fff",
                    color: activeCategory === category ? "#fff" : "#333",
                    border: "1px solid #ddd",
                    borderRadius: 25,
                    cursor: "pointer",
                    fontSize: isSuperSmall ? 14 : 16,
                    transition: "all 0.2s ease",
                    minWidth: isSuperSmall ? "68%" : isMobile ? "66%" : is1024 ? "180px" : "240px",
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
                right: isSuperSmall ? "6px" : isMobile ? "8px" : is1024 ? "12px" : "10px",
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
              <SimpleSpinner />
            ) : products.length > 0 ? (
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

HomeProductList.displayName = "HomeProductList";

export default HomeProductList;
