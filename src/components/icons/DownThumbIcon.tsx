import { IconContext } from "react-icons";
import { FaThumbsDown } from "react-icons/fa";

const DownThumbIcon = ({ size }: { size: string }) => {
    return (
        <IconContext.Provider value={{ color: "#CE1B1B", size }}>
            <div className="mt-2">
                <FaThumbsDown />
            </div>
        </IconContext.Provider>
    )
}

export default DownThumbIcon
