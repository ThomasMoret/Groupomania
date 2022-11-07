import React from "react";

import Login from "../components/Login";
import Register from "../components/Register";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div className="auth">
        <div className="bg-image">
          <div className="bg-image__container"></div>
        </div>
        <div className="auth__container">
          {isLogin ? (
            <Login toggleLogin={toggleLogin} />
          ) : (
            <Register toggleLogin={toggleLogin} />
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
