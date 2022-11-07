const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.getAllUsers = (req, res) => {
  User.find({ isAdmin: false })
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateUser = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user._id.toString() === userId) {
          delete req.body.isAdmin;
          const userObject = req.file
            ? {
                ...req.body,
                picture: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`,
              }
            : { ...req.body };
          if (req.file) {
            const filename = user.picture.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
              User.updateOne(
                { _id: req.params.id },
                { ...userObject, _id: req.params.id }
              )
                .then(() => res.status(200).json({ message: "User updated !" }))
                .catch((error) => res.status(400).json({ error }));
            });
          } else {
            User.updateOne(
              { _id: req.params.id },
              { ...userObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "User updated !" }))
              .catch((error) => res.status(400).json({ error }));
          }
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user._id.toString() === userId) {
          Post.updateMany(
            { comments: { $elemMatch: { commenterId: req.params.id } } },
            { $pull: { comments: { commenterId: req.params.id } } }
          )
            .then(() => {
              Post.find({ userId: req.params.id })
                .then((posts) => {
                  Post.deleteMany({ userId: req.params.id })
                    .then(() => {
                      posts.forEach((post) => {
                        if (post.picture) {
                          const filename = post.picture.split("/images/")[1];
                          fs.existsSync(`images/${filename}`) &&
                            fs.unlinkSync(`images/${filename}`);
                        }
                      });
                    })
                    .catch((error) => res.status(400).json({ error }));
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(400).json({ error }));
          User.deleteOne({ _id: req.params.id })
            .then(() => {
              if (user.picture) {
                const filename = user.picture.split("/images/")[1];
                fs.existsSync(`images/${filename}`) &&
                  fs.unlinkSync(`images/${filename}`);
              }
              res.status(200).json({ message: "User deleted !" });
            })
            .catch((error) => res.status(400).json({ error }));
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
