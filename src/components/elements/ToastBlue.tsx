"use client"
import toast, { ToastPosition } from 'react-hot-toast'
import CloseIcon from '@icons/CloseIcon'
import SuccessIcon from '../icons/SuccessIcon'


const ToastBlue = (title: string, subTitle: string, second = 3000, position: ToastPosition = "bottom-center") => {

    return (
        toast.custom((t) => (
            <div
                className={`animate-opacity max-w-[25rem] shadow-shadow_toast  w-full flex items-center h-[3.75rem] rounded-sm justify-between px-4 text-md    text-white pointer-events-auto  bg-link  z-[100] `}
            >
                <div className='flex justify-center items-center'>
                    {
                        <SuccessIcon />
                    }
                </div>
                <div className="flex-1 w-0 p-4 justify-center items-start flex-col gap-2 text-white" >
                    <p className='text-lg font-bold'>{title}</p>
                    <p className='text-md'>{subTitle}</p>

                </div>


                <div className='cursor-pointer' onClick={() => {
                    toast.dismiss(t.id)
                }}>
                    <span    >

                        <CloseIcon color={`stroke-white`} />
                    </span>
                </div>


            </div>
        ), { duration: second, position })
    )
}

export default ToastBlue