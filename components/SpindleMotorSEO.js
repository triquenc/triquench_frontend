// components/SpindleMotorSEO.js
import React from "react";
import { useRouter } from "next/router";
import SeoTags from "./SeoTags";
import seoPages from "@/src/utils/seoData";

const SpindleMotorSEO = () => {
  const router = useRouter();
  const currentPath = router.asPath.split("?")[0];

  const normalizedSlug = currentPath
    .replace(/\/+$/, "")   // remove trailing slash
    .replace(/^\/+/, "");  // remove leading slash

  const seo =
    seoPages.find((page) => normalizedSlug === page.slug) ||
    seoPages.find((page) => normalizedSlug.startsWith(page.slug));

  if (process.env.NODE_ENV === "development") {
    console.log("SEO Match:", normalizedSlug, seo);
  }

  if (!seo) {
    return (
      <SeoTags
        title="TriQuench India - CNC Spindle Motors & Accessories"
        description="Premium quality CNC spindle motors and machine accessories from TriQuench India. Trusted manufacturer and supplier."
        keywords="CNC spindle motor, CNC accessories, TriQuench India"
      />
    );
  }

  return (
    <SeoTags
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      url={seo.url}
      image={seo.image}
    />
  );
};

export default SpindleMotorSEO;
