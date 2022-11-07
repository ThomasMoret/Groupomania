import React from "react";

import Loader from "../../shared/UIElements/Loader";
import UsersList from "../components/Users/UsersList";
import ScrollToTop from "../../shared/UIElements/ScrollToTop";
import RightSide from "../../shared/RightSide/RightSide";
import { getUsers, getPosts } from "../../utils/Api";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    await getUsers().then((res) => {
      setUsers(res);
      setIsLoading(false);
    });
  };

  const fetchPosts = async () => {
    await getPosts().then((res) => {
      setPosts(res);
    });
  };

  React.useEffect(() => {
    fetchUsers();
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
          <UsersList users={users} />
          <RightSide posts={posts} />
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default Users;
