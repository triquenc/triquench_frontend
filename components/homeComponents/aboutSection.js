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
              <picture className='bottom-img'> 
                <source srcSet="/images/about-bottom.webp" type="image/webp" />
                <Image src="/images/about-bottom.webp" width={587} height={753} alt="Product image" />
              </picture>
              <picture className="absolute-img">
                <source srcSet="/images/about-top.jpg" type="image/webp" />
                <Image src="/images/about-top.jpg" width={474} height={660} alt="Product image" />
              </picture>
          </div>
        </div>
      </section>
    </>
  );
};

