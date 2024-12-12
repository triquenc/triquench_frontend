import React, { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

const globalStyles = `
  @media (max-width: 768px) {
    .mobile-menu::-webkit-scrollbar {
      width: 8px;
    }
    .mobile-menu::-webkit-scrollbar-track {
      background: #f5f5f5;
    }
    .mobile-menu::-webkit-scrollbar-thumb {
      background-color: #006098;
      border-radius: 20px;
      border: 3px solid #f5f5f5;
    }
  }
`;

const Header = forwardRef((props, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
      if (menuOpen) {
        document.body.classList.add("open-menu");
      } else {
        document.body.classList.remove("open-menu");
      }

      return () => {
        document.body.classList.remove("open-menu");
        if (hoverTimeout) clearTimeout(hoverTimeout);
      };
    }, [menuOpen, hoverTimeout]);

    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = globalStyles;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, []);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const handleMouseEnter = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      setHoveredProduct(true);
    };

    const handleMouseLeave = () => {
      const timeout = setTimeout(() => {
        setHoveredProduct(false);
      }, 100);
      setHoverTimeout(timeout);
    };


    const handleItemHover = (index) => {
      setHoveredItem(index);
    };

    const handleItemLeave = () => {
      setHoveredItem(null);
    };

    const products = [
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/SPINDLE_LINE_evvu8p.png", href: "/products/cnc-atc-spindle", label: "CNC ATC SPINDLE" },
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/CHILLER_LINE_fedf7s.png", href: "/products/cnc-mtc-spindle", label: "CNC MTC SPINDLE" },
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/CONTROLLER_LINE_nthfof.png", href: "/products/belt-driven-spindle", label: "BELT DRIVEN SPINDLE" },
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/GEARBOX_LINE_emcut4.png", href: "/products/vfd", label: "VFD" },
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/AC_SERVO_LINE_k7ruph.png", href: "/products/bearings", label: "BEARINGS" },
      { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/LASER_LINE_pyzbml.png", href: "/products/cnc-machine-parts", label: "CNC MACHINE PARTS" },
    ];

    return (
      <header className="site-header p-t-10 p-b-13" ref={ref}>
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-wrapper">
              <a href="/">
                <Image
                  src="/images/site-logo.svg"
                  width={86}
                  height={75}
                  alt="Triquench Logo"
                />
              </a>
            </div>
            <nav className="navigation-wrapper">
              <ul>
                <li>
                  <a title="Home" href="/">
                    Home
                  </a>
                </li>
                <li
                  className="has-submenu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a title="Products" href="/products">
                    Products
                  </a>
                  {hoveredProduct && (
                    <div
                      className="products-dropdown"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        backgroundColor: "#006098",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        border: "1px solid #eaeaea",
                        borderRadius: "4px",
                        padding: "5px",
                        zIndex: 1000,
                        transition: "opacity 0.3s ease-in-out",
                        opacity: hoveredProduct ? 1 : 0,
                      }}
                    >
                      <div
                        className="products-grid"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gap: "10px",
                          width: "100%",
                          maxWidth: "1200px",
                          margin: "0 auto",
                        }}
                      >
                        {[
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/SPINDLE_LINE_evvu8p.png", href: "/products/cnc-atc-spindle", label: "CNC ATC SPINDLE" },
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/CHILLER_LINE_fedf7s.png", href: "/products/cnc-mtc-spindle", label: "CNC MTC SPINDLE" },
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/CONTROLLER_LINE_nthfof.png", href: "/products/belt-driven-spindle", label: "BELT DRIVEN SPINDLE" },
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/GEARBOX_LINE_emcut4.png", href: "/products/vfd", label: "VFD" },
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/AC_SERVO_LINE_k7ruph.png", href: "/products/bearings", label: "BEARINGS" },
                          { url:"https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/LASER_LINE_pyzbml.png", href: "/products/cnc-machine-parts", label: "CNC MACHINE PARTS" },
                        ].map((product, index) => (
                          <div
                            key={index}
                            className="product-item"
                            style={{
                              textAlign: "center",
                              padding: "5px",
                              transition: "transform 0.3s, border-color 0.3s",
                              cursor: "pointer",
                              border: "2px solid transparent",
                              borderRadius: "8px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.borderColor = "#3b82f6";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.borderColor = "transparent";
                            }}
                          >
                            <a
                              href={product.href}
                              style={{
                                textDecoration: "none", 
                                color: "#fff",
                                display: "block"
                              }}
                            >
                              <ul style={{ 
                                listStyle: 'none', 
                                padding: 0, 
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}>
                                <li style={{
                                  width: "120px",
                                  height: "120px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}>
                                  <Image
                                    src={product.url}
                                    width={100}
                                    height={100}
                                    alt={product.label}
                                    style={{
                                      borderRadius: "8px",
                                      objectFit: "contain"
                                    }}
                                  />
                                </li>
                                <li style={{marginTop: "10px"}}>
                                  <span
                                    style={{
                                      display: "block",
                                      fontWeight: "bold",
                                      fontSize: "0.9em",
                                    }}
                                  >
                                    {product.label}
                                  </span>
                                </li>
                              </ul>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <a title="About Us" href="/about">
                    About Us
                  </a>
                </li>
                <li>
              <a title="Our Store" href="https://shop.triquenchindia.com/">
              Our Store
              </a>
            </li>

                <li>
                  <a title="Blog" href="/blogs">
                    Blog
                  </a>
                </li>
                <li>
                  <a title="Event" href="/event">
                    Event
                  </a>
                </li>
                  <li>
                  <a title="Contact" href="/contact">
                    contact 
                  </a>
                </li>              
              </ul>
            </nav>
            <div className="contact-wrapper d-flex align-center justify-end">
                <a href="tel:+919601111615" className="border-btn">
                Call Now{" "}
                <Image
                  src="/images/call-ic.svg"
                  width={25}
                  height={18}
                  alt="call-ic"
                />
              </a>

              <div className="hamburger-icon" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" style={{
            position: 'fixed',
            top: '100px',
            left: 0,
            width: '100%',
            height: 'calc(100vh - 100px)', 
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            display: window.innerWidth <= 768 ? 'block' : 'none',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#006098 #f5f5f5'
          }}>
            <nav>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                paddingBottom: '20px'
              }}>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="/" style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#333',
                    textDecoration: 'none'
                  }}>Home</a>
                </li>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <div 
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '15px 20px',
                      cursor: 'pointer',
                      color: '#333'
                    }}
                  >
                    <span>Products</span>
                    <span style={{ 
                      transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s'
                    }}>▼</span>
                  </div>
                  {mobileProductsOpen && (
                    <ul style={{
                      listStyle: 'none',
                      padding: '0 0 0 20px',
                      margin: 0,
                      backgroundColor: '#f5f5f5'
                    }}>
                      {products.map((product, index) => (
                        <li 
                          key={index} 
                          style={{
                            padding: '10px 20px',
                            borderBottom: '1px solid #eee',
                            backgroundColor: hoveredItem === index ? '#e0e0e0' : 'transparent',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={() => handleItemHover(index)}
                          onMouseLeave={handleItemLeave}
                        >
                          <a 
                            href={product.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              textDecoration: 'none',
                              color: hoveredItem === index ? '#006098' : '#333',
                              transform: hoveredItem === index ? 'translateX(10px)' : 'translateX(0)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Image
                              src={product.url}
                              width={30}
                              height={30}
                              alt={product.label}
                              style={{ 
                                objectFit: "contain",
                                transform: hoveredItem === index ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                            <span style={{
                              fontSize: '14px',
                              fontWeight: hoveredItem === index ? 'bold' : 'normal'
                            }}>
                              {product.label}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="/about" style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#333',
                    textDecoration: 'none'
                  }}>About Us</a>
                </li>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="/blogs" style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#333',
                    textDecoration: 'none'
                  }}>Blog</a>
                </li>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="/event" style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#333',
                    textDecoration: 'none'
                  }}>Event</a>
                </li>
                <li style={{
                  borderBottom: '1px solid #eee'
                }}>
                  <a href="/loging" style={{
                    display: 'block',
                    padding: '15px 20px',
                    color: '#333',
                    textDecoration: 'none'
                  }}>Login</a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    );
  });

  export default Header;

