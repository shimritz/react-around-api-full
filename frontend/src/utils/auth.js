class Auth {
  constructor() {
    this.baseUrl = "https://register.nomoreparties.co";
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(res.statusText);

  signup(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  signin(email, password) {
    return (
      fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then(this._checkResponse)
        //   console.log(response);
        //   if (response.ok) {
        //     return response.json();
        //   }
        // })
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("email", email);
          return data;
        })
    );
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      });
  }
}

const auth = new Auth();

export default auth;
