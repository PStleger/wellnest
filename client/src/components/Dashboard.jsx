import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/Auth";

const Dashboard = () => {
    const context = useContext(AuthContext);
    const handleLogout = () => {
        console.log("CONTEXT", context);
        context.logout();
        return <Navigate to="/" />;
    };

    return (
        <div>
            {" "}
            <p>This is the dashboard page after login</p>
            <button
                className="border-1 border-red-900 p-5"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
