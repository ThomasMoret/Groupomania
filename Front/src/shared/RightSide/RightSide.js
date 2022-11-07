import React from "react";

import TrendingPosts from "./TrendingPosts";
import "./RightSide.css";

const RightSide = ({ posts }) => {
  return (
    <>
      <div className="right-side">
        <div className="right-side-posts">
          <TrendingPosts posts={posts} />
        </div>
      </div>
    </>
  );
};

export default RightSide;
