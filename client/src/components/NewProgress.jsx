/* eslint-disable react/no-unescaped-entities */
import { useState, Fragment, useRef, useEffect } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import "./NewProgress.css";
import boxsteps from "../assets/boxsteps2.gif";
import BodyScan from "./BodyScan";

const NewProgress = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [canvasDataURL, setCanvasDataURL] = useState("");
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    const [answeredQuestion1, setAnsweredQuestion1] = useState(false);
    const [showBoxBreathing, setShowBoxBreathing] = useState(false);
    const [showScanButton, setShowScanButton] = useState(false);
    const [showBodyScan, setShowBodyScan] = useState(false);
    const [QAarray, setQAarray] = useState([
        {
            question: "How are you feeling today? It's ok if you're not sure.", //0
            answer: "",
        },
        {
            question: "What area in your body is pulling your attention?", //1
            answer: "",
        },
        { question: "Assign a colour to this area", answer: "" }, //2
        { question: "Now, assign a shape to this area", answer: "" }, //3
        { question: "What texture do you feel it is?", answer: "" }, //4
        {
            question:
                "Observe this object you’ve assigned a colour, shape, and texture to. Focus on this for a few moments. Has it changed at all?",
            answer: "", //5
        },
        { question: "Has the colour changed?", answer: "" }, //6
        { question: "Assign a colour to this area", answer: "" }, //7
        { question: "Has the shape changed?", answer: "" }, //8
        { question: "Now, assign a shape to this area", answer: "" }, //9
        { question: "Has the texture changed?", answer: "" }, //10
        { question: "What texture do you feel it is?", answer: "" }, //11
        { question: "Has the location changed?", answer: "" }, //12
        {
            question: "What area in your body is pulling your attention?", //13
            answer: "",
        },
        {
            question: "Would you like to journal how you’re feeling now?", //14
            answer: "",
        },
    ]);

    useEffect(() => {
        if (answeredQuestion1) {
            const timer = setTimeout(() => {
                setShowScanButton(true);
            }, 16 * 1000); // 16 seconds in milliseconds

            return () => clearTimeout(timer);
        }
    }, [answeredQuestion1]);

    useEffect(() => {
        if (showScanButton) {
            const timer = setTimeout(() => {
                // Your code to show the "Continue for Body Scan" button
            }, 16000); // 16 seconds in milliseconds

            return () => clearTimeout(timer);
        }
    }, [showScanButton]);

    const updateAnswer = (e) => {
        setAnswer(e.target.value);
    };

    const handleNextQuestion = () => {
        if (answer !== "") {
            // Check if an answer has been provided
            const updatedQAarray = [...QAarray];
            updatedQAarray[currentQuestionIndex].answer = answer; // Save the answer
            setQAarray(updatedQAarray); // Update the question-answer array
            if (currentQuestionIndex === 0) {
                setAnsweredQuestion1(true);
                setShowBoxBreathing(true);
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswer(""); // Clear the answer for the next question
            // console.log(answer, updatedQAarray);
        }
    };
    const handleQuestionAfterBox = () => {
        // handleNextQuestion();
        setShowBoxBreathing(false);
        handleBodyScan();
    };
    const handleQuestionAfterBodyScan = () => {
        handleNextQuestion();
        setShowBodyScan(false);
    };

    const handleBodyScan = () => {
        setShowBodyScan(true);
    };
    const wheel = () => {
        const updateWheelColor = (color) => {
            setHsva({ ...hsva, ...color.hsva });
            // console.log(color.hsva);
            setAnswer(JSON.stringify(color.hsva)); // Convert HSVa to a string and set it as the answer
        };

        return (
            <Fragment>
                <Wheel
                    className="h-36 w-36"
                    color={hsva}
                    onChange={updateWheelColor}
                />
                <div
                    className="rounded-full h-12 w-12 m-8 content-center"
                    style={{ background: hsvaToHex(hsva) }}
                ></div>
            </Fragment>
        );
    };
    const canvasRef = useRef(null); // Create a ref for the canvas

    // const handleCanvas = () => {
    //   canvasRef.current.exportImage("png")
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };
    //
    const handleCanvas = async () => {
        try {
            const imageUrl = await canvasRef.current.exportImage("jpeg");
            // console.log(imageUrl);
            // setAnswer(JSON.stringify(imageUrl));
            const updatedQAarray = [...QAarray];
            updatedQAarray[currentQuestionIndex].answer = imageUrl; // Save the answer
            // console.log(answer);
            setQAarray(updatedQAarray); // Update the question-answer array
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswer(""); // Clear the answer for the next question
            console.log(answer, updatedQAarray);

            // console.log('Image URL:', imageUrl);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleYes = () => {
        const updatedQAarray = [...QAarray];
        updatedQAarray[currentQuestionIndex].answer = "Yes"; // Save the answer
        setQAarray(updatedQAarray); // Update the question-answer array
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer(""); // Clear the answer for the next question
        console.log(answer, updatedQAarray);
    };
    const handleNo = () => {
        if (currentQuestionIndex == 5) {
            const updatedQAarray = [...QAarray];
            updatedQAarray[currentQuestionIndex].answer = "No"; // Save the answer
            setQAarray(updatedQAarray); // Update the question-answer array
            setCurrentQuestionIndex(14);
            setAnswer(""); // Clear the answer for the next question}
        } else {
            const updatedQAarray = [...QAarray];
            updatedQAarray[currentQuestionIndex].answer = "No"; // Save the answer
            setQAarray(updatedQAarray); // Update the question-answer array
            setCurrentQuestionIndex(currentQuestionIndex + 2);
            setAnswer(""); // Clear the answer for the next question
            console.log(answer, updatedQAarray);
        }
    };
    const handleNest = () => {
        const updatedQAarray = QAarray.map((item) => ({
            question: item.question,
            answer: item.answer,
        }));
        axios
            .post(`/progress/newprogress`, { QAArray: updatedQAarray })
            .then((res) => {
                console.log(res.data);
                navigate("../dashboard");
            })
            .catch((e) => console.log(e));
    };

    const handleJournal = () => {
        const updatedQAarray = QAarray.map((item) => ({
            question: item.question,
            answer: item.answer,
        }));
        axios
            .post(`/progress/newprogress`, { QAArray: updatedQAarray })
            .then((res) => {
                console.log(res.data);
                navigate("../journals/new");
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className="flex flex-col justify-center items-center mt-24 mb-24 min-h-[400px]">
            {showBodyScan ? (
                // <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                //     This is body scan
                // </p>
                <BodyScan />
            ) : null}
            {showBodyScan ? (
                <button
                    onClick={handleQuestionAfterBodyScan}
                    className="-mt-48 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white text-2xl">
                        Continue to questions
                    </span>
                </button>
            ) : answeredQuestion1 && showBoxBreathing ? (
                <div>
                    {/* <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                        BOX BREATHING INSTRUCTIONS
                    </p> */}
                    <button
                        className="boxbutton"
                        onClick={handleQuestionAfterBox}
                    >
                        {/* <p className="text-[#cd60d3] p-8 font-bold text-2xl text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                            Step 1: Breathe in, counting to four slowly. Feel
                            the air enter your lungs.
                        </p> */}
                        <img src={boxsteps} alt="" />
                    </button>
                </div>
            ) : (
                <p className="text-[#6C1770] p-8 font-bold text-2xl text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                    {QAarray[currentQuestionIndex].question}
                </p>
            )}
            {showBoxBreathing && showScanButton ? (
                <button
                    onClick={handleQuestionAfterBox}
                    className="m-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white text-2xl">
                        Continue for Bodyscan
                    </span>
                </button>
            ) : null}

            {currentQuestionIndex == 2 || currentQuestionIndex == 7 ? (
                <div>{wheel()}</div>
            ) : null}

            {currentQuestionIndex == 3 || currentQuestionIndex == 9 ? (
                <ReactSketchCanvas
                    ref={canvasRef}
                    style={{
                        border: "0.5rem solid #cd60d3",
                        borderRadius: "0.50rem",
                    }}
                    width="50rem"
                    height="20rem"
                    strokeWidth={4}
                    strokeColor={hsvaToHex(hsva)}
                />
            ) : null}
            {/* {currentQuestionIndex == 4 ? (
  <img src={QAarray[currentQuestionIndex-1].answer} alt="" />
):null} */}
            {showBoxBreathing ||
            showBodyScan ||
            currentQuestionIndex == 2 ||
            currentQuestionIndex == 7 ||
            currentQuestionIndex == 3 ||
            currentQuestionIndex == 9 ||
            currentQuestionIndex == 5 ||
            currentQuestionIndex == 6 ||
            currentQuestionIndex == 8 ||
            currentQuestionIndex == 10 ||
            currentQuestionIndex == 12 ||
            currentQuestionIndex == 14 ? null : (
                <input
                    className="m-4 p-1 rounded-full w-60 text-[#6C1770] border border-[#6C1770] hover:border-fuchsia-500 focus:border-blue-50"
                    type="text"
                    value={answer}
                    onChange={updateAnswer}
                />
            )}
            {showBoxBreathing == false &&
            (currentQuestionIndex == 5 ||
                currentQuestionIndex == 6 ||
                currentQuestionIndex == 8 ||
                currentQuestionIndex == 10 ||
                currentQuestionIndex == 12) ? (
                <div className="flex flex-row">
                    <button
                        onClick={handleYes}
                        className="m-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-2xl">
                            Yes
                        </span>
                    </button>
                    <button
                        onClick={handleNo}
                        className="m-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-2xl">No</span>
                    </button>
                </div>
            ) : null}
            {showBoxBreathing == false &&
            showBodyScan == false &&
            (currentQuestionIndex == 3 || currentQuestionIndex == 9) ? (
                <button
                    onClick={handleCanvas}
                    className="m-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white text-2xl">
                        Continue
                    </span>
                </button>
            ) : (
                showBoxBreathing == false &&
                showBodyScan == false &&
                currentQuestionIndex !== 5 &&
                currentQuestionIndex !== 6 &&
                currentQuestionIndex !== 8 &&
                currentQuestionIndex !== 10 &&
                currentQuestionIndex !== 12 &&
                currentQuestionIndex !== 14 && (
                    <button
                        onClick={handleNextQuestion}
                        className="m-10 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-2xl">
                            Continue
                        </span>
                    </button>
                )
            )}

            {showBoxBreathing == false &&
            showBodyScan == false &&
            currentQuestionIndex == 14 ? (
                <div>
                    <button
                        onClick={handleJournal}
                        className="m-5 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-2xl">
                            Yes, I'd like to Journal
                        </span>
                    </button>
                    <button
                        onClick={handleNest}
                        className="m-5 relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white text-2xl">
                            Return to my Nest
                        </span>
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default NewProgress;
