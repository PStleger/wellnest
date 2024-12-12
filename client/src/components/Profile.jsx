import defaultAvatar from "../assets/defaultavatar.png";
// import { useState } from "react";
import "./Profile.css";
import axios from "../axiosInstance";
import { useEffect, useState } from "react";
import { useUserAvatar } from "../context/UserAvatarContext";
import { useAuth } from "../context/Auth";

const Profile = () => {
    const { user, uploadAvatar, uploading } = useAuth();
    const { userAvatar, updateUserAvatar } = useUserAvatar();
    // console.log(userAvatar);

    function convertToDate(dobString) {
        // Extract year, month, and day from the string
        const year = parseInt(dobString.slice(0, 4), 10);
        const month = parseInt(dobString.slice(4, 6), 10) - 1; // Months in JavaScript are 0-indexed
        const day = parseInt(dobString.slice(6, 8), 10);

        // Create a Date object
        const dobDate = new Date(year, month, day);

        return dobDate;
    }

    const handleFileChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);
            uploadAvatar(formData);
        }
    };

    const deleteAvatar = () => {
        axios
            .delete("/auth/delete-avatar")
            .then((response) => {
                updateUserAvatar(null);
            })
            .catch((error) => {
                console.error("Avatar deletion failed:", error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-fit mb-10">
            <div>
                <div className=" my-10 flex items-center gap-8">
                    <div className="avatar-animation-div overflow-hidden">
                        {/* <img src={userAvatar} alt="" className="w-84 h-84 " /> */}
                        <img
                            src={user.avatar || defaultAvatar} // Use userAvatar or defaultAvatar
                            alt="User Avatar"
                            className="w-84 h-84"
                        />
                    </div>
                    <div className="flex  flex-col items-center justify-center my-10">
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
                            className={` h-10 relative flex flex-col items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500 ${
                                uploading ? "opacity-50 " : "" // Reduce opacity when uploading
                            }`}
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white text-md p-1">
                                Change Picture
                            </span>
                        </label>
                        {uploading ? (
                            <span className="ml-2 text-[#6C1770] font-bold ">
                                Uploading...
                            </span>
                        ) : null}
                    </div>{" "}
                    <button
                        onClick={deleteAvatar}
                        className=" relative inline-flex items-center justify-center px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-md p-1">
                            Delete Picture
                        </span>
                    </button>
                </div>
            </div>

            <form
                action=""
                className="w-[900px] flex flex-col items-center justify-center gap-8 mx-auto pb-20"
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            value={user.firstName}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Last Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            value={user.lastName}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-1/2  px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                        />
                    </div>
                    <div className="w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="user-name"
                        >
                            User Name
                        </label>
                        <input
                            className=" block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="user-name"
                            type="text"
                            value={user.userName}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="country"
                        >
                            Country
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="country"
                            type="text"
                            value={user.country}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email"
                        >
                            E-mail
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="text"
                            value={user.email}
                        />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-zip"
                        >
                            Date of Birth
                        </label>
                        <input
                            className="appearance-none block w-full bg-[#f6e8f7] text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-zip"
                            type="date"
                            value={convertToDate(user.dob)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
