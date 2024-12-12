import React, { forwardRef, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const HomeProductList = forwardRef((props, ref) => {
  const [categoryOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor");
  const [products, setProducts] = useState([]);
  const [visibleCategoryIndex, setVisibleCategoryIndex] = useState(0); // For pagination
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

  const categoriesPerPage = 4; // Number of categories to show at a time

  const fetchProducts = async (category) => {
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
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const toggleCategory = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setMenuOpen(false);
  };

  const handleNextCategory = () => {
    if (visibleCategoryIndex + categoriesPerPage < categories.length) {
      setVisibleCategoryIndex((prev) => prev + categoriesPerPage);
    }
  };

  const handlePreviousCategory = () => {
    if (visibleCategoryIndex > 0) {
      setVisibleCategoryIndex((prev) => prev - categoriesPerPage);
    }
  };

  const visibleCategories = categories.slice(
    visibleCategoryIndex,
    visibleCategoryIndex + categoriesPerPage
  );

  return (
    <section className="home-product-list">
      <div className="container">
        <div className="title-block">
          <h2 className="has-green-bar">We have the best quality products</h2>
        </div>
        <div
          style={{
            position: "relative",
            marginBottom: "30px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button 
            onClick={handlePreviousCategory}
            disabled={visibleCategoryIndex === 0}
            style={{
              cursor: visibleCategoryIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            <FaArrowLeft />
          </button>

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >
           {visibleCategories.map((category, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(category)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: activeCategory === category ? "#006098" : "#fff",
                  color: activeCategory === category ? "#fff" : "#333",
                  borderRadius: "25px",
                  cursor: "pointer",
                  width: "250px", // Fixed width for all buttons
                  textAlign: "center", // Ensure text is centered
                  display: "flex", // Flexbox to center content
                  justifyContent: "center", // Center content horizontally
                  alignItems: "center", // Center content vertically
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextCategory}
            disabled={visibleCategoryIndex + categoriesPerPage >= categories.length}
            style={{
              cursor:
                visibleCategoryIndex + categoriesPerPage >= categories.length
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="home-product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="home-product-grid-item">
                <a href={`/product/${product._id}`} className="home-product-grid-inner">
                  <div className="normal-div">
                    <div className="img-block">
                      <Image
                        src={product?.images[0]?.url}
                        width={228}
                        height={228}
                        alt={product?.title}
                      />
                    </div>
                    <p className="text-center font-weight500">{product?.title}</p>
                  </div>
                  <div className="hover-div">
                    <p className="title">{product?.title}</p>
                    <p>{product?.description}</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p style={{ margin: "auto" }}>No trending products available for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
});

export default HomeProductList;
