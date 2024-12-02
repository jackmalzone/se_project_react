import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { AuthContext } from "../../contexts/AuthContext";
import { useFormAndValidation } from "../../hooks/useFormValidation";
import "./EditProfileModal.css";
import Input from "../Input/Input";

function EditProfileModal({ onClose, onUpdateUser, isLoading }) {
  const { currentUser } = useContext(AuthContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });

  useEffect(() => {
    resetForm({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onUpdateUser(values);
    }
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isValid={isValid}
    >
      <Input
        label="Name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
        required
        error={errors.name}
      />
      <Input
        label="Avatar URL"
        type="url"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
        required
        error={errors.avatar}
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
