import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Link, Navigate } from "react-router-dom";
import nestlogo from "./images/nestlogo.jpeg";

function Login() {
    const context = useContext(AuthContext);
    // const navigate = Navigate();
    const [user, setUser] = useState({
        userName: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("CONTEXT", context);
        context.login(user);
        // navigate("/dashboard");
    };
    if (!context.loading && context.user) {
        return <Navigate to="/dashboard" />;
    }

    if (!context.loading && !context.user) {
        return (
            <section className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-flex-col item-center justify-items">
                    <div className="tab-content tab-space">
                        <div>
                            <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
                                <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
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
                                            {context.errors?.message}
                                            <form
                                                className=" rounded-md flex flex-col items-center "
                                                onSubmit={handleSubmit}
                                            >
                                                <div>
                                                    <label htmlFor="">
                                                        Username:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="userName"
                                                        value={user.userName}
                                                        onChange={handleChange}
                                                        required
                                                        className=" w-56 rounded-md"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="">
                                                        Password:
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={user.password}
                                                        onChange={handleChange}
                                                        required
                                                        className=" w-56      rounded-md"
                                                    />
                                                </div>
                                                <div className="p-10 mt-7 text-black">
                                                    <button className="relative bg-white text-[#6C1770] text-xl border-none rounded-full h-36 w-36 lg:h-56 lg:w-56 lg:text-[25px]">
                                                        Log In
                                                        <div className="absolute inset-2 shadow-[0_0px_70px_20px] hover:shadow-[0_10px_50px_0px] rounded-full hover:shadow-yellow-400 shadow-yellow-400 hover:animate-spin animate-duration-[7000ms] animate-pulse animate-fill-forwards"></div>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Login;
