import React from 'react';
import './Return.css'; // Add custom styles for the return policy

export default function Return() {
  return (
    <div className="return-policy-container">
      <h1 className="return-policy-title">Return Policy</h1>
      <p className="return-policy-text">
        At SpindleMotor.in, we strive to ensure your satisfaction with our products. If you are not entirely happy with your purchase, we're here to help. Please read our return policy carefully.
      </p>

      <section className="return-policy-section">
        <h2>Eligibility for Returns</h2>
        <ul>
          <li>Items must be returned within 15 days from the date of purchase.</li>
          <li>The product must be unused, undamaged, and in its original packaging.</li>
          <li>A valid proof of purchase (invoice or receipt) is required.</li>
        </ul>
      </section>

      <section className="return-policy-section">
        <h2>Non-Returnable Items</h2>
        <p>The following items are not eligible for return:</p>
        <ul>
          <li>Customized or special-order products.</li>
          <li>Products damaged due to mishandling or improper usage.</li>
          <li>Items marked as "Final Sale."</li>
        </ul>
      </section>

      <section className="return-policy-section">
        <h2>Return Process</h2>
        <p>To initiate a return, please follow these steps:</p>
        <ol>
          <li>Contact our customer support at <a href="mailto:info@triquenchindia.com">info@triquenchindia.com</a> to request a return authorization.</li>
          <li>Pack the item securely in its original packaging, including all accessories and documents.</li>
          <li>Ship the package to the return address provided by our team.</li>
        </ol>
        <p>
          Note: Customers are responsible for return shipping costs unless the return is due to a defect or error on our part.
        </p>
      </section>

      <section className="return-policy-section">
        <h2>Refunds</h2>
        <p>
          Once we receive your returned item, we will inspect it and notify you of the approval or rejection of your refund. If approved, the refund will be processed, and the amount will be credited to your original payment method within 7-10 business days.
        </p>
      </section>

      <section className="return-policy-section">
        <h2>Contact Us</h2>
        <p>
          If you have any questions about our return policy, please contact us at:
        </p>
        <p>Email: <a href="mailto:info@triquenchindia.com">info@triquenchindia.com</a></p>
        <p>Phone: +91- 9601111615</p>
        <p>Address: D-01, Sumel Business Park - 7, N.H.-08, Road, nr. Soni Ni Chawl Road, Rakhial, Ahmedabad, Gujarat 380023
        </p>
      </section>
    </div>
  );
}
