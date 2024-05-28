
import cn from '@/utils/clsxFun'
import React, { ReactNode } from 'react'

export type FormControlType = {
    type: "number" | "text" | "tel",
    children?: ReactNode,
    className?: string
    form: any,
    field: any,
    placeholder?: string,
    title?: string,
    
}



const FormControl = (props: FormControlType) => {
    const { field, title = "", type, placeholder, form } = props
    

    return (
        <div className='flex justify-between items-start flex-col relative'>
            {title && <label className='my-2 text-sm font-bold text-black px-2' htmlFor={field.name}>{title}</label>}
            <div className={cn(`px-2 py-2 border   rounded-[1.875rem] w-full text-sm`, {
                "border-error": form.errors?.[field.name] && form.touched?.[field.name],
                "border-gray": !form.errors?.[field.name] && !form.touched?.[field.name]
            })}>
                <input type={type} placeholder={placeholder} {...field} className='placeholder:text-gray w-full text-right' />
            </div>
            {form.errors?.[field.name] && form.touched?.[field.name] && <span className='text-sm block text-left w-full text-error absolute top-full left-0'>{form.errors?.[field.name]}</span>}
        </div >
    )
}

export default FormControl