"use client"; // Indicate this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  HiOutlineShare,
  FaCalendar,
  FaMapMarkerAlt,
  FaRegHeart,
  FaRegComment,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEye,
} from 'react-icons/fa';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://triquench.ap-south-1.elasticbeanstalk.com/api/event/getEvents');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleLikeClick = async (index, eventId) => {
    if (likedPosts[index]) return;

    try {
      const response = await fetch('http://triquench.ap-south-1.elasticbeanstalk.com/api/event/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the event');
      }

      setLikedPosts((prev) => ({ ...prev, [index]: true }));

      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents];
        updatedEvents[index] = {
          ...updatedEvents[index],
          likes: (updatedEvents[index]?.likes || 0) + 1,
        };
        return updatedEvents;
      });
    } catch (error) {
      console.error('Error liking event:', error);
      alert('Error liking event: ' + error.message);
    }
  };

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category === 'All Categories' ? '' : category);
  };

  return (
    <div style={{ width: '100%', backgroundColor: '#fff', color: '#333', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <section
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dd1na5drh/image/upload/v1734611753/events_Desktop_hero_page_bfz1gs.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '530px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
      </section>

      <div style={{ width: '90%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <section>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '2rem 0', justifyContent: 'center' }}>
            {['Exhibition', 'Upcoming Exhibition', 'CSR By Triquench', 'Triquench Events'].map((category) => (
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
                  cursor: 'pointer',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="social-wall-section">
          <div className="social-grid">
            {filteredEvents.map((event, index) => (
              <div className="social-grid-item" key={index}>
                <div className="social-grid-inner" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                  <div className="img-wrapper">
                    <Image src={event.image?.url || '/placeholder.png'} height={190} width={340} alt={event.title || 'Event'} />
                  </div>
                  <div className="bottom-outer">
                    <div className="bottom-wrapper">
                      <a href={`/event/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <p className="company-name">{event.title}</p>
                        <p>
                          {event.description?.length > 80
                            ? `${event.description.substring(0, 80)}...`
                            : event.description || 'No description available'}
                        </p>
                      </a>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{event.category || 'Uncategorized'}</span>
                        <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ul>
                      <li onClick={() => handleLikeClick(index, event._id)}>
                        <FaRegHeart color={likedPosts[index] ? 'red' : '#666'} />
                        {event.likes || 0}
                      </li>
                      <li>
                        <FaRegComment />
                        {event.comments?.length || 0}
                      </li>
                    </ul>
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
