const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyUser = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.DB_TOKEN);
    User.findOne({ _id: decoded.userId })
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyUser;
