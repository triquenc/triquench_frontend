import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  company: Yup.string().required("Company is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile number is required"),
  message: Yup.string().required("Message is required"),
});

// Initial values for the form
const initialValues = {
  name: "",
  email: "",
  company: "",
  mobile: "",
  message: "",
};

const FormSection = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://d1w2b5et10ojep.cloudfront.net/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

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
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Full Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Email */}
              <div className="form-group email-field">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Company */}
              <div className="form-group company-field">
                <label htmlFor="company">Company</label>
                <Field
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Enter Company"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Mobile */}
              <div className="form-group phone-field">
                <label htmlFor="mobile">Phone Number</label>
                <Field
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter Phone Number"
                />
                <ErrorMessage
                  name="mobile"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Type a message here"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  className="site-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default FormSection;