"use client";
import React from "react";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { allBrandLogos } from "@/lib/home_brand_logo_section";

export default function SliderBanner() {
  return (
    <section className="brand-logo-section relative">
      <div className="container">
        <div className="text-slider-wrapper">
          <div className="text-block">
            <div className="title-block">
              {/* <Image src="/images/brands.svg" alt="brands" width={397} height={95} className="brand-text"/> */}
              <h2 className="has-green-bar_2">
                Trusted by the World’s Leading Brands
              </h2>
            </div>
            <p className="brand-description">
              At TriQuench India, we take immense pride in being a trusted
              partner to some of the most renowned and respected industry
              leaders worldwide. Our dedication to delivering high-quality,
              precision-engineered CNC spindles has earned us a reputation for
              excellence across various sectors.
            </p>
          </div>

          <div className="slider-navgation-wrapper">
            <div className="slider-wrapper">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={14}
                slidesPerView={3} 
                navigation
                loop={true}
                autoplay={{ delay: 6000 }}
           
                breakpoints={{
                  320: { slidesPerView: 1 },
                  479: { slidesPerView: 2 },
                  575: { slidesPerView: 3 },
                 
                }}
              >
                {/* --- Logic to create pairs for top/bottom slides --- */}
                {/* We iterate with a step of 2 to get pairs of logos */}
                {Array.from({ length: Math.ceil(allBrandLogos.length / 2) }).map((_, i) => {
                  const topLogo = allBrandLogos[i * 2];
                  const bottomLogo = allBrandLogos[i * 2 + 1];

                  if (!topLogo) return null;

                  return (
                    <SwiperSlide key={i}>
                      <div className="slide-wrapper">
                     
                        <div className="top-slide white-box">
                          <Image
                            src={topLogo.src}
                            alt={topLogo.alt}
                            fill
                            sizes="(max-width: 575px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                        </div>
                       
                        {bottomLogo && (
                          <div className="bottom-slide white-box">
                            <Image
                              src={bottomLogo.src}
                              alt={bottomLogo.alt}
                              fill
                              sizes="(max-width: 575px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}