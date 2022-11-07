import React from "react";

import ScrollToTop from "../../shared/UIElements/ScrollToTop";
import PostList from "../components/PostList";
import { useParams } from "react-router-dom";
import RightSide from "../../shared/RightSide/RightSide";
import { getPost, getPosts } from "../../utils/Api";

const Post = () => {
  const [post, setPost] = React.useState([]);
  const [posts, setPosts] = React.useState([]);

  const params = useParams();
  const postId = params.postId;

  const fetchPost = async () => {
    getPost(postId)
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPosts = async () => {
    getPosts()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchPost();
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {post && <PostList post={post} fetchPost={fetchPost} />}
      <RightSide posts={posts} />
      <ScrollToTop />
    </>
  );
};

export default Post;
