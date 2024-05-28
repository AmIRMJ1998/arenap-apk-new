import Loader from '@/components/elements/Loader'
import React from 'react'

const LoadingPage = () => {
    return (
        <div className='h-[calc(100vh-23.25rem)] min-[480px]:h-[calc(100vh-19.5rem)] lg:h-[calc(100vh-11.875rem)] flex justify-center items-center '>
            <Loader size='size-[4.5rem]' color='border-primary' />
        </div>
    )
}

export default LoadingPage