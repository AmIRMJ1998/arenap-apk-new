import { IconContext } from "react-icons";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const MagnifierIcon = ({ active }: { active: boolean }) => {
    return (
        <IconContext.Provider value={{ color: active ? "#008582" : "", size: "24px" }}>
            {active ?
                <div>
                    <IoSearch />
                </div>
                :
                <div>
                    <IoSearchOutline />
                </div>
            }
        </IconContext.Provider>
    );
}

export default MagnifierIcon
