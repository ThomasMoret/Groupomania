import React from "react";

import Logo from "../../../images/logo.png";
import EditUser from "./EditUser";
import "./UserInfo.css";

const UserInfo = (props) => {
  const [edit, setEdit] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("userId"));

  return (
    <div className="user">
      <div className="user__banner">
        <div className="user__banner__img">
          <img src={Logo} alt="banner" className="user__banner__img__logo" />
        </div>
      </div>
      <div className="user__info">
        <img
          src={props.user.picture}
          alt={props.user.firstname + " " + props.user.lastname}
          className="user__info__picture"
        />
        {props.user._id === user._id && (
          <div className="user__info__edit">
            <button
              className="user__info__edit__button"
              onClick={() => setEdit(!edit)}
            >
              Modifier
            </button>
          </div>
        )}
        <div className="user__info__name">
          <h1>{props.user.firstname + " " + props.user.lastname}</h1>
        </div>
        <div className="user__info__email">
          <h2>{props.user.email}</h2>
        </div>
        <div className="user__info__bio">
          <p>{props.user.bio}</p>
        </div>
      </div>
      {edit && (
        <EditUser
          user={props.user}
          fetchUser={props.fetchUser}
          setEdit={setEdit}
          fetchUserPosts={props.fetchUserPosts}
        />
      )}
    </div>
  );
};

export default UserInfo;
