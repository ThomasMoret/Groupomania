import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

import { createPost } from "../../utils/Api";
import "./AddPost.css";

const AddPost = ({ fetchPosts }) => {
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(message, image, userId);
    fetchPosts();
    setMessage("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div className="add-post">
        <Link to={`/users/${userId}`} className="add-post__user__link">
          <div className="add-post__user">
            <div>
              <img
                className="add-post__user-avatar"
                src={user.picture}
                alt={user.firstname + " " + user.lastname}
              />
            </div>
            <div className="add-post__user-info">
              <h2>{user.firstname + " " + user.lastname}</h2>
              <p>{user.email}</p>
            </div>
          </div>
        </Link>
        <div className="add-post__content">
          <form onSubmit={handleSubmit} className="add-post__form">
            <TextareaAutosize
              className="add-post__content-textarea"
              placeholder={`Quoi de neuf, ${user.firstname}?`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            {imagePreview && (
              <div className="add-post__content-preview">
                <img
                  className="add-post__content-preview-image"
                  src={imagePreview}
                  alt="preview"
                />
                <button
                  className="add-post__content-preview-btn"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  X
                </button>
              </div>
            )}
            <hr className="add-post__content-hr" />
            <div className="add-post__content-actions">
              <div className="add-post__content-actions-image">
                <label
                  htmlFor="image"
                  className="add-post__content-actions-image-label"
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="add-post__content-actions-image-icon"
                  />
                  <p>Image</p>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => handleImage(e)}
                  onClick={(e) => (e.target.value = null)}
                  className="hidden"
                />
              </div>

              <button type="submit" className="add-post__content-actions-btn">
                Publier
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPost;
