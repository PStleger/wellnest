import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";

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
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        context.register(user);
    };

    if (!context.loading && context.user) {
        return <Navigate to="/" />;
    }

    if (!context.loading && !context.user) {
        return (
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="">First Name:</label>
                {errors?.firstName && (
                    <p className="text-danger">{errors?.firstName.message}</p>
                )}
                <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Last Name:</label>
                {errors?.lastName && (
                    <p className="text-danger">{errors?.lastName.message}</p>
                )}
                <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Username:</label>
                {errors?.userName && (
                    <p className="text-danger">{errors?.userName.message}</p>
                )}
                <input
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Country:</label>
                {errors?.country && (
                    <p className="text-danger">{errors?.country.message}</p>
                )}
                <input
                    type="text"
                    name="country"
                    value={user.country}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Date of Birth:</label>
                {errors?.dob && (
                    <p className="text-danger">{errors?.dob.message}</p>
                )}
                <input
                    type="text"
                    name="dob"
                    value={user.dob}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Email:</label>
                {errors?.email && (
                    <p className="text-danger">{errors?.email.message}</p>
                )}
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Password:</label>
                {errors?.password && (
                    <p className="text-danger">{errors?.password.message}</p>
                )}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="">Confirm Password</label>
                {errors?.confirmPassword && (
                    <p className="text-danger">
                        {errors?.confirmPassword.message}
                    </p>
                )}
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button>Register</button>
            </form>
        );
    }
}

export default Register;
