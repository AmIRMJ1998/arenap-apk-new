import { useRef, useState } from "react";
import SearchIcon from "@icons/SearchIcon"
import CloseIcon from "@icons/CloseIcon";

const AISearchSectionHomePage = () => {

    const signsList = [
        "سرگیجه",
        "سردرد",
        "دل درد",
        "درد در قفسه سینه",
        "آبریزش بینی"
    ]

    const signsSelectMenuRef = useRef(null);

    const [expandedSignsSelect, setExpandedSignsSelect] = useState(false);
    const [currentSigns, setCurrentSigns] = useState([]);

    const currentSignsHandler = (sign) => {

        setCurrentSigns(prev => {
            let newState = [...prev];
            if (newState.includes(sign)) {
                newState = newState.filter(item => item !== sign);
            }
            else {
                newState.push(sign);
            }
            return newState;
        })
    }

    const currentSignInputFocusHandler = (status) => {
        setExpandedSignsSelect(status);
    }

    return (
        <div className="flex flex-col items-center w-full bg-white rounded-lg p-10 gap-y-8">
            <p className="font-bold">جستجو علائم و پیشنهاد پزشک توسط هوش مصنوعی</p>
            <div className="flex flex-col gap-y-4 w-full items-center">
                <div className="w-full relative max-w-[500px]">
                    <input className="rounded-3xl bg-[#f4f4f4] p-3 pl-10 border-none w-full outline-none" onBlur={() => currentSignInputFocusHandler(false)} onFocus={() => currentSignInputFocusHandler(true)} type="text" placeholder="جستجو علائم" />
                    <button type="button" className="absolute left-[5px] top-1/2 -translate-y-1/2 text-lg">
                        <SearchIcon color="stroke-primary" />
                    </button>
                    <div ref={signsSelectMenuRef} className="absolute w-full top-[50px] flex flex-col bg-gray-300 rounded-sm overflow-auto transition-all duration-300 delay-200 z-10 shadow" style={{ height: expandedSignsSelect ? signsSelectMenuRef.current?.scrollHeight < 210 ? `${signsSelectMenuRef.current?.scrollHeight}px` : "210px" : "0px" }}>
                        {
                            signsList.map((item, index) => (
                                <button key={index} onClick={() => currentSignsHandler(item)} className={`relative py-1 px-3 rounded-none bg-white text-black transition-all duration-300 hover:bg-gray-200 ${currentSigns.includes(item) ? "bg-gray-500 text-white" : ""} border-b border-gray-100 last:border-none py-2`} type="button">
                                    {item}
                                    {
                                        currentSigns.includes(item) &&
                                        <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
                                            <CloseIcon />
                                        </div>
                                    }
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="flex gap-x-3 items-center justify-center">
                    {
                        currentSigns.map((item, index) => (
                            <div key={index} className="group cursor-pointer flex text-md py-2 px-3 items-center bg-[#CBEBE9] rounded-3xl gap-4 hover:bg-[#7AADFA]" onClick={() => { currentSignsHandler(item) }}>
                                {item}
                                <div className="invisible group-hover:visible">
                                    <CloseIcon />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AISearchSectionHomePage