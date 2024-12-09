import React from "react";
import Image from "next/image";

export default function OurVisionAndMission() {
  return (
    <>
      {/* Vision Section */}

 {/* Mission Section */}
 <section className="our-vision-section" style={{ marginTop: "5rem"}}>
      <div className="container">
          <div className="our-vision-grid">
          <div className="our-vision-right">
              <Image
                src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733550276/Mission_PNG_eog4wb.png"
                width={390}
                height={390}
                alt="Our Vision Image"
              />
            </div>
            <div className="our-vision-left">
              <h2 style={{ textDecoration: "underline" }}>Our Mission</h2>
              <p >
              Our mission is to be the leading provider of CNC spindle solutions in India and a globally recognized brand for quality, reliability, and innovation. We are dedicated to exceeding customer expectations by offering a comprehensive range of CNC spindle products, accessories, and services that are tailored to their specific requirements.

              </p>
            </div>
            
          </div>
        </div>
      </section>

      <section className="our-vision-section" style={{ marginTop: "5rem" , backgroundColor:"#006098"}}>
        <div className="container">
          <div className="our-vision-grid">
            <div className="our-vision-left">
              <h2 style={{ textDecoration: "underline", color:"white"}}>Our Vision</h2>
              <p style={{  color:"white" }} >
                Experience the perfect blend of innovation and performance with
                our Best-in-Class Precision Spindles and allied machinery.
                Designed to exceed expectations, every product is engineered to
                deliver unmatched accuracy, reliability, and efficiency, meeting
                your highest standards on every performance metric.
              </p>
            </div>
            <div className="our-vision-right">
              <Image
                src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733550275/Vision_PNG_ew1qne.png"
                width={390}
                height={390}
                alt="Our Vision Image"
              />
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}
