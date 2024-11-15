import React, { forwardRef, useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css';

const TestimonialSlider = forwardRef((props, ref) => {
  
  return (
    <>
      <section className="testimonial-section">
        <div className="container">
            <div className="title-block">
            <span className="sub-title">
            TESTIMONIALS
            </span>
            <h2 className="has-green-bar">WHAT PEOPLE ARE SAYING</h2>
            </div>
            <div className="testmonial-slider-wrapper">
              <Swiper
            //   , Autoplay
                modules={[Navigation ]} // Include modules here
                spaceBetween={50} // Adjust the spacing between slides
                slidesPerView={1} // Number of slides visible at the same time
                navigation // Enable navigation arrows
                effect="fade"
                autoplay={{ delay: 6000 }} // Enable autoplay with delay
                fadeEffect={{ crossFade: true }}
                autoHeight = {true}
              >
                <SwiperSlide>
                    <div className="testimonial-item">
                        <Image src="/images/quote.svg" alt="Quote" className="quote-img" height={29} width={51}/>
                        <blockquote className='quote-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</blockquote>
                    </div>
                        <div className="name-img-wrap">
                            <Image src="/images/john-jacob.jpg" alt="jhon" width={108} height={108} className='person-img'/>
                            <p className="name">John Jacob</p>
                            <span className="designation">Architecture</span>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="testimonial-item">
                        <Image src="/images/quote.svg" alt="Quote" className="quote-img" height={29} width={51}/>
                        <blockquote className='quote-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</blockquote>
                    </div>
                        <div className="name-img-wrap">
                            <Image src="/images/john-jacob.jpg" alt="jhon" width={108} height={108} className='person-img'/>
                            <p className="name">John Jacob</p>
                            <span className="designation">Architecture</span>
                        </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="testimonial-item">
                        <Image src="/images/quote.svg" alt="Quote" className="quote-img" height={29} width={51}/>
                        <blockquote className='quote-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</blockquote>
                    </div>
                        <div className="name-img-wrap">
                            <Image src="/images/john-jacob.jpg" alt="jhon" width={108} height={108} className='person-img'/>
                            <p className="name">John Jacob</p>
                            <span className="designation">Architecture</span>
                        </div>
                </SwiperSlide>
              </Swiper>
            </div>
        </div>
      </section>
    </>
  );
});

export default TestimonialSlider;
