const Progress = require("../models/progress");

const createProgress = async (req, res) => {
    try {
        const { userId, answers } = req.body;

        const progress = await Progress.create({
            userId,

            questions: answers.map((answer) => ({
                questionText: answer.questionText,
                answer: answer.userAnswer,
            })),
        });
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

module.exports = { createProgress };
