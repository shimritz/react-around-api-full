import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, onSubmit }) {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmitAvatar(e) {
    e.preventDefault();
    onUpdateAvatar(
      inputRef.current
        .value /* The value of the input which we got using the ref */
    );
  }

  return (
    <>
      <PopupWithForm
        name="changeAvatar"
        title="Change avatar"
        isOpen={isOpen}
        onClose={onClose}
        buttonText={"Save"}
        onSubmit={handleSubmitAvatar}
      >
        <input
          className="form__input form__input_type_image"
          type="url"
          name="image"
          id="avatarImage-input"
          placeholder="Image URL"
          required
          ref={inputRef}
        />
        <span id="avatarImage-input-error"></span>
      </PopupWithForm>
    </>
  );
}
export default EditAvatarPopup;
