'use client';
import { useRef, useEffect, useState } from 'react';
import Header from '../components/header';
import '../styles/_globals.scss';
import Footer from '../components/footer';
import Head from 'next/head';

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
        {/* Primary Meta Tags */}
        <title>TriQuench India Pvt Ltd - Intelligent Spindle Solutions</title>
        <meta
          name="description"
          content="TriQuench India Pvt Ltd, established in 2012 in Ahmedabad, specializes in CNC machine spindles, providing precision assembly services and world-class spindle repair solutions. Known for dynamic customer service and innovative spindle technology."
        />
        <meta name="keywords" content="CNC machine spindles, spindle repair, intelligent spindle solutions, CNC router spindle, belt-driven spindle, spindle accessories, TriQuench India, Ahmedabad, India" />
        <meta name="author" content="TriQuench India Pvt Ltd" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TriQuench India Pvt Ltd - Intelligent Spindle Solutions" />
        <meta
          property="og:description"
          content="Leading CNC spindle manufacturer in India, offering precision engineering, spindle repair services, and advanced spindle technology solutions."
        />
        <meta property="og:image" content="favicon/favicon-48x48.png" />
        <meta property="og:url" content="https://www.spindlemotor.in" />
        <meta property="og:site_name" content="TriQuench India Pvt Ltd" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TriQuench India Pvt Ltd - Intelligent Spindle Solutions" />
        <meta
          name="twitter:description"
          content="Your trusted partner in CNC spindle technology and repair services. Delivering excellence since 2012."
        />
        <meta name="twitter:image" content="favicon/favicon-48x48.png" />

        {/* Favicon */}
        <link rel="icon" href="favicon/favicon-48x48.png" />
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