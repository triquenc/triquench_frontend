import React from 'react';
import Image from "next/image";

export default function FeatureSection() {
  return (
    <>
      <section className="features-section">
         <div className="container">
          <div className="feature-grid">
            <div className="feature-grid-item">
                <Image src="/images/quality.svg" width={40} height={40} alt="Quality Assurance Icon"/>
                <h3>Quality Assurance</h3>
                <p>TriQuench Quality Assurance is a way of preventing mistakes in manufactured products when delivering products to customers.</p>
              </div>
            <div className="feature-grid-item">
                <Image src="/images/experience.svg" width={40} height={40} alt="Experience Icon"/>
                <h3>11+ Years Experience</h3>
                <p>TriQuench India, started its business journey in the year 2012, with a mission to Spindle Manufacture.</p>
              </div>
            <div className="feature-grid-item">
                <Image src="/images/support.svg" width={40} height={40} alt="Support Icon"/>
                <h3>Online Support</h3>
                <p>Our Online Support  will provide you with useful functions, technical information, industry and practical assistance.</p>
              </div>
          </div>
         </div>
      </section>
    </>
  );
};

