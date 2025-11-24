"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Define Base URL correctly
const API_BASE_URL = 'https://d1w2b5et10ojep.cloudfront.net/api';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be digits only")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number cannot be more than 10 digits") // Added Max constraint
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      productName: productName || "General Enquiry",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/productInquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
          console.error("API Error:", data);
          toast.error(data.message || `Error: ${response.status} Failed to send enquiry`);
        }
      } catch (error) {
        console.error("Network Error:", error);
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
              <p>Share your requirements, and we’ll provide a tailored quote. Explore our premium CNC spindles, VFDs, tool holders, and more for unmatched performance.</p>
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
                maxLength={10} // 1. Physical Restriction
                onInput={(e) => { // 2. Force only numbers
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  formik.handleChange(e);
                }}
                className={formik.touched.phoneNumber && formik.errors.phoneNumber ? "input-error" : ""}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="error-text">{formik.errors.phoneNumber}</div>
              )}
            </div>

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