import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosInstance"; // Import your axios instance for making API requests

export const UserAvatarContext = createContext();

export function useUserAvatar() {
    return useContext(UserAvatarContext);
}

export function UserAvatarProvider({ children }) {
    const [userAvatar, setUserAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    // Function to fetch the user's avatar from the server
    const fetchUserAvatar = async () => {
        try {
            const response = await axios.get("auth/avatar");
            setUserAvatar(response.data.avatarUrl);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user avatar:", error);
            setLoading(false);
        }
    };
    fetchUserAvatar();
    useEffect(() => {
        // console.log("fetching the avatar");
        fetchUserAvatar();
    }, []);
    useEffect(() => {
        if (userAvatar === null) {
            // console.log("fetching the avatar (initial check)");
            fetchUserAvatar();
        }
    }, [userAvatar]);

    // Function to update the user's avatar on the server
    const updateUserAvatar = async (avatarUrl) => {
        try {
            const response = await axios.post("/auth/upload-avatar", {
                avatarUrl,
            });
            setUserAvatar(avatarUrl);
        } catch (error) {
            console.error("Error updating user avatar:", error);
        }
    };

    // Fetch the user's avatar when the component mounts (you can adjust the timing)
    useEffect(() => {
        // console.log("fetching the avatar");
        fetchUserAvatar();
    }, [loading]);

    fetchUserAvatar();
    return (
        <UserAvatarContext.Provider value={{ userAvatar, updateUserAvatar }}>
            {children}
        </UserAvatarContext.Provider>
    );
}
