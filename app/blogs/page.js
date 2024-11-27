"use client";
import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTag, FaBookOpen, FaList, FaUser } from "react-icons/fa";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categories, setCategories] = useState([
    "All Categories", "CNC Spindle Motor", "Spindle Servo Motor", "AC Servo Motor", "CNC Router Accessories", "Spindle Bearing", "Gearbox", "Spindle Accessories", "Laser Parts", "Controller", "Chiller", "Engraving Tools", "Laser Parts", "Controller", 
  ]);
  const [popularPosts, setPopularPosts] = useState([
    { title: "Exploring Advanced React Features", date: "November 15, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/jdScUnVP8pY0Ddkjgt3BoOHyvAzA60YKcyBiKNAAYs2Faz8E.jpg" },
    { title: "The Future of Artificial Intelligence", date: "November 20, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/IYRTjx8GzjoiIVs2BHiYkGsD6Pezs58Okatt7pr13iaP0m5JA.jpg" },
    { title: "Design Thinking in Modern Product Development", date: "November 25, 2024", imageUrl: "https://storage.googleapis.com/a1aa/image/NhgVZtdr8R5QEZoECoG24SzMBk4toe8wY3uo0bPXxlFO0m5JA.jpg" }
  ]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        const data = await response.json();
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching all blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  const filteredBlogs = selectedCategory === "All Categories"
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <section style={{
        backgroundImage: "url('https://thumbs.dreamstime.com/b/national-manufacturing-week-background-banner-design-template-observed-every-year-october-holiday-concept-card-poster-336989364.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        width: '100%',
      }}>
        <div style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}></div>
        <h1 style={{ fontSize: '3rem', position: 'relative', zIndex: 1 }}>Discover Amazing Blogs</h1>
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
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
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
                      height: "150px", // Reduced height from 200px
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

        {/* Sidebar with Categories and Popular Posts */}
        <div style={{ flex: "1 1 10%", boxSizing: "border-box" }}>
          {/* Blog Categories Section */}
          <div
            style={{
              backgroundColor: "#fff", 
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "15px",
              padding: "12px",
            }}
          >
            <h2 style={{fontSize: "18px", marginBottom: "10px"}}>Blog Categories</h2>
            <hr style={{
              border: "none",
              height: "1px",
              backgroundColor: "#e5e7eb",
              margin: "10px 0"
            }} />
            <ul className="categories" style={{ listStyle: "none", padding: 0 }}>
              {categories.map((category, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      textDecoration: "none",
                      color: selectedCategory === category ? "#fff" : "#333",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: selectedCategory === category ? "#3b82f6" : "transparent",
                      padding: "8px 15px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      transition: "background-color 0.3s, color 0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <FaList style={{ marginRight: "10px", fontSize: "14px" }} />
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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
                    ':hover': {
                      backgroundColor: "#f5f5f5"
                    }
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