const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logOut,
    getLoggedInUser,
} = require("../controllers/auth");
const authenticate = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.get("/currentUser", authenticate, getLoggedInUser);

module.exports = router;
