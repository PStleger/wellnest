import { useEffect, useState } from "react";

const BodyScanInstructions = [
    "Begin with Breath Awareness, Close your eyes and take a few deep, slow breaths to center yourself. Pay attention to the sensation of the breath entering and leaving your body. This helps you transition into a state of mindfulness.",
    "Start at Your Feet, Direct your focus to your feet. Notice any sensations, warmth, coolness, tingling, or tension. Pay attention without judgment. Simply observe what you feel.",
    "Progress Slowly Upwards, Gradually move your attention upward, through your ankles, calves, knees, thighs, and so on. At each area, spend a moment observing any sensations or tensions. If you notice any discomfort or tightness, acknowledge it without trying to change it.",
    "Scan Your Torso and Back, Continue scanning through your pelvis, abdomen, lower back, upper back, and chest. Be attentive to the sensations within your body. Are there areas of ease or discomfort? Are there emotions associated with these sensations?",
    "Move to Your Arms, Shift your attention to your arms, starting with your fingers, hands, wrists, forearms, and upper arms. Notice any tingling, warmth, or tension in these areas.",
    "Scan Your Neck and Head, Gradually move up to your neck and head, including your face and scalp. Pay close attention to any sensations, even if they seem subtle.",
    "Overall Body Awareness, Once you've scanned your entire body, take a few moments to expand your awareness to your body as a whole. Feel the connection between different parts of your body. Observe your overall sense of well-being.",
    "Closing the Scan, Gently bring your attention back to your breath. Take a few deep breaths, gradually becoming aware of your surroundings. When you're ready, open your eyes.",
    "You have now completed the Body Scan, Click Continue to proceed."
];

function BodyScanComponent() {
    const [CurrentScan, SetCurrentScan] = useState(0);
    const [IsLastQuestion, SetIsLastQuestion] = useState(false);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         SetCurrentScan((prevStep) => (prevStep + 1) % BodyScanInstructions.length);
    //     }, 6000);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (CurrentScan < BodyScanInstructions.length - 1) {
                SetCurrentScan((prevStep) => prevStep + 1);
            } else {
                clearInterval(interval);
                SetIsLastQuestion(true);
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [CurrentScan]);

    return (
        // <div className="text-[#6C1770] p-6 font-bold text-lg text-center max-w-md">
        //     <p className={`animate-fade animate-once animate-duration-[4000ms] animate-ease-linear animate-normal animate-fill-forwards animate-delay-[8000ms-${CurrentScan * 7}s]`}>
        //         {BodyScanInstructions[CurrentScan]}
        //     </p>
        // </div>
        // <div>
        //     {BodyScanInstructions.map((instruction, index) => (
        //         <p
        //             key={index}
        //             className={`text-[#6C1770] p-8 font-bold text-lg text-center max-w-md ${
        //                 index === CurrentScan ? 'animate-fade animate-once animate-duration-[4000ms] animate-ease-linear animate-fill-forwards' : ''
        //             }`}
        //         >
        //             {instruction}
        //         </p>
        //     ))}
        // </div>
    //     <div>
    //     {BodyScanInstructions.map((instruction, index) => (
    //         <p
    //             key={index}
    //             className={`text-[#6C1770] p-8 font-bold text-lg text-center max-w-md ${
    //                 index === CurrentScan ? 'animate-fade animate-once animate-duration-[4000ms] animate-ease-linear animate-fill-forwards' : 'hidden'
    //             }`}
    //         >
    //             {instruction}
    //         </p>
    //     ))}
    // </div> 
    <div className="relative h-[200px] w-[800px] ml-[22rem]">
            <div className="absolute inset-0 flex items-center justify-center">
                {BodyScanInstructions.map((instruction, index) => (
                    <p
                        key={index}
                        className={`text-[#6C1770] font-bold text-lg text-center max-w-md absolute inset-0 ${
                            index === CurrentScan ? 'animate-fade animate-once animate-duration-[4000ms] animate-ease-linear animate-fill-forwards' : 'hidden'
                        }`}
                    >
                        {instruction}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default BodyScanComponent;
