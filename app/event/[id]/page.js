"use client";  // Add this line to specify this is a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Calendar, MapPin, ThumbsUp, MessageCircle, Share, Send, Tag, User } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function EventDetails({ params }) {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  // State for the comment form
  const [commentUser , setCommentUser ] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [hasLiked, setHasLiked] = useState(false); // State to track if the event is liked

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
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

  async function handleCommentSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Validate comment input
    if (!commentUser || !commentContent) {
        alert('Both name and comment are required.');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/event/create-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: event._id, // Use the event ID from the state
                user: commentUser,
                content: commentContent,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add comment');
        }

        const result = await response.json();

        if (result.success) {
            // Refetch the event details to update the state
            const eventResponse = await fetch(`http://localhost:5000/api/events/${event._id}`);
            if (!eventResponse.ok) {
                throw new Error('Failed to fetch updated event details');
            }
            const updatedEvent = await eventResponse.json();
            setEvent(updatedEvent); // Update the event state with the new data

            // Reset comment form fields
            setCommentUser('');
            setCommentContent('');

            // Set success message from backend response
            setSuccessMessage(result.message);
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } else {
            throw new Error('Failed to add comment');
        }
    } catch (error) {
        console.error('Error adding comment:', error); // Log the error for debugging
        setError(error.message); // Handle error properly
        alert('Error adding comment: ' + error.message); // Show alert for errors
    }
  }

  const relatedEvents = [
    { id: 1, title: "Jazz in the Park", date: "August 5, 2023", location: "Central Park, New York" },
    { id: 2, title: "Rock Concert", date: "September 15, 2023", location: "Madison Square Garden, New York" },
    { id: 3, title: "EDM Night Festival", date: "October 1, 2023", location: "Brooklyn Steel, New York" },
  ];

  const handleLikeClick = async () => {
    if (hasLiked) return; // Prevent further clicks if already liked

    try {
      const response = await fetch(`http://localhost:5000/api/event/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: event._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the event');
      }

      const result = await response.json();

      // Refetch the event details to update the state
      const eventResponse = await fetch(`http://localhost:5000/api/events/${event._id}`);
      if (!eventResponse.ok) {
        throw new Error('Failed to fetch updated event details');
      }

      const updatedEvent = await eventResponse.json();
      setEvent(updatedEvent); // Update the event state with the new data
      
      // Mark as liked
      setHasLiked(true);

      // Set success message from backend response
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error liking event:', error);
      alert('Error liking event: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      fontFamily: 'Arial, sans-serif',
      margin: '0',
      padding: '0',
    }}>
      {/* Display success message if it exists */}
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '120px',
          right: '20px',
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          transform: successMessage ? 'translateX(0)' : 'translateX(100%)',
          zIndex: 1000,
        }}>
          {successMessage}
        </div>
      )}
      
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px',
      }}>
        <div style={{
          display: 'flex',
          gap: '32px',
        }}>
          {/* Left Section - Event Details and Comments */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            width: '70%',
          }}>
            {/* Event Details Section */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.3s',
            }}>
              <div style={{
                position: 'relative',
                height: '400px',
                backgroundImage: `url(${event.image && event.image.url ? event.image.url : 'https://via.placeholder.com/400x400'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
              }}>
                {event.socialLinks.map((social, index) => {
                  const socialStyles = {
                    facebook: {
                      backgroundColor: '#1877f2',
                      icon: <FaFacebookF />
                    },
                    instagram: {
                      backgroundColor: '#E1306C',
                      icon: <FaInstagram />
                    },
                    linkedin: {
                      backgroundColor: '#0077b5',
                      icon: <FaLinkedinIn />
                    }
                  };

                  const style = socialStyles[social.platform];
                  if (!style) return null;

                  return (
                    <a
                      key={index}
                      href={social.url}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: `${10 + (index * 40)}px`,
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        backgroundColor: style.backgroundColor
                      }}
                    >
                      {style.icon}
                    </a>
                  );
                })}
              </div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                margin: '20px 0 10px',
              }}>
                {event.title}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#666',
                fontSize: '14px',
                marginBottom: '10px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Calendar style={{ marginRight: '5px' }} />
                  <span style={{ marginRight: '20px' }}>{new Date(event.createdAt).toLocaleDateString()}</span>
                  <MapPin style={{ marginRight: '5px' }} />
                  <span>{event.location}</span>
                </div>
                <span style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Tag style={{ marginRight: '5px' }} />
                  {event.category}
                </span>
              </div>
              <div style={{ margin: '20px 0' }}>
                <strong>Description</strong>
                <p>
                  {event.description}
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#666',
                fontSize: '14px',
                marginBottom: '20px',
              }}>
                <div 
                  style={{ 
                    marginRight: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    cursor: hasLiked ? 'default' : 'pointer', 
                    color: hasLiked ? 'red' : 'inherit' 
                  }} 
                  onClick={handleLikeClick}
                >
                  <ThumbsUp style={{ marginRight: '5px' }} />
                  <span>{event.likes} Likes</span>
                </div>
                <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                  <MessageCircle style={{ marginRight: '5px' }} />
                  <span>{event.comments.length} Comments</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Share style={{ marginRight: '5px' }} />
                  <span>Share</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
            }}>
            <strong>Comments ( {event.comments.length} )</strong>
              {event.comments.map((comment, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f8f8',
                  padding: '10px',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}>
                  <div style={{ 
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <User  size={16} />
                    {comment.user}
                  </div>
                  <div style={{ marginTop: '5px' }}>• {comment.content}</div>
                </div>
              ))}
              <form onSubmit={handleCommentSubmit} style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                marginTop: '10px',
                padding: '15px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ width: '25%' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter name..." 
                    value={commentUser}
                    onChange={(e) => setCommentUser(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      transition: 'border-color 0.3s',
                    }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Your Comment
                  </label>
                  <input 
                    type="text" 
                    placeholder="Write your comment..." 
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      transition: 'border-color 0.3s',
                    }}
                  />
                </div>
                <button type="submit" style={{
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  height: '37px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Related Events */}
          <div style={{
            width: '30%',
            border: '2px solid #e5e7eb',
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            height: 'fit-content',
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              marginBottom: '10px',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '10px'
            }}>
              Related Events
            </h2>
            {relatedEvents.map(event => (
              <div key={event.id} style={{
                marginBottom: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #e5e7eb',
                padding: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderBottomLeftRadius = '24px';
                e.currentTarget.style.borderBottomRightRadius = '24px';
                e.currentTarget.style.border = '2px solid #3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderBottomLeftRadius = '12px';
                e.currentTarget.style.borderBottomRightRadius = '12px';
                e.currentTarget.style.border = '2px solid #e5e7eb';
              }}>
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundImage: 'url(https://via.placeholder.com/400x200)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                }}></div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  margin: '8px 0',
                }}>
                  {event.title}
                </h3>
                <div style={{
                  color: '#666',
                  fontSize: '12px',
                  padding: '5px',
                }}>
                  <Calendar style={{ marginRight: '5px' }} />
                  <span style={{ marginRight: '5px' }}>{event.date}</span>
                  <MapPin style={{ marginRight: '5px' }} />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
