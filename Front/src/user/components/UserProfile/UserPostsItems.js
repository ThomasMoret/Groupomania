import React from "react";
import { Link } from "react-router-dom";
import { formatDistance, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faCamera,
  faHeart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

import { modifyPost, deletePicture, likePost } from "../../../utils/Api";
import Comments from "../../../home/components/Comments";
import ModalOption from "../../../home/components/ModalOption";

const UserPostsItems = ({
  picture,
  message,
  userId,
  likes,
  likers,
  createdAt,
  postId,
  comments,
  fetchUserPosts,
}) => {
  const [modal, setModal] = React.useState(false);
  const [isModify, setIsModify] = React.useState(false);
  const [modifyMessage, setModifyMessage] = React.useState(message);
  const [modifyPicture, setModifyPicture] = React.useState(picture);
  const [modifyPicturePreview, setModifyPicturePreview] = React.useState(null);

  const fullname = userId.firstname + " " + userId.lastname;

  const userIsOwner = () => {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (user._id === userId._id || user.isAdmin === true) {
      return true;
    }

    return false;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handlePicture = (e) => {
    setModifyPicture(e.target.files[0]);
    setModifyPicturePreview(URL.createObjectURL(e.target.files[0]));
  };

  const isImage = () => {
    if (picture) {
      return true;
    }
    return false;
  };

  const isLiked = () => {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (likers.includes(user._id)) {
      return true;
    }
    return false;
  };

  const handleLike = () => {
    likePost(postId)
      .then((res) => {
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModify = (e) => {
    e.preventDefault();
    modifyPost(postId, modifyMessage, modifyPicture)
      .then((res) => {
        fetchUserPosts();
        setIsModify(false);
        setModifyPicture(null);
        setModifyPicturePreview(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePicture = () => {
    deletePicture(postId)
      .then((res) => {
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li className="posts-item">
      <div className="posts-item__header">
        <Link to={`/users/${userId._id}`} className="posts-item__header-link">
          <div>
            <img
              src={userId.picture}
              alt={fullname}
              className="posts-item__header__user__img"
            />
          </div>
          <div className="posts-item__header__user">
            <h2>{fullname}</h2>
            <p>{userId.email}</p>
          </div>
        </Link>
        <div className="posts-item__header__date">
          <p>
            il y a{" "}
            {formatDistance(subDays(new Date(createdAt), 0), new Date(), {
              locale: fr,
            })}
          </p>
        </div>
        {userIsOwner() && (
          <div onClick={toggleModal} className="posts-item__header__button">
            <FontAwesomeIcon icon={faEllipsisH} />
            {modal && (
              <ModalOption
                postId={postId}
                fetchUserPosts={fetchUserPosts}
                setIsModify={setIsModify}
              />
            )}
          </div>
        )}
      </div>
      <div className="posts-item__content">
        {!isModify ? (
          <>
            <p className="posts-item__content__message">{message}</p>
            {isImage() && (
              <img
                src={picture}
                alt={message}
                className="posts-item__content__img"
              />
            )}
          </>
        ) : (
          <form className="posts-item__content__modify">
            <TextareaAutosize
              className="posts-item__content__modify__textarea"
              value={modifyMessage}
              onChange={(e) => setModifyMessage(e.target.value)}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleModify(e);
                }
              }}
            />
            {isImage() && (
              <img
                src={picture}
                alt={picture}
                className="posts-item__content__img"
              />
            )}
            {modifyPicturePreview && (
              <>
                <div className="posts-item__content__img__preview">
                  <img
                    src={modifyPicturePreview}
                    alt={modifyPicturePreview}
                    className="posts-item__content__img"
                  />
                  <button
                    className="posts-item__content__remove__preview"
                    onClick={() => {
                      setModifyPicture(null);
                      setModifyPicturePreview(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </>
            )}
            <div className="posts-item__content__modify__button">
              {!isImage() ? (
                <>
                  <label
                    htmlFor="modifyPicture"
                    className="add-post__content-actions-image-label"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                    <p>Image</p>
                  </label>
                  <input
                    type="file"
                    id="modifyPicture"
                    className="hidden"
                    onChange={(e) => handlePicture(e)}
                    onClick={(e) => (e.target.value = null)}
                  />
                </>
              ) : (
                <button
                  onClick={handleDeletePicture}
                  type="button"
                  className="posts-item__content__modify__button__delete"
                >
                  Supprimer l'image
                </button>
              )}

              <button
                onClick={handleModify}
                type="submit"
                className="add-post__content-actions-btn"
              >
                Modifier
              </button>
            </div>
          </form>
        )}
      </div>
      {!isModify && (
        <div className="posts-item__footer__actions">
          <span className="posts-item__footer__icon__like">
            <Link to={`/post/${postId}`}>
              <FontAwesomeIcon
                icon={faCommentRegular}
                className="posts-item__footer__icon"
              />
            </Link>
            <p>{comments.length}</p>
          </span>
          <span className="posts-item__footer__icon__like">
            {isLiked() ? (
              <>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="posts-item__footer__icon  liked"
                  onClick={(e) => {
                    handleLike(e);
                  }}
                />
                <p className="posts-item__footer__likes liked">{likes}</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  className="posts-item__footer__icon  unliked"
                  onClick={(e) => {
                    handleLike(e);
                  }}
                />
                <p className="posts-item__footer__likes">{likes}</p>
              </>
            )}
          </span>
        </div>
      )}
      <hr className="posts-item__footer__hr" />
      <Comments
        postId={postId}
        comments={comments}
        fetchUserPosts={fetchUserPosts}
      />
    </li>
  );
};

export default UserPostsItems;
