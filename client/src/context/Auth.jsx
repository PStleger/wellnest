/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const setState = (user, loading, errors) => {
        setUser(user);
        setLoading(loading);
        setErrors(errors);
    };

    // Are we logged in?
    useEffect(() => {
        axios
            .get("auth/currentUser")
            .then((res) => setState(res.data.user, false, null))
            .catch((error) => {
                setState(null, false, null);
            });
    }, []);

    const login = async (user) => {
        setLoading(true);
        try {
            const res = await axios.post("auth/login", user);
            setState(res.data.user, false, null);
            navigate("/");
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.data);
        }
    };
    const register = async (user) => {
        setLoading(true);
        try {
            const res = await axios.post("auth/register", user);
            setState(res.data.user, false, null);
            navigate("/");
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.data.errors);
        }
    };
    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post("auth/logout", {});
            setState(null, false, null);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error.response);
            setState(null, false, error.response.errors);
        }
    };
    return (
        <AuthContext.Provider
            value={{ user, loading, errors, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
