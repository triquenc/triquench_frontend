"use client";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaBookOpen, FaUser } from "react-icons/fa"; // Removed FaRegComment
import "./Blogs.css";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  // Removed unused 'popularPosts' and 'setPopularPosts' state

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("https://d1w2b5et10ojep.cloudfront.net/api/blog");
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        
        const data = await response.json();
        
        // --- THIS IS THE MAIN FIX ---
        // We set the state to data.blogs (the array)
        // not 'data' (the whole object)
        setBlogs(data.blogs || []); 
        // --- END OF FIX ---

      } catch (error) {
        console.error("Error fetching all blogs:", error);
        setBlogs([]); // Set to empty array on error to prevent crash
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Banner Section */}
      <section className="blog-banner" aria-label="Blog banner">
        <div className="blog-banner__frame">
          <img
            className="blog-banner__img"
            src="https://res.cloudinary.com/dd1na5drh/image/upload/v1734609447/React_blog_Banner_desktop_ilhgqy.png"
            alt="Blog banner"
            loading="eager"
            decoding="async"
            srcSet="
              https://res.cloudinary.com/dd1na5drh/image/upload/w_480/v1734609448/React_blog_Banner_mobile_wugyfv.png 480w,
              https://res.cloudinary.com/dd1na5drh/image/upload/w_768/v1734609448/React_blog_Banner_tablet_cdwtrq.png 768w,
              https://res.cloudinary.com/dd1na5drh/image/upload/w_1200/v1734609447/React_blog_Banner_desktop_ilhgqy.png 1200w,
              https://res.cloudinary.com/dd1na5drh/image/upload/w_1800/v1734609447/React_blog_Banner_desktop_ilhgqy.png 1800w
            "
            sizes="(max-width: 425px) 100vw, (max-width: 991px) 100vw, 100vw"
            onError={(e) => {
              console.error("Banner image failed to load:", e?.target?.src);
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='400' viewBox='0 0 1200 400'%3E%3Crect width='1200' height='400' fill='%23e6e6e6'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='24'%3EBanner+image+not+available%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
      </section>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Blog Section */}
        <div style={{ flex: "1 1 65%", paddingRight: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "20px",
            }}
          >
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog._id} // Using the unique _id from your data
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                  }}
                >
                  <div style={{ height: "150px", overflow: "hidden" }}>
                    <img
                      src={blog.image?.url || "https://via.placeholder.com/600x400"}
                      alt={blog.image?.alt_text || "Blog Image"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ padding: "5px 10px", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "12px", color: "#888", display: "flex", alignItems: "center" }}>
                      <FaCalendarAlt style={{ marginRight: "5px" }} />
                      {/* Using 'createdAt' from your API data */}
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#3498db",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaTag style={{ marginRight: "5px" }} />
                      {blog.category || "Uncategorized"}
                    </div>
                  </div>

                  <div style={{ padding: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "5px 0" }}>{blog.title}</h3>
                    <div style={{ fontSize: "12px", color: "#888", display: "flex", alignItems: "center", marginBottom: "8px" }}>
                      <FaUser style={{ marginRight: "5px" }} />
                      {blog.author || "Unknown Author"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                      {blog.description ? (blog.description.length > 80 ? `${blog.description.slice(0, 80)}...` : blog.description) : "No description available."}
                    </div>
                    <a href={`/blogs/${blog._id}`} style={{ color: "#3498db", textDecoration: "none", fontSize: "14px" }}>
                      <FaBookOpen style={{ marginRight: "5px" }} />
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // This will now only show if data.blogs is truly empty
              <p>No blogs available.</p>
            )}
          </div>
        </div>
        
        {/* I removed the sidebar code because its state 
          (popularPosts) was removed for the lint fix.
        */}
      </div>
    </div>
  );
}