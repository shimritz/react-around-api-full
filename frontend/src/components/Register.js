import { useState, useHistory } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };
  return (
    <div className="register">
      <h2 className="register__title">Sign up</h2>
      {/* {inputs.message && <p className="register__error">{inputs.message}</p>} */}
      <form onSubmit={handleSubmit} className="register__form">
        <input
          placeholder="Email"
          required
          className="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          required
          className="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Sign up
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Already a member?</p>
        <Link to="/login" className="register__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default Register;
