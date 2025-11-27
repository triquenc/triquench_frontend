"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown } from "react-icons/fa"; // Make sure to install react-icons or use an image

// const API_BASE_URL = 'https://d1w2b5et10ojep.cloudfront.net/api';
const API_BASE_URL = 'https://d1w2b5et10ojep.cloudfront.net/api';

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot be more than 10 digits")
    .required("Phone number is required"),
  state: Yup.string().required("State is required"),
  message: Yup.string().required("Message is required"),
});

export default function RequestQuote({ productName }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // NEW: State for Custom Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setIsDropdownOpen(false); // Close dropdown when modal closes
    formik.resetForm();
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const formik = useFormik({
    initialValues: {
      name: "", email: "", phoneNumber: "", state: "", message: "",
      productName: productName || "General Enquiry",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/productInquiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.indexOf("application/json") !== -1) {
            data = await response.json();
        } else {
            data = { message: await response.text() };
        }

        if (response.ok) {
          toast.success(data.message || "Enquiry sent successfully!");
          closeModal();
        } else {
          toast.error(data.message || `Error: ${response.status}`);
        }
      } catch (error) {
        toast.error("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <section className="request-quote-section">
        <div className="container">
          <div className="request-quote-inner">
            <div className="request-quote-left">
              <h2>Request Quote</h2>
              <p>Share your requirements, and we’ll provide a tailored quote.</p>
              <button onClick={openModal} className="site-btn">SUBMIT ENQUIRY</button>
            </div>
            <div className="request-quote-right">
              <Image src="/images/request-quote-image.svg" width={300} height={283} alt="Request Quote Image"/>
            </div>
          </div>  
        </div>    
      </section> 

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Request Quote Modal"
        className="quote-modal-content"
        overlayClassName="quote-modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h2>Get a Quote</h2>
          <button onClick={closeModal} className="close-btn">
            <Image src="/images/cross.svg" height={20} width={20} alt="Close" />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={formik.handleSubmit}>
            {/* ... Other inputs (Name, Email, Phone) remain same ... */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter Name" {...formik.getFieldProps("name")} className={formik.touched.name && formik.errors.name ? "input-error" : ""} />
              {formik.touched.name && formik.errors.name && <div className="error-text">{formik.errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter Email" {...formik.getFieldProps("email")} className={formik.touched.email && formik.errors.email ? "input-error" : ""} />
              {formik.touched.email && formik.errors.email && <div className="error-text">{formik.errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" maxLength={10} {...formik.getFieldProps("phoneNumber")} onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); formik.handleChange(e); }} className={formik.touched.phoneNumber && formik.errors.phoneNumber ? "input-error" : ""} />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className="error-text">{formik.errors.phoneNumber}</div>}
            </div>



{/* --- CUSTOM STATE DROPDOWN --- */}
<div className="form-group" ref={dropdownRef}>
  <label htmlFor="state">State</label>
  <div 
    className={`custom-select-trigger ${formik.touched.state && formik.errors.state ? "input-error" : ""}`} 
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    {/* UPDATED SPAN: Adds 'placeholder' class if value is empty */}
    <span className={!formik.values.state ? "placeholder" : ""}>
      {formik.values.state || "Select State"}
    </span>
    
    <FaChevronDown className={`arrow ${isDropdownOpen ? 'open' : ''}`} />
  </div>
  
  {isDropdownOpen && (
    <ul className="custom-options-list">
      {INDIAN_STATES.map((state) => (
        <li 
          key={state} 
          onClick={() => {
            formik.setFieldValue("state", state);
            setIsDropdownOpen(false);
          }}
          className={formik.values.state === state ? "selected" : ""}
        >
          {state}
        </li>
      ))}
    </ul>
  )}
  
  {formik.touched.state && formik.errors.state && (
    <div className="error-text">{formik.errors.state}</div>
  )}
</div>
            {/* ----------------------------- */}

            <div className="form-group">
              <label htmlFor="productName">Product Interested</label>
              <input type="text" id="productName" name="productName" readOnly {...formik.getFieldProps("productName")} className="read-only-input" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="3" placeholder="Enter your requirements" {...formik.getFieldProps("message")} className={formik.touched.message && formik.errors.message ? "input-error" : ""}></textarea>
              {formik.touched.message && formik.errors.message && <div className="error-text">{formik.errors.message}</div>}
            </div>

            <div className="form-group submit-group">
  <button 
    type="submit" 
    className="site-btn full-width" 
    disabled={loading} // Only disable when sending data
  >
    {loading ? "Sending..." : "Submit"}
  </button>
</div>
          </form>
        </div>
      </Modal>
    </>
  );
}