import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";

import { createComment, editComment, deleteComment } from "../../utils/Api";
import Comment from "./Comment";
import "./Comments.css";

const Comments = ({
  postId,
  fetchPosts,
  comments,
  fetchUserPosts,
  fetchPost,
}) => {
  const [text, setText] = React.useState("");
  const [isModify, setIsModify] = React.useState(false);
  const [commentId, setCommentId] = React.useState("");
  const [modifyText, setModifyText] = React.useState("");

  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user._id;

  const showAllComments = () => {
    if (window.location.pathname === "/home") {
      return true;
    }
    return false;
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (text) {
      await createComment(postId, text, userId);
      setText("");
      if (fetchUserPosts) {
        fetchUserPosts();
      } else if (fetchPosts) {
        fetchPosts();
      } else if (fetchPost) {
        fetchPost();
      }
    }
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    if (modifyText) {
      await editComment(postId, commentId, modifyText);
      setIsModify(false);
      setModifyText("");
      if (fetchUserPosts) {
        fetchUserPosts();
      } else if (fetchPosts) {
        fetchPosts();
      } else if (fetchPost) {
        fetchPost();
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(postId, commentId);
    if (fetchUserPosts) {
      fetchUserPosts();
    } else if (fetchPosts) {
      fetchPosts();
    } else if (fetchPost) {
      fetchPost();
    }
  };

  return (
    <>
      <div className="comments-list">
        {showAllComments() === true &&
          comments
            .slice(0, 3)
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                setIsModify={setIsModify}
                setCommentId={setCommentId}
                setModifyText={setModifyText}
                isModify={isModify}
                commentId={commentId}
                modifyText={modifyText}
                handleEditComment={handleEditComment}
                userId={userId}
              />
            ))}
        {showAllComments() === false &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              setIsModify={setIsModify}
              setCommentId={setCommentId}
              setModifyText={setModifyText}
              isModify={isModify}
              commentId={commentId}
              modifyText={modifyText}
              handleEditComment={handleEditComment}
              userId={userId}
            />
          ))}
      </div>
      {comments.length > 3 && showAllComments() === true && (
        <Link to={`/post/${postId}`} className="comments-list__more">
          Voir plus de commentaires
        </Link>
      )}
      <div className="add-comment">
        <div className="commenter-image-container">
          <img src={user.picture} alt="" className="commenter-image" />
        </div>
        <form onSubmit={handleCreateComment} className="add-comment__form">
          <TextareaAutosize
            className="comment-input"
            placeholder="Ajouter un commentaire..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateComment(e);
              }
            }}
          />
          <button type="submit" className="comment-button">
            <FontAwesomeIcon icon={faShare} className="comment-button__icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Comments;
