import React from 'react'
import CloseIcon from '../icons/CloseIcon'


export type FilterTagProps = {
    id : number,
    title : string | undefined,
    handler : () => void
}


const FilterTag = (props : FilterTagProps) => {
    const {title , handler} = props
    return (
        <div onClick={handler} className="flex justify-between text-md cursor-pointer items-center gap-2  bg-white rounded-3xl shadow-shadow_category px-2 h-[35px] w-fit">
            <span>{title}</span>
            <span
                
                
            >
                <CloseIcon color={`stroke-primary`} />
            </span>
        </div>
    )
}

export default FilterTag