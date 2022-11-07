const isUserLoggedIn = () => {
  return localStorage.getItem("token");
};

const GuardUsersRoutes = () => {
  if (!isUserLoggedIn()) {
    console.log("User is not logged in");
    window.location.href = "/auth";
  }
};

export default GuardUsersRoutes;
