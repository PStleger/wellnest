import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/Auth.jsx";
import { UserAvatarProvider } from "./context/UserAvatarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserAvatarProvider>
                    <App />
                </UserAvatarProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
