const Progress = require("../models/progress");

const createProgress = async (req, res) => {
    try {
        const { userId, QAArray } = req.body;

        const progress = await Progress.create({
            userId,
            QAArray: QAArray.map((answer) => ({
                questionText: answer.questionText,
                answer: answer.answer,
            })),
        });
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getAllProgress = async (req, res) => {
    try {
        const progress = await Progress.find().populate("userName");
        console.log(" getting all progress data:", progress);
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getProgressById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const progress = await Progress.find({ _id: id }).populate("userName");
        if (progress.length === 0) {
            res.status(404).json({ message: "progress data not found" });
        }
        res.json(progress[0]);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const deleteProgress = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const deleteProgress = await Progress.findOneAndDelete(
            { _id: id },
            body,
            { new: true }
        );
        console.log("Progress delete:", deleteProgress);
        res.status(200).json(deleteProgress);
        if (!deleteProgress) {
            res.status(404).json({ message: "Progress data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

module.exports = {
    createProgress,
    getAllProgress,
    getProgressById,
    deleteProgress,
};
