"use client"; // Add this line to indicate that this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineShare } from "react-icons/hi";
import { FaCalendar, FaMapMarkerAlt, FaRegHeart, FaFacebookF, FaLinkedinIn, FaInstagram, FaEye } from 'react-icons/fa';
import SimpleSpinner from '@/components/commonComponents/SimpleSpinner';

// (I am assuming your CSS file for .hero-banner, .social-grid etc. is imported elsewhere)

export default function Events() {
  // State to manage events and likes
  const [events, setEvents] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // --- 1. ADD LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true); // Start as true

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); // Set loading true at the start of fetch
      try {
        const response = await fetch('https://d1w2b5et10ojep.cloudfront.net/api/event');

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        // --- 2. SET LOADING FALSE ONCE FINISHED ---
        setIsLoading(false); // Set false after try/catch
      }
    };

    fetchEvents();
  }, []);

  const handleLikeClick = async (eventId) => {
    if (likedPosts[eventId]) return;

    try {
      const response = await fetch(`https://d1w2b5et10ojep.cloudfront.net/api/event/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId }),
      });

      if (!response.ok) throw new Error('Failed to like the event');

      setLikedPosts((prev) => ({ ...prev, [eventId]: true }));

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, likes: (event.likes || 0) + 1 } : event
        )
      );
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  // Filter events based on selected category
  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category === 'All Categories' ? '' : category);
  };

  const HERO_IMG = "https://res.cloudinary.com/dd1na5drh/image/upload/v1734611753/events_Desktop_hero_page_bfz1gs.png";

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      
      {/* ---- REQUIRED FIX: 320px Responsive Meta Block Styling ---- */}
      <style>{`
        @media (max-width: 320px) {
          .meta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .meta-right {
           display: flex !important;
           justify-content: space-between !important;
           width: 100% !important;
          }

          .badge {
            display: inline-block !important;
            margin-bottom: 2px !important;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="hero-banner">
        <div className="hero-overlay" />
        <img src={HERO_IMG} alt="Events banner" className="hero-img-mobile" />
      </section>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>

        {/* CATEGORY BUTTONS */}
        <section>
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
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* --- 4. ADD CONDITIONAL RENDERING FOR LOADER --- */}
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
                        facebook:{// Set background to transparent so the image gradient shows
      backgroundColor: 'transparent', 
      // Use Next.js Image component pointing to your file in /public
      icon: (
        <Image 
          src="/favicon/communication.png" 
          alt="Instagram" 
          width={30} 
          height={30} 
          // Optional: Ensure it fits nicely if the image has sharp corners
          style={{ objectFit: 'contain' }} 
        />
      )
    },
                        instagram: { 
      // Set background to transparent so the image gradient shows
      backgroundColor: 'transparent', 
      // Use Next.js Image component pointing to your file in /public
      icon: (
        <Image 
          src="/favicon/instagram.png" 
          alt="Instagram" 
          width={30} 
          height={30} 
          // Optional: Ensure it fits nicely if the image has sharp corners
          style={{ objectFit: 'contain' }} 
        />
      )
    },
                        linkedin: {  // Set background to transparent so the image gradient shows
      backgroundColor: 'transparent', 
      // Use Next.js Image component pointing to your file in /public
      icon: (
        <Image 
          src="/favicon/linkedin.png" 
          alt="Instagram" 
          width={30} 
          height={30} 
          // Optional: Ensure it fits nicely if the image has sharp corners
          style={{ objectFit: 'contain' }} 
        />
      )
    }
                      };
                      const style = socialStyles[social.platform];
                      if (!style) return null;
                      return (
                        <a
                          key={idx}
                          href={social.url}
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