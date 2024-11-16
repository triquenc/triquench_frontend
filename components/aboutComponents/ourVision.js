import React from "react";
import Image from "next/image";

export default function OurVision() {

    return (
        <>
        <section className="our-vision-section">
          <div className="container">
            <div className="our-vision-grid">
              <div className="our-vision-left">
                <h2>Our Mission</h2>
                <p>Our mission is to be the leading provider of CNC spindle solutions in India and a globally recognized brand for quality, reliability, and innovation. We are dedicated to exceeding customer expectations by offering a comprehensive range of CNC spindle products, accessories, and services that are tailored to their specific requirements.
                </p>
              </div>
              <div className="our-vision-right">
                <Image src="/images/our-vision.png" width={539} height={465} alt="Our Vision Image"/>
              </div>
            </div>
          </div>
        </section>
        </>
      );
}