import React from "react";
import Image from "next/image";

export default function OurVision() {

    return (
        <>
        <section className="our-vision-section">
          <div className="container">
            <div className="our-vision-grid">
              <div className="our-vision-left">
                <h2>Our Vision</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing.</p>
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