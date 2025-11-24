// components/PopupClient.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";  // <-- Added

export default function PopupClient({ imageSrc = "/popup.jpg" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
        padding: "10px",
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

      {/* Popup Container */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close Button */}
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

        {/* Image (Converted to next/Image) */}
        <Image
          src={imageSrc}
          alt="Popup"
          width={800}
          height={1200}
          priority
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        />
      </div>
    </div>
  );
}
