import React from 'react'

const SearchIcon = ({color = "stroke-white"} : {color?: "stroke-white" | "stroke-primary"}) => {
    return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11.7666" cy="12.0794" r="8.98856" className={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.0183 18.7979L21.5423 22.3127" className={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default SearchIcon