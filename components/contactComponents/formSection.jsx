"use client"
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// List of States and UTs
const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
];

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  email: Yup.string().email("Invalid email format"), // Optional
  company: Yup.string().required("Company is required"),
  state: Yup.string().required("State is required"),
  mobile: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number cannot be more than 10 digits")
      .required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

// Initial values
const initialValues = {
  name: "",
  email: "",
  company: "",
  state: "",
  mobile: "",
  message: "",
};

// --- CUSTOM SELECT COMPONENT (Forces Dropdown Downwards) ---
const CustomSelect = ({ label, name, options, placeholder }) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
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
    <div className="form-group city-field" ref={wrapperRef}>
      <label htmlFor={name}>{label}</label>
      
      {/* Trigger Box (Looks like an input) */}
      <div 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!field.value ? "placeholder" : "selected-value"}>
          {field.value || placeholder}
        </span>
        <span className="arrow"></span>
      </div>

      {/* Dropdown List (Absolute Positioned) */}
      {isOpen && (
        <ul className="custom-options-list">
          {options.map((option) => (
            <li 
              key={option} 
              className={`option-item ${field.value === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

const FormSection = () => {
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
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Unable to connect to server. Please try again later.");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-wrapper">
              
              {/* Full Name */}
              <div className="form-group full-name-field">
                <label htmlFor="name">Full Name</label>
                <Field type="text" id="name" name="name" placeholder="Enter Full Name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              {/* Email */}
              <div className="form-group email-field">
                <label htmlFor="email">Email (Optional)</label>
                <Field type="email" id="email" name="email" placeholder="Enter Email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              {/* Company */}
              <div className="form-group company-field">
                <label htmlFor="company">Company</label>
                <Field type="text" id="company" name="company" placeholder="Enter Company" />
                <ErrorMessage name="company" component="div" className="error-message" />
              </div>

              {/* Custom State Dropdown */}
              <CustomSelect 
                label="State" 
                name="state" 
                options={stateOptions} 
                placeholder="Select State" 
              />

              {/* Mobile */}
              <div className="form-group phone-field">
                <label htmlFor="mobile">Phone Number</label>
                <Field type="tel" id="mobile" name="mobile" placeholder="Enter Phone Number" />
                <ErrorMessage name="mobile" component="div" className="error-message" />
              </div>

              {/* Message */}
              <div className="form-group message-field">
                <label htmlFor="message">Message</label>
                <Field as="textarea" id="message" name="message" placeholder="Type a message here" />
                <ErrorMessage name="message" component="div" className="error-message" />
              </div>

              {/* Submit Button */}
              <div className="form-group submit-btn-field">
                <button type="submit" className="site-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>

            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default FormSection;