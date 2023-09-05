import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

import nestlogo from "../assets/images/nestlogo.jpeg";
import { Link } from "react-router-dom";

function Register() {
    const context = useContext(AuthContext);
    const errors = context.errors;
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
        const { name, value } = e.target;
        // console.log("name", name);
        setUser({ ...user, [name]: value });
        // console.log("user", user);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        context.register(user);
        console.log("submit:", user);
    };

    if (!context.loading && context.user) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <section className="h-full">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-black-800 dark:text-black-200">
                    <div className="w-full">
                        <div className="block rounded-2xl bg-[#EFE0F0] shadow-lg dark:bg-">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                {/* Left column container */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* Logo */}
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-32 h-40"
                                                src={nestlogo}
                                                alt="logo"
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                WellNest
                                            </h4>
                                        </div>

                                        <form
                                            className="form flex flex-col gap-2 border border-pink-300 mx-auto justify-center items-center my-5 py-5 bg-[DFC6E0]"
                                            onSubmit={handleSubmit}
                                        >
                                            <label htmlFor="">
                                                First Name:
                                            </label>
                                            {errors?.firstName && (
                                                <p className="text-danger ">
                                                    {errors?.firstName.message}
                                                </p>
                                            )}
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md "
                                            />
                                            <label htmlFor="">Last Name:</label>
                                            {errors?.lastName && (
                                                <p className="text-danger">
                                                    {errors?.lastName.message}
                                                </p>
                                            )}
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">Username:</label>
                                            {errors?.userName && (
                                                <p className="text-danger">
                                                    {errors?.userName.message}
                                                </p>
                                            )}
                                            <input
                                                type="text"
                                                name="userName"
                                                value={user.userName}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">Country:</label>
                                            {errors?.country && (
                                                <p className="text-danger">
                                                    {errors?.country.message}
                                                </p>
                                            )}
                                            <input
                                                type="text"
                                                name="country"
                                                value={user.country}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">
                                                Date of Birth:
                                            </label>
                                            {errors?.dob && (
                                                <p className="text-danger">
                                                    {errors?.dob.message}
                                                </p>
                                            )}
                                            <input
                                                type="text"
                                                name="dob"
                                                value={user.dob}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">Email:</label>
                                            {errors?.email && (
                                                <p className="text-danger">
                                                    {errors?.email.message}
                                                </p>
                                            )}
                                            <input
                                                type="email"
                                                name="email"
                                                value={user.email}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">Password:</label>
                                            {errors?.password && (
                                                <p className="text-danger">
                                                    {errors?.password.message}
                                                </p>
                                            )}
                                            <input
                                                type="password"
                                                name="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                required
                                                className=" w-5/6 rounded-md"
                                            />
                                            <label htmlFor="">
                                                Confirm Password
                                            </label>
                                            {errors?.confirmPassword && (
                                                <p className="text-danger">
                                                    {
                                                        errors?.confirmPassword
                                                            .message
                                                    }
                                                </p>
                                            )}
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                className="border-3 border-pink-400 w-5/6 rounded-md"
                                            />
                                            <Link to="/dashboard">
                                                <button onClick={handleSubmit} className="rounded-md my-5">
                                                    Register
                                                </button>
                                            </Link>
                                        </form>
                                    </div>
                                </div>
                                {/* Right column container with background and description */}
                                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]">
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                        <h4 className="mb-6 text-xl font-semibold">
                                            We are more than just a company
                                        </h4>
                                        <p className="text-sm">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                    ,
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;

// function Register() {
//     const context = useContext(AuthContext);
//     const errors = context.errors;
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         userName: "",
//         email: "",
//         country: "",
//         password: "",
//         confirmPassword: "",
//         dob: "",
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUser({ ...user, [name]: value });
//     };
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         context.register(user);
//     };

//     if (!context.loading && context.user) {
//         return <Navigate to="/" />;
//     }

//     if (!context.loading && !context.user) {
//         return (
//             <form

//                 className="form flex flex-col gap-2 border w-1/5 border-gray-600 mx-auto justify-center items-center my-5 py-5"
//                 onSubmit={handleSubmit}
//             >
//                 <label htmlFor="">First Name:</label>
//                 {errors?.firstName && (
//                     <p className="text-danger ">{errors?.firstName.message}</p>
//                 )}
//                 <input
//                     type="text"
//                     name="firstName"
//                     value={user.firstName}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6 "
//                 />
//                 <label htmlFor="">Last Name:</label>
//                 {errors?.lastName && (
//                     <p className="text-danger">{errors?.lastName.message}</p>
//                 )}
//                 <input
//                     type="text"
//                     name="lastName"
//                     value={user.lastName}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Username:</label>
//                 {errors?.userName && (
//                     <p className="text-danger">{errors?.userName.message}</p>
//                 )}
//                 <input
//                     type="text"
//                     name="userName"
//                     value={user.userName}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Country:</label>
//                 {errors?.country && (
//                     <p className="text-danger">{errors?.country.message}</p>
//                 )}
//                 <input
//                     type="text"
//                     name="country"
//                     value={user.country}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Date of Birth:</label>
//                 {errors?.dob && (
//                     <p className="text-danger">{errors?.dob.message}</p>
//                 )}
//                 <input
//                     type="text"
//                     name="dob"
//                     value={user.dob}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Email:</label>
//                 {errors?.email && (
//                     <p className="text-danger">{errors?.email.message}</p>
//                 )}
//                 <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Password:</label>
//                 {errors?.password && (
//                     <p className="text-danger">{errors?.password.message}</p>
//                 )}
//                 <input
//                     type="password"
//                     name="password"
//                     value={user.password}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <label htmlFor="">Confirm Password</label>
//                 {errors?.confirmPassword && (
//                     <p className="text-danger">
//                         {errors?.confirmPassword.message}
//                     </p>
//                 )}
//                 <input
//                     type="password"
//                     name="confirmPassword"
//                     value={user.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="border border-red-200 w-5/6"
//                 />
//                 <button className="border-2 border-red-900 w-2/6 my-5">
//                     Register
//                 </button>
//             </form>
//         );
//     }
// }

// export default Register;

