// app/product/[id]/page.js
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

// Fetch product data on the server
async function fetchProductData(id) {
  try {
    const res = await fetch(`https://triquench-backend.vercel.app/api/product/${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const { id } = params;
  
  const product = await fetchProductData(id);

  if (!product) {
    return {
      title: "Product Not Found | TriQuench India",
      description: "The product you are looking for could not be found.",
    };
  }

  const title = product?.title || "Product Details";
  const description = product?.description
    ? product.description.substring(0, 160)
    : "View details for our product.";
  const imageUrl = product?.images?.[0]?.url || "/favicon/favicon-48x48.png";

  return {
    title: `${title} | TriQuench India`,
    description: description,
    alternates: {
      // ADDED: Canonical URL prevents duplicate content issues
      canonical: `https://www.triquenchindia.com/product/${id}`,
    },
    openGraph: {
      title: `${title} | TriQuench India`,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 540,
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

export default async function ProductDetailPage({ params }) {
  const { id } = params;
  const product = await fetchProductData(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}