import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";

import { deletePost } from "../../utils/Api";
import "./ModalOption.css";

const ModalOption = ({
  postId,
  fetchPosts,
  setIsModify,
  fetchUserPosts,
  fetchPost,
}) => {
  const handleDelete = async () => {
    await deletePost(postId);
    if (fetchPosts) {
      fetchPosts();
    } else if (fetchUserPosts) {
      fetchUserPosts();
    } else if (fetchPost) {
      fetchPost();
      window.location.href = "/home";
    }
  };

  const modifyPost = async () => {
    setIsModify(true);
  };

  return (
    <div className="modal-option">
      <button className="modal-option__button" onClick={modifyPost}>
        <span>
          <FontAwesomeIcon
            icon={faPencil}
            className="modal-option__button__icon"
          />
          Modifier
        </span>
      </button>
      <button className="modal-option__button" onClick={handleDelete}>
        <span>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="modal-option__button__icon"
          />
          Supprimer
        </span>
      </button>
    </div>
  );
};

export default ModalOption;
