// components/SpindleMotorSEO.js
import React from "react";
import { useRouter } from "next/router";
import SeoTags from "./SeoTags";
import seoPages from "@/src/utils/seoData"; // ✅ using absolute import

const SpindleMotorSEO = () => {
  const router = useRouter();

  // Handle root ("/") separately, otherwise get the last segment as slug
  const path = router.pathname === "/" ? "" : router.pathname.split("/").pop();

  // Find matching SEO entry
  const seo = seoPages.find((page) => page.slug === path);

  if (!seo) return null; // Fallback if no match found

  return (
    <SeoTags
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
    />
  );
};

export default SpindleMotorSEO;
