import { IconContext } from "react-icons";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const LikeIcon = ({ liked }: { liked: boolean }) => {
    return (

        <IconContext.Provider value={{ color: "#008582", size: "22px" }}>
            <div>
                {liked ?
                    <IoIosHeart />
                    :
                    <IoIosHeartEmpty />
                }
            </div>
        </IconContext.Provider>
    )
}

export default LikeIcon
