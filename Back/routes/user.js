const router = require("express").Router();
const multer = require("../middleware/multer-config");

const isUser = require("../middleware/verifyUser");
const userCtrl = require("../controllers/user");

router.get("/", isUser, userCtrl.getAllUsers);
router.get("/:id", isUser, userCtrl.getOneUser);
router.put("/:id", isUser, multer, userCtrl.updateUser);
router.delete("/:id", isUser, userCtrl.deleteUser);

module.exports = router;
