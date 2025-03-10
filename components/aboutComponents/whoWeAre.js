import React from "react";
import Image from "next/image";

export default function WhoWeAre() {
  return (
    <>
      <section className="who-we-are">
        <div className="container">
          <div className="title-block">
            <h2 className="has-green-bar">Who we are</h2>
          </div>
          <div className="content-block">
            <p>
            Welcome to TRIQUENCH INDIA PVT LTD, a leading manufacturer of CNC spindles, CNC machine accessories, and CNC laser machine accessories in India. We are a one-stop solution for all your CNC machine parts needs, providing a comprehensive package of high-quality products and services. We are committed to delivering precision engineering solutions that empower businesses to achieve their manufacturing goals.

            </p>
            <p>
            TriQuench India Pvt Ltd was established in 2012 in Ahmedabad, Gujarat, India. Our company was founded on the core principle of providing exceptional engineering and precision assembly services, with a particular focus on CNC machine spindles. Since our inception, we have grown into a well-respected and trusted brand in the Indian CNC machine industry.
            In India, Known for our Active and Dynamic Customer Service Practices and catering to a broad assortment of product categories such as Belt Driven Spindle, Edge Banding Spindle Motor, Air Cooled, Spindle Motor ATC, Spindle Motor MTC, Machine Tools Spindle, CNC Router Spindle, and Spindle Accessories.
          </p>
           
          </div>
          <div className="who-we-are-grid">
            <div className="who-we-are-grid-item">
              <Image
                src="/images/About_image_2.png"
                width={555}
                height={396}
                alt="Who We Are Image1"
              />
            </div>
            <div className="who-we-are-grid-item">
              <Image
                src="/images/about_image1.png"
                width={555}
                height={396}
                alt="Who We Are Image2"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
