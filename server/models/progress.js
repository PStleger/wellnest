const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    questionText: { type: String },
    answer: { type: String },
});

const progressSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        QAArray: [questionSchema],
    },
    { timestamps: true }
);

const model = mongoose.model("Progress", progressSchema);
module.exports = model;
