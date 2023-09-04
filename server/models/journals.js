const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, "Journal Title is Required!"] },
        description: {
            type: String,
            required: [true, "Journal description is Required!"],
        },
        text: {
            type: String,
            required: [true, "Journal Content is Required!"],
        },
        // createdBy: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const model = mongoose.model("Journal", journalSchema);
module.exports = model;