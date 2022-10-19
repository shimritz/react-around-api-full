import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

import logo from "../images/Vectorlogo.svg";

function Header({ email, onSignOut }) {
  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={logo} alt="Around The U.S." />
        <Route exact path="/">
          <div className="header__content">
            <p className="header__user">{email}</p>
            <button className="header__logout" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </Route>
        <Route path="/signup">
          <Link to="signin" className="header__link-to-signup">
            Log in
          </Link>
        </Route>
        <Route path="/signin">
          <Link to="signup" className="header__link-to-signin">
            Sign up
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
