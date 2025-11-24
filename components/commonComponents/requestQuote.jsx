"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = 'https://d1w2b5et10ojep.cloudfront.net/api';
// const API_BASE_URL = 'http://localhost:5000';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

export default function RequestQuote({ productName }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    formik.resetForm();
  };

  // Update formik initial values when productName prop changes
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      productName: productName || "General Enquiry",
    },
    enableReinitialize: true, // Important: allows the form to update when productName changes
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/productInquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message || "Enquiry sent successfully!");
          closeModal();
        } else {
          toast.error(data.message || "Failed to send enquiry");
        }
      } catch (error) {
        console.error("Error sending enquiry:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {/* --- Existing Section (Unchanged Styles) --- */}
      <section className="request-quote-section">
        <div className="container">
          <div className="request-quote-inner">
            <div className="request-quote-left">
              <h2>Request Quote</h2>
              <p>Share your requirements, and we’ll provide a tailored quote. Explore our premium CNC spindles, VFDs, tool holders, and more for unmatched performance.</p>
              {/* Button opens the modal instead of link */}
              <button onClick={openModal} className="site-btn">SUBMIT ENQUIRY</button>
            </div>
            <div className="request-quote-right">
              <Image src="/images/request-quote-image.svg" width={300} height={283} alt="Request Quote Image"/>
            </div>
          </div>  
        </div>    
      </section> 

      {/* --- Modal Implementation --- */}
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
            <Image
              src="/images/cross.svg"
              height={20}
              width={20}
              alt="Close"
            />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                {...formik.getFieldProps("name")}
                className={formik.touched.name && formik.errors.name ? "input-error" : ""}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error-text">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                {...formik.getFieldProps("email")}
                className={formik.touched.email && formik.errors.email ? "input-error" : ""}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-text">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                {...formik.getFieldProps("phoneNumber")}
                className={formik.touched.phoneNumber && formik.errors.phoneNumber ? "input-error" : ""}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error-text">{formik.errors.phoneNumber}</div>
              )}
            </div>

            {/* Read Only Product Name Field */}
            <div className="form-group">
              <label htmlFor="productName">Product Interested</label>
              <input
                type="text"
                id="productName"
                name="productName"
                readOnly
                {...formik.getFieldProps("productName")}
                className="read-only-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Enter your requirements"
                {...formik.getFieldProps("message")}
                className={formik.touched.message && formik.errors.message ? "input-error" : ""}
              ></textarea>
              {formik.touched.message && formik.errors.message && (
                <div className="error-text">{formik.errors.message}</div>
              )}
            </div>

            <div className="form-group submit-group">
              <button
                type="submit"
                className="site-btn full-width"
                disabled={loading || !formik.isValid}
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