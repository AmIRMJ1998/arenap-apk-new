//NEXT
import Image from "next/image";
import Link from "next/link";


//COMPONENTS
import PathLine from "@components/elements/PathLine";
import TagPhysicain from "@components/elements/TagPhysician";
import ArrowLeftL from "@components/icons/ArrowLeftL";
import StarIcon from "@components/icons/StarIcon";


//UTILES
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import cn from "@/utils/clsxFun";
import convertMonthOfYear from "@/utils/convertMonthOfYear";
import { PhysicainProfileSecondaryType } from "@/types/physicianProfile";
import LinkElement from "@/components/elements/LinkElement";


const PhysicianCardSecondary = (props: PhysicainProfileSecondaryType) => {
    const {
        firstName,
        lastName,
        provinceName,
        freeMode,
        physicianProfileUrl,
        voiceConsultation,
        textConsultation,
        onlineAppointment,
        immediateConsultation,
        hasImage,
        id,
        physicianSpecialities,
        firstAppointment,
    } = props;


    return (
        <LinkElement
            link={`Physician?url=${physicianProfileUrl}`}
            className={cn(
                `bg-white rounded-sm shadow-shadow_category min-h-[14.375rem]  flex justify-between items-start flex-col`,
                {
                    "w-[20rem]": freeMode,
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
                        className="w-[3.75rem] h-[3.75rem] rounded-full"
                    />
                    <span className="size-[1rem] bg-white rounded-full absolute bottom-0 rtl:right-0 ltr:left-0 flex justify-center items-center ">
                        <span
                            className={cn(
                                `size-[0.75rem] rounded-full `,
                                {
                                    "bg-primary-100": immediateConsultation,
                                    "bg-gray-400": !immediateConsultation,
                                }
                            )}
                        ></span>
                    </span>
                </div>
                <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[3.75rem]">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-bold ">
                            {firstName} {lastName}
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
                <TagPhysicain
                    disabled={voiceConsultation}
                    title={"مشاوره متنی"}
                />
                <TagPhysicain
                    disabled={textConsultation}
                    title={"مشاوره تلفنی"}
                />
                <TagPhysicain disabled={onlineAppointment} title={"نوبت دهی ویزیت"} />
                <TagPhysicain
                    disabled={immediateConsultation}
                    title={"مشاوره تلفنی فوری"}
                />
            </div>
            <div className="px-2 pb-2 w-full">
                <div className="bg-gray-700 p-1 rounded-ss flex justify-between items-center min-h-[2.875rem]">
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
};

export default PhysicianCardSecondary;
