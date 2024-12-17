"use client";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaBookOpen, FaUser } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [popularPosts, setPopularPosts] = useState([
    { title: "Exploring Advanced React Features", date: "November 15, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/jdScUnVP8pY0Ddkjgt3BoOHyvAzA60YKcyBiKNAAYs2Faz8E.jpg" },
    { title: "The Future of Artificial Intelligence", date: "November 20, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/IYRTjx8GzjoiIVs2BHiYkGsD6Pezs58Okatt7pr13iaP0m5JA.jpg" },
    { title: "Design Thinking in Modern Product Development", date: "November 25, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/NhgVZtdr8R5QEZoECoG24SzMBk4toe8wY3uo0bPXxlFO0m5JA.jpg" }
  ]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("http://triquench.ap-south-1.elasticbeanstalk.com/api/blog/getBlogs");
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
          backgroundImage: "url('https://res.cloudinary.com/dd1na5drh/image/upload/v1734419165/BLOG_HERO_LAPTOP_REACT_h9xms4.png')",
          height: "430px", // Adjust height
          width: "100%",   // Full width
          backgroundSize: "cover", // Cover the section
          backgroundPosition: "center", // Center image
          backgroundRepeat: "no-repeat", // No repeat
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
      </section>

      <div style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1200px",
        padding: "20px"
      }}>
        {/* Blog Section */}
        <div style={{ flex: "1 1 60%", paddingRight: "20px", boxSizing: "border-box" }}>
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
                  {/* Image */}
                  <div
                    style={{
                      backgroundColor: "#f7f7f7",
                      height: "150px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={blog.image?.url || "https://via.placeholder.com/600x400"}
                      alt={blog.image?.alt_text || "Blog Image"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Date, Category, and Author Section */}
                  <div style={{ padding: "5px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "12px", color: "#888", display: "flex", alignItems: "center" }}>
                      <FaCalendarAlt style={{ marginRight: "5px", fontSize: "16px" }} />
                      {new Date(blog.createdAt).toLocaleDateString()}
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
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
                    >
                      <FaTag style={{ marginRight: "5px", fontSize: "16px" }} />
                      {blog.category}
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div style={{ padding: "8px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "5px 0" }}>
                      {blog.title}
                    </h3>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px"
                    }}>
                      <FaUser style={{ marginRight: "5px" }} />
                      {blog.author}
                    </div>
                    <div style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                      {blog.description.length > 80 ? `${blog.description.substring(0, 80)}...` : blog.description}
                    </div>
                    <a
                      href={`/blogs/${blog._id}`}
                      style={{
                        color: "blue",
                        textDecoration: "none",
                        fontSize: "14px"
                      }}
                    >
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

        {/* Sidebar with Popular Posts */}
        <div style={{ flex: "1 1 10%", boxSizing: "border-box" }}>
          {/* Popular Posts Section */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px", 
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "15px",
              padding: "12px",
            }}
          >
            <h2 style={{fontSize: "18px", marginBottom: "10px"}}>Popular Posts</h2>
            <hr style={{
              border: "none", 
              height: "1px",
              backgroundColor: "#e5e7eb",
              margin: "10px 0"
            }} />
            <ul className="posts" style={{ listStyle: "none", padding: 0 }}>
              {popularPosts.map((post, index) => (
                <li
                  key={index}
                  className="post"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginBottom: "12px",
                    padding: "8px",
                    borderRadius: "4px",
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ 
                      width: "60px", 
                      height: "60px", 
                      borderRadius: "4px", 
                      marginRight: "12px",
                      objectFit: "cover"
                    }}
                  />
                  <div className="details" style={{ display: "flex", flexDirection: "column" }}>
                    <a 
                      href="#" 
                      style={{ 
                        textDecoration: "none", 
                        fontWeight: "500",
                        color: "#333",
                        fontSize: "14px",
                        marginBottom: "4px"
                      }}
                    >
                      {post.title}
                    </a>
                    <span className="date" style={{ color: "#666", fontSize: "12px" }}>
                      {post.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );  
}
