import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import PostItem from "./PostItem";
import "./PostList.css";

const PostList = ({ post, fetchPost }) => {
  const navigate = useNavigate();

  return (
    <div className="post-list">
      <div onClick={() => navigate(-1)} className="post-item-back-link">
        <div className="post-item-back">
          <FontAwesomeIcon icon={faArrowLeft} className="post-item-back-icon" />
          <p>Retour</p>
        </div>
      </div>
      {Object.entries(post).length !== 0 && (
        <PostItem
          key={post._id}
          picture={post.picture}
          message={post.message}
          userId={post.userId}
          likes={post.likes}
          likers={post.likers}
          createdAt={post.createdAt}
          postId={post._id}
          comments={post.comments}
          fetchPost={fetchPost}
        />
      )}
    </div>
  );
};

export default PostList;
