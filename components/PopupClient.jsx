// components/PopupClient.jsx
"use client";

import { useEffect, useState } from "react";

export default function PopupClient({ imageSrc = "/popup.jpg" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup every time homepage loads
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px", // mobile safe padding
      }}
    >
      {/* Overlay */}
      <div
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      />

      {/* Popup container – shrink-wrap to image */}
      <div
        style={{
          position: "relative",
          display: "inline-block", // 👈 container fits image size
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button – now relative to image bounds */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 10,
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            border: "none",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: "28px",
            textAlign: "center",
          }}
        >
          ×
        </button>

        {/* Image – full, no cropping, fits all devices */}
        <img
          src={imageSrc}
          alt="Popup"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh", // never taller than viewport
          }}
        />
      </div>
    </div>
  );
}
