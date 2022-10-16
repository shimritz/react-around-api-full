import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setImage("");
    }
  }, [isOpen]);

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link: image });
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleImageChange = (evt) => {
    setImage(evt.target.value);
    console.log(image);
  };

  return (
    <PopupWithForm
      name="addNewCard"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Create"}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        id="title-input"
        className="form__input form__input_type_name"
        type="text"
        name="title"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span id="title-input-error"></span>
      <input
        id="image-input"
        className="form__input form__input_type_image"
        type="url"
        name="image"
        placeholder="Image URL"
        required
        value={image}
        onChange={handleImageChange}
      />
      <span id="image-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
