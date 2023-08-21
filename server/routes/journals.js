const express = require("express");
const router = express.Router();

const {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal,
} = require("../controllers/journals");

router.post("/newjournal", createJournal);
router.get("/journals", getAllJournals);
router.get("/journals/:id", getJournalById);
router.put("/updatejournal/:id", updateJournal);
router.delete("/deletejournal/:id", deleteJournal);

module.exports = router;
