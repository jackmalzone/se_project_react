import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { AuthContext } from "../../contexts/AuthContext";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, onUpdateUser, isLoading }) {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    setFormData({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save changes"}
    >
      <div className="modal__input-wrapper">
        <label className="modal__label">
          Name*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="modal__input"
            required
          />
        </label>
      </div>
      <div className="modal__input-wrapper">
        <label className="modal__label">
          Avatar URL*
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="Avatar URL"
            className="modal__input"
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
