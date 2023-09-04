const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            unique: [true, "Article title already exists!"],
            required: [true, "Article Title is Required!"],
        },
        description: {
            type: String,
            required: [true, "Article Description is Required!"],
        },
        text: {
            type: String,
            required: [true, "Article Content is Required!"],
        },
        createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const model = mongoose.model("Article", articleSchema);
module.exports = model;
