import Lottie from "lottie-react";
import animation from "../assets/animation/data.json"



const BodyScan = () => {
    return (
        <div>
        <Lottie
                        animationData={animation}
                        loop={true}
                        autoplay={true}
                        className="w-1/30"
                        speed={2}
                    />  
        </div>
        )
    };
    export default BodyScan;