import React from "react";
import { formatDistance, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

const Comment = ({
  comment,
  handleDeleteComment,
  setIsModify,
  setCommentId,
  setModifyText,
  isModify,
  commentId,
  modifyText,
  handleEditComment,
  userId,
}) => {
  const user = JSON.parse(localStorage.getItem("userId"));

  return (
    <React.Fragment key={comment._id}>
      <div className="comment">
        <div className="comment-item">
          <div className="comment-item__header">
            <div className="commenter-image-container">
              <img
                src={comment.commenterId.picture}
                alt=""
                className="commenter-image"
              />
            </div>
            <p className="commenter-name">
              {comment.commenterId.firstname +
                " " +
                comment.commenterId.lastname}
            </p>
          </div>

          {(isModify && commentId === comment._id) ||
          (isModify && user.isAdmin && comment.Id) ? (
            <form className="comment-form" onSubmit={handleEditComment}>
              <TextareaAutosize
                className="comment-form__textarea"
                value={modifyText}
                onChange={(e) => setModifyText(e.target.value)}
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleEditComment(e);
                  }
                }}
              />
              <div className="comment-form__buttons">
                <button type="submit" className="comment-button">
                  <FontAwesomeIcon icon={faShare} />
                </button>
              </div>
            </form>
          ) : (
            <p className="comment-text">{comment.text}</p>
          )}
        </div>
        <div className="comment-item__footer">
          {(isModify && commentId === comment._id) ||
          (isModify && user.isAdmin && comment.Id) ? (
            <span></span>
          ) : (
            <>
              <div className="comment-item__footer__left">
                <p className="comment-item__footer__left__date">
                  il y a{" "}
                  {formatDistance(
                    subDays(new Date(comment.createdAt), 0),
                    new Date(),
                    {
                      locale: fr,
                    }
                  )}
                </p>
              </div>
              <div className="comment-item__footer__right">
                {comment.commenterId._id === userId || user.isAdmin ? (
                  <>
                    <p
                      className="comment-item__footer__right__text"
                      onClick={() => {
                        setIsModify(true);
                        setCommentId(comment._id);
                        setModifyText(comment.text);
                      }}
                    >
                      modifier
                    </p>
                    <p
                      className="comment-item__footer__right__text"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      supprimer
                    </p>
                  </>
                ) : (
                  <span></span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Comment;
