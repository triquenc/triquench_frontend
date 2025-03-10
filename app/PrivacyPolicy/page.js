import React from 'react';
import './PrivacyPolicy.css'; // Add custom styles here

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">Privacy Policy</h1>
      <p className="privacy-policy-text">
        At SpindleMotor.in, we value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit or interact with our website.
      </p>

      <section className="privacy-policy-section">
        <h2>Information We Collect</h2>
        <p>When you visit our website, we may collect the following information:</p>
        <ul>
          <li>Personal Information: Name, email address, phone number, and shipping address.</li>
          <li>Technical Information: IP address, browser type, and operating system.</li>
          <li>Behavioral Information: Pages visited, time spent, and actions taken on our website.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2>How We Use Your Information</h2>
        <p>The information we collect is used to:</p>
        <ul>
          <li>Process and fulfill your orders efficiently.</li>
          <li>Provide customer support and respond to inquiries.</li>
          <li>Improve our website and personalize your experience.</li>
          <li>Send promotional offers and updates about our products.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2>Data Security</h2>
        <p>
          We implement robust security measures to protect your personal data from unauthorized access, alteration, or disclosure. Our website uses SSL encryption to ensure secure communication.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2>Third-Party Services</h2>
        <p>
          We may share your information with trusted third-party service providers for payment processing, shipping, and marketing purposes. These partners are bound by strict confidentiality agreements.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2>Cookies Policy</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. Cookies help us understand user behavior, improve functionality, and provide tailored content. You can manage cookie settings through your browser.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2>Changes to This Policy</h2>
        <p>
          We reserve the right to update this Privacy Policy at any time. Any changes will be communicated on this page. Please review this policy periodically to stay informed.
        </p>
      </section>

      <section className="privacy-policy-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>Email: info@triquenchindia.com</p>
        <p>Address: D-01, Sumel Business Park - 7, N.H.-08, Road, nr. Soni Ni Chawl Road, Rakhial, Ahmedabad, Gujarat 380023
        </p>
      </section>
    </div>
  );
}
