"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser, FaCalendar, FaBookOpen, FaEye } from "react-icons/fa";

export default function BlogDetail({ params }) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://d1w2b5et10ojep.cloudfront.net/api/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const popularPosts = [
    { id: 1, title: "Exploring AI in Web Development" },
    { id: 2, title: "Top JavaScript Frameworks in 2024" },
    { id: 3, title: "How to Build Scalable Web Applications" },
    { id: 4, title: "The Future of Progressive Web Apps" },
    { id: 5, title: "The Future of Progressive Web Apps" },
  ];

  if (!blog) return <p>Loading...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Default to row for desktop
        maxWidth: "1100px",
        margin: "20px auto",
        gap: "40px",
        fontFamily: "Arial, sans-serif",
        flexWrap: "wrap", // Allow wrapping in smaller screens
      }}
    >
      {/* Left Section: Blog Content */}
      <div
        style={{
          flex: "1",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Blog Image */}
        <div style={{ position: "relative" }}>
          <img
            src={blog.image?.url || "https://via.placeholder.com/800x400"}
            alt={blog.image?.alt_text || "Blog Image"}
            style={{
              width: "100%",
              height: "auto", // Changed from fixed 400px to auto
              maxHeight: "600px", // Added max height
              objectFit: "contain", // Changed from cover to contain
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          <div
            style={{
              position: "absolute", 
              top: "20px",
              left: "20px",
              display: "flex",
              gap: "10px",
            }}
          >
            {/* Dynamic Category */}
            <span
              style={{
                padding: "4px 10px",
                backgroundColor: "#3498db",
                color: "white",
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              {blog.category}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div style={{ padding: "32px" }}>
          <h1
            style={{
              fontSize: "3.3rem",
              fontWeight: "700",
              marginBottom: "24px",
              color: "#3498db",
            }}
          >
            {blog.title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "1.2rem",
              color: "#718096",
              marginBottom: "32px",
            }}
          >
            <span>
              <FaUser style={{ fontSize: "1.8rem", color: "#3498db" }} />{" "}
              {blog.author || "John Doe"}
            </span>
            <span>
              <FaCalendar style={{ fontSize: "1.8rem", color: "#3498db" }} />{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span>
              <FaBookOpen style={{ fontSize: "1.8rem", color: "#3498db" }} />{" "}
              {blog.sections?.length || 0} sections
            </span>
            <span>
              <FaEye style={{ fontSize: "1.8rem", color: "#3498db" }} />{" "}
              {blog.views} views
            </span>
          </div>
          <div
            style={{
              fontSize: "1.6rem",
              lineHeight: "1.8",
              marginBottom: "32px",
              color: "#333",
            }}
          >
            <p>{blog.description}</p>

            {/* Render Sections Dynamically */}
            {blog.sections?.map((section, index) => (
              <div key={index}>
                <h3
                  style={{
                    color: "#3498db",
                    marginTop: "32px",
                    fontSize: "2.5rem",
                  }}
                >
                  {section.title}
                </h3>
                <ul style={{ fontSize: "1.6rem", lineHeight: "1.6" }}>
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tags Section */}
          <div style={{ marginTop: "40px" }}>
            <h4
              style={{
                fontSize: "2rem",
                color: "#3498db",
                marginBottom: "10px",
              }}
            >
              Tags
            </h4>
            {blog.tags?.map((tag, index) => (
              <span
                key={index}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#3498db",
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Popular Posts */}
      <div
        style={{
          flex: "0 0 30%", // Default width for desktop
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          
          padding: "24px",
          height: "39rem"
          // minHeight: "auto", // Dynamically adjust the height to content
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#3498db",
            marginBottom: "24px",
          }}
        >
          Popular Posts
        </h2>
        {/* Popular Posts List */}
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          {popularPosts.map((post) => (
            <li
              key={post.id}
              style={{
                marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <a
                href="#"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#3498db",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#2980b9")}
                onMouseOut={(e) => (e.target.style.color = "#3498db")}
              >
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Media Queries for Mobile Responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column !important; /* Stack blog content and popular posts vertically on mobile */
            gap: 20px;
          }
          .blog-content {
            width: 100% !important;
          }
          .popular-posts {
            width: 100%;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
}
