import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, onUpdateUser, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  // Pre-fill form with current user data when modal opens
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
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>
      <label>
        Avatar URL
        <input
          type="url"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
