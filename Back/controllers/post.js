const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fs = require("fs");

exports.getAllPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .populate({ path: "userId", select: "firstname lastname picture email" })
    .populate({
      path: "comments.commenterId",
      select: "firstname lastname picture ",
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = async (req, res) => {
  await Post.findOne({ _id: req.params.id })
    .populate({ path: "userId", select: "firstname lastname picture email" })
    .populate({
      path: "comments.commenterId",
      select: "firstname lastname picture",
    })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getPostsByUser = (req, res) => {
  Post.find({ userId: req.params.userId })
    .sort({ createdAt: -1 })
    .populate({ path: "userId", select: "firstname lastname picture email" })
    .populate({
      path: "comments.commenterId",
      select: "firstname lastname picture ",
    })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res) => {
  const postObject = req.file
    ? {
        ...req.body,
        picture: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  const post = new Post({
    ...postObject,
    userId: req.body.userId,
  });

  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (user.isAdmin === true || user._id.toString() === userId) {
          Post.findOne({ _id: req.params.id })
            .then((post) => {
              fs.existsSync(post.picture) && fs.unlinkSync(post.picture);
              const postObject = req.file
                ? {
                    ...req.body,
                    picture: `${req.protocol}://${req.get("host")}/images/${
                      req.file.filename
                    }`,
                  }
                : { ...req.body };
              Post.updateOne(
                { _id: req.params.id },
                { ...postObject, _id: req.params.id }
              )
                .then(() => res.status(200).json({ message: "Post modifié !" }))
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(404).json({ error }));
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deletePicture = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (user.isAdmin === true || user._id.toString() === userId) {
          Post.findOne({ _id: req.params.id })
            .then((post) => {
              Post.updateOne(
                { _id: req.params.id },
                { $unset: { picture: "" } }
              )
                .then(() => {
                  const filename = post.picture.split("/images/")[1];
                  fs.unlink(`images/${filename}`, () => {
                    res.status(200).json({ message: "Picture deleted !" });
                  });
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(404).json({ error }));
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deletePost = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    User.findOne({ _id: userId })
      .then((user) => {
        if (user.isAdmin === true || user._id.toString() === userId) {
          Post.findOne({ _id: req.params.id })
            .then((post) => {
              Post.deleteOne({ _id: req.params.id })
                .then(() =>
                  res.status(200).json({ message: "Post supprimé !" })
                )
                .then(() => {
                  if (post.picture) {
                    const filename = post.picture.split("/images/")[1];
                    fs.existsSync(`images/${filename}`) &&
                      fs.unlinkSync(`images/${filename}`);
                  }
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(404).json({ error }));
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.likePost = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    const userId = decodedToken.userId;
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        if (post.likers.includes(userId)) {
          Post.updateOne(
            { _id: req.params.id },
            { $pull: { likers: userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: "Post disliked !" }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          Post.updateOne(
            { _id: req.params.id },
            { $push: { likers: userId }, $inc: { likes: 1 } }
          )
            .then(() => res.status(200).json({ message: "Post liked !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createComment = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const comment = {
        commenterId: req.body.commenterId,
        text: req.body.text,
      };
      Post.updateOne({ _id: req.params.id }, { $push: { comments: comment } })
        .then(() => res.status(200).json({ message: "Commentaire ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
  const userId = decodedToken.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user.isAdmin === true || user._id.toString() === userId) {
        Post.findOne({ _id: req.params.id })
          .then((post) => {
            const comment = post.comments.find(
              (comment) => comment._id.toString() === req.params.commentId
            );
            Post.updateOne(
              { _id: req.params.id, "comments._id": req.params.commentId },
              { $set: { "comments.$.text": req.body.text } }
            )
              .then(() =>
                res.status(200).json({ message: "Commentaire modifié !" })
              )
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(404).json({ error }));
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
  const userId = decodedToken.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user.isAdmin === true || user._id.toString() === userId) {
        Post.findOne({ _id: req.params.id })
          .then((post) => {
            const comment = post.comments.find(
              (comment) => comment._id == req.params.commentId
            );
            Post.updateOne(
              { _id: req.params.id },
              { $pull: { comments: { _id: req.params.commentId } } }
            )
              .then(() =>
                res.status(200).json({ message: "Commentaire supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(404).json({ error }));
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
