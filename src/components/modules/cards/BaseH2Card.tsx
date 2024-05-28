
import cn from '@/utils/clsxFun'
import React, { ReactNode } from 'react'

export type BaseCardType = {
    title: string,
    children: ReactNode,
    radius?: string,
    bg?: string
}


const BaseH2Card = ({ title, children, radius = "rounded-sm", bg }: BaseCardType) => {
    return (
        <div className={cn(`bg-white p-5 shadow-shadow_category relative h-full w-full`, radius, bg)}>
            <h2 className='text-lg font-bold relative after:absolute after:rtl:-right-[1.25rem] after:ltr:-left-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full'>{title}</h2>
            <div className='mt-6'>
                {children}
            </div>
        </div>
    )
}

export default BaseH2Card