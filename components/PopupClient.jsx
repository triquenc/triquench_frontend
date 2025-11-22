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
        padding: "10px", // Mobile safe padding
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

      {/* Popup container */}
<div
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "600px",      // more width for large screens
    maxHeight: "95vh",      // full screen height safe
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* Close button stays same */}
  <button
    onClick={() => setVisible(false)}
    aria-label="Close popup"
    style={{
      position: "absolute",
      right: "10px",
      top: "10px",
      zIndex: 10,
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      border: "none",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: "20px",
      lineHeight: "32px",
      textAlign: "center",
    }}
  >
    ×
  </button>

  <img
    src={imageSrc}
    alt="Popup"
    style={{
      width: "100%",
      height: "100%",
      maxHeight: "95vh",
      objectFit: "contain",   // full image always visible
      display: "block",
    }}
  />
</div>

    </div>
  );
}
