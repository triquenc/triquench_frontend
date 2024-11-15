'use client';
import { useRef, useEffect, useState } from 'react';
import Header from '../components/header';
import '../styles/_globals.scss';
import Footer from '../components/footer';


export default function RootLayout({ children }) {
    const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        setHeaderHeight(headerRect.height); // Set the state to header height
      }
    };

    // Call this function to set initial height
    updateHeaderHeight();

    // Use ResizeObserver to detect header size changes
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight(); // Update height on resize
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current); // Start observing the header
    }

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <html lang="en">
     <head>
            <link rel="icon" type="image/png" href="favicon/favicon-48x48.png" sizes="48x48" />
            <link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
            <link rel="shortcut icon" href="favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
            <link rel="manifest" href="favicon/site.webmanifest" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header-main-wrapper" style={{ paddingTop: `${headerHeight}px` }}>
            <Header ref={headerRef} />
            <main>{children}</main>
            <Footer/>
        </div>
      </body>
    </html>
  );
}