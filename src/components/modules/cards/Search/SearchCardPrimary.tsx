import LinkElement from '@/components/elements/LinkElement';
import PathLine from '@/components/elements/PathLine';
import TagPhysicain from '@/components/elements/TagPhysician';
import ArrowLeftL from '@/components/icons/ArrowLeftL';
import StarIcon from '@/components/icons/StarIcon';
import { getUrlImage } from '@/services/getImageUrl/getImageUrl';
import { PhysicianSearchType } from '@/types/search';
import cn from '@/utils/clsxFun';
import convertMonthOfYear from '@/utils/convertMonthOfYear';
import Image from 'next/image';
import React from 'react'

const SearchCardPrimary = (props : PhysicianSearchType) => {
    const {
        firstName,
        lastName,
        provinceName,
        online,
        freeMode,
        physicianProfileUrl,
        hasImage,
        id,
        physicianSpecialities,
        firstAppointment,
    } = props;


    return (
        <LinkElement
            link={`Physician?url=${physicianProfileUrl}`}
            className={cn(
                `bg-white rounded-sm shadow-shadow_category min-h-[14.375rem]  flex justify-between items-start flex-col group transition-all duration-500`,
                " hover:border-[#006A67] hover:shadow-hover",
                {
                    "w-[320px]": freeMode,
                    "w-full": !freeMode,
                }
            )}
        >
            <div className="p-4  w-full flex justify-between items-center">
                <div className="relative">
                    <Image
                        src={hasImage ? getUrlImage(id) : "/noImage.jfif"}
                        width={500}
                        height={500}
                        alt="doctor_profile"
                        className="w-[60px] h-[60px] rounded-full"
                    />
                    <span className="w-[16px] h-[16px] bg-white rounded-full absolute bottom-0 rtl:right-0 ltr:left-0 flex justify-center items-center ">
                        <span
                            className={cn(
                                `w-[12px] h-[12px]  rounded-full `,
                                {
                                    "bg-primary-100": online,
                                    "bg-gray-400": !online,
                                }
                            )}
                        ></span>
                    </span>
                </div>
                <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[60px]">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-bold ">
                            دکتر {firstName} {lastName} 
                        </p>
                        <div className="flex justify-between items-center ">
                            <p className="px-2 relative border-l border-black border-dashed ">
                                {provinceName}
                            </p>

                            <div className="flex px-2 justify-start items-center gap-1 ">
                                <span>
                                    <StarIcon />
                                </span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                    <p className="short-text-2 mt-5">
                        {physicianSpecialities[0]?.specialityTitle}
                    </p>
                </div>
            </div>
            <div className="px-4 w-full">
                <PathLine color={"stroke-bg_content"} />
            </div>
            <div className="px-4  w-full grid grid-cols-2 gap-1">
            <TagPhysicain disabled={!props.onlineAppointment} title={"نوبت دهی اینترنتی"} />
                <TagPhysicain
                    disabled={!props.voiceConsultation}
                    title={"مشاوره متنی"}
                />
                <TagPhysicain
                    disabled={!props.textConsultation}
                    title={"مشاوره تلفنی"}
                />
                
                <TagPhysicain
                    disabled={!props.immediateConsultation}
                    title={"مشاوره تلفنی فوری"}
                />
            </div>
            <div className="px-2 pb-2 w-full">
                <div className="bg-gray-700  p-1 rounded-ss flex justify-between items-center min-h-[46px]">
                    <p className="text-sm">
                        اولین نوبت خالی تلفنی:{" "}
                        <span className="font-bold">
                            {firstAppointment?.dayOfMonth}{" "}
                            {convertMonthOfYear(firstAppointment?.month)}{" "}
                        </span>{" "}
                    </p>

                    <div className="flex-1">
                        <button
                            type="button"
                            className="w-full flex justify-end items-center gap-1 text-primary font-bold"
                        >
                            دریافت نوبت
                            <ArrowLeftL />
                        </button>
                    </div>
                </div>
            </div>
        </LinkElement>
    );
}

export default SearchCardPrimary
