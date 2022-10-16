import React from "react";

import { api } from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onTrashBinClick,
  onCardDelete,
  cards,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__content">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__avatar-container">
          <img
            className="profile__avatar"
            // src={profilePhoto}
            src={currentUser.avatar}
            alt=""
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>

            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__about-me">{currentUser.aboutMe}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          aria-label="add-btn"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      {/* <section className="photos">
        {cards.map((card) => {
          return (
            <Card
              {...card}
              key={card._id}
              onCardClick={onCardClick}
              onTrashBinClick={onTrashBinClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section> */}
    </main>
  );
}

export default Main;
