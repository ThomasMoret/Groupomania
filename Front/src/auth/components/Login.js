import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../images/loader.png";
import "./Login.css";

const URL_API = "http://localhost:5000";

const Login = ({ toggleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const ifError = () => {
    if (error) {
      return (
        <span className="error-box">
          <span>
            <FontAwesomeIcon
              className="error-icon"
              icon={faTriangleExclamation}
            />
          </span>
          <p className="error">{error}</p>
        </span>
      );
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL_API}/api/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", JSON.stringify(res.data.userId));
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="login">
      <form onSubmit={loginUser} className="form-login center">
        <div className="logo-form__box">
          <p>Group</p>
          <img src={Logo} alt="logo" className="logo-form" />
          <p>Mania</p>
        </div>
        <h1 className="title">Connexion</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Adresse email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="off"
          placeholder="Mot de passe"
        />
        {ifError()}
        <button type="submit" className="button-login">
          Connexion
        </button>
        <p className="text-form">
          Vous n'avez pas de compte ? <br />
          <span onClick={toggleLogin} className="link">
            <strong>Inscrivez-vous</strong>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
