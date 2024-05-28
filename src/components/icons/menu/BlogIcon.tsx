import React from 'react'

const BlogIcon = ({ active }: { active: boolean }) => {
    return (
        <>
            {
                active ? (
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.81 0H13.191C16.28 0 18 1.78 18 4.83V15.16C18 18.26 16.28 20 13.191 20H4.81C1.77 20 0 18.26 0 15.16V4.83C0 1.78 1.77 0 4.81 0ZM5.08 4.66V4.65H8.069C8.5 4.65 8.85 5 8.85 5.429C8.85 5.87 8.5 6.22 8.069 6.22H5.08C4.649 6.22 4.3 5.87 4.3 5.44C4.3 5.01 4.649 4.66 5.08 4.66ZM5.08 10.74H12.92C13.35 10.74 13.7 10.39 13.7 9.96C13.7 9.53 13.35 9.179 12.92 9.179H5.08C4.649 9.179 4.3 9.53 4.3 9.96C4.3 10.39 4.649 10.74 5.08 10.74ZM5.08 15.31H12.92C13.319 15.27 13.62 14.929 13.62 14.53C13.62 14.12 13.319 13.78 12.92 13.74H5.08C4.78 13.71 4.49 13.85 4.33 14.11C4.17 14.36 4.17 14.69 4.33 14.95C4.49 15.2 4.78 15.35 5.08 15.31Z" className='fill-primary' />
                    </svg>
                ) : (
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7162 14.2234H5.49622" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.7162 10.0369H5.49622" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.25134 5.86008H5.49634" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.9086 0.749786C12.9086 0.749786 5.23161 0.753786 5.21961 0.753786C2.45961 0.770786 0.75061 2.58679 0.75061 5.35679V14.5528C0.75061 17.3368 2.47261 19.1598 5.25661 19.1598C5.25661 19.1598 12.9326 19.1568 12.9456 19.1568C15.7056 19.1398 17.4156 17.3228 17.4156 14.5528V5.35679C17.4156 2.57279 15.6926 0.749786 12.9086 0.749786Z" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            }
        </>

    )
}

export default BlogIcon