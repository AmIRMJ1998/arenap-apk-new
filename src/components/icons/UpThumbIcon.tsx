import { IconContext } from "react-icons";
import { FaThumbsUp } from "react-icons/fa";

const UpThumbIcon = ({ size }: { size: string }) => {

    return (
        <IconContext.Provider value={{ color: "#4FA148", size }}>
            <div className="mb-2">
                <FaThumbsUp />
            </div>
        </IconContext.Provider>
    );
}

export default UpThumbIcon
