import React, { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

const Header = forwardRef((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
              <li>
                <a title="Us" href="/about">
                  About Us
                </a>
              </li>
              <li className="has-submenu">
                <a title="Products" href="/products">
                  Products
                </a>
              </li>
              <li>
                <a
                  title="Products"
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
            </ul>
          </nav>
          <div className="contact-wrapper d-flex align-center justify-end">
            <a href="/contact" className="border-btn">
              CONTACT US{" "}
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
