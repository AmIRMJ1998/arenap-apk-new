import React from 'react'
import Image from 'next/image'
import LinkElement from '@/components/elements/LinkElement'
import { CategoryPrimaryType } from '@/types/cards'
import cn from '@/utils/clsxFun'

const CategoryPrimaryCard = ({ link, title, image }: CategoryPrimaryType) => {
    return (
        <LinkElement link={`${link}`} className={cn(` border rounded-md shadow-shadow_category flex justify-center items-center py-2 px-1  bg-white  text-center text-lg font-[400] group`,
            "hover:font-bold   relative hover:shadow-hover",
            "transition-all duration-500",
            {
                "flex-col size-[7.25rem]": image,
                "size-[5.625rem]": !image
            })}>
            {image && <Image src={image} width={500} height={500} alt='category_image' className='size-[4.6875rem] group-hover:scale-110 transition-all duration-500 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3' />}
            <span className=' w-full mt-auto'>
                {title}
            </span>
        </LinkElement>
    )
}

export default CategoryPrimaryCard