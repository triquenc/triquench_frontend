import React, { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

const Header = forwardRef((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false); // Track submenu state
  const [isMobile, setIsMobile] = useState(false); // Track mobile view

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Mobile if width is less than 768px
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("open-menu");
    } else {
      document.body.classList.remove("open-menu");
    }

    return () => {
      document.body.classList.remove("open-menu");
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Open submenu on mouse hover (desktop) or click (mobile)
  const handleMenuToggle = () => {
    if (isMobile) {
      setSubmenuOpen(!submenuOpen);
    }
  };

  // Open submenu on mouse hover (desktop)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setSubmenuOpen(true);
    }
  };

  // Close submenu when mouse leaves (desktop)
  const handleMouseLeave = () => {
    if (!isMobile) {
      setSubmenuOpen(false);
    }
  };

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
          <nav className={`navigation-wrapper ${menuOpen ? 'open' : ''}`}>
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
                onClick={handleMenuToggle} // Toggle submenu on click for mobile
              >
                <a title="Products" href="/products">
                  Products
                </a>
                {submenuOpen && (
                  <ul className="submenu">
                    <li>
                      <a href="/products/product1">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/SPINDLE_LINE_evvu8p.png"
                          alt="CNC Spindle Motor"
                          width={30}
                          height={30}
                        />
                        CNC Spindle Motor
                      </a>
                    </li>
                    <li>
                      <a href="/products/product2">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/SPINDLE_SERVO_LINE_q0nzbl.png"
                          alt="Spindle Servo Motor"
                          width={30}
                          height={30}
                        />
                        Spindle Servo Motor
                      </a>
                    </li>
                    <li>
                      <a href="/products/product3">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/AC_SERVO_LINE_k7ruph.png"
                          alt="AC Servo Motor"
                          width={30}
                          height={30}
                        />
                        AC Servo Motor
                      </a>
                    </li>
                    <li>
                      <a href="/products/product4">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/ROUTER_LINE_kbcmw2.png"
                          width={30}
                          height={30}
                        />
                        CNC Router Accessories
                      </a>
                    </li>
                    <li>
                      <a href="/products/product1">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/BEARING_LINE_ls3m9x.png"
                          alt="Spindle Bearing"
                          width={30}
                          height={30}
                        />
                        Spindle Bearing
                      </a>
                    </li>
                    <li>
                      <a href="/products/product2">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/GEARBOX_LINE_emcut4.png"
                          alt="Gearbox"
                          width={30}
                          height={30}
                        />
                        Gearbox
                      </a>
                    </li>
                    <li>
                      <a href="/products/product3">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/SPINDLE_ACCESSORIES_LINE_hla7p0.png"
                          alt="Spindle Accessories"
                          width={30}
                          height={30}
                        />
                        Spindle Accessories
                      </a>
                    </li>
                    <li>
                      <a href="/products/product4">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733221073/LASER_LINE_g7ky7p.png"
                          alt="Laser Parts"
                          width={30}
                          height={30}
                        />
                        Laser Parts
                      </a>
                    </li>
                    <li>
                      <a href="/products/product2">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220968/CONTROLLER_LINE_nthfof.png"
                          alt="Controller"
                          width={30}
                          height={30}
                        />
                        Controller
                      </a>
                    </li>
                    <li>
                      <a href="/products/product3">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/CHILLER_LINE_fedf7s.png"
                          alt="Chiller"
                          width={30}
                          height={30}
                        />
                        Chiller
                      </a>
                    </li>
                    <li>
                      <a href="/products/product4">
                        <img
                          src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733220967/TOOL_LINE_qv8quw.png"
                          alt="Engraving Tools"
                          width={30}
                          height={30}
                        />
                        Engraving Tools
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a title="Us" href="/about">
                  About Us
                </a>
              </li>
              <li>
                <a
                  title="Our Store"
                  href="https://shop.triquenchindia.com"
                  target="_blank"
                >
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
                <a title="Contact Us" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
          <div className="contact-wrapper d-flex align-center justify-end">
            <a
              href="tel:+919601111615"
              className="call-btn border-btn d-flex align-center"
            >
              CALL NOW{" "}
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
    </header>
  );
});

export default Header;
