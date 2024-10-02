import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  console.log("ModalWithForm rendered, isOpen:", isOpen);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "30px",
          left: 0,
          background: "lime",
          padding: "10px",
          zIndex: 10000,
        }}
      >
        ModalWithForm Debug: isOpen = {isOpen.toString()}
      </div>
      <div
        className={`modal ${isOpen ? "modal__opened" : ""}`}
        style={{
          position: "fixed !important",
          top: "50% !important",
          left: "50% !important",
          transform: "translate(-50%, -50%) !important",
          backgroundColor: "red !important",
          padding: "20px !important",
          zIndex: 10001,
          width: "200px !important",
          height: "200px !important",
          display: "block !important",
          visibility: "visible !important",
          opacity: 1,
        }}
      >
        <div
          className="modal__content"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
          ></button>
          <form action="" className="modal__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
