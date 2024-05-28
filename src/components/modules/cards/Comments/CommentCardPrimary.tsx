import { CommentCardPrimaryType } from '@/types/cards'
import Image from 'next/image'
import React from 'react'

const CommentCardPrimary = (props: CommentCardPrimaryType) => {
    const { name, physician, comment } = props
    return (
        <div className={` p-6 h-full flex items-start w-full flex-col min-h-[15.625rem]  bg-white rounded-lg shadow-shadow_comment`}>
            <div className='flex items-center'>
                <div className="rtl:pl-4 ltr:pr-4 ">
                    <Image src={'/noImage.jfif'} width={500} height={500} alt='doctor_profile' className='size-[3.4375rem]  rounded-full shadow-shadow_category' />
                </div>
                <div className="h-[3.4375rem] flex justify-center items-start flex-col gap-1">
                    <p className="text-lg font-bold">
                        {name}
                    </p>
                    <p className="text-sm text-gray-800">
                        {`نظر ایشان برای ${physician}`}
                    </p>
                </div>
            </div>
            <div className="mt-3 ">
                <p>
                    {comment}
                </p>
            </div>
        </div>
    )
}

export default CommentCardPrimary