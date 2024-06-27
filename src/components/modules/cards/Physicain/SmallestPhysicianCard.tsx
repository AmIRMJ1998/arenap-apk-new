import { getUrlImage } from "@/services/getImageUrl/getImageUrl"
import { PhysicainCardPrimaryType } from "@/types/cards"
import cn from "@/utils/clsxFun"
import Image from "next/image"
import Link from "next/link"

const SmallestPhysicianCard = (props: PhysicainCardPrimaryType) => {
    const { firstName, hasImage, lastName, physicianProfileUrl, immediateConsultation, physicianSpecialities, id } = props
    return (
        <Link href={`/Physician?url=${physicianProfileUrl}`} className=' shadow-shadow_category rounded-sm bg-white p-1 flex items-center gap-1 text-center text-md'>

            <div className='flex relative'>
                <Image
                    src={hasImage ? getUrlImage(id) : "/noImage.jfif"}
                    width={500}
                    height={500}
                    alt="doctor_profile"
                    className="size-[3.75rem] rounded-full"
                />
                <span className="size-4 bg-white rounded-full absolute bottom-0 right-0  flex justify-center items-center ">
                    <span
                        className={cn(`size-3 rounded-full `,
                            {
                                "bg-primary-100": immediateConsultation,
                                "bg-gray-400": !immediateConsultation,
                            }
                        )
                        }
                    ></span>
                </span>
            </div>
            <p className='line-clamp-1 font-bold'> دکتر {firstName} {lastName}</p>
            <p className='line-clamp-2'>{physicianSpecialities?.[0]?.specialityTitle}</p>
        </Link>
    )
}

export default SmallestPhysicianCard