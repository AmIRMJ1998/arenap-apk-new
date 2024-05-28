"use client"

import React from 'react'

// data
import commentsList from '@/data/commentData';
import articleData from '@/data/articleData';

// types
import { PhysicainCardPrimaryType } from '@/types/cards';
// components
import ArticleCardPrimary from '@modules/cards/Articles/ArticleCardPrimary';
import SwiperContainerFreeMode from '@modules/swiper/SwiperContianerFreeMode';
import PhysicainCardPrimary from '@modules/cards/Physicain/PhysicianCardPrimary';
import BottomNavigation from '@modules/menu/BottomNavigation';
import SectionTitle from '@modules/titles/SectionTitle';
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import SearchHomePage from '@modules/search/SearchHomePage';
import FaqPage from './FaqPage';
import BestSpeciality from '@modules/BestSpeciality';
import TitleHeading from '@modules/titles/TitleHeading';
import ServicesSectionHome from '@modules/ServicesSectionHome';
import AISearchSectionHomePage from '@modules/AISearchSectionHomePage';
import CommentSectionHomePage from '../modules/CommentSectionHomePage';
import Link from 'next/link';
import Image from 'next/image';
import { getUrlImage } from '@/services/getImageUrl/getImageUrl';
import cn from '@/utils/clsxFun';


interface HomePagePropType {
    physicians: PhysicainCardPrimaryType[],
    newestPhysicians: PhysicainCardPrimaryType[]
}


const HomePage = (props: HomePagePropType) => {
    const { physicians, newestPhysicians } = props

    // Static Data
    const articles = [...articleData]
    const comments = [...commentsList]

   
    return (
        <>
            <TitlePagesMobile title={"آرناپ، پلتفرم آنلاین سلامت"} />

            {/* ----------header------------- */}
            {/* Best Specialities  */}
            <header className='py-4'>
                <TitleHeading title="نوبت دهی اینترنتی پزشکان، مشاوره و ویزیت آنلاین" />
                <SearchHomePage physicians={physicians} />
            </header>
            {/* ----------header------------- */}

            {/* ----------section------------- */}
            {/* services  */}
            <section className='mt-6'>

                <ServicesSectionHome />
            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* AI Search */}
            <section className='mt-6'>
                <AISearchSectionHomePage />
            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* Best Specialities  */}
            <section className='mt-6'>
                <BestSpeciality />
            </section >
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* Best Physicians */}
            <section className='mt-6'>
                <SectionTitle
                    title={"پربازدیدترین پزشکان"}
                    textLink={"مشاهده بیشتر"}
                    link='physicians'
                    btn={true}
                />

                <SwiperContainerFreeMode gap={10} data={physicians} CardComponent={PhysicainCardPrimary} />

            </section >
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* Best Physicians */}
            <section className='mt-6'>
                <SectionTitle
                    title={"جدیدترین پزشکان"}
                    textLink={"مشاهده بیشتر"}
                    link='physicians'
                    btn={false}
                />
                <SwiperContainerFreeMode gap={10} data={newestPhysicians} CardComponent={SmallPhysicianCard} />

            </section >
            {/* ----------section------------- */}



            {/* ----------section------------- */}
            {/* Newest Articles  */}
            <section className="mt-6">
                <SectionTitle
                    title={"جدیدترین مقالات"}
                    textLink={"مشاهده بیشتر"}
                    link='blog'
                    btn={true}
                />

                <SwiperContainerFreeMode gap={10} data={articles} CardComponent={ArticleCardPrimary} />

            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* User Comments  */}
            <section className="mt-6">
                <SectionTitle
                    title={"نظرات کاربران"}
                    textLink={"مشاهده بیشتر"}
                    link='/search'
                    btn={false}
                />
                {/* <SwiperContainerFreeMode gap={10} data={comments} CardComponent={CommentCardPrimary} /> */}

                <CommentSectionHomePage />

            </section>
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* faq */}
            <section className='mt-6'>
                <SectionTitle
                    title={"سوالات متداول"}
                    textLink={"مشاهده بیشتر"}
                    link='faq'
                    btn={true}
                />
                <FaqPage />
            </section>
            {/* ----------section------------- */}



            <BottomNavigation route='home' />
        </>
    )
}

export default HomePage






const SmallPhysicianCard = (props: PhysicainCardPrimaryType) => {
    const { firstName, hasImage, lastName, physicianProfileUrl, immediateConsultation, physicianSpecialities, id } = props
    return (
        <Link href={`/Physician?url${physicianProfileUrl}`} className=' shadow-shadow_category  w-[10.625rem] h-[10.9375rem] rounded-lg bg-white p-4 flex justify-center items-center flex-col gap-2 text-center text-md'>

            <div className='relative'>
                <Image
                    src={hasImage ? getUrlImage(id) : "/noImage.jfif"}
                    width={500}
                    height={500}
                    alt="doctor_profile"
                    className="size-[3.75rem] rounded-full"
                />
                <span className="size-4 bg-white rounded-full absolute bottom-0 right-0  flex justify-center items-center ">
                    <span
                        className={cn(`size-3 rounded-full `,
                            {
                                "bg-primary-100": immediateConsultation,
                                "bg-gray-400": !immediateConsultation,
                            }
                        )
                        }
                    ></span>
                </span>
            </div>
            <p className='line-clamp-1 font-bold'> دکتر {firstName} {lastName}</p>
            <p className='line-clamp-2'>{physicianSpecialities?.[0]?.specialityTitle}</p>
        </Link>
    )
}

