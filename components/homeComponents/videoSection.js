import React from 'react';

export default function VideoSection() {
  return (
    <>
      <section className="video-section">
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/c2jyH84SRS4?si=k8ZT5FkVn-KnpGfN&autoplay=1&mute=1&vq=hd1080"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </>
  );
}
