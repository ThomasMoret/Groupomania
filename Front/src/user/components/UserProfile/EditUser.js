import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCamera } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

import { editUser } from "../../../utils/Api";
import "./EditUser.css";

const EditUser = (props) => {
  const [firstname, setFirstname] = React.useState(props.user.firstname);
  const [lastname, setLastname] = React.useState(props.user.lastname);
  const [bio, setBio] = React.useState(props.user.bio);
  const [picture, setPicture] = React.useState(props.user.picture);
  const [picturePreview, setPicturePreview] = React.useState(null);

  const handleEditUser = async (e) => {
    e.preventDefault();
    await editUser(props.user._id, firstname, lastname, bio, picture);
    props.fetchUser();
    props.fetchUserPosts();
    props.setEdit(false);
  };

  const handleImage = (e) => {
    setPicture(e.target.files[0]);
  };

  const closeEditOutside = (e) => {
    if (e.target.className === "edit-user") {
      props.setEdit(false);
    }
  };

  const closEdit = () => {
    props.setEdit(false);
  };

  return (
    <div className="edit-user" onMouseDown={closeEditOutside}>
      <div className="edit-user-form">
        <div className="edit-user-form-header">
          <div className="edit-user-form-header-close" onClick={closEdit}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="edit-user-form-header-title">
            <p>Profil</p>
          </div>
          <div className="edit-user-form-header-modify">
            <button
              className="edit-user-form-header-modify-button"
              onClick={(e) => {
                handleEditUser(e);
              }}
              type="submit"
              form="edit-user-form"
            >
              Modifier
            </button>
          </div>
        </div>
        <form
          className="edit-user-form-body"
          onSubmit={handleEditUser}
          id="edit-user-form"
        >
          <div className="edit-user-form-body-picture">
            {picturePreview ? (
              <img
                src={picturePreview}
                alt="preview"
                className="edit-user-form-body-picture-img"
              />
            ) : (
              <img
                src={picture}
                alt="user"
                className="edit-user-form-body-picture-img"
              />
            )}
            <label
              htmlFor="image"
              className="edit-user-form-body-picture-label"
            >
              <FontAwesomeIcon icon={faCamera} />
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={(e) => {
                handleImage(e);
                setPicturePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <div className="edit-user-form-body-inputs">
            <div className="edit-user-form-body-inputs-firstname edit-user-form-body-inputs-wrapper">
              <label
                htmlFor="firstname"
                className="edit-user-form-body-inputs-label"
              >
                Prénom
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                autoComplete="off"
                className="edit-user-form-body-inputs-input"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="edit-user-form-body-inputs-lastname edit-user-form-body-inputs-wrapper">
              <label
                htmlFor="lastname"
                className="edit-user-form-body-inputs-label"
              >
                Nom
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                autoComplete="off"
                className="edit-user-form-body-inputs-input"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="edit-user-form-body-inputs-bio edit-user-form-body-inputs-wrapper">
              <label htmlFor="bio" className="edit-user-form-body-inputs-label">
                Bio
              </label>
              <TextareaAutosize
                name="bio"
                id="bio"
                autoComplete="off"
                className="edit-user-form-body-inputs-input edit-user-form-body-inputs-bio-input"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
