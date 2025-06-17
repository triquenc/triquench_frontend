"use client";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaBookOpen, FaUser } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [popularPosts, setPopularPosts] = useState([
    { title: "Blood Donation", date: "November 15, 2024", link: "/event" },
    { title: "The Future of Artificial Intelligence", date: "November 20, 2024", link: "/event" },
    { title: "Design Thinking in Modern Product Development", date: "November 25, 2024", link: "/event" },
  ]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs/getBlogs");
        const data = await response.json();
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching all blogs:", error);
      }
    };
    fetchAllBlogs();
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Banner */}
      <section
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dd1na5drh/image/upload/v1732516970/WhatsApp-Image-2024-01-18-at-12.47.26-PM_odprx9.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: '430px',
          width: '100%',
          textAlign: 'center',
        }}
      />

      {/* Blog Section and Sidebar */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          gap: "20px"
        }}
      >
        {/* Blog Cards */}
        <div style={{ flex: "1 1 65%", boxSizing: "border-box" }}>
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
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: "150px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={blog.image?.url || "https://via.placeholder.com/600x400"}
                      alt={blog.image?.alt_text || "Blog Image"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Meta Info */}
                  <div style={{ padding: "8px 10px", fontSize: "12px", color: "#666" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span><FaCalendarAlt style={{ marginRight: 4 }} />{new Date(blog.createdAt).toLocaleDateString()}</span>
                      <span style={{ backgroundColor: "#3498db", color: "#fff", padding: "2px 8px", borderRadius: "12px", display: "flex", alignItems: "center" }}>
                        <FaTag style={{ marginRight: 4 }} />{blog.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "0 10px 10px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "6px 0" }}>{blog.title}</h3>
                    <div style={{ fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                      <FaUser style={{ marginRight: 4 }} />
                      {blog.author || "Admin"}
                    </div>
                    <p style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
                      {blog.description?.length > 80
                        ? `${blog.description.substring(0, 80)}...`
                        : blog.description || "No description available."}
                    </p>
                    <a
                      href={`/blogs/${blog._id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#3498db",
                        textDecoration: "none",
                        fontSize: "14px"
                      }}
                    >
                      <FaBookOpen style={{ marginRight: 6 }} />
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
        <div style={{ flex: "1 1 30%", boxSizing: "border-box" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Popular Posts</h3>
            <hr style={{ margin: "10px 0", borderColor: "#eee" }} />
            <ul style={{ listStyle: "none", padding: 0 }}>
              {popularPosts.map((post, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <a
                    href={post.link}
                    style={{
                      textDecoration: "none",
                      color: "#333",
                      fontWeight: "500",
                      fontSize: "14px",
                      display: "block",
                      marginBottom: "4px"
                    }}
                  >
                    {post.title}
                  </a>
                  <span style={{ fontSize: "12px", color: "#888" }}>{post.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
