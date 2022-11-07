const router = require("express").Router();
const multer = require("../middleware/multer-config");

const isUser = require("../middleware/verifyUser");
const postCtrl = require("../controllers/post");

router.get("/", isUser, postCtrl.getAllPosts);
router.get("/:id", isUser, postCtrl.getOnePost);
router.get("/user/:userId", isUser, postCtrl.getPostsByUser);
router.post("/", isUser, multer, postCtrl.createPost);
router.put("/:id", isUser, multer, postCtrl.modifyPost);
router.delete("/:id", isUser, multer, postCtrl.deletePost);
router.delete("/:id/picture", isUser, multer, postCtrl.deletePicture);
router.patch("/:id/like", isUser, postCtrl.likePost);

//comments

router.patch("/:id/comment", isUser, postCtrl.createComment);
router.put("/:id/comment/:commentId", isUser, postCtrl.modifyComment);
router.delete("/:id/comment/:commentId", isUser, postCtrl.deleteComment);

module.exports = router;
