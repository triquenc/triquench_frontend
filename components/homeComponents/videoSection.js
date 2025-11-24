import React from 'react';

export default function VideoSection() {
  return (
    <section className="video-section">
      <div className="container">
        
        {/* Video Container - Centered */}
        <div className="video-centered-wrapper">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/c2jyH84SRS4?si=k8ZT5FkVn-KnpGfN&mute=1&vq=hd1080"
              title="Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            
           
          </div>
          
          {/* Background Decoration */}
          <div className="decoration-shape"></div>
        </div>

      </div>
    </section>
  );
}