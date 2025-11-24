'use client';
import { useRef, useEffect, useState } from 'react';
import Header from '../header';
import Footer from '../footer';

export default function PageWrapper({ children }) {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(headerRect.height);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    // This div now correctly applies the padding
    <div className="header-main-wrapper" style={{ paddingTop: `${headerHeight}px` }}>
      <Header ref={headerRef} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}