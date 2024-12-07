import React from "react";
import Image from "next/image";

export default function OurVision() {
  return (
    <section className="our-vision-section">
      <div className="container">
        {/* First Section: Our Mission */}
        <div className="our-vision-grid">
          <div className="our-vision-left">
            <h2>Our Mission</h2>
            <p>
              Our mission is to be the leading provider of CNC Spindle Solutions in India and a globally recognized brand for quality, reliability, and innovation. We are dedicated to exceeding customer expectations by offering a comprehensive range of CNC spindle products, accessories, and services tailored to their specific requirements.
            </p>
          </div>
          <div className="our-vision-right">
            <Image
              src="/images/our-vision.png"
              width={539}
              height={465}
              alt="Our Mission Image"
            />
          </div>
        </div>
      </div>

     {/*<div className="container">
        <div className="our-vision-grid">
          <div className="our-vision-right">
            <Image
              src="/images/our-vision.png"
              width={539}
              height={465}
              alt="Our Vision Image"
            />
          </div>
          <div className="our-vision-left">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be the benchmark for excellence in CNC spindle technology worldwide. We aim to empower industries with innovative, sustainable, and efficient solutions, fostering growth and success for our customers and partners.
            </p>
          </div>
        </div>
      </div> */}
    </section>
  );
}
