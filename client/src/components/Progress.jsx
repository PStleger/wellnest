import { useState, Fragment, useRef } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Progress = () => {
  const [firstQuestion, setFirstQuestion] = useState({
    question: "How are you feeling today?",
    answer: "",
  });
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [canvasDataURL, setCanvasDataURL] = useState("");
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [QAarray, setQAarray] = useState([
    {
      question: "What area in your body is pulling your attention?",
      answer: "",
    },
    { question: "Assign a colour to this area", answer: "" },
    { question: "Now, assign a shape to this area", answer: "" },
    { question: "What texture do you feel it is?", answer: "" },
    {
      question:
        "Observe this object you’ve assigned a colour, shape, and texture to. Focus on this for a few moments. Has it changed at all?",
      answer: "",
    },
    { question: "Has the colour changed?", answer: "" },
    { question: "Assign a colour to this area", answer: "" },
    { question: "Has the shape changed?", answer: "" },
    { question: "Now, assign a shape to this area", answer: "" },
    { question: "Has the texture changed?", answer: "" },
    { question: "What texture do you feel it is?", answer: "" },
    { question: "Has the location changed?", answer: "" },
    {
      question: "What area in your body is pulling your attention?",
      answer: "",
    },
    {
      question: "Would you like to journal how you’re feeling now?",
      answer: "",
    },
  ]);
  const updateAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    if (answer !== "") {
      // Check if an answer has been provided
      const updatedQAarray = [...QAarray];
      updatedQAarray[currentQuestionIndex].answer = answer; // Save the answer
      setQAarray(updatedQAarray); // Update the question-answer array
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer(""); // Clear the answer for the next question
      console.log(answer, updatedQAarray);
    }
  };
  const wheel = () => {
    const updateWheelColor = (color) => {
      setHsva({ ...hsva, ...color.hsva });
      console.log(color.hsva);
      setAnswer(JSON.stringify(color.hsva)); // Convert HSVa to a string and set it as the answer
    };

    return (
      <Fragment>
        <Wheel color={hsva} onChange={updateWheelColor} />
        <div
          className="rounded-full h-8 w-8"
          style={{ background: hsvaToHex(hsva) }}
        ></div>
      </Fragment>
    );
  };
  const canvasRef = useRef(null); // Create a ref for the canvas

  const handleCanvas = () => {
    canvasRef.current.exportImage("png")
      .then(dataURL => {
        console.log(dataURL);
        setCanvasDataURL(dataURL); // Store the canvas PNG data URL
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <p>{firstQuestion.question}</p>
      <input className="border border-red-200 w-5/6" type="text"></input>

      <p>{QAarray[currentQuestionIndex].question}</p>
      {currentQuestionIndex == 1 || currentQuestionIndex == 5 ? (
        <div>{wheel()}</div>
      ) : null}

      {currentQuestionIndex == 2 || currentQuestionIndex == 6 ? (
        <ReactSketchCanvas
        style={{border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem'}}
        width="600"
        height="400"
        strokeWidth={4}
        strokeColor={hsvaToHex(hsva)}      />
      ) : null}

      {currentQuestionIndex == 1 ||
      currentQuestionIndex == 5 ||
      currentQuestionIndex == 2 ||
      currentQuestionIndex == 6 ? null : (
        <input
          className="border border-red-200 w-5/6"
          type="text"
          value={answer}
          onChange={updateAnswer}
        />
      )}
{currentQuestionIndex ==2||currentQuestionIndex==6?(<button onClick={handleCanvas}>Continue</button>):
      <button onClick={handleNextQuestion}>Continue</button>}
    </div>
  );
};

export default Progress;
