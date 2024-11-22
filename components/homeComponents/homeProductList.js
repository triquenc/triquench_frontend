import React, { forwardRef, useState, useEffect, useRef } from "react";
import Image from "next/image";

const HomeProductList = forwardRef((props, ref) => {
  const [categoryOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("CNC Spindle Motor"); // Default active category
  const [products, setProducts] = useState([]);
  const listBarRef = useRef(null);
  const categoryTitleRef = useRef(null);

  // Category list
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
    'Engraving Tools'
  ];

  // Fetch products based on active category
  const fetchProducts = async (category) => {
    try {
      const response = await fetch(
        `https://triquench-backend.vercel.app/api/product/all?category=${encodeURIComponent(category)}&trending=true`
      );
      const data = await response.json();
      setProducts(data); // Update the products state with the fetched data
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when activeCategory changes
  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  // Toggle the open-category class on body
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
        setMenuOpen(false); // Close the menu
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
    event.preventDefault()
    setActiveCategory(category);
    setMenuOpen(false); // Close the menu on category click
  };

  const handleSeeDetailsClick = (id) => {
    // Programmatically navigate to the product detail page
    router.push(`/product/${id}`);
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
            <ul
              className={`list-bar ${categoryOpen ? "open" : ""}`}
              ref={listBarRef}
            >
              {categories.map((category, i) => (
                <li key={i} className={activeCategory === category ? "active" : ""}>
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
                <div key={product._id} 
                className="home-product-grid-item">
                  <a href={`/product/${product._id}`} className="home-product-grid-inner">
                    <div className="normal-div">
                      <div className="img-block">
                        <Image src={product?.images[0]?.url} width={228} height={228} alt={product?.title} />
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
              <p style={{
                margin: "auto"
              }}>No trending products available for this category.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
});

export default HomeProductList;
