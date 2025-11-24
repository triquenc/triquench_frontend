"use client";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";
import React, { useEffect, useState } from "react";
// We'll use these icons for the sidebar
import { FaUser, FaCalendarAlt, FaTag, FaPhone, FaEnvelope } from "react-icons/fa";



// B. MAIN PAGE COMPONENT
export default function BlogDetailPage({ params }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = params;

  useEffect(() => {
    if (!id) {
      setError("No blog ID provided.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://d1w2b5et10ojep.cloudfront.net/api/blog/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // C. RENDER STATES
  if (isLoading) {
    return (
      // Replaced Tailwind with .page-wrapper
      <div className="page-wrapper">
  <SimpleSpinner/>
      </div>
    );
  }
  
  if (error) {
    return (
      // Replaced Tailwind with .page-wrapper and .error-message
      <div className="page-wrapper error-message">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      // Replaced Tailwind with .page-wrapper
      <div className="page-wrapper">
        Blog post not found.
      </div>
    );
  }

  // D. MAIN LAYOUT (Data Loaded)
  return (
    <>
      {/* --- CSS STYLES --- */}
      <style>{`
        /* Page Wrappers */
        .page-wrapper {
          max-width: 1024px; /* max-w-6xl */
          margin-left: auto;
          margin-right: auto;
          padding: 2rem; /* p-8 */
        }
        .page-wrapper.error-message {
          text-align: center;
          color: #dc2626; /* text-red-600 */
        }

        /* Main Layout */
        .blog-container {
          max-width: 1280px; /* max-w-7xl */
          margin-left: auto;
          margin-right: auto;
          padding: 1rem; /* p-4 */
        }
        .blog-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem; /* gap-8 */
        }
        .main-content {
          width: 100%;
        }
        .sidebar {
          width: 100%;
        }

        /* Main Content Styles */
        .blog-title {
          font-size: 1.875rem; /* text-3xl */
          font-weight: 800; /* font-extrabold */
          color: #1e3a8a; /* text-blue-900 */
          margin-bottom: 1rem; /* mb-4 */
          line-height: 1.1; /* leading-tight */
        }
        .blog-description {
          font-size: 1.125rem; /* text-lg */
          color: #4b5563; /* text-gray-600 */
          margin-bottom: 1.5rem; /* mb-6 */
        }
        .blog-image {
          width: 100%;
          height: auto;
          border-radius: 0.5rem; /* rounded-lg */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
          margin-bottom: 2rem; /* mb-8 */
        }
        .blog-article {
          color: #1f2937; /* text-gray-800 */
          font-size: 1rem; /* text-base */
          line-height: 1.75; /* leading-relaxed */
        }
        .blog-article > section + section {
          margin-top: 2rem; /* space-y-8 */
        }
        .article-heading {
          font-size: 1.5rem; /* text-2xl */
          font-weight: 600; /* font-semibold */
          color: #111827; /* text-gray-900 */
          margin-bottom: 1rem; /* mb-4 */
        }
        .article-list {
          list-style-type: disc;
          padding-left: 1.5rem; /* pl-6 */
        }
        .article-list > li + li {
          margin-top: 0.5rem; /* space-y-2 */
        }
        
        /* Sidebar Styles */
        .sidebar-sticky-container {
          height: fit-content;
        }
        .sidebar-box {
          border: 1px solid #e5e7eb; /* border border-gray-200 */
          border-radius: 0.5rem; /* rounded-lg */
          padding: 1.5rem; /* p-6 */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); /* shadow-md */
          background-color: #ffffff; /* bg-white */
        }
        .call-now-button {
          display: block;
          width: 100%;
          text-align: center;
          background-color: #2563eb; /* bg-blue-600 */
          color: #ffffff; /* text-white */
          font-weight: 700; /* font-bold */
          padding: 0.75rem 1.5rem; /* py-3 px-6 */
          border-radius: 0.5rem; /* rounded-lg */
          font-size: 1.125rem; /* text-lg */
          text-decoration: none;
          transition: background-color 0.3s ease; /* transition duration-300 */
        }
        .call-now-button:hover {
          background-color: #1d4ed8; /* hover:bg-blue-700 */
        }

        /* Sidebar Meta */
        .meta-info-container {
          margin-top: 1.5rem; /* mt-6 */
        }
        .meta-info-container > div + div {
           margin-top: 1.25rem; /* space-y-5 */
        }
        .meta-heading {
          font-size: 0.875rem; /* text-sm */
          font-weight: 600; /* font-semibold */
          color: #6b7280; /* text-gray-500 */
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem; /* gap-2 */
        }
        .meta-value {
          font-size: 1.125rem; /* text-lg */
          color: #111827; /* text-gray-900 */
          margin-top: 0.25rem; /* mt-1 */
        }
        .meta-heading-tags {
          font-size: 0.875rem; /* text-sm */
          font-weight: 600; /* font-semibold */
          color: #6b7280; /* text-gray-500 */
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem; /* gap-2 */
          margin-bottom: 0.5rem; /* mb-2 */
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem; /* gap-2 */
        }
        .tag-pill {
          background-color: #e5e7eb; /* bg-gray-200 */
          color: #1f2937; /* text-gray-800 */
          padding: 0.25rem 0.75rem; /* px-3 py-1 */
          border-radius: 9999px; /* rounded-full */
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
        }
        
        /* Sidebar Contact */
        .contact-info-container {
          border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
          margin-top: 1.5rem; /* mt-6 */
          padding-top: 1.5rem; /* pt-6 */
        }
        .contact-heading {
          font-size: 0.875rem; /* text-sm */
          font-weight: 600; /* font-semibold */
          color: #6b7280; /* text-gray-500 */
          text-transform: uppercase;
          margin-bottom: 0.75rem; /* mb-3 */
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem; /* gap-2 */
          color: #1f2937; /* text-gray-800 */
          font-size: 1.125rem; /* text-lg */
        }
        .contact-item-mt2 {
          display: flex;
          align-items: center;
          gap: 0.5rem; /* gap-2 */
          color: #1f2937; /* text-gray-800 */
          font-size: 1.125rem; /* text-lg */
          margin-top: 0.5rem; /* mt-2 */
        }

        /* --- Responsive Styles --- */
        
        /* Medium screens (md) - 768px */
        @media (min-width: 768px) {
          .blog-container {
            padding: 2rem; /* md:p-8 */
          }
          .blog-title {
            font-size: 3rem; /* md:text-5xl */
          }
          .blog-description {
            font-size: 1.25rem; /* md:text-xl */
          }
          .blog-article {
            font-size: 1.125rem; /* md:text-lg */
          }
          .article-heading {
            font-size: 1.875rem; /* md:text-3xl */
          }
        }
        
        /* Large screens (lg) - 1024px */
        @media (min-width: 1024px) {
          .blog-layout {
            flex-direction: row; /* lg:flex-row */
            gap: 3rem; /* lg:gap-12 */
          }
          .main-content {
            width: 66.666667%; /* lg:w-2/3 */
          }
          .sidebar {
            width: 33.333333%; /* lg:w-1/3 */
          }
          .sidebar-sticky-container {
            position: sticky;
            top: 2rem; /* lg:top-8 */
          }
        }
      `}</style>
      
      <div className="blog-container">
        <div className="blog-layout">
          
          {/* --- 1. MAIN CONTENT (LEFT COLUMN) --- */}
          <main className="main-content">
            <h1 className="blog-title">
              {data.title}
            </h1>
            <p className="blog-description">
              {data.description}
            </p>

            {data.image?.url && (
              <img
                src={data.image.url}
                alt={data.title}
                className="blog-image"
              />
            )}

            <article className="blog-article">
              {data.sections?.map((section, i) => (
                <section key={i}>
                  {section.title && (
                    <h3 className="article-heading">
                      {section.title}
                    </h3>
                  )}
                  {Array.isArray(section.content) && (
                    <ul className="article-list">
                      {section.content.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>
          </main>

          {/* --- 2. SIDEBAR (RIGHT COLUMN) --- */}
          <aside className="sidebar">
            <div className="sidebar-sticky-container">
              <div className="sidebar-box">
                
                <a 
                  href="tel:+919601111615"
                  className="call-now-button"
                >
                  CALL NOW
                </a>

                <div className="meta-info-container">
                  <div>
                    <h4 className="meta-heading">
                      <FaUser /> Author
                    </h4>
                    <p className="meta-value">
                      {data.author || "TriQuench India"}
                    </p>
                  </div>
                  <div>
                    <h4 className="meta-heading">
                      <FaCalendarAlt /> Date
                    </h4>
                    <p className="meta-value">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="meta-heading-tags">
                      <FaTag /> Tags
                    </h4>
                    <div className="tags-container">
                      {(data.tags || [data.category] || []).map((tag) => (
                        tag && (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                <div className="contact-info-container">
                  <h4 className="contact-heading">
                    Contact Person
                  </h4>
                  <p classNameclassName="contact-item">
                    <FaUser />
                    Kaushal Panchal
                  </p>
                  <p className="contact-item-mt2">
                    <FaPhone />
                    +91 96011 11615
                  </p>
                  <p className="contact-item-mt2">
                    <FaEnvelope />
                    info@triquenchindia.com
                  </p>
                </div>

              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </>
  );
}