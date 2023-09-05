import Concrete from "../assets/Textures-Web/Concrete.png";
import Spiky from "../assets/Textures-Web/Spiky.png";
import Soft from "../assets/Textures-Web/Soft.jpeg";
import Metal from "../assets/Textures-Web/Metal.png";
import Pebbles from "../assets/Textures-Web/Pebbles.png";
import Rust from "../assets/Textures-Web/Rust.png";
import Water from "../assets/Textures-Web/Water.png";

const Textures = () => {
    return <div>
        <div className="flex flex-row space-x-1">
            <img className="w-[200px] mix-blend-multiply p-6" src={Spiky} alt="" />
            <img className="w-[200px] mix-blend-multiply p-6" src={Metal} alt="" />
            <img className="w-[200px] mix-blend-multiply p-6" src={Soft} alt="" />
            </div>
        <div className="flex flex-row space-x-1">
            <img className="w-[200px] mix-blend-multiply p-6" src={Pebbles} alt="" />
            <img className="w-[200px] mix-blend-multiply p-6" src={Water} alt="" />
            <img className="w-[200px] mix-blend-multiply p-6" src={Rust} alt="" /> 
        </div>
        

    </div>;
};

export default Textures;
