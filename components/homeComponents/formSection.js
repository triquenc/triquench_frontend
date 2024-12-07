import React, { useState } from "react";

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState("");

  // Function to validate individual fields
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "*Full name is required.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "*Email is required.";
        else if (!emailRegex.test(value)) error = "Invalid email format.";
        break;
      case "company":
        if (!value.trim()) error = "*Company name is required.";
        break;
      case "mobile":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) error = "*Phone number is required.";
        else if (!phoneRegex.test(value)) error = "Enter a valid 10-digit phone number.";
        break;
      case "message":
        if (!value.trim()) error = "*Message cannot be empty.";
        break;
      default:
        break;
    }

    return error;
  };

  // Function to validate all fields
  const validateAllFields = () => {
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear the error as user types
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const formErrors = validateAllFields();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setNotification("Please fix the highlighted errors.");
      return;
    }

    try {
      const response = await fetch("https://d1w2b5et10ojep.cloudfront.net/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);

        setNotification("Form submitted successfully!");

        setFormData({
          name: "",
          email: "",
          company: "",
          mobile: "",
          message: ""
        });

        setTimeout(() => {
          setNotification("");
        }, 3000);
      } else {
        console.error("Error submitting form:", response.statusText);
        setNotification("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="form-group full-name-field">
            <label htmlFor="name" aria-required>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group email-field">
            <label htmlFor="email" aria-required>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group company-field">
            <label htmlFor="company" aria-required>Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Enter Company"
              value={formData.company}
              onChange={handleChange}
            />
            {errors.company && <span className="error">{errors.company}</span>}
          </div>
          <div className="form-group phone-field">
            <label htmlFor="mobile" aria-required >Phone Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter Phone Number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type a message here"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <div className="form-group">
            <button type="submit" className="site-btn">
              Send Message
            </button>
          </div>
        </div>
      </form>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default FormSection;
