"use client"
import React from 'react'
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import Image from 'next/image'
import Timer from '@modules/Timer'
import { useRouter } from 'next/navigation'
import LinkElement from '@elements/LinkElement'
import ButtonElement from '@elements/ButtonElement'


const NotFoundPage = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 10 second timer

    const router = useRouter()


    const expireHandler = () => {
        router.replace("/")
    }



    return (
        <>
            <TitlePagesMobile title={"اخطار"} />

            <div className="container ">
                <div className='min-h-[calc(100vh-4.375rem)] flex justify-center items-center flex-col gap-4   '  >
                    <div>
                        <Image src={"/notfound.png"} width={500} height={500} alt='notfound' className='max-w-[18.75rem]' />
                    </div>
                    <p className='text-lg font-bold text-center'>توجه</p>
                    <p className='text-md'>
                        صفحه ی مورد نظر یافت نشد
                    </p>
                    <div className='w-fit'>
                        <ButtonElement typeButton='primary'>
                            <LinkElement link='' className='flex justify-center items-center gap-2'>
                                رفتن به صفحه اصلی
                                <Timer expiryTimestamp={time} expireHandler={expireHandler} />
                            </LinkElement>
                        </ButtonElement>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage