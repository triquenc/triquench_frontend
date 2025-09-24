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
      const response = await fetch(
        "http://localhost:5000/api/form/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Show success notification
        setNotification(data.message || "Message sent successfully!");

        // Reset form after successful submission
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
        setNotification(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification("Error: Unable to connect to server. Please try again later.");
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
              required
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
              required
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
              required
            />
          </div>
          <div className="form-group phone-field">
            <label htmlFor="mobile">Phone Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter Phone Number"
              value={formData.mobile}
              onChange={handleChange}
              required
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
              required
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
