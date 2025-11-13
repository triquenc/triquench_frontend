import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// ✅ Validation schema using Yup
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
  message: Yup.string()
   
    .required("Message is required"),
});

const FormSection = () => {
  const [notification, setNotification] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch("https://triquench.ap-south-1.elasticbeanstalk.com/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

    const data = await response.json();

    if (response.ok) {
      setNotification(data.message || "Message sent successfully!");
      resetForm();

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    } else {
      setNotification(data.message || "Something went wrong!");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setNotification(
      "Error: Unable to connect to server. Please try again later."
    );
  }
};


  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          company: "",
          mobile: "",
          message: "",
        }}
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
                <button type="submit" className="site-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default FormSection;