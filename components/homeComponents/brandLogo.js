"use client"; 
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import 'swiper/swiper-bundle.css';

export default function SliderBanner() {
    return (
      <section className="brand-logo-section relative">
        <div className="container">
          <div className="text-slider-wrapper">
            <div className="text-block">
              <div className="title-block">
                <Image src="/images/brands.svg" alt="brands" width={397} height={95} className="brand-text"/>
                <h2 className="has-green-bar">Trusted by the World’s Leading Brands
                </h2>
              </div>
              <p style={{ paddingRight: '20px' }}>
              At TriQuench India, we take immense pride in being a trusted partner to some of the most renowned and respected industry leaders worldwide. Our dedication to delivering high-quality, precision-engineered CNC spindles has earned us a reputation for excellence across various sectors.
              </p>
            </div>
            <div className="slider-navgation-wrapper">
              <div className="slider-wrapper">
                <Swiper
                  modules={[Navigation, Autoplay ]}
                  spaceBetween={14}
                  slidesPerView={3}
                  navigation
                  effect="fade"
                  autoplay={{ delay: 6000 }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    479: {
                      slidesPerView: 2,
                    },
                    575: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="slide-wrapper">
                      <div className="top-slide white-box">
                        <img src="images/kalpa-taru.jpg" alt="Klptaru"/>
                      </div>
                      <div className="bottom-slide white-box">
                        <img src="/images/batlinoi.jpg" alt="batlinoi"/>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                  <div className="slide-wrapper">
                      <div className="top-slide white-box">
                        <img src="/images/isro.jpg" alt="Isro"/>
                      </div>
                      <div className="bottom-slide white-box">
                        <img src="/images/jyoti.jpg" alt="Jyoti" />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                  <div className="slide-wrapper">
                      <div className="top-slide white-box">
                        <img src="/images/godrej.jpg" alt="Godrej"/>
                      </div>
                      <div className="bottom-slide white-box">
                        <img src="/images/batlinoi.jpg" alt="batlinoi"/>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                  <div className="slide-wrapper">
                      <div className="top-slide white-box">
                        <img src="/images/isro.jpg" alt="Isro"/>
                      </div>
                      <div className="bottom-slide white-box">
                        <img src="/images/jyoti.jpg" alt="Jyoti" />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                  <div className="slide-wrapper">
                      <div className="top-slide white-box">
                        <img src="/images/godrej.jpg" alt="Godrej"/>
                      </div>
                      <div className="bottom-slide white-box">
                        <img src="/images/batlinoi.jpg" alt="batlinoi"/>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}