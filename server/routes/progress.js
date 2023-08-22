const express = require("express");
const router = express.Router();

const {
    createProgress,
    getAllProgress,
    getProgressById,
    deleteProgress,
} = require("../controllers/progress");

router.post("/newprogress", createProgress);
router.get("/progress", getAllProgress);
router.get("/progress/:id", getProgressById);
router.delete("/deleteprogress/:id", deleteProgress);

module.exports = router;
