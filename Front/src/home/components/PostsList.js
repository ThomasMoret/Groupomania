import React from "react";

import PostsItem from "./PostsItem";
import "./PostsList.css";

const PostsList = ({ posts, fetchPosts }) => {
  if (posts.length === 0) {
    return (
      <div className="center">
        <h2>Aucun post trouvé.</h2>
      </div>
    );
  }

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <PostsItem
          key={post._id}
          postId={post._id}
          picture={post.picture}
          message={post.message}
          userId={post.userId}
          likes={post.likes}
          likers={post.likers}
          createdAt={post.createdAt}
          fetchPosts={fetchPosts}
          comments={post.comments}
        />
      ))}
    </ul>
  );
};

export default PostsList;
