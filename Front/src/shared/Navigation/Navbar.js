import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../images/loader.png";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("userId"));

  const Disconnect = () => {
    localStorage.removeItem("token", "userId");
    window.location = "/auth";
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar__link ">
        <span>
          <img src={Logo} alt="logo" className="navbar__icon" />
        </span>
        <p className="navbar__title">Groupomania</p>
      </Link>
      {window.location.pathname === "/home" ? (
        <Link to="/home" className="navbar__link nav__hover active">
          <span>
            <FontAwesomeIcon icon={faHome} className="navbar__icon" />
          </span>
          <p className="navbar__text">Accueil</p>
        </Link>
      ) : (
        <Link to="/home" className="navbar__link nav__hover">
          <span>
            <FontAwesomeIcon icon={faHome} className="navbar__icon" />
          </span>
          <p className="navbar__text">Accueil</p>
        </Link>
      )}
      {window.location.pathname === "/users" ? (
        <Link to="/users" className="navbar__link nav__hover active">
          <span>
            <FontAwesomeIcon icon={faUsers} className="navbar__icon" />
          </span>
          <p className="navbar__text">Utilisateurs</p>
        </Link>
      ) : (
        <Link to={"/users"} className="navbar__link nav__hover">
          <span>
            <FontAwesomeIcon icon={faUsers} className="navbar__icon" />
          </span>
          <p className="navbar__text">Utilisateurs</p>
        </Link>
      )}
      {window.location.pathname === "/users/" + user._id ? (
        <Link
          to={"/users/" + user.id}
          className="navbar__link nav__hover active"
        >
          <span>
            <FontAwesomeIcon icon={faUser} className="navbar__icon" />
          </span>
          <p className="navbar__text">Profil</p>
        </Link>
      ) : (
        <Link to={"/users/" + user._id} className="navbar__link nav__hover">
          <span>
            <FontAwesomeIcon icon={faUser} className="navbar__icon" />
          </span>
          <p className="navbar__text">Profil</p>
        </Link>
      )}
      <Link to="/auth" className="navbar__link nav__hover" onClick={Disconnect}>
        <p className="navbar__text">Déconnexion</p>
        <div className="vertical-line"></div>
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          className="navbar__icon nav__logout"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
