import "./ModalWithForm.css";
import React, { useEffect, useState, useCallback } from "react";
import { useEscape } from "../../hooks/useEscape";
import { useOverlayClick } from "../../hooks/useOverlayClick";

const ModalWithForm = React.forwardRef(
  (
    { title, onClose, onSubmit, children, buttonText, isValid, isLoading },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setTimeout(onClose, 300);
    }, [onClose]);

    useEscape(handleClose);

    useOverlayClick(ref, handleClose);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isValid) {
        onSubmit(e);
      }
    };

    return (
      <div className={`modal ${isOpen ? "modal_opened" : ""}`} ref={ref}>
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={handleClose}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form" onSubmit={handleSubmit}>
            {children}
            <button
              type="submit"
              className="modal__submit"
              disabled={!isValid || isLoading}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default ModalWithForm;

// COULD BE IMPROVED

// import { useEffect } from "react";

// export const Modal = ({ name, onClose, children }) => {
//   // here is `useEffect` for the `Escape` listener
//   useEffect(() => {
//     // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
//     const handleEscape = (e) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     document.addEventListener("keydown", handleEscape);
//     // don’t forget to remove the listener in the `clean-up` function
//     return () => document.removeEventListener("keydown", handleEscape);
//   }, [onClose]);

//   // here is the overlay handler
//   const handleOverlay = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // then we add the main wrapper with class `modal`
//   return (
//     <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
//       {/* the container for the contents */}
//       <div className="modal__container">
//         {/* here will be anything you add as `children`*/}
//         {children}
//         {/* add the close button */}
//         <button className="modal__close" type="button" onClick={onClose} />
//       </div>
//     </div>
//   );
// };

// And now you can use Modal for any popup in the project:  ItemModal  and ModalWithForm

// function ModalWithForm({ name, onClose, ...props}) {
//   return (
//     <Modal name={name} onClose={onClose}>
//         <h2 className='popup__title'>{props.title}</h2>

// You can make also Input for inputs and Form for any form in the project.
