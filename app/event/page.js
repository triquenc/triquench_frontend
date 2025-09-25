"use client"; // Add this line to indicate that this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineShare } from "react-icons/hi";
import { FaCalendar, FaMapMarkerAlt, FaRegHeart, FaRegComment, FaFacebookF, FaLinkedinIn, FaInstagram, FaEye } from 'react-icons/fa';

export default function Events() {
  // State to manage events and likes
  const [events, setEvents] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); // Using an object to track like status for each post
  const [selectedCategory, setSelectedCategory] = useState(''); // State to track selected category

  // Fetch events data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://d1w2b5et10ojep.cloudfront.net/api/event/getEvents');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // This will run once when the component is mounted

  // Handle like button click
  const handleLikeClick = async (index, eventId) => {
    if (likedPosts[index]) return; // Prevent further clicks if already liked

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
        [index]: true, // Mark as liked
      }));

      // Update the like count in the UI
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];
        updatedEvents[index] = {
          ...updatedEvents[index],
          likes: updatedEvents[index].likes + 1, 
        };
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error liking event:', error);
      alert('Error liking event: ' + error.message);
    }
  };

  // Filter events based on selected category
  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  // Handle category selection without page jump
  const handleCategoryClick = (e, category) => {
    e.preventDefault(); // Prevent default anchor behavior
    setSelectedCategory(category === 'All Categories' ? '' : category);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <section style={{
        backgroundImage: "url('https://res.cloudinary.com/dd1na5drh/image/upload/v1734611753/events_Desktop_hero_page_bfz1gs.png')",
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
        }}></div>
      </section>

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        <section>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '2rem 0', justifyContent: 'center' }}>
            {['Exhibition', 'Upcoming Exhibition','CSR By Triquench', 'Triquench Events' ].map((category) => (
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
                  ':hover': {
                    backgroundColor: '#006098',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#006098';
                  e.target.style.color = '#fff';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#006098';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
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
            {filteredEvents.map((event, index) => (
              <div className="social-grid-item" key={index}>
                <div className="social-grid-inner" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                  <div className="img-wrapper">
                    <picture className='bg-img'>
                      <source srcSet={event.image.url} type="image/webp" />
                      <Image src={event.image.url} height={190} width={340} alt={event.title} className='bg-img' />
                    </picture>
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
                  <div className="bottom-outer">
                    <div className="bottom-wrapper">
                      <a href={`/event/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <p className="company-name">{event.title}</p>
                        <p>
                          {event.description.length > 80 
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
                              {new Date(event.createdAt).toLocaleDateString()}
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
                          <li style={{ marginRight: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => handleLikeClick(index, event._id)}>
                            <em>
                              <FaRegHeart color={likedPosts[index] ? 'red' : '#666'} size={24} />
                            </em>
                            <span style={{ marginLeft: '5px', color: '#666' }}>{event.likes}</span>
                          </li>
                          {/* <li style={{ marginRight: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <em>
                              <FaRegComment color="#666" size={24} />
                            </em>
                            <span style={{ marginLeft: '5px', color: '#666' }}>{event.comments.length}</span>
                          </li> */}
                          <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <em>
                              <HiOutlineShare color="#666" size={24} />
                            </em>
                          </li>
                        </ul>
                      </div>
                      <div className="right">
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