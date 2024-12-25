"use client";
import React, { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/swiper-bundle.css";

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
                  <a href="/products?category=cnc-spindle-motor" title="CNC Spindle Motor">CNC Spindle Motor</a>
                  </li>
                  <li>
                    <a href="/products?category=spindle-servo-motor" title="Servo Motor">Servo Motor</a>
                  </li>
                  <li>
                    <a href="/products?category=gearbox" title="Gearbox">Gearbox</a>
                  </li>
                  <li>
                    <a href="/products?category=cnc-router-accessories" title="CNC Machine Accessories">CNC Machine Accessories</a>
                  </li>
                  <li>
                    <a href="/products?category=laser-parts" title="Laser Machine Accessories">Laser Machine Accessories</a>
                  </li>
                  <li>
                    <a href="/products?category=laser-parts" title="Spindle Accessories">Spindle Accessories</a>
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
                      <h1 className="h1" style={{ textAlign: 'center' }}>A One-Stop CNC Shop</h1>
                      <p>
                      Your ultimate destination for precision CNC solutions, offering spindle motors, guideways, servo motors, controllers, bearings, VFDs, gearboxes, drag chains, and all essential accessories.</p>
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
                      <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1734947790/all_products_1_bublid.png" width={530} height={350} alt="Slider Item1 Image"/>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="swiper-flex-wrap">
                    <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h1 className="h1" style={{ textAlign: 'center' }}>High-Performance ATC Spindle Motors</h1>
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
                      <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101811/Main_slider_1_bvfpyw.png" width={530} height={350} alt="Slider Item1 Image"/>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>MTC Spindle Motors | CNC Precision Spindles</h2>
                      <p>Explore durable and efficient MTC spindle motors for CNC machines, available in versatile power and speed configurations to suit diverse machining needs.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101836/Main_slider_3_q2lriy.png" alt="Slider Item2 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>

                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>Belt-Driven Spindle Motors | Precision CNC Spindle Solutions</h2>
                      <p>High-performance Belt-Driven Spindle Motors for precise CNC machining. Engineered for durability, speed, and unmatched accuracy.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101838/Main_slider_4_f1ucbs.png" alt="Slider Item2 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>

                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>LM Guideways and Ball Screws for CNC Machines</h2>
                      <p>Ensure smooth and precise CNC operation with our LM guideways and ball screws. Engineered for longevity and high-performance machining tasks. </p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101838/Main_slider_5_mvo1yr.png" alt="Slider Item3 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>

                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>Precision VFD Drives | Reliable Motor Control Solutions</h2>
                      <p>Efficient VFD drives for precise control, reliable performance, and energy savings in industrial applications.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101840/Main_Slider_6_exbbwu.png" alt="Slider Item3 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>

                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>Precision Gearboxes for Superior Performance</h2>
                      <p>Precision Planetary and Cycloidal Gearboxes for superior performance, durability, and efficiency in industrial applications.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101838/Main_slider_8_cqexkn.png" alt="Slider Item3 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      {/*<span className="sub-title">Building High Trust </span>*/}
                      <h2 className="h1" style={{ textAlign: 'center' }}>High-Quality Laser Components for CO₂ and Fiber Lasers</h2>
                      <p>Upgrade your laser systems with our premium components for CO₂ and fiber lasers, built for maximum performance, durability, and efficiency.</p>
                      <div className="btn-wrapper m-t-20">
                       
                      <a href="/products"  target="_blank" className="white-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="https://res.cloudinary.com/dd1na5drh/image/upload/v1735101838/Main_Slider_10_wucoqu.png" alt="Slider Item3 Image" width={530} height={350}/>
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
