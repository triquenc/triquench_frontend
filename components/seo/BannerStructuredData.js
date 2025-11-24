import React from 'react';

// This component adds Organization and WebSite JSON-LD structured data for Google.
export default function BannerStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Triquench India Pvt. Ltd.",
        "url": "https://www.triquenchindia.com",
        "logo": "https://www.triquenchindia.com//images/site-logo.svg", // <-- UPDATE THIS to your real logo URL
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919601111615",
          "contactType": "customer service"
        }
      },
      {
        "@type": "WebSite",
        "name": "Triquench India",
        "url":  "https://www.triquenchindia.com",
        "potentialAction": {
          "@type": "SearchAction",
        //   "target": "https://www.triquench.com/products?q={search_term_string}", // <-- UPDATE THIS if your search URL is different
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}