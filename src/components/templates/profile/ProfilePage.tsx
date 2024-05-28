"use client"
import React, { useEffect } from 'react'




import Image from 'next/image'



import Skeleton from 'react-loading-skeleton'
import LinkProfilePageCard from '@/components/modules/cards/Link/LinkProfilePageCard'
import LinkElement from '@/components/elements/LinkElement'
import TitlePagesMobile from '@/components/modules/titles/TitlePagesMobile'
import useUserInfo from '@/hooks/useUserInfo'
import ProfileCard from '@/components/modules/cards/Profile/ProfileCard'


const ProfilePage = () => {
    const { isLogin, user } = useUserInfo()


    return (
        <>
            <TitlePagesMobile title={"حساب کاربری"} />
            <div className="" >
                <section className='mt-12 md:hidden'>

                    {isLogin === "authorization" ? (<ProfileCard type={false} />) : (
                        <div className='relative w-full '>
                            <div className='bg-white  rounded-full w-20 h-20 flex justify-center items-center absolute left-[calc(50%-40px)] -top-10 '>
                                <Image src={"/user.png"} alt='user_picture' width={700} height={700} className=' h-[4.5625rem] rounded-lg w-[4.5625rem]' />
                            </div>
                            <div className='bg-white rounded-sm p-3.5'>
                                <div className='flex justify-between items-center'>
                                    <div className='w-[1.875rem]'>
                                        <Skeleton className='h-[1.875rem]' />
                                    </div>


                                    <div className='w-[1.875rem]'>
                                        <Skeleton className='h-[1.875rem]' />
                                    </div>
                                </div>
                                <div className='flex justify-center items-center py-1 font-bold '>
                                    <div className='w-1/2'>
                                        <Skeleton className='h-[1.5rem] w-full block' />
                                    </div>
                                </div>
                                <div className='flex justify-center items-center gap-2 mt-4'>
                                    <div className=' rounded-sm text-md w-[6.25rem]'>
                                        <div>
                                            <Skeleton className='h-[1.5rem]' />
                                        </div>
                                    </div>
                                    <div className=' rounded-sm text-md w-[6.25rem]'>
                                        <Skeleton className='h-[1.5rem]' />

                                    </div>
                                </div>
                                <div className='grid grid-cols-3 mt-6  ' >
                                    <div className='flex justify-center items-center'>
                                        <div className=' w-[3.125rem]'>
                                            <Skeleton className='h-[3.125rem] w-[3.125rem] block' />
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className=' w-[3.125rem]'>
                                            <Skeleton className='h-[3.125rem] w-[3.125rem] block' />
                                        </div>
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className=' w-[3.125rem]'>
                                            <Skeleton className='h-[3.125rem] w-[3.125rem] block' />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </section>
                <section className='mt-4 grid grid-cols-1 gap-4'>
                    {/* <LinkProfilePageCard link={"profile/family"} title={t("my-relatives")} /> */}
                    <LinkProfilePageCard link={"profile/favorites"} title={"پزشکان و مقالات مورد علاقه"} />
                    {/* <LinkProfilePageCard link={"profile/family"} title={t("ticket")} /> */}
                    <LinkProfilePageCard link={"arenap"} title={"آرناپ"} />
                </section>
                <section className='mt-4 flex justify-between items-start md:items-stretch ltr:flex-row-reverse bg-[#C0E1E7] py-3 rounded-sm overflow-hidden  '>
                    <div className='w-1/4'><Image src={'/banner.png'} width={500} height={500} alt='banner-image' className='w-full' /> </div>
                    <div className=' h-full px-2 w-3/4 md:self-center'>
                        <div className='flex justify-between items-center gap-4 flex-col '>
                            <p className='font-bold '>دستیار پزشک آرناپ</p>
                            <p className='text-lg max-w-[31.25rem] text-center'>کامل ترین نرم افزار مدیریت امور مطب و نسخه نویسی در کمترین زمان</p>
                        </div>
                        <div className='flex justify-center items-center mt-4'>
                            <LinkElement link={`Auth/Login`} className='flex justify-center items-center rounded-sm text-primary font-bold px-4 min-w-[9.375rem]  bg-white h-[2.8125rem]' >
                                ورود به پنل پزشکان
                            </LinkElement>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProfilePage


