// components/SpindleMotorSEO.js
import React from "react";
import { useRouter } from "next/router";
import SeoTags from "./SeoTags";
import seoPages from "@/src/utils/seoData";

const SpindleMotorSEO = () => {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0]; // remove query params

  // Normalize path to match slugs in your seoPages config
  const normalizedSlug = currentPath === "/" ? "" : currentPath.replace(/^\/+|\/+$/g, "");

  // Find SEO entry matching full slug (e.g., "products/spindle")
  const seo = seoPages.find((page) => page.slug === normalizedSlug);

  if (!seo) return null;

  return (
    <SeoTags
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
    />
  );
};

export default SpindleMotorSEO;
