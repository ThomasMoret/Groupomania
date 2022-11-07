import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Post from "./home/page/Post";
import Users from "./user/pages/Users";
import Home from "./home/page/Home";
import Navbar from "./shared/Navigation/Navbar";
import UsersProfile from "./user/pages/UsersProfile";
import Auth from "./auth/pages/Auth";
import GuardUsersRoutes from "./utils/GuardUsersRoutes";
import GuardGuestsRoutes from "./utils/GuardGuestsRoutes";

const WithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const WithGuardUsersRoutes = ({ children }) => {
  return (
    <>
      <GuardUsersRoutes />
      {children}
    </>
  );
};

const WithGuardGuestsRoutes = ({ children }) => {
  return (
    <>
      <GuardGuestsRoutes />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            <WithGuardGuestsRoutes>
              <Auth />
            </WithGuardGuestsRoutes>
          }
        />
        <Route
          path="/home"
          element={
            <WithNavbar>
              <WithGuardUsersRoutes>
                <Home />
              </WithGuardUsersRoutes>
            </WithNavbar>
          }
        />
        <Route
          path="/post/:postId"
          element={
            <WithNavbar>
              <WithGuardUsersRoutes>
                <Post />
              </WithGuardUsersRoutes>
            </WithNavbar>
          }
        />
        <Route
          path="/users"
          element={
            <WithNavbar>
              <WithGuardUsersRoutes>
                <Users />
              </WithGuardUsersRoutes>
            </WithNavbar>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <WithNavbar>
              <WithGuardUsersRoutes>
                <UsersProfile />
              </WithGuardUsersRoutes>
            </WithNavbar>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
