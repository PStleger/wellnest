const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Journal Content is Required!"],
        },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const model = mongoose.model("Journal", journalSchema);
module.exports = model;
