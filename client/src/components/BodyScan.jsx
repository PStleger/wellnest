import "./BodyScan.css";
import image2 from "../assets/3363303.jpg";
import Lottie from "lottie-react";

import animationData from '../assets/breathe';
import FootyData from '../assets/Footy.json';
import ProgressBodyData from '../assets/Progress-Body';
import TorsoData from '../assets/Torso';
import ArmData from '../assets/Arm';
import NeckHeadData from '../assets/Neck-Head';
import OverallBodyData from '../assets/Overall-Body';
import BodyScanData from '../assets/BodyLast';


const BodyScan = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="hwrap">
                <div className="hmove">
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 ml-5 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Begin with Breath Awareness: <br />
                                    <br />
                                </span>
                                Close your eyes and take a few deep, slow
                                breaths to center yourself. Pay attention to the
                                sensation of the breath entering and leaving
                                your body. This helps you transition into a
                                state of mindfulness.
                            </p>
                            {/* <img
                                className="w-[500px] mix-blend-multiply p-8"
                                src={image2}
                                alt=""
                            />
      */}
      <div className="w-[400px] mix-blend-multiply"><Lottie loop={true} animationData={animationData}/></div>
                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Start at Your Feet: <br />
                                    <br />
                                </span>
                                Direct your focus to your feet. Notice any
                                sensations, warmth, coolness, tingling, or
                                tension. Pay attention without judgment. Simply
                                observe what you feel.
                            </p>
                            <div className="w-[400px] mix-blend-multiply"><Lottie loop={true} animationData={FootyData}/></div>
                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Progress Slowly Upwards: <br />
                                    <br />
                                </span>
                                Gradually move your attention upward, through
                                your ankles, calves, knees, thighs, and so on.
                                At each area, spend a moment observing any
                                sensations or tensions. If you notice any
                                discomfort or tightness, acknowledge it without
                                trying to change it.
                            </p>
                            <div className="w-[400px]"><Lottie loop={true} animationData={ProgressBodyData}/></div>

                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Scan Your Torso and Back: <br />
                                    <br />
                                </span>
                                Continue scanning through your pelvis, abdomen,
                                lower back, upper back, and chest. Be attentive
                                to the sensations within your body. Are there
                                areas of ease or discomfort? Are there emotions
                                associated with these sensations?
                            </p>
                            <div className="w-[400px] mix-blend-multiply"><Lottie loop={true} animationData={TorsoData}/></div>

                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Move to Your Arms: <br />
                                    <br />
                                </span>
                                Shift your attention to your arms, starting with
                                your fingers, hands, wrists, forearms, and upper
                                arms. Notice any tingling, warmth, or tension in
                                these areas.
                            </p>
                            <div className="w-[400px] mix-blend-multiply"><Lottie loop={true} animationData={ArmData}/></div>

                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Scan Your Neck and Head: <br />
                                    <br />
                                </span>
                                Gradually move up to your neck and head,
                                including your face and scalp. Pay close
                                attention to any sensations, even if they seem
                                subtle.
                            </p>
                            <div className="h-[400px] mix-blend-multiply"><Lottie loop={true} animationData={NeckHeadData}/></div>

                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Overall Body Awareness: <br />
                                    <br />
                                </span>
                                Once you've scanned your entire body, take a few
                                moments to expand your awareness to your body as
                                a whole. Feel the connection between different
                                parts of your body. Observe your overall sense
                                of well-being.
                            </p>
                            <div className="h-[400px] mix-blend-multiply"><Lottie loop={true} animationData={OverallBodyData}/></div>

                        </div>
                    </div>
                    <div className="hslide">
                        <div className="flex flex-row justify-center items-center">
                            <p className="text-[#6C1770] p-8 font-bold text-lg text-center max-w-md animate-fade animate-once animate-duration-[3000ms] animate-delay-0 animate-ease-linear animate-normal animate-fill-forwards">
                                <span className="font-extrabold">
                                    Closing the Scan <br />
                                    <br />
                                </span>
                                Gently bring your attention back to your breath.
                                Take a few deep breaths, gradually becoming
                                aware of your surroundings. When you're ready,
                                open your eyes.
                            </p>
                            <div className="mix-blend-multiply"><Lottie loop={true} animationData={BodyScanData}/></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodyScan;
