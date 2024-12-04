import React from 'react';
import Image from "next/image";


export default function AboutSection() {
  return (
    <>
      <section className="about-section">
        <div className="text-img-wrap">
          <div className="text-wrap">
              <div className="content-wrap">
                <div className="title-block">
                  <h2 className="has-green-bar">About Triquench</h2>
                </div>
                <p>We are strengthening and Expanding towards providing world-class Repairing Services in the Indian Diaspora.</p>
                <p>In India, Known for our Active and Dynamic Customer Service Practices and catering to a broad assortment of product categories such as Belt Driven Spindle, Edge Banding Spindle Motor, Air Cooled, Spindle Motor ATC, Spindle Motor MTC, Machine Tools Spindle, CNC Router Spindle, and Spindle Accessories.</p>
                <p>We provide “Intelligent Spindle Solutions” and Aspiring to be of Service to Society and Grow along with it.</p>
              </div>
          </div>
          <div className="img-wrap">
              <picture className='bottom-img' style={{
                position: 'relative'
               }}> 
                <source srcSet="/images/about-bottom.webp" type="image/webp" />
                <Image src="/images/about-bottom.webp" width={587} height={753} alt="Product image" />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
                  pointerEvents: 'none'
                }}></div>
              </picture>
              <picture className="absolute-img">
                <source srcSet="https://res.cloudinary.com/dd1na5drh/image/upload/v1733207720/About_img_ixsnwn.png" type="image/webp" />
                <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733207720/About_img_ixsnwn.png" width={474} height={660} alt="Product image" />
              </picture>
          </div>
        </div>
      </section>
    </>
  );
};

