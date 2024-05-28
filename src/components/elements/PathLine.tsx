import React from 'react'

const PathLine = ({ color }: { color: string }) => {
    return (
        <svg height={3} className='w-full' >
            <line strokeDasharray={"13,5"} x1={0} y1={0} x2={"100%"} y2={3} strokeWidth={"5px"} className={`${color}`} rx={10} ></line>
        </svg>
    )
}

export default PathLine