// app/product/page.js

"use client"; // Keep this if you want to use client-side features

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import Image from "next/image";
import RequestQuote from "@/components/commonComponents/requestQuote";
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function fetchProductData(id) {
  const res = await fetch(`https://triquench-backend.vercel.app/api/product/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return await res.json();
}

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [otpModalIsOpen, setOtpModalIsOpen] = useState(false);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Fetch product data on component mount
  useEffect(() => {
    const getProductData = async () => {
      try {
        const data = await fetchProductData(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    getProductData();
  }, [id]); // Only run once when the `id` changes

  // Ensure hooks are not conditional
  useLayoutEffect(() => {
    const headerElement = document.querySelector('.site-header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  if (!product) {
    return <p  style={{
      width: "100vw",
      textAlign: "center",
      marginBottom: "80px",
      marginTop: "40px"
  }}>Loading...</p>; // Show loading state until product data is available
  }

  const scrollToSection = (sectionRef) => {
    const sectionPosition = sectionRef.current.offsetTop - headerHeight;
    window.scrollTo({ top: sectionPosition - 1, behavior: 'smooth' });
  };

  const getQuoteModal = () => setIsOpen(true);
  const openOtpModal = () => { setIsOpen(false); setOtpModalIsOpen(true); };
  const closeModal = () => { setIsOpen(false); setOtpModalIsOpen(false); };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://triquench.ap-south-1.elasticbeanstalk.com/api/getAquote/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, productName: product?.title }),
      });
      console.log("response:", response);
      console.log("body:", response.body);

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message); // Show success notification
        openOtpModal();
      } else {
        toast.error(data.message || 'Failed to send OTP'); // Show error notification
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP'); // Show error notification
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://triquench.ap-south-1.elasticbeanstalk.com/api/getAquote/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message); // Show success notification
        closeModal();
      } else {
        toast.error(data.message || 'Failed to verify OTP'); // Show error notification
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP'); // Show error notification
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <section className="product-detail-slider-section">
        <div className="container">
          <div className="slider-text-wrapper">
          <div className="thumbmail-slider">
              <Swiper
                modules={[Thumbs, Navigation, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="main-slider"
              >
                {product?.images && product?.images.map((image, i)=><SwiperSlide key={i}>
                  <Image src={image?.url} width={540} height={496} alt={image?.alt_text} layout="responsive" className="bg-img" />
                </SwiperSlide>)}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="thumb-slider"
                breakpoints={{
                  320: { slidesPerView: 2 },
                  375: { slidesPerView: 3 },
                  767: { slidesPerView: 4 },
                }}
              >
                 {product?.images && product?.images.map((image, i)=><SwiperSlide key={i}><Image src={image?.url} width={128} height={120} alt={image?.alt_text} layout="responsive" /></SwiperSlide>)}
                
              </Swiper>
            </div>

            <div className="text-wrapper">
              <h1>{product?.title}</h1>
              <p>{product?.description}</p>
              <ul className="dot-list">
                {product?.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <a className="site-btn border-btn" href={product?.shopNowUrl} target="_blank" rel="noopener noreferrer">
                Shop Now
              </a>
              <button className="site-btn" onClick={getQuoteModal}>Get a Quote</button>
              
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Get a Quote Modal" className="quote-otp-modal">
                <div className="title-wrapper">
                  <h2>Get a Quote</h2>
                  <button onClick={closeModal} className="close-btn"><Image src="/images/cross.svg" height={25} width={25} alt="Close" /></button>
                </div>
                <form onSubmit={handleSendOtp}>
                  <div className="form-wrapper">
                    <div className="form-group">
                      <label htmlFor="number">Phone Number</label>
                      <input
                        type="text"
                        id="number"
                        name="number"
                        placeholder="Enter Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="site-btn">Submit</button>
                    </div>
                  </div>
                </form>
              </Modal>

              <Modal isOpen={otpModalIsOpen} onRequestClose={closeModal} contentLabel="OTP Modal" className="quote-otp-modal">
                <div className="title-wrapper">
                  <h2>OTP Verification</h2>
                  <button onClick={closeModal} className="close-btn"><Image src="/images/cross.svg" height={25} width={25} alt="Close" /></button>
                </div>
                <p>We have sent OTP on your given mobile number</p>
                <form onSubmit={handleVerifyOtp}>
                  <div className="form-wrapper">
                    <div className="form-group">
                      <label htmlFor="otp">OTP</label>
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="site-btn">Submit</button>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </section>

      <section className="product-info-blocks">
        <div className="product-block-navigation">
          <div className="container">
            <ul>
              <li><button onClick={() => scrollToSection(section1Ref)}>Specifications</button></li>
              <li><button onClick={() => scrollToSection(section3Ref)}>Applications</button></li>
              {/* <li><button onClick={() => scrollToSection(section2Ref)}>Download</button></li> */}
            </ul>
          </div>
        </div>
        <div className="product-info-block-inner">
          <div className="container">
            <div className="product-info-block specification-block" ref={section1Ref}>
              <h3 className="block-title">Specifications</h3>
              <ul className="specification-list">
                {product?.specifications.map((spec, index) => (
                  <li key={index}>
                    <span className="spec-name">{spec?.label}</span>
                    <span className="spec-value">{spec?.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="product-info-block download-block" ref={section2Ref}>
              <h3 className="block-title">Download</h3>
              <div className="download-grid">
                <div className="download-left">
                  <Image src={product?.downloads?.displayImage} width={690} height={383} alt="Download Image" />
                </div>
                <div className="download-right">
                      <div className="doc-btn-wrapper">
                        <a href={product?.downloads?.technicalSheetLink} target="_blank" className="doc-btn">
                          <span className="doc-icon"><Image src="/images/pdf-icon.svg" height={50} width={50} alt="PDF Icon"/></span>
                          <span className="doc-text">Technical Sheet</span>
                        </a>
                        <a href={product?.downloads?.otherDocument} target="_blank" className="doc-btn">
                          <span className="doc-icon"><Image src="/images/pdf-icon.svg" height={50} width={50} alt="PDF Icon"/></span>
                          <span className="doc-text">Other Document</span>
                        </a>
                      </div>
                    </div>
              </div>
            </div> */}
            <div className="product-info-block applications-block" ref={section3Ref}>
              <h3 className="block-title">Applications</h3>
              <ul>
                {product?.applications.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RequestQuote />
    </div>
  );
}
