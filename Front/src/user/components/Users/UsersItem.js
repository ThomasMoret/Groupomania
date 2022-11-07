import React from "react";
import { Link } from "react-router-dom";

import "./UsersItem.css";

const UsersItem = ({ id, firstname, lastname, email, picture, bio }) => {
  return (
    <li className="users-item" key={id}>
      <div className="users-item__content">
        <div>
          <img src={picture} alt={firstname} className="users-item__image" />
        </div>
        <div className="users-item__info">
          <p>
            <strong>{firstname + " " + lastname}</strong>
          </p>
          <p>{email}</p>
          <p>{bio}</p>
        </div>
      </div>
      <div className="users-item__actions">
        <Link to={`/users/${id}`}>
          <button className="btn-users">Voir le profil</button>
        </Link>
      </div>
    </li>
  );
};

export default UsersItem;
