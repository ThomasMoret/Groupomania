import React from "react";

import TrendingPostsItem from "./TrendingPostsItem";
import "./TrendingPosts.css";

const TrendingPosts = ({ posts }) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <>
      <div className="trending-posts">
        <div className="trending-posts__items">
          <h3>Publications populaires</h3>
          <ul>
            {!showMore
              ? posts
                  .sort((a, b) => b.likers.length - a.likers.length)
                  .slice(0, 3)
                  .map((post) => (
                    <TrendingPostsItem key={post._id} post={post} />
                  ))
              : posts
                  .sort((a, b) => b.likers.length - a.likers.length)
                  .slice(0, 8)
                  .map((post) => (
                    <TrendingPostsItem key={post._id} post={post} />
                  ))}
          </ul>
        </div>
        <div className="trending-posts__button-container">
          <button
            onClick={() => setShowMore(!showMore)}
            className="trending-posts__button"
          >
            {!showMore ? "Voir plus" : "Voir moins"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TrendingPosts;
