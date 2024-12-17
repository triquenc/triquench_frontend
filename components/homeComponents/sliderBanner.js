"use client"; 
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import 'swiper/swiper-bundle.css';

export default function SliderBanner() {
    return (
      <section className="banner-section relative">
        <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733571640/Slider_BG_seiv3u.png" width={1440} height={580} alt="Banner Background Image" className="bg-img" />
        <div className="container">
          <div className="slider-navgation-wrapper">
            <div className="banner-navigation-wrapper">
              <div className="white-box">
                <span className="title">Navigation</span>
                <ul className="dot-list p-l-10">
                  <li>
                    <a href="/products" title="CNC Spindle Motor">CNC Spindle Motor</a>
                  </li>
                  <li>
                    <a href="/products" title="Servo Motor">Servo Motor</a>
                  </li>
                  <li>
                    <a href="/products" title="Gearbox">Gearbox</a>
                  </li>
                  <li>
                    <a href="/products" title="CNC Machine Accessories">CNC Machine Accessories</a>
                  </li>
                  <li>
                    <a href="/products" title="Laser Machine Accessories">Laser Machine Accessories</a>
                  </li>
                  <li>
                    <a href="/products" title="Spindle Accessories">Spindle Accessories</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="slider-wrapper">
              <Swiper
                modules={[Navigation ]} // Include modules here
                spaceBetween={0} // Adjust the spacing between slides
                slidesPerView={1} // Number of slides visible at the same time
                navigation // Enable navigation arrows
                effect="fade"
                autoplay={{ delay: 6000 }} // Enable autoplay with delay
                fadeEffect={{ crossFade: true }}
              >
                <SwiperSlide>
                  <div className="swiper-flex-wrap">
                    <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h1>High-Performance ATC Spindle Motors</h1>
                      <p>Discover premium ATC spindle motors for CNC machines, offering 0.3–12 kW power and speeds up to 60,000 RPM. Choose air-cooled or water-cooled for precision and efficiency.</p>
                      <div className="btn-wrapper m-t-20">
                        {/*<a href="https://shop.triquenchindia.com" target="_blank" className="white-btn" title="Shop Now">
                        Shop Now
                        </a>*/}
                        <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                    </div>
                    <div className="right">
                      <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733572505/Slider_1_img_cwvo54.png" width={530} height={350} alt="Slider Item1 Image"/>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1">MTC Spindle Motors | CNC Precision Spindles</h2>
                      <p>Explore durable and efficient MTC spindle motors for CNC machines, available in versatile power and speed configurations to suit diverse machining needs.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733572625/Slider_2_img_hi1uod.png" alt="Slider Item2 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1">LM Guideways and Ball Screws for CNC Machines</h2>
                      <p>Ensure smooth and precise CNC operation with our LM guideways and ball screws. Engineered for longevity and high-performance machining tasks. </p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733572675/Slider_3_img_wbvqda.png" alt="Slider Item3 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1">Spindles, VFD's, Tool Holders & More</h2>
                      <p>Welcome to Triquench India Pvt. Ltd., your trusted CNC spindle manufacturer. Explore our range of CNC spindles, VFDs, tool holders, bearings, and machine accessories. Worldwide delivery!</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733572391/Slider_4_img_xt3kp0.png" alt="Slider Item3 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        
      </section>
    );
}