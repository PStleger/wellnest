import { useState } from 'react';
import '../App.css'; 

function BodyPartsDiagram() {
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);
  const [infoText, setInfoText] = useState('');

  const showInfo = (bodyPart) => {
    setInfoText(`You clicked on the ${bodyPart}.`); // Customize this message.
    setInfoBoxVisible(true);

    setTimeout(() => {
      setInfoBoxVisible(false);
    }, 3000); // Hide the info box after 3 seconds (adjust as needed).
  };

  return (
    <div className="relative">
      <div
        className="body-parts absolute"
        style={{ 
         
        }}
      >
         <div className="heady relative">
        <div className="head absolute top-[40px] left-[85px]" onClick={() => showInfo('Head')}>
        <p className="text-transparent">Head <br></br> 
        Head</p> 
        </div>
        <div className="torso absolute  left-[20px] top-[230px]" onClick={() => showInfo('Hand')}>
        <p className="text-transparent">Hand</p>
        </div>
        <div className="head absolute  left-[180px] top-[230px]" onClick={() => showInfo('Hand')}>
        <p className="text-transparent">Hand</p>
        </div>
        <div className="torso absolute left-[120px] top-[462px]" onClick={() => showInfo('Feet')}>
        <p className="text-transparent">Feet</p>
        </div>
        <div className="torso absolute  left-[58px] top-[462px]" onClick={() => showInfo('Feet')}>
        <p className="text-transparent">Feet</p>
        </div>
        <div className="head absolute left-[75px] top-[230px] w-5 h-[220px]" onClick={() => showInfo('Leg L')}>
        <p className="text-transparent">Leg</p>
        </div>
        <div className="torso absolute left-[121px] top-[230px] w-5 h-[220px]" onClick={() => showInfo('Leg R')}>
        <p className="text-transparent">
            Leg
        </p>
        </div>
        <div className="torso absolute left-[89px] top-[129px] w-[50px]" onClick={() => showInfo('Chest')}>
        <p className="text-transparent">
            Chest
        </p>
        </div>
        <div className="torso absolute left-[59px] top-[140px] w-[20px] h-[85px]  rotate-[14deg]" onClick={() => showInfo('Arm')}>
        <p className="text-transparent">
            Arm
        </p>
        </div>
        <div className="torso absolute left-[150px] top-[140px] w-[20px] h-[85px]  rotate-[-18deg] " onClick={() => showInfo('Arm')}>
        <p className="text-transparent">
            Arm
        </p>
        </div>
       </div> 
      </div>
      <div>
      {infoBoxVisible && (
        <div id="info-box" className="info-box">
          <h1>Body Part Info:</h1>
          <p id="info-text">{infoText}</p>
        </div>
        
      )}
      </div>
    </div>
  );
}

export default BodyPartsDiagram;











