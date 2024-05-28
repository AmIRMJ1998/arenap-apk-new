import LinkElement from '@/components/elements/LinkElement'
import ArrowLeft from '@/components/icons/ArrowLeft'
import React from 'react'

const LinkProfilePageCard = ({link , title} : {link : string , title : string}) => {


    return (
        <LinkElement link={`${link}`} className='h-[5.9375rem] w-full px-5 flex justify-center items-center bg-white rounded-sm group ' prefetch={false} >
            <div className=' w-full  flex justify-between items-center font-bold'>
                <p className='group-hover:text-primary transition-all duration-200'>{title}</p>
                <span className="ltr:rotate-180">
                    <ArrowLeft />
                </span>
            </div>
        </LinkElement>
    )
}

export default LinkProfilePageCard