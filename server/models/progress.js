const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    question: { type: String },
    answer: { type: String },
});

const progressSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        QAArray: [questionSchema],
        userName: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const model = mongoose.model("Progress", progressSchema);
module.exports = model;
