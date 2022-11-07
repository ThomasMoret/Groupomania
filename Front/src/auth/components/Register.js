import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../images/loader.png";

const URL_API = "http://localhost:5000";

const Register = ({ toggleLogin }) => {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const firstError = (err) => {
    const errors = err.response.data.errors;
    const errorsArray = [];
    for (const key in errors) {
      errorsArray.push(errors[key]);
    }
    return errorsArray[0];
  };

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

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL_API}/api/auth/signup`, {
        firstname,
        lastname,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", JSON.stringify(res.data.userId));
      window.location.href = "/";
    } catch (err) {
      setError(firstError(err));
    }
  };

  return (
    <div className="login">
      <form onSubmit={registerUser} className="form-login center">
        <div className="logo-form__box">
          <p>Group</p>
          <img src={Logo} alt="logo" className="logo-form" />
          <p>Mania</p>
        </div>
        <h1 className="title">Inscription</h1>
        <input
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="Prénom"
        />
        <input
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="Nom"
        />
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
          Inscription
        </button>

        <p className="text-form">
          Vous avez déjà un compte ? <br />
          <span onClick={toggleLogin} className="link">
            <strong>Connectez-vous</strong>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
