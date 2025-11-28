"use client";
import React from "react";
import SliderBanner from '../components/homeComponents/sliderBanner';
import HomeProductList from "../components/homeComponents/homeProductList";
import TestimonialSlider from "../components/homeComponents/testimonialSlider";
import StatisticsSection from "../components/homeComponents/statistics";
import VideoSection from "../components/homeComponents/videoSection";
import FeatureSection from "../components/homeComponents/featureSection";
import AboutSection from "../components/homeComponents/aboutSection";
import FormSection from "../components/contactComponents/formSection";
import SocialWallSection from "../components/homeComponents/socialWallSection";
import BrandLogo from "../components/homeComponents/brandLogo";
import ServiceWeProvide from "../components/commonComponents/serviceWeProvide";
import Image from "next/image";

import PopupClient from "../components/PopupClient";  
import InquiryForm from "@/components/homeComponents/ContactPageFormSection";


export default function Home() {
  return (
    <div className="home-wrapper">

      {/* Popup MUST be inside return() */}
      <PopupClient imageSrc="/popup.jpg" />


      <SliderBanner />
      <HomeProductList />
      <TestimonialSlider />
      {/* <StatisticsSection /> */}
      <VideoSection />
      <FeatureSection />
      <AboutSection />
      
      <section className="form-section">
        <div className="container">
          <div className="text-form-wrapper">
            <div className="text-wrapper">
              <div className="title-block">
                <h2>
                  Submit <span className="d-block">your Enquiry</span>
                </h2>
                <p>
                  We provide “Intelligent Spindle Solutions” and Aspiring to be of
                  Service to Society and Grow along with it.
                </p>
              </div>
              <Image src="/images/submit-query-img.svg" width={416} height={200} alt="Product image" />
            </div>
            <div className="right">
              <InquiryForm/>
            </div>
          </div>
        </div>
      </section>

      <SocialWallSection />
      <BrandLogo />
      <ServiceWeProvide />
    </div>
  );
}
