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
                <h3><b>Quality Assurance </b></h3>
                <p>At <b>TriQuench India</b>, we place quality at the forefront of our operations. Our rigorous quality assurance process guarantees that every CNC spindle is manufactured with unmatched precision, fully compliant with global standards, and thoroughly tested to ensure exceptional reliability and performance for customers around the world.
                </p>
              </div>
            <div className="feature-grid-item">
                <Image src="/images/experience.svg" width={40} height={40} alt="Experience Icon"/>
                <h3><b>12+ Years of Expertise </b></h3>
                <p>With over a decade of pioneering experience, TriQuench India stands as a leader in CNC spindle innovation. Founded in 2012, we have established a strong legacy of engineering excellence and are dedicated to providing cutting-edge spindle solutions for industries globally.
                </p>
              </div>
            <div className="feature-grid-item">
                <Image src="/images/support.svg" width={40} height={40} alt="Support Icon"/>
                <h3><b>Dedicated Online Support</b></h3>
                <p>Our expert online support team is always on standby, ready to provide immediate assistance. Whether you need technical advice, troubleshooting solutions, or practical guidance, we deliver prompt, precise solutions to keep your operations operating at peak efficiency.</p>
              </div>
          </div>
         </div>
      </section>
    </>
  );
};

