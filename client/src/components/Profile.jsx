import userAvatar from "../assets/happyface.png";
import { useState } from "react";

const Profile = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        country: "",
        password: "",
        confirmPassword: "",
        dob: "",
    });
    const handleChange = (e) => {
        console.log("handlechange");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handlesubmit");
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <div className="">
                    <div>
                        <img src={userAvatar} alt="" />
                    </div>
                    <div>
                        <button className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white">
                                Change Profile Picture
                            </span>
                        </button>
                        <button className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white">
                                Delete Profile Picture
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <form
                    className="form flex flex-col gap-2 border  border-gray-600 mx-auto justify-center items-center my-5 py-5"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="">First Name:</label>
                    {/* {errors?.firstName && (
                        <p className="text-danger ">
                            {errors?.firstName.message}
                        </p>
                    )} */}
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6 "
                    />
                    <label htmlFor="">Last Name:</label>
                    {/* {errors?.lastName && (
                        <p className="text-danger">
                            {errors?.lastName.message}
                        </p>
                    )} */}
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Username:</label>
                    {/* {errors?.userName && (
                        <p className="text-danger">
                            {errors?.userName.message}
                        </p>
                    )} */}
                    <input
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Country:</label>
                    {/* {errors?.country && (
                        <p className="text-danger">{errors?.country.message}</p>
                    )} */}
                    <input
                        type="text"
                        name="country"
                        value={user.country}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Date of Birth:</label>
                    {/* {errors?.dob && (
                        <p className="text-danger">{errors?.dob.message}</p>
                    )} */}
                    <input
                        type="text"
                        name="dob"
                        value={user.dob}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Email:</label>
                    {/* {errors?.email && (
                        <p className="text-danger">{errors?.email.message}</p>
                    )} */}
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Password:</label>
                    {/* {errors?.password && (
                        <p className="text-danger">
                            {errors?.password.message}
                        </p>
                    )} */}
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <label htmlFor="">Confirm Password</label>
                    {/* {errors?.confirmPassword && (
                        <p className="text-danger">
                            {errors?.confirmPassword.message}
                        </p>
                    )} */}
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required
                        className="border border-red-200 w-5/6"
                    />
                    <button className="border-2 border-red-900 w-2/6 my-5">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
