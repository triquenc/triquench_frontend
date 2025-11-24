"use client";
import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section">
 
      <div className="video-background-container">
        <video
          autoPlay
          loop
          muted
          playsInline 
          className="background-video"
        >

          <source
            src="/videos/Video_Generation_From_Website.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay"></div>
      </div>

      <div className="text-img-wrap">
        <div className="text-wrap">
          <div className="content-wrap">
            <div className="title-block">
              <h2 className="has-green-bar">About Triquench</h2>
            </div>
            <p>
              Triquench India is a leading CNC spindle manufacturer delivering
              precision-engineered solutions worldwide. Renowned for
              innovation, we specialize in CNC spindle motors, including
              air-cooled, water-cooled, ATC, and MTC spindles, along with an
              extensive range of CNC machine accessories. Our offerings
              include VFD drives, tool holders (BT30, BT40, HSK, ISO), ER
              collets, spindle bearings, LM guideways, ball screws, planetary
_              and cycloidal gearboxes, CNC control panels, Rich Auto DSP
              controllers, NK105 controllers, tool grippers, and accessories
              for CNC routers and laser machines.
            </p>
            <p>
              We prioritize quality through advanced manufacturing
              technologies, IoT integration, and eco-friendly practices,
              ensuring sustainable growth and unmatched customer satisfaction.
              Triquench India is your trusted partner for precision machining
              solutions, driving innovation and excellence in CNC technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;