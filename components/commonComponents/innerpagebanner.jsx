import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function InnerPageBanner({
  title,
  subtitle,
  paragraph,
  bannerImage,
  buttonText,
  buttonUrl,
  className,
}) {
  return (
    <>
      <section className={`inner-page-banner ${className || ""}`}>
        <div className="container">
          <div className="inner-page-banner-wrapper">
            <div className="inner-page-banner-left">
              <span className="sub-title">{subtitle}</span>
              {/* SEO: Main H1 for the page context */}
              <h1 className="has-green-bar">{title}</h1>
              <p>{paragraph}</p>
              {buttonText && (
                <Link
                  href={buttonUrl || "#"}
                  className="banner-button"
                  aria-label={`${buttonText} - ${title}`} // SEO: Accessibility improvement
                >
                  {buttonText}
                </Link>
              )}
            </div>
            <div className="inner-page-banner-right">
              {/* Next.js Image Component for optimization */}
              <Image
                src={bannerImage}
                alt={`${title} Banner`} // SEO: Dynamic Alt Text
                height={470}
                width={630}
                title={title} // SEO: Image Title attribute
                priority={true} // Performance: Preloads image for better LCP scores
                quality={90} // Optional: ensures high quality for banner images
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}