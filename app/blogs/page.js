"use client";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaBookOpen, FaUser } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [popularPosts, setPopularPosts] = useState([
    { title: "CNC Spindle Motor", imageUrl: "https://via.placeholder.com/80", id: "1" },
    { title: "CNC Router Accessories", imageUrl: "https://via.placeholder.com/80", id: "2" },
    { title: "Spindle Bearing", imageUrl: "https://via.placeholder.com/80", id: "3" },
    { title: "Fiber Laser Machine Parts", imageUrl: "https://via.placeholder.com/80", id: "4" },
    { title: "Engraving Tools", imageUrl: "https://via.placeholder.com/80", id: "5" },
  ]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("https://d1w2b5et10ojep.cloudfront.net/api/blog/getBlogs");
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        const data = await response.json();
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching all blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Banner Section */}
      <section
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dd1na5drh/image/upload/v1734609447/React_blog_Banner_desktop_ilhgqy.png')",
          height: "430px",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></section>

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
                  key={blog._id}
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
              <p>No blogs available.</p>
            )}
          </div>
        </div>

        {/* Popular Posts Sidebar */}
        <div
          style={{
            flex: "1 1 30%",
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#3498db" }}>Popular Posts</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {popularPosts.map((post) => (
              <li
                key={post.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: "60px", height: "60px", borderRadius: "8px", marginRight: "10px", objectFit: "cover" }}
                />
                <span style={{ fontSize: "14px", color: "#333" }}>{post.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
