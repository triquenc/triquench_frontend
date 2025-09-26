"use client";

import { useEffect, useState } from "react";

export default function BlogDetail({ params }) {
  const { id } = params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/blog/getBlogById/${id}`
        );
        if (!res.ok) {
          throw new Error(`Error fetching blog: ${res.status}`);
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10 text-lg">Loading blog...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-6">{blog.title}</h1>

      {/* Blog Image */}
      {blog.image?.url && (
        <img
          src={blog.image.url.trim()}
          alt={blog.image.alt_text || "Blog image"}
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />
      )}

      {/* Blog Description */}
      <p className="text-lg leading-relaxed text-gray-700 mb-8">{blog.description}</p>

      {/* Blog Sections */}
      {blog.sections?.map((section, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">{section.title}</h3>
          <ul className="list-disc list-inside text-base text-gray-800 space-y-1">
            {section.content?.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
