import React from 'react'
import OkIcon from '@icons/OkIcon'
import cn from '@/utils/clsxFun'

const TagPhysicain = ({ title, disabled }: { title: string, disabled: boolean }) => {
    return (
        <div className={cn('flex justify-start  items-center gap-1 text-md transition-all duration-500', {
            "group-hover:opacity-50": disabled,
            "group-hover:font-bold": !disabled
        })}>
            <OkIcon disabled={disabled} />
            {title}
        </div>
    )
}

export default TagPhysicain