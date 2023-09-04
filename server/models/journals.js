const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
<<<<<<< HEAD
  {
    title: { type: String, required: [true, "Journal Title is Required!"] },
    description: {
      type: String,
      required: [true, "Journal Category is Required!"],
=======
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
        // createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
>>>>>>> 409a1f05540a9276812224ef7c62252e891c936b
    },
    text: {
      type: String,
      required: [true, "Journal Content is Required!"],
    },
    description: {
      type: String,
      required: [true, "Journal Description is Required!"],
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const model = mongoose.model("Journal", journalSchema);
module.exports = model;
