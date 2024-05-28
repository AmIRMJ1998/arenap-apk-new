import React from 'react'

const CloseIcon = ({ color = "stroke-white" }: { color: string }) => {
    return (
        <svg width="12" height="12" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 15.1387L14.5516 1.58704" className={`${color}`} strokeWidth="2" strokeLinecap="round" />
            <path d="M1.0752 1L14.846 14.7708" className={`${color}`} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export default CloseIcon