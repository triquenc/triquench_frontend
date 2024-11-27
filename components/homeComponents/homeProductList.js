import React, { forwardRef, useState, useEffect, useRef } from "react";
import Image from "next/image";

const HomeProductList = forwardRef((props, ref) => {
  const [categoryOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor");
  const [products, setProducts] = useState([]);
  const listBarRef = useRef(null);
  const categoryTitleRef = useRef(null);

  const categories = [
    'CNC Spindle Motor',
    'Spindle Servo Motor',
    'AC Servo Motor',
    'CNC Router Accessories',
    'Spindle Bearing',
    'Gearbox',
    'Spindle Accessories',
    'Laser Parts',
    'Controller',
    'Chiller',
    'Engraving Tools',
  ];

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(
        `https://d1w2b5et10ojep.cloudfront.net/api/product/all?category=${encodeURIComponent(category)}&trending=true`
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

  useEffect(() => {
    if (categoryOpen) {
      document.body.classList.add("open-category");
    } else {
      document.body.classList.remove("open-category");
    }

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

  const toggleCategory = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setMenuOpen(false);
  };

  const handleNextCategory = () => {
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length; // Loop to the start
    setActiveCategory(categories[nextIndex]);
  };

  const handlePreviousCategory = () => {
    const currentIndex = categories.indexOf(activeCategory);
    const previousIndex =
      (currentIndex - 1 + categories.length) % categories.length; // Loop to the end
    setActiveCategory(categories[previousIndex]);
  };

  return (
    <>
      <section className="home-product-list">
        <div className="container">
          <div className="title-block">
            <span className="sub-title">We have the best quality products</span>
            <h2 className="has-green-bar">OUR PRODUCTS</h2>
          </div>
          <div className="category-wrapper">
            <button className="prev-category" onClick={handlePreviousCategory}>
              <Image src="/images/prev-icon.svg" alt="Previous" width={24} height={24} />
            </button>
            <div
              className="catogary-title"
              onClick={toggleCategory}
              ref={categoryTitleRef}
            >
              <h3>{activeCategory}</h3>
              <em>
                <Image src="/images/slider-arrow.svg" alt="arrow" width={15} height={10} />
              </em>
            </div>
            <button className="next-category" onClick={handleNextCategory}>
              <Image src="/images/next-icon.svg" alt="Next" width={24} height={24} />
            </button>
            <ul
              className={`list-bar ${categoryOpen ? "open" : ""}`}
              ref={listBarRef}
            >
              {categories.map((category, i) => (
                <li
                  key={i}
                  className={activeCategory === category ? "active" : ""}
                >
                  <a
                    href="#"
                    title={category}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
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
                      <p>{product?.title}</p>
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

export default HomeProductList;
