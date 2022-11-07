import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./TrendingPostsItem.css";

const TrendingPostsItem = ({ post }) => {
  return (
    <>
      <Link to={`/post/${post._id}`} className="trending-posts-item__link">
        <li key={post._id} className="trending-posts__item-list">
          <div className="trending-posts-item">
            <div className="trending-posts-item__up">
              <p className="trending-posts-item__up__user">
                {post.userId.firstname} {post.userId.lastname}
              </p>
              <p className="trending-posts-item__like">
                <FontAwesomeIcon icon={faHeart} style={{ color: "#f56565" }} />
                {post.likers.length}{" "}
              </p>
            </div>
            <div className="trending-posts-item__down">
              <p>
                {post.message.length > 50
                  ? post.message.substring(0, 50) + "..."
                  : post.message}
              </p>
            </div>
          </div>
        </li>
      </Link>
    </>
  );
};

export default TrendingPostsItem;
