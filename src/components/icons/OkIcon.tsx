import React from 'react'


const OkIcon = ({ disabled }: { disabled: boolean }) => {
    return (
        <>
            {
                disabled ?
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#C4C7C6" />
                        <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>


                    :
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#6DBEB9" />
                        <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

            }
        </>
    )
}

export default OkIcon;