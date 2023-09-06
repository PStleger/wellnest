import { useState } from 'react';
import '../App.css';

const BodyPartsDisplay = ({ onClick }) => {
const [selectedBodyPart, setSelectedBodyPart] = useState('');
const [infoBoxVisible, setInfoBoxVisible] = useState(false);
const [infoText, setInfoText] = useState('');

const handleBodyPartClick = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    onClick(bodyPart); // Call the callback function with the selected body part
    showInfo(bodyPart);
};

const showInfo = (bodyPart) => {
    setInfoText(bodyPart);
    setInfoBoxVisible(true);

//     setTimeout(() => {
//     setInfoBoxVisible(false);
//     }, 9000); // Hide the info box after 3 seconds.
};

return (
    <div className="relative right-[70px] bottom-[80px] w-5 h-5">
<div className="body-parts absolute">
        <div className="heady relative w-36 h-80 ">
        <div
            className="head absolute top-[22px] left-[53px]  "
            onClick={() => handleBodyPartClick('Head')}
            onClick={() => showInfo('Head')}
        >
            <p className="text-transparent">
            Head <br />
            Head
            </p>
        </div>
        <div
            className="torso absolute left-[15px] top-[140px]  w-5 h-7"
            onClick={() => handleBodyPartClick('Hand')}
        >
            <p className="text-transparent">Hand L</p>
        </div>
        <div
            className="head absolute left-[117px] top-[144px]  w-5 h-7"
            onClick={() => handleBodyPartClick('Hand')}
        >
            <p className="text-transparent">Hand R</p>
        </div>
        <div
            className="torso absolute left-[76px] top-[295px]  w-7 h-6"
            onClick={() => handleBodyPartClick('Feet')}
        >
            <p className="text-transparent">Feet R</p>
        </div>
        <div
            className="torso absolute left-[35px] top-[295px]  w-7 h-6"
            onClick={() => handleBodyPartClick('Feet')}
        >
            <p className="text-transparent">Feet L</p>
        </div>
        <div
            className="head absolute left-[75px] top-[145px] w-5 h-[145px] "
            onClick={() => handleBodyPartClick('Leg')}
        >
            <p className="text-transparent">Leg R</p>
        </div>
        <div
            className="torso absolute left-[45px] top-[145px] w-5 h-[145px] "
            onClick={() => handleBodyPartClick('Leg ')}
        >
            <p className="text-transparent">Leg L</p>
        </div>
        <div
            className="torso absolute left-[58px] top-[84px] w-[30px]  "
            onClick={() => handleBodyPartClick('Chest')}
        >
            <p className="text-transparent">Chest</p>
        </div>
        <div
            className="torso absolute left-[35px] top-[90px] w-[15px] h-[50px]  rotate-[14deg] "
            onClick={() => handleBodyPartClick('Arm')}
        >
            <p className="text-transparent">Arm</p>
        </div>
        <div
            className="torso absolute left-[98px] top-[85px] w-[15px] h-[55px]  rotate-[-18deg] "
            onClick={() => handleBodyPartClick('Arm')}
        >
            <p className="text-transparent">Arm</p>
        </div>
        </div>
    </div>
    <div>
        {infoBoxVisible && (
        <div id="info-box" className="info-box left-[150px] top-[60px]">
            <h1>Selected:</h1>
            <p id="info-text">{infoText}</p>
        </div>
        )}
    </div>
    </div>
);
};

export default BodyPartsDisplay;












