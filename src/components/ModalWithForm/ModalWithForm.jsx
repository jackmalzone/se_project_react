import "./ModalWithForm.css";

function ModalWithForm({ buttonText, title, isOpen, onClose, children }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""} modal_type_form`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
