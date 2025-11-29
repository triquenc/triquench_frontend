"use client"

import React, { forwardRef } from 'react';
import Image from "next/image";
// FIX: Import all required Swiper modules
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// FIX: Import required module styles and remove redundant bundle
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const testimonials = [
  {
    quote: "Exceptional service and quick response is what I get from them ever since I started doing business with them. Haven't faced any issues in any of there product that I have purchased since last 2 years",
    name: "Adarsh Pawar",
    designation: "Client",
    image: "/images/user-image.png",
  },
  {
    quote: "End to end service providers for everything related to CNC. They have all spares and spindles. The market really needs people like them. Outstanding!",
    name: "Luv Jaiswal",
    designation: "Client",
    image: "/images/user-image.png",
  },
  {
    quote: "I am connected with TriQUench India as a customer since 2015 and purchase spimdle so many time. Also happy with them after sales service and hospitality about customers. Wishing growth in them industry.",
    name: "Bhavesh Patel",
    designation: "Client",
    image: "/images/user-image.png",
  },
  {
    quote: "After sale service serrvice and supports are excellent. I have seen lots of companies that after sales they are not providing any support to its customers, but they are not like that. They are excellent at their field ❤️.",
    name: "Subha Mandal",
    designation: "Client",
    image: "/images/user-image.png",
  },
];

const TestimonialSlider = forwardRef(
  (props, ref) => {
    return (
      // FIX: Attached the forwarded ref to the section
      <section className="testimonial-section" ref={ref}>
        <div className="container">
          <div className="title-block">
            {/* <span className="sub-title">TESTIMONIALS</span> */}
            <h2 className="has-green-bar">WHAT PEOPLE ARE SAYING</h2>
          </div>
          <div className="testmonial-slider-wrapper">
            <Swiper
              // FIX: Added Autoplay and EffectFade to modules
              modules={[Navigation, Autoplay, EffectFade]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              effect="fade"
              autoplay={{ delay: 6000 }}
              fadeEffect={{ crossFade: true }}
              autoHeight={true}
            >
              {testimonials.map((testimonial) => (
                // FIX: Use a more unique key than index
                <SwiperSlide key={testimonial.name}>
                  <div className="testimonial-item">
                    <Image
                      src="/images/quote.svg"
                      alt="Quote"
                      className="quote-img"
                      height={29}
                      width={51}
                    />
                    <blockquote className="quote-text">{testimonial.quote}</blockquote>
                  </div>
                  <div className="name-img-wrap">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      // FIX: Changed width/height to match SCSS (6.8rem = 68px)
                      width={68}
                      height={68}
                      className="person-img"
                    />
                    <p className="name">{testimonial.name}</p>
                    <span className="designation">{testimonial.designation}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    );
  }
);

// FIX: Add display name for React DevTools
TestimonialSlider.displayName = 'TestimonialSlider';

export default TestimonialSlider;