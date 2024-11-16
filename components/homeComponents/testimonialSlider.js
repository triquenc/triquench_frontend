import React, { forwardRef } from 'react';
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/swiper-bundle.css';

const testimonials = [
  {
    quote: "Exceptional service and quick response is what I get from them ever since I started doing business with them. Haven't faced any issues in any of there product that I have purchased since last 2 years",
    name: "Adarsh Pawar",
    designation: "Client",
    image: "/images/user-image.png",
  },
  {
    quote: "It's been almost 2.5 years since I started purchasing from the company. As far back as I can remember, I have always received positive responses from the company's sales team and Kaushalbhai, whether it was about purchasing new spindles, repairing spindles, or purchasing spindle accessories like bearings, Collets, Holders etc. Additionally, the work done by the company's employees in serving the poor in society is truly commendable and inspiring",
    name: "Purchase VEWPL",
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

const TestimonialSlider = forwardRef((props, ref) => {
  return (
    <section className="testimonial-section">
      <div className="container">
        <div className="title-block">
          <span className="sub-title">TESTIMONIALS</span>
          <h2 className="has-green-bar">WHAT PEOPLE ARE SAYING</h2>
        </div>
        <div className="testmonial-slider-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            effect="fade"
            autoplay={{ delay: 6000 }}
            fadeEffect={{ crossFade: true }}
            autoHeight={true}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
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
                    width={108}
                    height={108}
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
});

export default TestimonialSlider;
