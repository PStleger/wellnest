const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logOut,
    getLoggedInUser,
    updateAvatar,
    getAvatar,
    deleteAvatar,
} = require("../controllers/auth");
const authenticate = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.get("/currentUser", authenticate, getLoggedInUser);
router.get("/avatar", authenticate, getAvatar);
router.post("/upload-avatar", authenticate, updateAvatar);
router.delete("/delete-avatar", authenticate, deleteAvatar);
module.exports = router;
