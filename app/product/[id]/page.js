import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient'; // We will create this file next

// --- This function fetches data on the server ---
async function fetchProductData(id) {
  // Fixed linting errors in the URL
  const res = await fetch(`https://triquench-backend.vercel.app/api/product/${id}`);
  if (!res.ok) {
    return null; // Return null if not found
  }
  return await res.json();
}

// --- DYNAMIC SEO FUNCTION ---
export async function generateMetadata({ params }) {
  const { id } = params;
  
  const product = await fetchProductData(id);

  if (!product) {
    // Handle product not found case
    return {
      title: "Product Not Found | TriQuench India",
      description: "The product you are looking for could not be found.",
    };
  }

  // Ensure product and properties exist before accessing them
  const title = product?.title || "Product Details";
  // Fixed linting errors in the description
  const description = product?.description
    ? product.description.substring(0, 160) // Truncate description
    : "View details for our product.";
  const imageUrl = product?.images?.[0]?.url || "/favicon/favicon-48x48.png"; // Fallback image

  return {
    title: `${title} | TriQuench India`,
    description: description,
    openGraph: {
      title: `${title} | TriQuench India`,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 540, // Specify image dimensions
          height: 496,
          alt: product?.images?.[0]?.alt_text || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | TriQuench India`,
      description: description,
      images: [imageUrl],
    },
  };
}
// --- END OF SEO FUNCTION ---


// --- SERVER PAGE COMPONENT ---
export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await fetchProductData(id);

  if (!product) {
    // This will automatically show the not-found.js file
    notFound();
  }

  // Pass the server-fetched product data to the client component
  return <ProductDetailClient product={product} />;
}