import React from 'react';
import './Terms.css'; // Add custom styles for the terms page

export default function Terms() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p className="terms-text">
        Welcome to SpindleMotor.in. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
      </p>

      <section className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our website.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. Use of the Website</h2>
        <p>
          You agree to use the website only for lawful purposes. You are prohibited from:
        </p>
        <ul>
          <li>Violating any applicable laws or regulations.</li>
          <li>Engaging in fraudulent activities or providing false information.</li>
          <li>Attempting to harm, disrupt, or gain unauthorized access to the website or its services.</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>3. Intellectual Property</h2>
        <p>
          All content, including text, images, logos, and designs, on this website is the property of SpindleMotor.in and is protected by intellectual property laws. Unauthorized use or reproduction is strictly prohibited.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. Product Information</h2>
        <p>
          We strive to provide accurate product descriptions and specifications. However, errors may occur, and we reserve the right to correct them without prior notice.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Limitation of Liability</h2>
        <p>
          SpindleMotor.in shall not be held liable for any damages arising from the use or inability to use our website or products. This includes, but is not limited to, direct, indirect, incidental, and consequential damages.
        </p>
      </section>

      <section className="terms-section">
        <h2>6. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes arising from these terms shall be resolved exclusively in the courts of Ahmedabad, Gujarat.
        </p>
      </section>

      <section className="terms-section">
        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Please review these terms periodically to stay informed.
        </p>
      </section>

      <section className="terms-section">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these terms, please contact us at:
        </p>
        <p>Email: <a href="mailto:support@spindlemotor.in">support@spindlemotor.in</a></p>
        <p>Phone: +91-XXXXXXXXXX</p>
        <p>Address: Ahmedabad, Gujarat, India</p>
      </section>
    </div>
  );
}
