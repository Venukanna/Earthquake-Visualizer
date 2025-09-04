// src/components/Notification/Notification.jsx
import React from "react";
import "./Notification.css";

export default function Notification({ message, onClose }) {
  if (!message) return null; // don’t render if no message

  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>✖</button>
    </div>
  );
}
