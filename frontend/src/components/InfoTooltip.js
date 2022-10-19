import React from "react";
import SuccessIcon from "../images/SuccessIcon.png";
import ErrorIcon from "../images/ErrorIcon.png";

const InfoTooltip = ({ isOpen, onClose, status }) => {
  return (
    <div className={`modal modal_type_tooltip ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container modal__container_type_tooltip">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_tooltip"
          aria-label="close-button"
          onClick={onClose}
        ></button>

        {status === "success" ? (
          <div>
            <img className="popup__icon" src={SuccessIcon} alt="" />
            <p className="popup__status-message">
              Sucess! You have now been registered.
            </p>
          </div>
        ) : (
          <div>
            <img className="popup__icon" src={ErrorIcon} alt="" />
            <p className="popup__status-message">
              Oops, something went wrong! Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
