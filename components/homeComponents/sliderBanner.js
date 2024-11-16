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
        <Image src="/images/banner-prop.png" width={1440} height={580} alt="Banner Background Image" className="bg-img" />
        <div className="container">
          <div className="slider-navgation-wrapper">
            <div className="banner-navigation-wrapper">
              <div className="white-box">
                <span className="title">Navigation</span>
                <ul className="dot-list p-l-10">
                  <li>
                    <a href="/products" title="Spindle For Wood">Spindle For Wood</a>
                  </li>
                  <li>
                    <a href="/products" title="Spindle For Stone">Spindle For Stone</a>
                  </li>
                  <li>
                    <a href="/products" title="Spindle For Aluminum">Spindle For Aluminum</a>
                  </li>
                  <li>
                    <a href="/products" title="Spindle for jewelry Making">Spindle for jewelry Making</a>
                  </li>
                  <li>
                    <a href="/products" title="Edge Banding Spindle">Edge Banding Spindle</a>
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
                      <span className="sub-title">Building High Trust </span>
                      <h1>Relationship through our Quality Spindles</h1>
                      <p>We provide “Intelligent Spindle Solutions” and Aspiring to be of Service to Society and Grow along with it.</p>
                      <div className="btn-wrapper m-t-20">
                        <a href="https://shop.triquenchindia.com" target="_blank" className="white-btn" title="Shop Now">
                        Shop Now
                        </a>
                        <a href="/products" className="white-border-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                    </div>
                    <div className="right">
                      <Image src="/images/slide1.png" width={530} height={350} alt="Slider Item1 Image"/>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      <span className="sub-title">Building High Trust </span>
                      <h2 className="h1">Relationship through our Quality Spindles</h2>
                      <p>We provide “Intelligent Spindle Solutions” and Aspiring to be of Service to Society and Grow along with it.</p>
                      <div className="btn-wrapper m-t-20">
                        <a href="https://shop.triquenchindia.com" target="_blank" className="white-btn" title="Shop Now">
                        Shop Now
                        </a>
                        <a href="/products" className="white-border-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="/images/slide2.png" alt="Slider Item2 Image" width={530} height={350}/>
                  </div>
                </div>
                </SwiperSlide>
                <SwiperSlide>
                <div className="swiper-flex-wrap">
                  <div className="left">
                      <span className="sub-title">Building High Trust </span>
                      <h2 className="h1">Relationship through our Quality Spindles</h2>
                      <p>We provide “Intelligent Spindle Solutions” and Aspiring to be of Service to Society and Grow along with it.</p>
                      <div className="btn-wrapper m-t-20">
                        <a href="https://shop.triquenchindia.com" target="_blank" className="white-btn" title="Shop Now">
                        Shop Now
                        </a>
                        <a href="/products" className="white-border-btn" title="View Products">
                        View Products
                        </a>
                      </div>
                  </div>
                  <div className="right">
                    <Image src="/images/slide3.png" alt="Slider Item3 Image" width={530} height={350}/>
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