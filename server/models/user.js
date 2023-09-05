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
        userName: {
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
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//middlewares for user authentication

//virtual because we do not want same password in our DB twice, this will be only for confirmation in virtual
userSchema
    .virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

//before the validation run (pre), we want to check if the passwords match
//we cannot have arrow function bcs we want access to this keyword
//we put next bcs it's a middleware
//only runs for validation
userSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords need to match!"); // when you invalidate you need to provide key and message
    }
    next();
});

//before saving (pre) we are hashing the password
//only runs for save
userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 6); //will be encrypted in 6 rounds
        console.log("Hashed Password:", hashedPassword);
        console.log("Password:", this.password);
        this.password = hashedPassword;
    } catch (error) {
        console.log("Hashing error:", error);
    }
    next();
});

const model = mongoose.model("User", userSchema);
module.exports = model;
