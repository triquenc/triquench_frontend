import React, { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";

// This function generates the SEO Metadata automatically
export async function generateMetadata({ searchParams }) {
  const category = searchParams.category || "All Products";
  
  // Format the title (e.g., "cnc-spindle" becomes "Cnc Spindle")
  const readableCategory = category === "All Products" 
    ? "All Products" 
    : category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const title = category === "All Products" 
    ? "Our Products Catalogue | TriQuench India" 
    : `${readableCategory} | Buy CNC Spindles & Accessories | TriQuench`;

  const description = `Explore our range of ${readableCategory}. TriQuench India offers high-quality CNC Spindles, Motors, and Accessories.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://www.triquenchindia.com/products${category !== "All Products" ? `?category=${encodeURIComponent(category)}` : ''}`,
    },
    openGraph: {
      title: title,
      description: description,
    }
  };
}

export default function ProductsPage() {
  return (
    // Suspense is needed because we are using searchParams
    <Suspense fallback={<SimpleSpinner />}>
      <ProductsClient />
    </Suspense>
  );
}