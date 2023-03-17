import React from "react";
import "./Overlay.css";

const Overlay = ({ message, isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="overlay-background">
      <div className="overlay-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
