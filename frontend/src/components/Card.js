import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  likes,
  link,
  owner,
  _id,
  selectedCard,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  function handleClick() {
    onCardClick({ name, link, likes });
  }

  // const [isLiked2, setIsLiked] = React.useState();

  function handleLikeClick() {
    // isLiked(true);
    onCardLike({ likes, _id });
  }

  function handleDeleteClick() {
    onCardDelete(_id);
    // console.log("delete-evt", _id);
  }
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current card
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((user) => user._id === currentUser._id);

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `card__bin-btn ${
    isOwn ? "" : "card__bin-btn_hidden"
  }`;

  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_type_selected" : ""
  }`;

  return (
    <article className="card">
      <img
        className="card__image"
        src={link}
        alt="a picture of a valley"
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="delete button"
        onClick={handleDeleteClick}
      />
      <div className="card__footer">
        <h2 className="card__name">{name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="like button"
            onClick={handleLikeClick}
          ></button>
          <div className="card__likes-count">{likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
