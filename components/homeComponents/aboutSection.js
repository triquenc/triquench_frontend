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
                  <h2 className="has-green-bar" style={{textAlign:"left"}}>About Triquench</h2>
                </div>
               <p>Triquench India is a leading CNC spindle manufacturer delivering precision-engineered solutions worldwide. Renowned for innovation, we specialize in CNC spindle motors, including air-cooled, water-cooled, ATC, and MTC spindles, along with an extensive range of CNC machine accessories. Our offerings include VFD drives, tool holders (BT30, BT40, HSK, ISO), ER collets, spindle bearings, LM guideways, ball screws, planetary and cycloidal gearboxes, CNC control panels, Rich Auto DSP controllers, NK105 controllers, tool grippers, and accessories for CNC routers and laser machines.</p>
               <p>We prioritize quality through advanced manufacturing technologies, IoT integration, and eco-friendly practices, ensuring sustainable growth and unmatched customer satisfaction. Triquench India is your trusted partner for precision machining solutions, driving innovation and excellence in CNC technology.</p>
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

