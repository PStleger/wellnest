const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required!"],
        },
        lastName: { type: String, required: [true, "Last name is required!"] },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required!"],
        },
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required!"],
        },
        password: {
            type: String,
            unique: true,
            required: [true, "Password is required!"],
            minLength: [8, "Password Must Be 8 characters or more!"],
        },
        dob: { type: String, format: Date },
        country: { type: String, required: [true, "Country is required!"] },
    },
    {
        timestamps: true,
    }
);

const model = mongoose.model("User", userSchema);
module.exports = model;
