import defaultAvatar from "../assets/defaultavatar.png";
// import { useState } from "react";
import "./Profile.css";
import axios from "../axiosInstance";
import { useEffect, useState } from "react";
import { useUserAvatar } from "../context/UserAvatarContext";
import { useAuth } from "../context/Auth";

const Profile = () => {
    const { user } = useAuth();
    const { userAvatar, updateUserAvatar } = useUserAvatar();
    console.log(userAvatar);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is logged in and their user data contains a profilePictureUrl
        if (user && user.profilePictureUrl) {
            updateUserAvatar(user.profilePictureUrl);
            setLoading(false);
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            // Display a visual indicator that the image is being uploaded
            setUploading(true);

            const formData = new FormData();
            formData.append("avatar", file);

            axios
                .post("/auth/upload-avatar", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    // Update the user's avatar using the context
                    updateUserAvatar(response.data.user.avatar);
                    setUploading(false); // Reset the uploading indicator
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Avatar upload failed:", error);
                    setUploading(false); // Reset the uploading indicator on error
                });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-fit mb-10">
            <div>
                <div className="my-10 flex items-center gap-16">
                    <div className="avatar-animation-div overflow-hidden">
                        {/* <img src={userAvatar} alt="" className="w-84 h-84 " /> */}
                        <img
                            src={userAvatar || defaultAvatar} // Use userAvatar or defaultAvatar
                            alt="User Avatar"
                            className="w-84 h-84"
                        />
                    </div>
                    <div className="flex  flex-col items-center justify-center gap-5 my-10">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="avatar-input"
                            disabled={uploading} // Disable input during upload
                        />
                        <label
                            htmlFor="avatar-input"
                            className={` className=" h-10 relative flex flex-col items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500 ${
                                uploading ? "opacity-50 " : "" // Reduce opacity when uploading
                            }`}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white">
                                Change Picture
                            </span>
                        </label>
                        {uploading ? (
                            <span className="ml-2 text-[#6C1770] font-bold ">
                                Uploading...
                            </span>
                        ) : null}
                    </div>
                    <div className="flex gap-5 my-10"></div>
                </div>
            </div>
            <form action="" className="w-[800px] flex flex-col gap-8">
                <div className="flex gap-5 items-center justify-center w-[500px]">
                    <label htmlFor="">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200 "
                    />
                    <label htmlFor="">Last Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200  "
                    />
                </div>
                <div className="flex gap-5 items-center justify-center w-[500px]">
                    <label htmlFor="">Username:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200  "
                    />
                    <label htmlFor="">E-mail:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200  "
                    />
                </div>
                <div className="flex gap-5 items-center justify-center w-[500px]">
                    <label htmlFor="">Password:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200 w-[500px] "
                    />
                </div>
                <div className="flex gap-5 items-center justify-center">
                    <label htmlFor="">Country:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200  "
                    />
                    <label htmlFor="">Date of Birth:</label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        className="border border-red-200  "
                    />
                </div>
            </form>
        </div>
    );
};

export default Profile;
