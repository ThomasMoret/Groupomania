import React from "react";

import Loader from "../../shared/UIElements/Loader";
import RightSide from "../../shared/RightSide/RightSide";
import PostsList from "../components/PostsList";
import AddPost from "../components/AddPost";
import ScrollToTop from "../../shared/UIElements/ScrollToTop";
import { getPosts } from "../../utils/Api";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchPosts = async () => {
    getPosts()
      .then((response) => {
        setPosts(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
          <RightSide posts={posts} />
        </>
      ) : (
        <>
          <div className="home">
            <AddPost fetchPosts={fetchPosts} />
            <PostsList posts={posts} fetchPosts={fetchPosts} />
          </div>
          <div className="home-users-list">
            <RightSide posts={posts} />
          </div>
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default Home;
