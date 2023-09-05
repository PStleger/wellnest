import userAvatar from "../assets/placeholdersu.jpg";
// import { useState } from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-fit mb-10">
            <div>
                <div className="my-10 flex items-center gap-16">
                    <div className="avatar-animation-div">
                        <img src={userAvatar} alt="" className="w-84 h-84 " />
                    </div>
                    <div className="flex gap-5 my-10">
                        <button className=" h-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white">
                                Change Picture
                            </span>
                        </button>
                        <button className=" h-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white">
                                Delete Picture
                            </span>
                        </button>
                    </div>
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
