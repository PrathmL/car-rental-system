import React from 'react';
import ReactDOM from 'react-dom';
import './ImageModal.css';

const ImageModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  // Render to the end of <body> to avoid parent z-index/overflow issues
  return ReactDOM.createPortal(
    <div className="image-modal-overlay" onClick={onClose}>
      <button className="image-modal-close" onClick={onClose}>&times;</button>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="img-fluid rounded-4 shadow-2xl" />
        {alt && <div className="image-modal-caption">{alt}</div>}
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
