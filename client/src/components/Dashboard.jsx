import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [openTab, setOpenTab] = useState(1);

    const context = useContext(AuthContext);
    const handleLogout = () => {
        console.log("CONTEXT", context);
        context.logout();
        return <Navigate to="/" />;
    };

    return (
        <div>
            {" "}
            <button
                className="border-1 border-red-900 p-5"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="flex flex-wrap ">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3  flex-row w-[800px] mx-auto "
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center rounded-t-xl ">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " +
                                    (openTab === 1
                                        ? "text-[#DFC6E0] bg-[#8C1960]"
                                        : "text-" + "red" + "-600 bg-[#DFC6E0]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                My Nest
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " +
                                    (openTab === 2
                                        ? "text-[#DFC6E0] bg-[#8C1960]"
                                        : "text-" + "red" + "-600 bg-[#DFC6E0]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Journal
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " +
                                    (openTab === 3
                                        ? "text-[#DFC6E0] bg-[#8C1960]"
                                        : "text-" + "red" + "-600 bg-[#DFC6E0]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                Saved
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal " +
                                    (openTab === 4
                                        ? "text-[#DFC6E0] bg-[#8C1960]"
                                        : "text-" + "red" + "-600 bg-[#DFC6E0]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Settings
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-[#DFC6E0] w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div
                                    className={
                                        openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                >
                                    <div className="mx-auto h-[600px] w-[900px] bg-[#DFC6E0] rounded-3xl flex justify-around items-center ">
                                        <div className="h-2/3 w-1/2 bg-[#EFE2F0] rounded-2xl flex flex-col items-center justify-around py-12 px-4">
                                            <h2 className="text-[#6C1770] text-2xl">
                                                Explore
                                            </h2>
                                            <div className="flex items-center justify-center gap-2 flex-wrap ">
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-pink-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-red-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-white to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-gray-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-orange-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-orange-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                                <Link>
                                                    <div className="w-16 h-14 bg-gradient-to-r from-orange-400 to-blue-500 rounded-xl"></div>
                                                </Link>
                                            </div>
                                        </div>
                                        <button className="border-4 bg-white text-[#6C1770] text-xl  border-yellow-300 rounded-full h-48 w-48 shadow-2xl shadow-yellow-400">
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                >
                                    <p>
                                        Completely synergize resource taxing
                                        relationships via premier niche markets.
                                        Professionally cultivate one-to-one
                                        customer service with robust ideas.
                                        <br />
                                        <br />
                                        Dynamically innovate resource-leveling
                                        customer service for state of the art
                                        customer service.
                                    </p>
                                </div>
                                <div
                                    className={
                                        openTab === 3 ? "block" : "hidden"
                                    }
                                    id="link3"
                                >
                                    <p>
                                        Efficiently unleash cross-media
                                        information without cross-media value.
                                        Quickly maximize timely deliverables for
                                        real-time schemas.
                                        <br />
                                        <br /> Dramatically maintain
                                        clicks-and-mortar solutions without
                                        functional solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="tabs mx-auto w-96 bg-[#8C1960] rounded-xl gap-2 flex  items-center justify-center text-white">
                <a className=" h-10 w-20 tab tab-lifted flex  items-center justify-center">
                    Tab 1
                </a>
                <a className=" h-10 w-20 tab tab-lifted tab-active active:bg-[#DFC6E0] flex  items-center justify-center">
                    Tab 2
                </a>
                <a className=" h-10 w-20 tab tab-lifted flex  items-center justify-center">
                    Tab 3
                </a>
            </div> */}
        </div>
    );
};

export default Dashboard;
