"use client"; // Keep this to use client-side features

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RequestQuote from "@/components/commonComponents/requestQuote";
import Cookies from 'js-cookie';

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
  // const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  // const router = useRouter();

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
  }, [id]);

  // Get header height for smooth scrolling
  useLayoutEffect(() => {
    const headerElement = document.querySelector('.site-header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  if (!product) {
    return <p>Loading...</p>; // Show loading state until product data is available
  }

  const scrollToSection = (sectionRef) => {
    const sectionPosition = sectionRef.current.offsetTop - headerHeight;
    window.scrollTo({ top: sectionPosition - 1, behavior: 'smooth' });
  };

  const getQuoteModal = async () => {
    const token = Cookies.get('token'); // Get the token from cookies

    if (token) {
      // If token exists, call add-product-name API
      try {
        const response = await fetch('http://localhost:5000/api/getAquote/add-product-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productName: product?.title }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success(data.message); // Show success notification
        } else {
          toast.error(data.message || 'Failed to add product name'); // Show error notification
        }
      } catch (error) {
        console.error('Error adding product name:', error);
        toast.error('Failed to add product name'); // Show error notification
      }
    } else {
      // If no token, open the modal to send OTP
      setIsOpen(true);
    }
  };

  const openOtpModal = () => { setIsOpen(false); setOtpModalIsOpen(true); };
  const closeModal = () => { setIsOpen(false); setOtpModalIsOpen(false); };

  // Send OTP to the provided phone number
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/getAquote/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        openOtpModal();
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP');
    }
  };

  // Verify OTP and store the JWT token
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/getAquote/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      
      const data = await response.json();
      console.log("Verify OTP response data:", data); // Log the response

        if (response.ok) {
            // Ensure that the token is present in the response
            if (data.token) {
                // Store JWT token in cookies instead of localStorage
                Cookies.set('token', data.token); // Token will expire in 7 days
                toast.success(data.message);
                closeModal();

                // Proceed with adding the product name
                await addProductName(data.token, product?.title);
            } else {
                toast.error('Token not found in response');
            }
        } else {
            toast.error(data.message || 'Failed to verify OTP');
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        toast.error('Failed to verify OTP');
    }
  };

  // Add the product to the user's list
  const addProductName = async (token, productName) => {
    try {
      const response = await fetch('http://localhost:5000/api/getAquote/add-product-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productName }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product name:', error);
      toast.error('Failed to add product');
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
                {product?.images && product?.images.map((image, i)=>
                  <SwiperSlide key={i}>
                    <Image src={image?.url} width={540} height={496} alt={image?.alt_text} layout="responsive" className="bg-img" />
                  </SwiperSlide>)}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="thumb-slider"
              >
                {product?.images && product?.images.map((image, i)=>
                  <SwiperSlide key={i}>
                    <Image src={image?.url} width={128} height={120} alt={image?.alt_text} layout="responsive" />
                  </SwiperSlide>)}
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
                  <button onClick={closeModal} className="close-btn">
                    <Image src="/images/cross.svg" height={25} width={25} alt="Close" />
                  </button>
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
                  <button onClick={closeModal} className="close-btn">
                    <Image src="/images/cross.svg" height={25} width={25} alt="Close" />
                  </button>
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
