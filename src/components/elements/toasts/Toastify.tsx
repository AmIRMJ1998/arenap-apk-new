"use client"
import toast from 'react-hot-toast'
import CloseIcon from '@icons/CloseIcon'
import ForbiddenIcon from '@icons/ForbiddenIcon'
import SuccessIcon from '../../icons/SuccessIcon'

const Toastify = (type: string, text: string = "", duration = 3000) => {

    return (
        toast.custom((t) => (
            <div
                className={`animate-opacity max-w-[25rem] shadow-shadow_toast  w-full flex items-center min-h-[3.75rem]  rounded-sm justify-between px-4 text-md    text-white pointer-events-auto  z-[100] ${type === "error" ? "bg-error" : "bg-primary"}`}
            >
                <div className='flex justify-center items-center'>
                    {
                        type === "error" ? <ForbiddenIcon /> : <SuccessIcon />
                    }
                </div>
                <div className="flex-1 w-0 p-2">
                    {text}
                </div>


                <div className='cursor-pointer' onClick={() => {
                    toast.dismiss(t.id)
                }}>
                    <span    >

                        <CloseIcon color={`stroke-white`} />
                    </span>
                </div>


            </div>
        ), { duration })
    )
}

export default Toastify