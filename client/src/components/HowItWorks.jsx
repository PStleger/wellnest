// import nest from "./images/nest.png"
import placeholder from "../assets/images/placeholder.png"
import placeholder1 from "../assets/images/placeholder1.png"
import placeholder2 from "../assets/images/placeholder2.png"
import placeholder3 from "../assets/images/placeholder3.png"
// import placeholder4 from "./images/placeholder4.png"
import { Link } from "react-router-dom";
const HowItWorks = () => {
    return (
        <div className="  bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] flex flex-col">
            {/* First Card */}

            <div>
                <h1 className=" text-center text-4xl font-bold text-white mb-2">
                    How Our App Works
                </h1>
                <p className="text-center text-lg text-white">
                    Discover the Power of Emotion with WellNest Revolutionizing
                    Emotional Well-Being
                </p>
            </div>

            {/* Step 1 */}
            <div className="relative group w-screen h-96 overflow-hidden m-auto mt-36 ">
                <div className="absolute left-0 w-1/2 h-full flex flex-col justify-center ">
                    <p className="font-sans text-center text-white mt-5">
                        In todays fast-paced world, its easy to push our
                        emotions aside or dismiss them in favor of
                        intellectualizing our experiences. Did you know that the
                        human body requires just 90 seconds to process an
                        emotion when fully felt? However, our modern culture
                        often encourages us to suppress or rationalize these
                        feelings, hindering their natural release. This is where
                        WellNest steps in as an invaluable tool for your mental
                        health journey. Revolutionizing Emotional Well-Being
                    </p>
                </div>
                <div className="absolute right-0 w-1/2 h-full rounded-2xl">
                    <img
                        className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                        src={placeholder}
                    />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0 rounded-2xl"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0 rounded-2xl">
                        <div className="absolute w-full flex place-content-center rounded-2xl">
                            <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10 rounded-2xl">
                                Sign up
                            </p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-20 ">
                            <p className="font-sans text-center w-4/5 text-white mt-5 ">
                                Collaborative effort of a group to achieve a
                                common goal the most effective and efficient
                                way!
                            </p>
                        </div>
                        <Link to="/publicarticles">
                            <button className="absolute left-1/4 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-48 ml-16">
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className="relative group w-screen h-96 overflow-hidden m-auto mt-36">
                <div className="absolute left-0 w-1/2 h-full rounded-2xl">
                    <img
                        className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                        src={placeholder1}
                    />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <div className="absolute w-full flex place-content-center">
                            <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">
                                Quiz
                            </p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-20">
                            <p className="font-sans text-center w-4/5 text-white mt-5">
                                Collaborative effort of a group to achieve a
                                common goal the most effective and efficient
                                way!
                            </p>
                        </div>
                        <Link to="/publicarticles">
                            <button className="absolute left-1/4 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-48 ml-14">
                                Quiz
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute right-0 w-1/2 h-full flex flex-col justify-center">
                    <p className="font-sans text-center text-white mt-5">
                        In todays fast-paced world, its easy to push our
                        emotions aside or dismiss them in favor of
                        intellectualizing our experiences. Did you know that the
                        human body requires just 90 seconds to process an
                        emotion when fully felt? However, our modern culture
                        often encourages us to suppress or rationalize these
                        feelings, hindering their natural release. This is where
                        WellNest steps in as an invaluable tool for your mental
                        health journey. Revolutionizing Emotional Well-Being
                    </p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="relative group w-screen h-96 overflow-hidden m-auto mt-36">
                <div className="absolute left-0 w-1/2 h-full flex flex-col justify-center">
                    <p className="font-sans text-center text-white mt-5">
                        In todays fast-paced world, its easy to push our
                        emotions aside or dismiss them in favor of
                        intellectualizing our experiences. Did you know that the
                        human body requires just 90 seconds to process an
                        emotion when fully felt? However, our modern culture
                        often encourages us to suppress or rationalize these
                        feelings, hindering their natural release. This is where
                        WellNest steps in as an invaluable tool for your mental
                        health journey. Revolutionizing Emotional Well-Being
                    </p>
                </div>
                <div className="absolute right-0 w-1/2 h-full">
                    <img
                        className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                        src={placeholder2}
                    />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <div className="absolute w-full flex place-content-center">
                            <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">
                                Journal
                            </p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-20">
                            <p className="font-sans text-center w-4/5 text-white mt-5">
                                Collaborative effort of a group to achieve a
                                common goal the most effective and efficient
                                way!
                            </p>
                        </div>
                        <Link to="/progress">
                            <button className="absolute left-1/4 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-48 ml-16">
                                Journal
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Sample */}
            <div className="relative group w-screen h-96 overflow-hidden m-auto mt-36">
                <div className="absolute left-0 w-1/2 h-full">
                    <img
                        className="object-cover w-full h-full transform duration-700 backdrop-opacity-100 rounded-2xl"
                        src={placeholder3}
                    />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <div className="absolute w-full flex place-content-center">
                            <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">
                                Article
                            </p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-20">
                            <p className="font-sans text-center w-4/5 text-white mt-5">
                                Collaborative effort of a group to achieve a
                                common goal the most effective and efficient
                                way!
                            </p>
                        </div>
                        <Link to="/publicarticles">
                            <button className="absolute left-1/4 bottom-4 bg-white text-black font-bold rounded-lg h-10 w-48 ml-16">
                                Article
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute right-0 w-1/2 h-full flex flex-col justify-center">
                    <p className="font-sans text-center text-white mt-5">
                        In todays fast-paced world, its easy to push our
                        emotions aside or dismiss them in favor of
                        intellectualizing our experiences. Did you know that the
                        human body requires just 90 seconds to process an
                        emotion when fully felt? However, our modern culture
                        often encourages us to suppress or rationalize these
                        feelings, hindering their natural release. This is where
                        WellNest steps in as an invaluable tool for your mental
                        health journey. Revolutionizing Emotional Well-Being
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
