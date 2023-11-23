const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // time the user logged in

const upload = require("../config/multer");
const cloudinary = require("../config/cloudinary");

//creating a new user function for registration
const register = async (req, res) => {
    try {
        console.log("before user.create");
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
                    avatar:currentUser.avatar
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
            "_id email userName firstName lastName dob country avatar"
        );
        console.log("user still logged in", user);
        res.json({ user });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// we will add update password function!

//getting user avatar

const getAvatar = async (req, res) => {
    try {
        // Retrieve the user's avatar URL from the user document
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send the avatar URL in the response
        res.status(200).json({ avatarUrl: user.avatar });
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const deleteAvatar = async (req, res) => {
    try {
        const userId = req.user._id;
        // Update the user document in MongoDB to remove the avatar URL
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: null },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Avatar deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Avatar deletion failed",
            error: error.message,
        });
    }
};
//update avatar photo

const updateAvatar = async (req, res) => {
    try {
        upload.single("avatar")(req, res, async (err) => {
            if (err) {
                return res
                    .status(400)
                    .json({ message: "Avatar upload failed", error: err });
            }

            try {
                // Upload the image to Cloudinary
                const result = await cloudinary.uploader.upload(
                    req?.file?.path
                );

                if (!result || !result.secure_url) {
                    return res.status(500).json({
                        message: "Cloudinary upload failed",
                        error: "Invalid response from Cloudinary",
                    });
                }

                // Update the user's avatar URL in the database
                const user = await User.findByIdAndUpdate(
                    req.user._id,
                    { avatar: result.secure_url },
                    { new: true }
                );

                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                // Set a cookie with the user's avatar URL
                res.cookie("userAvatar", result.secure_url, {
                    httpOnly: true,
                    expires: new Date(Date.now() + oneDayInMilliseconds),
                });

                res.status(200).json({
                    message: "Avatar uploaded successfully",
                    user,
                });
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                res.status(500).json({
                    message: "Cloudinary upload failed",
                    error: cloudinaryError.message,
                });
            }
        });
    } catch (error) {
        console.error("Avatar upload error:", error);
        res.status(500).json({
            message: "Avatar upload failed",
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    logOut,
    getLoggedInUser,
    updateAvatar,
    getAvatar,
    deleteAvatar,
};
