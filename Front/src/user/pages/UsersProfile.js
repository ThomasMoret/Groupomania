import React from "react";
import { useParams } from "react-router-dom";

import ScrollToTop from "../../shared/UIElements/ScrollToTop";
import Loader from "../../shared/UIElements/Loader";
import UserPosts from "../components/UserProfile/UserPosts";
import UserInfo from "../components/UserProfile/UserInfo";
import RightSide from "../../shared/RightSide/RightSide";
import { getUser, getUserPosts, getPosts } from "../../utils/Api";

const UserProfile = () => {
  const params = useParams();
  const userId = params.userId;
  const actualUser = JSON.parse(localStorage.getItem("userId"));

  const [user, setUser] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchUser = async () => {
    await getUser(userId).then((res) => {
      setUser(res);
      if (res._id === actualUser._id) {
        localStorage.setItem("userId", JSON.stringify(res));
      }
    });
  };

  const fetchUserPosts = async () => {
    await getUserPosts(userId).then((res) => {
      setPost(res);
    });
  };

  const fetchPosts = async () => {
    await getPosts().then((res) => {
      setPosts(res);
    });
  };

  React.useEffect(() => {
    fetchUser();
    fetchUserPosts();
    fetchPosts();
    setIsLoading(false);
    // eslint-disable-next-line
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
          <RightSide posts={posts} />
        </>
      ) : (
        <>
          {user && (
            <UserInfo
              user={user}
              fetchUser={fetchUser}
              fetchUserPosts={fetchUserPosts}
            />
          )}
          {post && <UserPosts post={post} fetchUserPosts={fetchUserPosts} />}
          <ScrollToTop />
          <RightSide posts={posts} />
        </>
      )}
    </>
  );
};

export default UserProfile;
