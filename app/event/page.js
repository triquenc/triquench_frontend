"use client"; // Add this line to indicate that this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineShare } from "react-icons/hi";
import { FaCalendar, FaMapMarkerAlt, FaRegHeart, FaFacebookF, FaLinkedinIn, FaInstagram, FaEye } from 'react-icons/fa';

export default function Events() {
  // State to manage events and likes
  const [events, setEvents] = useState([]);

  // --- LINT FIX 1: Use object with event._id as key, not index ---
  const [likedPosts, setLikedPosts] = useState({}); // Using an object to track like status for each post
  const [selectedCategory, setSelectedCategory] = useState(''); // State to track selected category

  // Fetch events data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // --- PROBLEM 1: This URL is returning 404 ---
        // Your screenshot shows '.../api/event/getEvents'
        // Your code shows '.../api/event'
        // You MUST fix this URL to be a valid API endpoint.
        const response = await fetch('http://localhost:5000/api/event'); // Using URL from screenshot

        // --- FIX 1: Check for HTTP errors (like 404) ---
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // --- FIX 2: Ensure the data is ALWAYS an array ---
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Error fetching events: API did not return an array.", data);
          setEvents([]); // Reset to an empty array to prevent crash
        }

      } catch (error) {
        // This will now catch network errors AND 404s
        console.error('Error fetching events:', error);
        setEvents([]); // Reset to an empty array on any error
      }
    };

    fetchEvents();
  }, []); // This will run once when the component is mounted

  // --- LINT FIX 2: Refactor handleLikeClick to use eventId, not index ---
  const handleLikeClick = async (eventId) => {
    if (likedPosts[eventId]) return; // Prevent further clicks if already liked

    try {
      const response = await fetch(`https://d1w2b5et10ojep.cloudfront.net/api/event/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: eventId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the event');
      }

      // Update the like status locally
      setLikedPosts((prevState) => ({
        ...prevState,
        [eventId]: true, // Mark as liked using eventId
      }));

      // Update the like count in the UI
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, likes: (event.likes || 0) + 1 }
            : event
        )
      );
    } catch (error) {
      console.error('Error liking event:', error);
      alert('Error liking event: ' + error.message);
    }
  };

  // Filter events based on selected category
  const filteredEvents = (selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  // Handle category selection without page jump
  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Prevent default anchor behavior
    setSelectedCategory(category === 'All Categories' ? '' : category);
  };

  const HERO_IMG = "https://res.cloudinary.com/dd1na5drh/image/upload/v1734611753/events_Desktop_hero_page_bfz1gs.png";

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      {/* ... (rest of your banner JSX, no changes needed) ... */}
      <section className="hero-banner">
        <div className="hero-overlay" />
        <img src={HERO_IMG} alt="Events banner" className="hero-img-mobile" />
      </section>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        <section>
          {/* ... (rest of your category button JSX, no changes needed) ... */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '2rem 0', justifyContent: 'center' }}>
            {['All Categories','Exhibition', 'Upcoming Exhibition','CSR By Triquench', 'Triquench Events' ].map((category) => (
              <button
                key={category}
                onClick={(e) => handleCategoryClick(e, category)}
                style={{
                  backgroundColor: selectedCategory === category ? '#006098' : '#fff',
                  color: selectedCategory === category ? '#fff' : '#006098',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#006098';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#006098';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="social-wall-section" style={{ backgroundColor: 'white' }}>
          <div className="social-grid">
            {/* --- LINT FIX 3: Use event._id for the key, not index --- */}
            {filteredEvents.map((event) => (
              <div className="social-grid-item" key={event._id}>
                <div className="social-grid-inner" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                  {/* ... (rest of your Image/social link JSX, no changes needed) ... */}
                  <div className="img-wrapper">
                    <picture className='bg-img'>
                      <source srcSet={event.image?.url} type="image/webp" />
                      {event.image?.url && (
                        <Image src={event.image.url} height={190} width={340} alt={event.title} className='bg-img' />
                      )}
                    </picture>
                    {Array.isArray(event.socialLinks) && event.socialLinks.map((social, idx) => {
                     const socialStyles = {
                      facebook: { 
                        backgroundColor: '#1877f2', 
                        icon: <FaFacebookF />,
                         url: "https://www.facebook.com/spindlemotorTQI"   // <-- YOUR LINK HERE
                      },
                      instagram: { 
                        backgroundColor: '#E1306C', 
                        icon: <FaInstagram />,
                        url: "https://www.instagram.com/triquench_spindlemotor/"   // <-- YOUR LINK HERE
                      },
                      linkedin: { 
                        backgroundColor: '#0077b5', 
                        icon: <FaLinkedinIn />, 
                        url: "https://www.linkedin.com/company/triquenchindia/"   // <-- YOUR LINK HERE
                      }
                    };
                      const style = socialStyles[social.platform];
                      if (!style) return null;
                      return (
                        <a
                          key={idx}
                         href={social.url || style.url}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: `${10 + (idx * 40)}px`,
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
                  <div className="bottom-outer">
                    <div className="bottom-wrapper">
                      <a href={`/event/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {/* ... (rest of your card text JSX, no changes needed) ... */}
                        <p className="company-name">{event.title}</p>
                        <p>
                          {event.description && event.description.length > 80
                            ? <>{event.description.substring(0, 80)}... <span style={{color: '#3b82f6', cursor: 'pointer'}}>Read More</span></>
                            : event.description
                          }
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', color: '#666', fontSize: '1.4rem' }}>
                          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.5rem', borderRadius: '15px', fontSize: '1.2rem' }}>
                            {event.category}
                          </span>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                              <FaCalendar style={{ marginRight: '0.5rem' }} size="1rem" />
                              {event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ''}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                              <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} size="1rem" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="action-row">
                      <div className="left">
                        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                          {/* --- LINT FIX 4: Pass event._id to handleLikeClick --- */}
                          <li style={{ marginRight: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => handleLikeClick(event._id)}>
                            <em>
                              {/* --- LINT FIX 5: Check liked status by event._id --- */}
                              <FaRegHeart color={likedPosts[event._id] ? 'red' : '#666'} size={24} />
                            </em>
                            <span style={{ marginLeft: '5px', color: '#666' }}>{event.likes}</span>
                          </li>
                          <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <em>
                              <HiOutlineShare color="#666" size={24} />
                            </em>
                          </li>
                        </ul>
                      </div>
                      <div className="right">
                        {/* ... (rest of your views JSX, no changes needed) ... */}
                        <em>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666' }}>
                            <FaEye size={24} />
                            <span>{event.views}</span>
                          </div>
                        </em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}