import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isPreviewImageOpen, setIsPreviewImageOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    aboutMe: "",
    avatar: "",
  });
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [toolTipStatus, setToolTipStatus] = React.useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem("jwt"));
  const history = useHistory();

  React.useEffect(() => {
    if (token) {
      api.setAuthorizationHeader(token);
      setLoggedIn(true);
    }
  }, [token]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser({
            _id: res.data._id,
            name: res.data.name,
            aboutMe: res.data.about,
            avatar: res.data.avatar,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      console.log("islogedein", loggedIn);
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            history.push("/");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      setCards([]);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function onLogin({ email, password }) {
    auth
      .signin(email, password)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setLoggedIn(true);
          setEmail(email);
          setToolTipStatus("success");
          history.push("/");
        } else {
          setToolTipStatus("fail");
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((error) => {
        setToolTipStatus("fail");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function onRegister({ email, password }) {
    auth
      .signup(email, password)
      .then((res) => {
        if (res.data._id) {
          setToolTipStatus("success");

          history.push("/signin");
        } else {
          setToolTipStatus("fail");
        }
      })
      .catch((err) => {
        console.log(err);
        setToolTipStatus("fail");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleTrashBinClick() {
    setIsDeletePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsPreviewImageOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsPreviewImageOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  const handleUpdateUser = (name, about) => {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser({
          _id: res.data._id,
          name: res.data.name,
          aboutMe: res.data.about,
          avatar: res.data.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          _id: res.data._id,
          name: res.data.name,
          aboutMe: res.data.about,
          avatar: res.data.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((state) =>
          state.map((existingCard) =>
            existingCard._id === card._id ? updatedCard.data : existingCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        <Route path="/signin">
          <Login onLogin={onLogin} />
        </Route>
        <Route exact path="/signup">
          <Register onRegister={onRegister} />
        </Route>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </ProtectedRoute>

        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>

      <ImagePopup
        card={selectedCard}
        isOpen={isPreviewImageOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        status={toolTipStatus}
        onClose={closeAllPopups}
      />
      {/* HERE --> whats the difference? */}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      {/* HERE-END */}
      <DeleteCardPopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
