"use client";
import React from "react";
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import { useCustomSlider } from "@/hooks/useCustomSlider";
import { slidesData } from "@/lib/sliderData";

// --- Main Component ---
export default function SliderBanner() {
  const { activeIndex, goNext, goPrev, touchHandlers } = useCustomSlider(
    slidesData.length,
    10000 // 10-second delay
  );

  return (
    <section className="banner-section relative">
      <Image
        src="https://res.cloudinary.com/dd1na5drh/image/upload/v1733571640/Slider_BG_seiv3u.png"
        width={1440}
        height={580}
        alt="Banner Background Image"
        className="bg-img"
        priority
      />
      <div className="container">
        <div className="slider-navgation-wrapper">
          {/* --- Left Navigation Menu (Unchanged) --- */}
          <div className="banner-navigation-wrapper">
            <div className="white-box">
              <span className="title">Navigation</span>
              <ul className="dot-list p-l-10">
                <li><Link href="/products?category=cnc-spindle-motor">CNC Spindle Motor</Link></li>
                <li><Link href="/products?category=spindle-servo-motor">Servo Motor</Link></li>
                <li><Link href="/products?category=gearbox">Gearbox</Link></li>
                <li><Link href="/products?category=cnc-router-accessories">CNC Machine Accessories</Link></li>
                <li><Link href="/products?category=laser-parts">Laser Machine Accessories</Link></li>
                <li><Link href="/products?category=spindle-accessories">Spindle Accessories</Link></li>
              </ul>
            </div>
          </div>

          {/* --- Right Slider Section --- */}
          <div 
            className="slider-wrapper"
            role="region" 
            aria-roledescription="carousel"
          >
            <div
              className="swiper"
              {...touchHandlers}
            >
              {/* "Ghost" Slide (for layout spacing) */}
              <div className="ghost-slide-wrapper">
                <div className="swiper-flex-wrap ghost-slide-flex">
                  <div className="left">
                    <h1 className="h1 text-center">
                      {slidesData[0].title}
                    </h1>
                    <p>{slidesData[0].text}</p>
                    <div className="btn-wrapper m-t-30">
                      <Link href="/products" className="white-btn">
                        View Products
                      </Link>
                    </div>
                  </div>
                  <div className="right">
                    <Image
                      src={slidesData[0].imgSrc}
                      width={530}
                      height={350}
                      alt="" // Alt text not needed for ghost element
                      priority
                    />
                  </div>

                  
                </div>
              </div>

              {/* These are the REAL slides, stacked on top */}
              {slidesData.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`swiper-slide ${index === activeIndex ? "is-active" : ""}`}
                >
                  <div className="swiper-flex-wrap">
                    <div className="left">
                      
                      {/* --- PRESERVED YOUR H1 FIX --- */}
                      {index === activeIndex ? (
                        <h1 className="h1 text-center">
                          {slide.title}
                        </h1>
                      ) : (
                        <div className="h1 text-center inactive-slide-heading">
                          {slide.title}
                        </div>
                      )}
                      {/* --- END OF H1 FIX --- */}

                      <p>{slide.text}</p>
                      <div className="btn-wrapper ">
                        <Link href="/products" className="white-btn">
                          View Products
                        </Link>
                      </div>
                    </div>
                    <div className="right">
                      <Image
                        src={slide.imgSrc}
                        width={530}
                        height={350}
                        alt={slide.imgAlt}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Buttons with ARIA labels for SEO/Accessibility --- */}
            <button
              className="banner-slider-prev"
              onClick={goPrev}
              aria-label="Previous Slide"
            >
              <MdKeyboardArrowLeft />
            </button>
            <button
              className="banner-slider-next"
              onClick={goNext}
              aria-label="Next Slide"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}