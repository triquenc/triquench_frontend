"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUser, FaCalendar, FaBookOpen, FaEye } from "react-icons/fa";

export default function EventDetail({ params }) {
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    fetch(`http://localhost:5000/api/event/getEventById/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found or server error");
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load event. Please try again later.");
      });
  }, [id]);

  const popularPosts = [
    { id: 1, title: "Exploring AI in Web Development" },
    { id: 2, title: "Top JavaScript Frameworks in 2024" },
    { id: 3, title: "How to Build Scalable Web Applications" },
    { id: 4, title: "The Future of Progressive Web Apps" },
  ];

  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!blog) return <p style={{ textAlign: "center" }}>Loading event details...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        maxWidth: "1100px",
        margin: "20px auto",
        gap: "40px",
        fontFamily: "Arial, sans-serif",
        flexWrap: "wrap",
      }}
    >
      {/* Left: Blog Content */}
      <div
        style={{
          flex: "1",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={blog.image?.url || "https://via.placeholder.com/800x400"}
            alt={blog.image?.alt_text || "Event Image"}
            style={{
              width: "100%",
              maxHeight: "600px",
              objectFit: "contain",
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
            <span
              style={{
                padding: "4px 10px",
                backgroundColor: "#3498db",
                color: "white",
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {blog.category}
            </span>
          </div>
        </div>

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
              flexWrap: "wrap",
            }}
          >
            <span>
              <FaUser style={{ fontSize: "1.8rem", color: "#3498db" }} />{" "}
              {blog.author || "Admin"}
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
                  display: "inline-block",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Popular Posts */}
      <div
        style={{
          flex: "0 0 30%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          padding: "24px",
          height: "39rem",
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

      {/* Mobile Responsiveness */}
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            flex-direction: column !important;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
