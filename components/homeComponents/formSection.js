import React, { useState } from "react";

const FormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile: "",
    message: ""
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://triquench-backend.vercel.app/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);

        // Show success notification
        setNotification("Form submitted successfully!");

        // Optional: Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          mobile: "",
          message: ""
        });

        // Hide notification after 3 seconds
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
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group email-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group company-field">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Enter Company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="form-group phone-field">
            <label htmlFor="mobile">Phone Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter Phone Number"
              value={formData.mobile}
              onChange={handleChange}
            />
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
          </div>
          <div className="form-group">
            <button type="submit" className="site-btn">
              Send Message
            </button>
          </div>
        </div>
      </form>

      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default FormSection;
