
import { getUrlImage } from "@services/getImageUrl/getImageUrl"
import Image from "next/image"
import Link from "next/link"

const AuthorCard = ({ link, physicianId, physicianName, hasImage }: {
    link: string, physicianId: string, physicianName: string, hasImage: boolean
}) => {
    return (
        <Link href={link} className="flex justify-start items-center gap-2 flex-col transition-all duration-300 group">
            <div className="rounded-full bg-white p-3 flex justify-center items-center shadow-shadow_category group-hover:p-0 group-hover:shadow-shadow_category size-[4.9375rem] transition-all duration-300 ">
                <Image src={hasImage ? getUrlImage(physicianId) : "/noImage.jfif"} width={300} height={300} className="size-full  rounded-full" alt="author_image" />
            </div>
            <p className="text-sm text-center max-w-full transition-all duration-300 group-hover:font-bold group-hover:text-primary">
                {`دکتر ${physicianName}`}
            </p>
        </Link>
    )
}

export default AuthorCard
