const Journal = require("../models/journals");

const createJournal = async (req, res) => {
    try {
        // const { userId, title, text } = req.body;
        console.log(req.body);
        const newJournal = await Journal.create(req.body);
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.find().populate("createdBy", "userName");
        console.log(" getting all journals:", journals);
        res.json(journals);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getJournalById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const journal = await Journal.find({ _id: id }).populate(
            "createdBy",
            "userName"
        );
        if (journal.length === 0) {
            res.status(404).json({ message: "journal not found" });
        }
        res.json(journal[0]);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const updateJournal = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updatedJournal = await Journal.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        console.log("Journal updated:", updatedJournal);
        res.status(200).json(updatedJournal);
        if (!updatedJournal) {
            res.status(404).json({ message: "Journal not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const deleteJournal = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const deletedJournal = await Journal.findOneAndDelete({ _id: id });
        console.log("Journal deleted:", deletedJournal);
        if (!deletedJournal) {
            res.status(404).json({ message: "Journal not found" });
        }
        res.json(deletedJournal);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

module.exports = {
    createJournal,
    getAllJournals,
    getJournalById,
    updateJournal,
    deleteJournal,
};
