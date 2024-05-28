"use client"
import Loader from '@elements/Loader'
import cn from '@/utils/clsxFun'
import React from 'react'

const TitleHeading = ({ title, isLoading }: { title: string, isLoading?: boolean }) => {
    
    return (
        <div className='flex justify-center items-center'>
            <h1 className={cn(
                'text-center py-4 font-bold text-xl relative gradient_after_one px-2',
                "after:hidden min-[1000px]:after:block after:absolute after:left-full after:w-[15rem] after:h-0.5 after:top-1/2 after:bg-grid ",
                "before:hidden min-[1000px]:before:block before:absolute before:right-full before:w-[15rem] before:h-0.5 before:top-1/2 before:bg-grid "
            )}>
                {isLoading ? <Loader size='size-[1.5rem]' color='border-primary' /> : title}
            </h1>
        </div>
    )
}

export default TitleHeading