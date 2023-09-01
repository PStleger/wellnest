import { useState } from "react";
// import { Navigate } from "react-router";
// import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";
import Journals from "./Journals";
import Progress from "./Progress";

const Dashboard = () => {
    const [openTab, setOpenTab] = useState(1);

    return (
        <div>
            {" "}
            <div className="flex flex-wrap mt-16">
                <div className="w-full">
                    <ul
                        className="flex sm:w-3/4 mx-auto items-center -m-1"
                        role="tablist"
                    >
                        <li className="text-center w-1/2 rounded-t-xl overflow-hidden shadow-[3px_7px_10px_2px] shadow-cyan-900/80 z--50">
                            <a
                                className={
                                    "text-xs font-bold uppercase py-3 block leading-normal" +
                                    (openTab === 1
                                        ? " bg-gradient-to-br from-[#8ED5F0] to-[#96C7F3]"
                                        : "text-" +
                                          "red" +
                                          "-600 bg-[#DFC6E0] hover:bg-gradient-to-br from-[#8ED5F0] to-[#96C7F3]")
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
                        <li className="text-center w-1/2 rounded-t-xl overflow-hidden shadow-[3px_7px_10px_2px]  shadow-cyan-900/80 z--40">
                            <a
                                className={
                                    "text-xs   font-bold uppercase py-3 block leading-normal" +
                                    (openTab === 2
                                        ? " bg-gradient-to-br from-[#97C5F2] to-[#A0B8F5]"
                                        : "text-" +
                                          "red" +
                                          "-600 bg-[#DFC6E0] hover:bg-gradient-to-br from-[#97C5F2] to-[#A0B8F5]")
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
                        <li className="text-center w-1/2 rounded-t-xl overflow-hidden shadow-[3px_7px_10px_2px] shadow-cyan-900/80 z--30">
                            <a
                                className={
                                    "text-xs font-bold uppercase py-3 block leading-normal " +
                                    (openTab === 3
                                        ? " bg-gradient-to-br from-[#A0B8F5] to-[#A8AAF7]"
                                        : "text-" +
                                          "red" +
                                          "-600 bg-[#DFC6E0] hover:bg-gradient-to-br from-[#A0B8F5] to-[#A8AAF7]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                Progress
                            </a>
                        </li>
                        <li className="text-center w-1/2 rounded-t-xl overflow-hidden shadow-[3px_7px_10px_2px] shadow-cyan-900/80 z--20">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 block leading-normal" +
                                    (openTab === 4
                                        ? " bg-gradient-to-br from-[#A9AAF7] to-[#B29BF9]"
                                        : "text-" +
                                          "red" +
                                          "-600 bg-[#DFC6E0] hover:bg-gradient-to-br from-[#A9AAF7] to-[#B29BF9]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(4);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                Saved
                            </a>
                        </li>
                        <li className="text-center w-1/2 rounded-t-xl overflow-hidden shadow-[2px_7px_10px_1px] shadow-cyan-900/80 z--10">
                            <a
                                className={
                                    "text-xs z--10 font-bold uppercase py-3 block leading-normal " +
                                    (openTab === 5
                                        ? " bg-gradient-to-br from-[#B29BF9] to-[#BB8CFB]"
                                        : "text-" +
                                          "red" +
                                          "-600 bg-[#DFC6E0] hover:bg-gradient-to-br from-[#B29BF9] to-[#BB8CFB]")
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenTab(5);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Settings
                            </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 shadow-xl shadow-[#6C1770]/50">
                        <div className="py-5 px-5 flex-auto ">
                            <div className="tab-content tab-space">
                                <div
                                    className={
                                        openTab === 1 ? "block" : "hidden"
                                    }
                                    id="link1"
                                >
                                    <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
                                        <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                                            <h2 className="text-[#6C1770] text-2xl py-6">
                                                Explore
                                            </h2>
                                            <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16">
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#F78A73] via-[#77378a] to-[#D9466F]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#F78A73] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        Mindfulness
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#164980] via-[#2B81C2] to-[#1E295D]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#2B81C2] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        Meditation
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#A5BABE] via-[#6f94b0] to-[#A5BABE]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#d1e0e3] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        CBT
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1F3137] via-purple-400 to-[#0E181C]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-purple-200 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        Breathwork
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#647E99] via-[#D4AC8B] to-[#909496]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#deaf89] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        Yoga
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#D19976] via-[#CF974E] to-[#ECE5A9]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#ECE5A9] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        Motivational
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#263147] via-[#212C3F] to-[#233045]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-blue-300 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center">
                                                        Holistic
                                                    </span>
                                                </Link>
                                                <Link className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#373F5E] via-[#B48199] to-[#F5E0D0]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#F5E0D0] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white text-center ">
                                                        More
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <Link to="../progress/new">
                                        <button className="relative bg-white text-[#6C1770] text-xl border-none rounded-full h-52 w-52 lg:h-80 lg:w-80 lg:text-[25px]">
                                            Get Started
                                            <div className="absolute inset-2 shadow-[0_0px_70px_20px] hover:shadow-[0_10px_50px_0px] rounded-full hover:shadow-yellow-400 shadow-yellow-400 hover:animate-spin animate-duration-[7000ms] animate-pulse animate-fill-forwards"></div>
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                                <div
                                    className={
                                        openTab === 2 ? "block" : "hidden"
                                    }
                                    id="link2"
                                >
                                    <Journals />
                                </div>
                                <div
                                    className={
                                        openTab === 3 ? "block" : "hidden"
                                    }
                                    id="link3"
                                >
                                    <div className="h-auto w-3/4 xl:w-2/3 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10 mx-auto">
                                        <Progress />
                                    </div>
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
