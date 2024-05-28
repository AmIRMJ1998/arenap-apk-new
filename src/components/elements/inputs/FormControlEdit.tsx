import cn from '@/utils/clsxFun'
import React, { ReactNode } from 'react'
export type FormControlEdit = {
    type: "number" | "text" | "tel",
    children?: ReactNode,
    className?: string
    form: any,
    field: any,
    placeholder?: string,
    title?: string,
    disabled?: boolean,
    value: string | number
}



const FormControlEdit = (props: FormControlEdit) => {
    const { field, title, type, placeholder, form, value, disabled } = props


    return (
        <div className="flex justify-start items-start flex-col gap-1 font-bold w-full">
            <label htmlFor={field.name} className="px-2">
                {title}
            </label>
            <input
                disabled={props.disabled}
                type={type}
                id={field.name}
                value={value}
                {...field}
                className={cn(` w-full rounded-[1.875rem] h-[3.125rem] px-4 text-md  `, {
                    "bg-gray-200": disabled,
                    "bg-white": !disabled,
                    "border border-error": form.errors?.[field.name] && form.touched?.[field.name],
                })}
                placeholder={placeholder}
            />
            {
                form.errors?.[field.name] && form.touched?.[field.name] && (
                    <span
                        className={cn(
                            `text-sm px-2 text-error  `,
                            {
                                "opacity-100": form.errors?.[field.name] && form.touched?.[field.name],
                                "opacity-0": !form.errors?.[field.name] && !form.touched?.[field.name],
                            }
                        )}
                    >
                        {form.errors?.[field.name]}
                    </span>
                )
            }
        </div>
    )
}

export default FormControlEdit