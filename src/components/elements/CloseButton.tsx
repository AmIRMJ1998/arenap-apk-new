import React from 'react'
import CloseIcon from '@icons/CloseIcon'
import cn from '@/utils/clsxFun'

const CloseButton = ({ closeHanlder, customStyle }: { closeHanlder: () => void, customStyle?: string }) => {

    return (
        <div className={
            cn(
                'w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center bg-primary cursor-pointer',
                customStyle
            )
        } onClick={closeHanlder}>
            <CloseIcon color={"stroke-white"} />
        </div>
    )
}

export default CloseButton