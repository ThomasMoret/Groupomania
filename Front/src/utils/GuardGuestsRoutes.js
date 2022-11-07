const isUserLoggedIn = () => {
  return localStorage.getItem("token");
};

const GuardGuestsRoutes = () => {
  if (isUserLoggedIn()) {
    window.location.href = "/home";
  }
};

export default GuardGuestsRoutes;
