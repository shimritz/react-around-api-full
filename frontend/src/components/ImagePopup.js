import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div className={`modal modal_type_preview ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container modal__container_type_preview">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_preview"
          aria-label="close-button"
          onClick={onClose}
        ></button>
        <img
          className="modal__popup-image"
          src={card.link}
          alt={card ? card.name : "not-found"}
        />
        <figcaption className="modal__popup-name">{card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;
