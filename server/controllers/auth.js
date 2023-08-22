const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // time the user logged in

//creating a new user function for registration
const register = async (req, res) => {
    try {
        const newUser = await User.create(req.body); // creating new user
        console.log("new user create:", newUser);
        const user = {
            // creating user to hold user payload in token
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            userName: newUser.userName,
            dob: newUser.dob,
        };
        const accessToken = jwt.sign(user, SECRET); // creating a new token for this user
        res.status(201) // 201 code: new resource generated
            .cookie("accessToken", accessToken, {
                httpOnly: true, // cookie will only accept http requests
                expires: new Date(Date.now() + oneDayInMilliseconds), // setting an expiration date for the cookie
            })
            .json({ message: "user created", user });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors,
        });
    }
};

// login to an account already created

const login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        //checking to see if the input valid
        return res.status(400).json({
            message: "These inputs are invalid, please check again",
        });
    }
    try {
        const currentUser = await User.findOne({ userName }); //checking to see if user exists
        if (!currentUser) {
            return res.status(400).json({ message: "Invalid login attempt" });
        } else {
            console.log("User trying to log in:", currentUser.userName);
            const isPasswordValid = await bcrypt.compare(
                // checking to see if password is valid
                password,
                currentUser.password
            );
            if (!isPasswordValid) {
                res.status(400).json({
                    message: "Invalid login attempt again, check your password",
                });
            } else {
                const user = {
                    // creating user to hold user payload in token
                    _id: currentUser._id,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    email: currentUser.email,
                    userName: currentUser.userName,
                    dob: currentUser.dob,
                };
                const accessToken = jwt.sign(user, SECRET); // creating a new token for currentUser
                res.cookie("accessToken", accessToken, {
                    httpOnly: true, // cookie will only accept http requests
                    expires: new Date(Date.now() + oneDayInMilliseconds), // setting an expiration date for the cookie
                }).json({ message: "User logged in:", user });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, errors: error.errors });
    }
};

const logOut = (req, res) => {
    res.clearCookie("accessToken");
    res.json({ message: "user logged out" });
};

const getLoggedInUser = async (req, res) => {
    // to have logged in user information once they logged in
    try {
        const user = await User.findOne({ _id: req.user._id }).select(
            "_id email userName"
        );
        console.log("user still logged in", user);
        res.json({ user });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// we will add update password function!

module.exports = {
    register,
    login,
    logOut,
    getLoggedInUser,
};
