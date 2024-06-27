"use client"
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@icons/SearchIcon"
import CloseIcon from "@icons/CloseIcon";
import cn from "@/utils/clsxFun";

import { useDebouncedCallback } from "use-debounce";
import ButtonElement from "../elements/ButtonElement";
import Modal from "./modals/Modal";
import Link from "next/link";
import SwiperContainerFreeMode from "./swiper/SwiperContianerFreeMode";

import ArrowLeft from "../icons/ArrowLeft";
import Loader from "../elements/Loader";
import SmallestPhysicianCard from "./cards/Physicain/SmallestPhysicianCard";
import { getPhysiciansAi, getSignsAi } from "@/services/ai/ai";

export type AIPhysicianType = {
    profiles: {
        id: string,
        firstName: string,
        lastName: string,
        physicianProfileUrl: string,
        hasImage: boolean
    }[],
    speciality: {
        name: string,
        enName: string
    },
}

const AISearchSectionHomePage = () => {
    const [physicianLoading, setPhysicianLoading] = useState(false)
    const [resultModal, setResultModal] = useState(false)
    const [searchSign, setSearchSign] = useState<string>("")
    const [signsList, setSignsList] = useState<string[]>([])
    const [serachSignsLoading, setSearchSignsLoading] = useState(false)

    const signsSelectMenuRef = useRef<HTMLDivElement>(null);

    const [expandedSignsSelect, setExpandedSignsSelect] = useState<boolean>(false);
    const [currentSigns, setCurrentSigns] = useState<string[]>([]);

    const [physiciansData, setPhysiciansData] = useState([])

    const currentSignsHandler = (sign: string) => {

        setCurrentSigns(prev => {
            let newState = [...prev];
            if (newState.includes(sign)) {
                newState = newState.filter(item => item !== sign);
            }
            else {
                if (currentSigns.length === 5) {
                    return [...prev]
                };
                newState.push(sign);
            }
            return newState;
        })
    }

    const currentSignInputFocusHandler = (status: boolean) => {
        setExpandedSignsSelect(status);
    }



    const debouncedTextSearch = useDebouncedCallback(async () => {
        if (searchSign.length >= 2) {
            setSearchSignsLoading(true)
            const signs = await getSignsAi(searchSign)
            if (signs.resultCode === 200) {
                setSignsList(signs.value)
                currentSignInputFocusHandler(true)
                setExpandedSignsSelect(true)
            }
            setSearchSignsLoading(false)
        }
    }, 800)




    useEffect(() => {

        debouncedTextSearch()

    }, [searchSign])


    const getPhsysiciansHandler = async () => {
        setPhysicianLoading(true)
        const physicians = await getPhysiciansAi(currentSigns)

        if (physicians.resultCode === 200) {
            setPhysiciansData(physicians.value)
            setResultModal(true)
        }
        setPhysicianLoading(false)
    }

    return (
        <div className="flex flex-col items-center w-full rounded-lg px-10 py-12 gap-y-2 bg-pattern min-h-[300px] max-w-[1088px] shadow-shadow_category  mx-auto">
            <p className="font-bold text-center">انتخاب هوشمند پزشک</p>
            <p className=" text-md text-center text-gray">با وارد کردن علائم (سردرد، گلو درد و ...) پزشکان پیشنهادی به شما نمایش داده میشود.</p>
            <div className="flex flex-col gap-y-4 w-full items-center">
                <div className="w-full relative max-w-[500px]  mt-6">
                    <input className="rounded-[2rem] bg-[#fafafa] border border-gray pr-4  py-4 pl-10  w-full outline-none" onBlur={() => currentSignInputFocusHandler(false)} onFocus={() => currentSignInputFocusHandler(true)} value={searchSign} onChange={(e) => {
                        setSearchSign(e.target.value)
                    }} type="text" placeholder="جستجوی علائم (سردرد، گلودرد، ...)" />
                    <button type="button" className="absolute left-[1rem] top-1/2 -translate-y-1/2 text-lg">
                        {
                            serachSignsLoading ?
                                <Loader color="border-primary" size="size-[2.25rem]" />
                                :
                                <SearchIcon color="stroke-primary" />
                        }
                    </button>

                    <div ref={signsSelectMenuRef} className={cn(
                        "absolute w-full top-[50px] flex flex-col bg-gray-300 rounded-sm overflow-auto transition-all duration-300 delay-200 z-10 shadow ",
                        {
                            "h-[12.5rem]": expandedSignsSelect && signsList.length,
                            "h-[0]": !expandedSignsSelect
                        }
                    )} >
                        {/* style={{ height: expandedSignsSelect ? signsSelectMenuRef.current?.scrollHeight ? signsSelectMenuRef.current?.scrollHeight < 210 ? `${signsSelectMenuRef.current?.scrollHeight}px` : "210px" : "0px" : "0px" }} */}
                        {
                            signsList?.map((item, index) => (
                                <button key={index} onClick={() => currentSignsHandler(item)} className={cn(`relative py-1 px-3 rounded-none transition-all duration-300 hover:bg-gray-200 ${currentSigns.includes(item) ? "bg-gray-400 text-white" : "bg-white text-black"} border-b border-gray-100 last:border-none py-2`)} type="button">
                                    {item}
                                    {
                                        currentSigns.includes(item) &&
                                        <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
                                            <CloseIcon color="stroke-white" />
                                        </div>
                                    }
                                </button>
                            ))
                        }
                    </div>

                </div>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                    {
                        currentSigns.map((item, index) => (
                            <div key={index} className="group cursor-pointer flex text-md py-2 px-3 items-center bg-[#CBEBE9] rounded-3xl gap-4 hover:bg-[#7AADFA]" onClick={() => { currentSignsHandler(item) }}>
                                {item}
                                <div className="invisible group-hover:visible">
                                    <CloseIcon color="stroke-white" />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center items-center">
                    {
                        currentSigns.length ? (

                            <ButtonElement handler={getPhsysiciansHandler} typeButton={currentSigns.length >= 3 ? "primary" : "gray-light"} disabled={currentSigns.length < 3} loading={physicianLoading} >
                                {
                                    currentSigns.length >= 3 ? "پیداکردن پزشک" : "حداقل سه تا از علائم را انتخاب کنید"
                                }
                            </ButtonElement>
                        ) : null
                    }
                </div>
            </div>
            <Modal show={resultModal} closeHandler={() => {
                setResultModal(false)
            }} customClassname="flex justify-center items-center px-2" >
                {/* <div className="w-full h-full  flex justify-center items-center py-4 px-2" > */}
                <div className="relative w-full md:w-8/12 min-h-[6.25rem] max-w-full max-h-screen overflow-y-auto p-2 md:p-8  bg-bg_content shadow-shadow_category rounded-lg ">
                    <button onClick={() => { setResultModal(false) }} type="button" className="absolute left-[1rem] top-[1rem] p-3 bg-primary rounded-full">
                        <CloseIcon color="stroke-white" />
                    </button>
                    <p className="text-center font-bold text-black mt-6 pb-4">نتیجه جست و جو برای علائم شما</p>
                    {
                        physiciansData.length === 0 ? (
                            <>
                                <p className="text-center text-error">پزشکی با توجه علائم داده شده شما پیدا نشد.</p>
                                <div className="flex justify-center items-center">
                                    <Link href={"/physicians"}>
                                        <ButtonElement typeButton="primary" customStyle="w-fit my-3">
                                            جست و جو پزشکان
                                        </ButtonElement>
                                    </Link>
                                </div>
                            </>
                        ) : null
                    }
                    {
                        physiciansData.length > 0 && physiciansData?.map((item: AIPhysicianType, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center py-3">
                                    <p className="font-bold line-clamp-1 text-md md:text-lg" >{physiciansData.length ? index + 1 : null}- <span>{item?.speciality?.name}</span></p>
                                    <Link href={`/physicians?specialty=${item.speciality.enName}`}>
                                        <ButtonElement typeButton="transparent" customStyle="min-w-fit">
                                            مشاهده بیشتر
                                            <ArrowLeft />
                                        </ButtonElement>
                                    </Link>
                                </div>
                                <SwiperContainerFreeMode center={false} gap={10} CardComponent={SmallestPhysicianCard} data={item.profiles} />
                            </div>
                        ))
                    }

                </div>
                {/* </div> */}
            </Modal>
        </div>
    )
}

export default AISearchSectionHomePage