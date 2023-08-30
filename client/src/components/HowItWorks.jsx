
import nest from "./images/nest.png"
import placeholder from "./images/placeholder.png"
import placeholder1 from "./images/placeholder1.png"
import placeholder2 from "./images/placeholder2.png"
import placeholder3 from "./images/placeholder3.png"
import { Link } from 'react-router-dom';
const HowItWorks = () => {
    return (
        <div className="Parent">
      {/* First Card */}
    <div className="text-center py-5 justify-around space-y-4 rounded-lg shadow-md mx-6 bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]">
    <div className=" text-center ">
            <div><h1 className="text-4xl font-bold text-white mb-2">How Our App Works</h1>
                <p className="text-lg text-white">Discover the Power of Emotion with WellNest
                    Revolutionizing Emotional Well-Being</p>
            </div>
            </div> 
                {/* Step 1 */}
                <div className="flex items-center relative group w-96 h-96 overflow-hidden bg-black m-auto mt-36">
                    <img className="w-80 object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={placeholder} alt=""/>
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <h2 className="absolute w-full flex place-content-center"></h2>
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">Answer the question to see how you are feeling</p>

                        <Link to="/register">
                            <button className="bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white px-4 py-2 rounded">
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Step 1 */}
                <div className="flex items-center relative group w-96 h-96 overflow-hidden bg-black m-auto mt-36">
                    <img className="w-80 object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={placeholder1} alt=""/>
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <h2 className="absolute w-full flex place-content-center"></h2>
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">Body scan somatic therapy is a holistic approach to healing that focuses on the mind-body connection and aims to promote self-awareness, relaxation, and overall well-being. </p>

                        <Link to="/register">
                            <button className="bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white px-4 py-2 rounded">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center relative group w-96 h-96 overflow-hidden bg-black m-auto mt-36">
                    <img className="w-80 object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={placeholder2} alt=""/>
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <h2 className="absolute w-full flex place-content-center"></h2>
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">Answer the question to now to see if your feelings have changed</p>

                        <Link to="/progress">
                            <button className="bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white px-4 py-2 rounded">
                                Questions
                            </button>
                        </Link>
                    </div>
                </div>
                    
                <div className="flex items-center relative group w-96 h-96 overflow-hidden bg-black m-auto mt-36">
                    <img className="w-80 object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={placeholder3} alt=""/>
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <h2 className="absolute w-full flex place-content-center"></h2>
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">Journal your feelings to see what is draining your energy</p>

                        <Link to="/journals">
                            <button className="bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white px-4 py-2 rounded">
                            Journal
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center relative group w-96 h-96 overflow-hidden bg-black m-auto mt-36">
                    <img className="w-80 object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={nest} alt=""/>
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0"></div>
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <h2 className="absolute w-full flex place-content-center"></h2>
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">Go through the articles to see what other have to say</p>

                        <Link to="/publicarticles">
                            <button className="bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white px-4 py-2 rounded">
                                Articles
                            </button>
                        </Link>
                    </div>
                </div>
                
                
                    
        </div>
        </div>
    );

};

export default HowItWorks;
