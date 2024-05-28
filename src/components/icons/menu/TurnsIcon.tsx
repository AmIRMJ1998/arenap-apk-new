import cn from '@/utils/clsxFun'
import React from 'react'

const TurnsIcon = ({ active, white }: { active: boolean, white?: boolean }) => {
    return (
        <>
            {
                active ? (
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4109 0.768617L13.4119 1.51824C16.1665 1.73413 17.9862 3.61119 17.9891 6.48975L18 14.9155C18.0039 18.054 16.0322 19.985 12.8718 19.99L5.15188 20C2.01119 20.004 0.0148166 18.027 0.0108673 14.8795L6.64975e-06 6.55272C-0.00394266 3.65517 1.75153 1.78311 4.50617 1.53024L4.50518 0.780611C4.5042 0.340832 4.83001 0.00999726 5.26444 0.00999726C5.69886 0.00899776 6.02468 0.338833 6.02567 0.778612L6.02666 1.47826L11.8914 1.47027L11.8904 0.770616C11.8894 0.330837 12.2152 0.00100177 12.6497 2.26549e-06C13.0742 -0.000997234 13.4099 0.328838 13.4109 0.768617ZM1.52148 6.86157L16.4696 6.84158V6.49175C16.4272 4.34283 15.349 3.21539 13.4138 3.04748L13.4148 3.81709C13.4148 4.24688 13.0801 4.5877 12.6556 4.5877C12.2212 4.5887 11.8943 4.24887 11.8943 3.81909L11.8934 3.0095L6.02863 3.01749L6.02962 3.82609C6.02962 4.25687 5.70479 4.5967 5.27036 4.5967C4.83594 4.5977 4.50913 4.25887 4.50913 3.82809L4.50815 3.05847C2.58286 3.25137 1.51753 4.38281 1.52049 6.55072L1.52148 6.86157ZM12.2399 11.4043V11.4153C12.2498 11.8751 12.625 12.2239 13.0801 12.2139C13.5244 12.2029 13.8789 11.8221 13.869 11.3623C13.8483 10.9225 13.4918 10.5637 13.0485 10.5647C12.5944 10.5747 12.2389 10.9445 12.2399 11.4043ZM13.0554 15.892C12.6013 15.882 12.235 15.5032 12.234 15.0435C12.2241 14.5837 12.5884 14.2029 13.0426 14.1919H13.0525C13.5165 14.1919 13.8927 14.5707 13.8927 15.0405C13.8937 15.5102 13.5185 15.891 13.0554 15.892ZM8.17212 11.4203C8.19187 11.8801 8.56804 12.2389 9.02221 12.2189C9.46651 12.1979 9.82096 11.8181 9.80121 11.3583C9.79035 10.9085 9.42504 10.5587 8.98074 10.5597C8.52657 10.5797 8.17113 10.9605 8.17212 11.4203ZM9.02616 15.8471C8.57199 15.8671 8.1968 15.5082 8.17607 15.0485C8.17607 14.5887 8.53052 14.2089 8.98469 14.1879C9.42899 14.1869 9.79529 14.5367 9.80516 14.9855C9.82589 15.4463 9.47046 15.8261 9.02616 15.8471ZM4.10433 11.4553C4.12408 11.915 4.50025 12.2749 4.95442 12.2539C5.39872 12.2339 5.75317 11.8531 5.73243 11.3933C5.72256 10.9435 5.35725 10.5937 4.91196 10.5947C4.45779 10.6147 4.10334 10.9955 4.10433 11.4553ZM4.95837 15.8521C4.5042 15.8731 4.12901 15.5132 4.10828 15.0535C4.10729 14.5937 4.46273 14.2129 4.9169 14.1929C5.3612 14.1919 5.7275 14.5417 5.73737 14.9915C5.7581 15.4513 5.40365 15.8321 4.95837 15.8521Z" className={cn(` `, {
                            "fill-primary": white,
                            "fill-white": !white
                        })} />
                    </svg>


                ) : (
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.09265 8.40427H18.9166" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.4421 12.3097H14.4514" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.0046 12.3097H10.0139" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.55793 12.3097H5.5672" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.4421 16.1962H14.4514" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.0046 16.1962H10.0139" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.55793 16.1962H5.5672" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.0438 1V4.29078" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.96552 1V4.29078" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2383 2.57919H5.77096C2.83427 2.57919 1 4.21513 1 7.22222V16.2719C1 19.3262 2.83427 21 5.77096 21H14.229C17.175 21 19 19.3546 19 16.3475V7.22222C19.0092 4.21513 17.1842 2.57919 14.2383 2.57919Z" className='stroke-black' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>)
            }
        </>

    )
}

export default TurnsIcon

