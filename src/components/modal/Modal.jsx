import React from "react";
import "./Modal.css";

function Modal({ open, title, message, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">{message}</div>
        <div className="modal-actions">
          <button className="modal-ok" onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
