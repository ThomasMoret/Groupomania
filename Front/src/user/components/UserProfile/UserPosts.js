import React from "react";

import UserPostsItems from "./UserPostsItems";
import "./UserPosts.css";

const UserPosts = ({ post, fetchUserPosts }) => {
  if (post.length === 0) {
    return (
      <div className="center">
        <h2>Aucun post trouvé.</h2>
      </div>
    );
  }

  return (
    <div className="user-posts">
      {post.map((post) => (
        <UserPostsItems
          key={post._id}
          picture={post.picture}
          message={post.message}
          userId={post.userId}
          likes={post.likes}
          likers={post.likers}
          createdAt={post.createdAt}
          postId={post._id}
          comments={post.comments}
          fetchUserPosts={fetchUserPosts}
        />
      ))}
    </div>
  );
};

export default UserPosts;
