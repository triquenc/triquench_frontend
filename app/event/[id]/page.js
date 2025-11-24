"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  ThumbsUp,
  Share,
  Tag,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import SimpleSpinner from "@/components/commonComponents/SimpleSpinner";

export default function EventDetails({ params }) {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  // Comment State
  const [commentUser, setCommentUser] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [hasLiked, setHasLiked] = useState(false);

  // Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://d1w2b5et10ojep.cloudfront.net/api/event/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle Comment Submit
  async function handleCommentSubmit(e) {
    e.preventDefault();

    if (!commentUser || !commentContent) {
      alert("Both name and comment are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://d1w2b5et10ojep.cloudfront.net/api/event/create-comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: event._id,
            user: commentUser,
            content: commentContent,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add comment");

      const result = await response.json();

      // Refetch event
      const eventResponse = await fetch(
        `https://d1w2b5et10ojep.cloudfront.net/api/event/getEventById/${event._id}`
      );

      const updatedEvent = await eventResponse.json();
      setEvent(updatedEvent);

      setCommentUser("");
      setCommentContent("");

      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("Error adding comment: " + error.message);
    }
  }

  // Handle Like
  const handleLikeClick = async () => {
    if (hasLiked) return;

    try {
      const response = await fetch(
        `https://d1w2b5et10ojep.cloudfront.net/api/event/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: event._id }),
        }
      );

      if (!response.ok) throw new Error("Failed to like the event");

      const result = await response.json();

      // Refetch updated event
      const updatedRes = await fetch(
        `https://d1w2b5et10ojep.cloudfront.net/api/event/getEventById/${event._id}`
      );

      const updatedEvent = await updatedRes.json();
      setEvent(updatedEvent);

      setHasLiked(true);

      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      alert("Error liking event: " + error.message);
    }
  };

  if (loading) return <SimpleSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div
      className="page-root"
      style={{
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Success Message */}
      {successMessage && (
        <div className="success-toast">
          {successMessage}
        </div>
      )}

      <main className="page-main">
        <div className="content-row">
          {/* Left Section */}
          <div className="left-section">
            {/* Event Details */}
            <div className="card">
              {/* Image */}
              <div
                className="image-cover"
                style={{
                  backgroundImage: `url(${event?.image?.url ?? "https://via.placeholder.com/400"})`,
                }}
              >
                {event?.socialLinks?.map((social, i) => {
                  const map = {
                    facebook: { color: "#1877f2", icon: <FaFacebookF /> },
                    instagram: { color: "#E1306C", icon: <FaInstagram /> },
                    linkedin: { color: "#0077b5", icon: <FaLinkedinIn /> },
                  };

                  const style = map[social.platform];
                  if (!style) return null;

                  return (
                    <a
                      key={i}
                      href={social.url}
                      className="social-icon"
                      style={{ backgroundColor: style.color }}
                    >
                      {style.icon}
                    </a>
                  );
                })}
              </div>

              {/* Title */}
              <h1 className="event-title">
                {event.title}
              </h1>

              {/* Meta */}
              <div className="meta-row">
                <div className="meta-left">
                  <Calendar style={{ marginRight: 5 }} />
                  {new Date(event.createdAt).toLocaleDateString()}
                  <MapPin style={{ marginLeft: 20, marginRight: 5 }} />
                  {event.location}
                </div>

                <span className="category-pill">
                  <Tag /> {event.category}
                </span>
              </div>

              {/* Description */}
              <strong>Description:</strong>
              <p className="description-text">{event.description}</p>

              {/* Likes */}
              <div className="likes-row">
                <div
                  onClick={handleLikeClick}
                  className={`like-button ${hasLiked ? 'liked' : ''}`}
                  role="button"
                >
                  <ThumbsUp style={{ marginRight: 5 }} />
                  {event.likes} Likes
                </div>

                <div className="share-button">
                  <Share style={{ marginRight: 5 }} /> Share
                </div>
              </div>
            </div>
          </div>

          {/* Right Section – Related */}
          <div className="right-section">
            <h2 className="related-heading">Related Events</h2>

            {/* Static Related List */}
            {[
              { id: 1, title: "Jazz in the Park", date: "Aug 5", location: "NYC" },
              { id: 2, title: "Rock Concert", date: "Sep 15", location: "NYC" },
            ].map((e) => (
              <div key={e.id} className="related-card">
                <div className="related-image" />
                <h3 className="related-title">{e.title}</h3>
                <div className="related-meta">
                  <Calendar size={14} /> {e.date} — <MapPin size={14} /> {e.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Responsive styles (keeps existing inline behavior but adds overrides for small screens) */}
      <style>{`
        .page-main { max-width: 1200px; margin: 0 auto; padding: 32px 16px; }
        .content-row { display: flex; gap: 32px; }
        .left-section { width: 70%; display: flex; flex-direction: column; gap: 32px; }
        .right-section { width: 30%; padding: 20px; background: white; border-radius: 12px; border: 2px solid #e5e7eb; }

        .card { background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 20px; }
        .image-cover { position: relative; height: 400px; background-size: cover; background-position: center; border-radius: 8px; }
        .social-icon { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; display:flex; align-items:center; justify-content:center; color: #fff; margin-left: 8px; }

        .event-title { font-size: 24px; font-weight: 700; margin-top: 20px; }
        .meta-row { display:flex; justify-content: space-between; color: #666; margin-bottom: 10px; align-items:center; }
        .meta-left { display:flex; align-items:center; }
        .category-pill { background-color: #e0f2fe; padding: 6px 12px; border-radius: 20px; display:flex; align-items:center; gap:5px; }

        .description-text { white-space: pre-wrap; }
        .likes-row { display:flex; margin-top:20px; }
        .like-button { cursor: pointer; margin-right: 20px; display:flex; align-items:center; }
        .like-button.liked { color: red; cursor: default; }
        .share-button { display:flex; align-items:center; }

        /* Related list */
        .related-heading { font-size: 18px; font-weight:700; margin-bottom:10px; }
        .related-card { border: 2px solid #e5e7eb; padding: 10px; border-radius: 12px; margin-bottom: 20px; }
        .related-image { height: 150px; background: url(https://via.placeholder.com/400) center/cover; border-radius: 8px; }
        .related-title { font-size: 14px; font-weight:700; margin-top:10px; }
        .related-meta { font-size: 12px; color:#555; display:flex; gap:8px; align-items:center; }

        /* Success toast */
        .success-toast {
          position: fixed; top: 120px; right: 20px; background-color: #d4edda; color: #155724; padding: 10px 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); z-index: 1000;
        }

        /* Responsive overrides */
        @media (max-width: 1024px) {
          .image-cover { height: 320px !important; }
        }

        @media (max-width: 768px) {
          .content-row { flex-direction: column; }
          .left-section { width: 100% !important; }
          .right-section { width: 100% !important; }
          .image-cover { height: 300px !important; }
          .page-main { padding: 20px 12px; }
        }

        @media (max-width: 420px) {
          .image-cover { height: 220px !important; border-radius: 6px; }
          .event-title { font-size: 20px !important; }
          .meta-row { flex-direction: column; align-items: flex-start; gap: 8px; }
          .category-pill { padding: 4px 10px; }
          .related-image { height: 120px; }
          .page-main { padding: 16px 10px; }
          .card { padding: 14px; }
          .related-card { padding: 8px; }
        }

        @media (max-width: 360px) {
          .image-cover { height: 180px !important; }
          .event-title { font-size: 18px !important; }
          .success-toast { top: 90px; right: 12px; padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
}