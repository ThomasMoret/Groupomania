const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user = new User({
    firstname,
    lastname,
    email,
    password,
  });
  user
    .save()
    .then(() =>
      res.status(201).json({
        userId: user,
        token: jwt.sign({ userId: user._id }, process.env.DB_TOKEN, {
          expiresIn: "24h",
        }),
      })
    )
    .catch((error) => {
      if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        return res.status(400).json({ errors });
      }
      return res.status(500).json({ error });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Mot de passe ou Email incorrect" });
    }
    bcrypt
      .compare(password, user.password)
      .then((valid) => {
        if (!valid) {
          return res
            .status(401)
            .json({ error: "Mot de passe ou Email incorrect" });
        }
        res.status(200).json({
          userId: user,
          token: jwt.sign({ userId: user._id }, process.env.DB_TOKEN, {
            expiresIn: "24h",
          }),
        });
      })
      .catch((error) => res.status(500).json(error));
  });
};
