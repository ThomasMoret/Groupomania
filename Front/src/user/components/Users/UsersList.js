import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import UsersItem from "./UsersItem";
import "./UsersList.css";

const UsersList = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  const filterUsers = (event) => {
    const searchValue = event.target.value;
    const filteredUsers = users.filter((user) => {
      return (
        user.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredUsers(filteredUsers);
  };

  if (users.length === 0) {
    return (
      <div className="center">
        <h2> Aucun utilisateur trouvé. </h2>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h2> Liste des utilisateurs </h2>
        <div className="users-list-header__searchbar">
          <input
            type="text"
            placeholder="Rechercher un utilisateur"
            onChange={filterUsers}
            className="search-input"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      <ul className="users-list">
        {filteredUsers.map((user) => (
          <UsersItem
            key={user._id}
            id={user._id}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            picture={user.picture}
            bio={user.bio}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
