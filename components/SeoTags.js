// components/SeoTags.js
import Head from "next/head";

const SeoTags = ({ title, description, keywords, url, image }) => {
  const meta = {
    title: title || "TriQuench India - CNC Spindle Motors & Accessories",
    description: description || "Leading CNC spindle motor manufacturer and supplier in India.",
    keywords: keywords || "CNC spindle motors, TriQuench, India",
    url: url || "https://www.triquenchindia.com",
    image: image || "https://www.triquenchindia.com/default-og-image.jpg",
  };

  return (
    <Head>
      {/* Basic SEO */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SeoTags;
