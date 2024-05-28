import cn from '@/utils/clsxFun'
import React from 'react'
type CheckboxType = {
    id?: string,
    name?: string,
    title: string,
    checked: boolean,
    bg?: string,
    checkHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string
}

const Checkbox = ({ name, title, checked, checkHandler, bg, className }: CheckboxType) => {


    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkHandler(event)
    }

    return (
        <label htmlFor={name} className={
            cn('flex justify-start items-center gap-2 cursor-pointer', className)
        } >
            {
                checked ? <span className={cn(
                    ' size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center', bg
                )}>
                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                    </svg>
                </span> : <span className=' size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                </span>
            }
            {title}
            <input type="checkbox" name={name} id={name} hidden checked={checked} onChange={changeHandler} />
        </label>
    )
}

export default Checkbox