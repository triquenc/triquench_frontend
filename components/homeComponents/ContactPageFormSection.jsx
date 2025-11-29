"use client";
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// List of States
const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().min(3).required("Required"),
  email: Yup.string().email("Invalid email"),
  company: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Digits only")
    .min(10, "Min 10 digits")
    .max(10, "Max 10 digits")
    .required("Required"),
  message: Yup.string().required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  company: "",
  state: "",
  mobile: "",
  message: "",
};

// --- Custom Select Component ---
const InquirySelect = ({ label, name, options, placeholder }) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (value) => {
    helpers.setValue(value);
    setIsOpen(false);
  };

  return (
    <div className="inquiry-group inquiry-half-field" ref={wrapperRef}>
      <label htmlFor={name}>{label}</label>

      {/* visible trigger */}
      <div
        className={`inquiry-select-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(!isOpen);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!field.value ? "placeholder" : "value"}>
          {field.value || placeholder}
        </span>
        <span className="arrow" />
      </div>

      {isOpen && (
        <ul className="inquiry-options-list" role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className={field.value === option ? "selected" : ""}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={field.value === option}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <ErrorMessage name={name} component="div" className="inquiry-error" />
    </div>
  );
};

const InquiryForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        "https://d1w2b5et10ojep.cloudfront.net/api/contact/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        resetForm();
      } else {
        toast.error(data.message || "Error sending message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection failed");
    }
  };

  return (
    <section className="inquiry-section">
      <div className="container">
        <div className="inquiry-wrapper">

          {/* RIGHT SIDE: Clean Form */}
          <div className="inquiry-right-col">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="inquiry-form new-centered-form">
                  
                  {/* Full Name */}
                  <div className="inquiry-group inquiry-full-field">
                    <label htmlFor="name">Full Name</label>
                    <Field type="text" name="name" placeholder="Enter Full Name" />
                    <ErrorMessage name="name" component="div" className="inquiry-error" />
                  </div>

                  {/* Email */}
                  <div className="inquiry-group inquiry-full-field">
                    <label htmlFor="email">Email (Optional)</label>
                    <Field type="email" name="email" placeholder="Enter Email" />
                    <ErrorMessage name="email" component="div" className="inquiry-error" />
                  </div>

                  {/* Company */}
                  <div className="inquiry-group inquiry-half-field">
                    <label htmlFor="company">Company</label>
                    <Field type="text" name="company" placeholder="Enter Company" />
                    <ErrorMessage name="company" component="div" className="inquiry-error" />
                  </div>

                  {/* State */}
                  <InquirySelect
                    label="State"
                    name="state"
                    options={stateOptions}
                    placeholder="Select State"
                  />

                  {/* Phone */}
                  <div className="inquiry-group inquiry-half-field2">
                    <label htmlFor="mobile">Phone Number</label>
                    <Field type="tel" name="mobile" placeholder="Enter Phone Number" />
                    <ErrorMessage name="mobile" component="div" className="inquiry-error" />
                  </div>

                  {/* Message */}
                  <div className="inquiry-group inquiry-full-field">
                    <label htmlFor="message">Message</label>
                    <Field as="textarea" name="message" placeholder="Type a message here" />
                    <ErrorMessage name="message" component="div" className="inquiry-error" />
                  </div>

                  {/* Button */}
                  <div className="inquiry-btn-group">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>

        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default InquiryForm;