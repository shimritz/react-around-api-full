import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name || "");
  const [aboutMe, setAboutMe] = React.useState(currentUser.aboutMe || "");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setAboutMe(currentUser.aboutMe || "");
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleAboutMeChange = (evt) => {
    setAboutMe(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, aboutMe);
  };
  return (
    <>
      <PopupWithForm
        name="profile"
        title="Edit profile"
        isOpen={isOpen}
        onClose={onClose}
        buttonText={"Save"}
        onSubmit={handleSubmit}
      >
        <input
          id="name-input"
          className="form__input form__input_type_name"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span id="name-input-error"></span>
        <input
          id="aboutme-input"
          className="form__input form__input_type_about-me"
          type="text"
          name="aboutMe"
          required
          minLength="2"
          maxLength="200"
          value={aboutMe}
          onChange={handleAboutMeChange}
        />
        <span id="aboutme-input-error"></span>
      </PopupWithForm>
    </>
  );
}
export default EditProfilePopup;
