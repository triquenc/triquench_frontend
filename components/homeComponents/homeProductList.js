import React, { forwardRef, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
        `https://triquench-backend.vercel.app/api/product/all?category=${encodeURIComponent(category)}&trending=true`
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
          <div style={{
            position: 'relative',
            marginBottom: '30px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <button 
              onClick={handlePreviousCategory}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '9999px', // Perfect circle
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                transform: 'rotate(-180deg)',
                padding: 0, // Remove padding to maintain perfect circle
                minWidth: '40px', // Ensure width stays fixed
                minHeight: '40px', // Ensure height stays fixed
                ':hover': {
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  transform: 'rotate(-180deg) scale(1.1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                },
                ':active': {
                  transform: 'rotate(-180deg) scale(0.95)'
                }
              }}
            >
              <FaArrowRight style={{ 
                fontSize: '18px',
                margin: 'auto' // Center the icon perfectly
              }} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '20px',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                cursor: 'grab',
                WebkitOverflowScrolling: 'touch',
                transition: 'transform 0.5s ease-out',
                maxWidth: 'calc(100% - 100px)'
              }}
            >
              <div style={{
                display: 'flex',
                gap: '15px',
                transform: `translateX(-${categories.indexOf(activeCategory) * 140}px)`,
                transition: 'transform 0.5s ease-out'
              }}>
                {categories.map((category, i) => (
                  <button
                    key={i}
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      padding: '10px 25px',
                      backgroundColor: activeCategory === category ? '#006098' : '#fff',
                      color: activeCategory === category ? '#fff' : '#333',
                      border: '1px solid #ddd',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      minWidth: '120px',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      flex: '0 0 auto',
                      userSelect: 'none',
                      transform: activeCategory === category ? 'scale(1.05)' : 'scale(1)',
                      opacity: activeCategory === category ? 1 : 0.7
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleNextCategory}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '9999px', // Perfect circle
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                padding: 0, // Remove padding to maintain perfect circle
                minWidth: '40px', // Ensure width stays fixed
                minHeight: '40px', // Ensure height stays fixed
                ':hover': {
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                },
                ':active': {
                  transform: 'scale(0.95)'
                }
              }}
            >
              <FaArrowRight style={{ 
                fontSize: '18px',
                margin: 'auto' // Center the icon perfectly
              }} />
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
