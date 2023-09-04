import { Link } from "react-router-dom";
import image1 from "../assets/5767931.jpg";
import image2 from "../assets/5184247.jpg";
import image3 from "../assets/3363303.jpg";

const Landing = () => {
    return (
        <div className="w-full bg-[#f0ebf0]">
            <div className="flex flex-row flex-wrap justify-center items-center">
                <img
                    className="w-[600px] mix-blend-multiply p-8"
                    src={image1}
                    alt=""
                />
                <div className="flex flex-col items-center">
                    <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md">
                        Building Your Nest of Emotional Wellbeing, One Feeling
                        at a Time.
                    </p>
                    <Link to="/progress/new">
                        <div className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white text-2xl">
                                Let's Get Started!
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center">
                <div className="flex flex-col items-center">
                    <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md">
                        Find out how Somatic Therapy can be a useful addition to
                        your mental health toolkit
                    </p>
                    <Link to="/howitworks">
                        <div className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                            <span className="relative text-white text-2xl">
                                Learn More
                            </span>
                        </div>
                    </Link>
                </div>
                <img
                    className="w-[600px] mix-blend-multiply p-8"
                    src={image3}
                    alt=""
                />
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center">
                <img
                    className="w-[600px] mix-blend-multiply p-8"
                    src={image2}
                    alt=""
                />
                <div className="flex flex-col items-center">
                    <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md">
                        <q>
                            Discover emotional harmony and make wellNest your
                            cozy retreat
                        </q>
                        <br />
                        <br />- <del>Mahatma Ghandi</del>
                        <br />
                        <ins>Bensu</ins>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Landing;
