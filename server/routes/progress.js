const express = require("express");
const multer = require("multer");

const router = express.Router();
const authenticate = require("../middlewares/auth");

router.use(authenticate);
const {
    createProgress,
    getAllProgress,
    getProgressById,
    deleteProgress,
    createImageProgress,
} = require("../controllers/progress");
const upload = require("../config/multer");
router.post("/newprogress", createProgress);
router.get("/progress", getAllProgress);
router.get("/progress/:id", getProgressById);
router.delete("/deleteprogress/:id", deleteProgress);
router.post("/upload", upload.single("image"), createImageProgress);

module.exports = router;
