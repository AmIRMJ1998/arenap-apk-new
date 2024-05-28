"use client"
import React from 'react'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import { ServicesDataType } from '@/data/servicesData'
import cn from '@/utils/clsxFun'
import { Swiper, SwiperSlide } from 'swiper/react';



const ServicesSectionHome = () => {

    return (
        <div className='flex justify-center items-center max-w-full'>
            <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                speed={1000}

                // freeMode={true}
                centerInsufficientSlides={true}
                lazyPreloadPrevNext={6}

                dir="rtl"
                className='swiper_freemode '
            >

                <SwiperSlide className='swiper_width_auto' >
                    <LinkElement link={"physicians"} className={cn(
                        ' h-full w-[16.25rem]  pt-4 px-4 overflow-hidden rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white group relative',
                        "after:absolute after:-top-full after:-right-0 after:w-full after:h-full after:bg-primary after:transition-all after:duration-500 after:-z-1",
                        "hover:after:right-0 hover:after:top-0 hover:shadow-shadow_comment"
                    )}>

                        <div className='z-[3] overflow-hidden rounded-[0.875rem] '>
                            <Image src={"/services_2.jpg"} width={500} height={500} alt='services_image' className={cn(
                                'w-[14.25rem] h-[9.1875rem]  group-hover:scale-[1.2] transition-all duration-500',
                            )} />
                        </div>

                        <h2 className={cn(
                            'py-4 font-bold text-black transition-all duration-500 delay-500 z-[1]',
                            "group-hover:text-white "
                        )}>نوبت دهی پزشکان</h2>

                    </LinkElement>

                </SwiperSlide>
                <SwiperSlide className='swiper_width_auto' >
                    <a href={"https://dr.arenap.ir/"} rel='nofollow noopener noreferrer external' target='_blank' className={cn(
                        ' h-full w-[16.25rem]  pt-4 px-4 overflow-hidden rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white group relative',
                        "after:absolute after:-top-full after:-right-0 after:w-full after:h-full after:bg-primary after:transition-all after:duration-500 after:-z-1",
                        "hover:after:right-0 hover:after:top-0 hover:shadow-shadow_comment"
                    )}>

                        <div className='z-[3] overflow-hidden rounded-[0.875rem] '>
                            <Image src={"/services_1.jpg"} width={500} height={500} alt='services_image' className={cn(
                                'w-[14.25rem] h-[9.1875rem]  group-hover:scale-[1.2] transition-all duration-500',
                            )} />
                        </div>

                        <h2 className={cn(
                            'py-4 font-bold text-black transition-all duration-500 delay-500 z-[1]',
                            "group-hover:text-white "
                        )}>پنل پزشکان</h2>

                    </a>

                </SwiperSlide>
                <SwiperSlide className='swiper_width_auto' >
                    <ServicesCard id={3} disabled={true} title="مشاوره آنلاین" link="physicians" image="/services_3.jpg" />
                </SwiperSlide>
                <SwiperSlide className='swiper_width_auto' >
                    <ServicesCard id={4} disabled={true} title="نوبت دهی کلینیک ها" link="physicians" image="/services_4.jpg" />
                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default ServicesSectionHome;



export const ServicesCard = (props: ServicesDataType) => {
    const { disabled, link, title, image } = props
    return (

        disabled ? (
            <div className={cn(
                ' h-full w-[16.25rem]  pt-4 px-4 rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white'
            )}>
                <div className='relative'>
                    <Image src={image} width={500} height={500} alt='services_image' className='w-[14.25rem] h-[9.1875rem] rounded-[0.875rem] grayscale' />

                </div>
                {/* <span className=' top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-primary-100 text-sm'>(بزودی ... )</span> */}
                <h2 className='py-4 font-bold text-gray-500'>{title} </h2>
            </div>
        ) : (
            <LinkElement link={link} className={cn(
                ' h-full w-[16.25rem]  pt-4 px-4 overflow-hidden rounded-md shadow-shadow_category flex justify-start items-center flex-col bg-white group relative',
                "after:absolute after:-top-full after:-right-0 after:w-full after:h-full after:bg-primary after:transition-all after:duration-500 after:-z-1",
                "hover:after:right-0 hover:after:top-0 hover:shadow-shadow_comment"
            )}>

                <div className='z-[3] overflow-hidden rounded-[0.875rem] '>
                    <Image src={image} width={500} height={500} alt='services_image' className={cn(
                        'w-[14.25rem] h-[9.1875rem]  group-hover:scale-[1.2] transition-all duration-500',
                    )} />
                </div>

                <h2 className={cn(
                    'py-4 font-bold text-black transition-all duration-500 delay-500 z-[1]',
                    "group-hover:text-white "
                )}>{title}</h2>

            </LinkElement>
        )

    )
}