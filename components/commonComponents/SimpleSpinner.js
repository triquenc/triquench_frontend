import React from "react";

const SimpleSpinner = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "row", // Aligns items horizontally
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "200px",
      margin: "auto",
      gap: "30px", // Space between spinner and text
    }}
  >
    <style>
      {`
      .loader {
        color: #ffffff;
        font-size: 8px; /* Makes the spinner even smaller */
        margin: 0; /* Removed auto margin */
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: relative;
        text-indent: -9999em;
        animation: mulShdSpin 1.1s infinite ease;
        transform: translateZ(0);
      }

      @keyframes mulShdSpin {
        0%, 100% {
          box-shadow: 0em -2.6em 0em 0em #006098, 1.8em -1.8em 0 0em rgba(0,96,152,0.2), 2.5em 0em 0 0em rgba(0,96,152,0.2), 1.75em 1.75em 0 0em rgba(0,96,152,0.2), 0em 2.5em 0 0em rgba(0,96,152,0.2), -1.8em 1.8em 0 0em rgba(0,96,152,0.2), -2.6em 0em 0 0em rgba(0,96,152,0.5), -1.8em -1.8em 0 0em rgba(0,96,152,0.7);
        }
        12.5% {
          box-shadow: 0em -2.6em 0em 0em rgba(0,96,152,0.7), 1.8em -1.8em 0 0em #006098, 2.5em 0em 0 0em rgba(0,96,152,0.2), 1.75em 1.75em 0 0em rgba(0,96,152,0.2), 0em 2.5em 0 0em rgba(0,96,152,0.2), -1.8em 1.8em 0 0em rgba(0,96,152,0.2), -2.6em 0em 0 0em rgba(0,96,152,0.2), -1.8em -1.8em 0 0em rgba(0,96,152,0.5);
        }
        25% {
          box-shadow: 0em -2.6em 0em 0em rgba(0,96,152,0.5), 1.8em -1.8em 0 0em rgba(0,96,152,0.7), 2.5em 0em 0 0em #006098, 1.75em 1.75em 0 0em rgba(0,96,152,0.2), 0em 2.5em 0 0em rgba(0,96,152,0.2), -1.8em 1.8em 0 0em rgba(0,96,152,0.2), -2.6em 0em 0 0em rgba(0,96,152,0.2), -1.8em -1.8em 0 0em rgba(0,96,152,0.2);
        }
        37.5% {
          box-shadow: 0em -2.6em 0em 0em rgba(0,96,152,0.2), 1.8em -1.8em 0 0em rgba(0,96,152,0.5), 2.5em 0em 0 0em rgba(0,96,152,0.7), 1.75em 1.75em 0 0em #006098, 0em 2.5em 0 0em rgba(0,96,152,0.2), -1.8em 1.8em 0 0em rgba(0,96,152,0.2), -2.6em 0em 0 0em rgba(0,96,152,0.2), -1.8em -1.8em 0 0em rgba(0,96,152,0.2);
        }
        50% {
          box-shadow: 0em -2.6em 0em 0em rgba(0,96,152,0.2), 1.8em -1.8em 0 0em rgba(0,96,152,0.2), 2.5em 0em 0 0em rgba(0,96,152,0.5), 1.75em 1.75em 0 0em rgba(0,96,152,0.7), 0em 2.5em 0 0em #006098, -1.8em 1.8em 0 0em rgba(0,96,152,0.2), -2.6em 0em 0 0em rgba(0,96,152,0.2), -1.8em -1.8em 0 0em rgba(0,96,152,0.2);
        }
      }
      `}
    </style>

    <div className="loader"></div>
    <span style={{ fontSize: "14px", fontWeight: "500", color: "#006098" }}>
      Please wait...
    </span>
  </div>
);

export default SimpleSpinner;