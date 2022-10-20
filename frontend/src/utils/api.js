class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        headers: this._headers,
        method: "DELETE",
      },
      { mode: "no-cors" }
    ).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.removeLike(id);
  }
}

// baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
// authorization: "eb6ecb60-6b2b-4de0-89d0-cf4bc28e2e2a",
console.log("base-url", process.env.REACT_APP_BASE_URL);
console.log("base-url", process.env.PUBLIC_URL);
const api = new Api({
  baseUrl: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUwNDYzMWYwZmViZjI1NmNiMGU3NTMiLCJpYXQiOjE2NjYyMDUyNDYsImV4cCI6MTY2NjgxMDA0Nn0.5mxCnAwKx5kvmbK-RRm9HgnrcHwchprcJhcIL_6Mlds",
    "Content-Type": "application/json",
  },
});

export default api;
