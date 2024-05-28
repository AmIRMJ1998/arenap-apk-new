import { IconContext } from "react-icons";
import { MdVerified } from "react-icons/md";

const ApprovedIcon = () => {
    return (
        <IconContext.Provider value={{color: "#4278C1", size: "24px"}}>
            <div>
                <MdVerified />
            </div>
        </IconContext.Provider>
    );
}

export default ApprovedIcon
