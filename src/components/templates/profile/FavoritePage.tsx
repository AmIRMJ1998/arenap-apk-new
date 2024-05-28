"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'

//COMPONENTS
// import CardLoaderSkeleton from '@components/modules/loadings/CardLoaderSkeleton'
import Toastify from '@components/elements/toasts/Toastify'
import TitlePagesMobile from '@components/modules/titles/TitlePagesMobile'
import ButtonElement from '@components/elements/ButtonElement'
import PhysicianCardSecondary from '@modules/cards/Physicain/PhysicianCardSecondary';
import ArticleCardSecondary from '@/components/modules/cards/Articles/ArticleCardSecondary'

//REACT-TABS
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"


//SKELETON
import Skeleton from 'react-loading-skeleton'



// HOOKS
import useAllFavorite from '@/hooks/useAllFavorite'
import { PhysicainProfileSecondaryType } from '@/types/physicianProfile'
import LinkElement from '@/components/elements/LinkElement'
import PhysicianLoadingPrimaryCard from '@/components/modules/cards/Skeletons/PhysicianLoadingPrimaryCard'





const FavoritePage = () => {
    const [activeTab, setActiveTab] = useState(0)


    const [favoriteArticles, setFavoriteArticles] = useState([])
    const { myFavorite, isLoading } = useAllFavorite()




    return (
        <>
            <TitlePagesMobile title={"پزشکان و مقالات مورد علاقه"} />
            <div className="">
                <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)} selectedTabClassName="pb-2 border-b-[3px] border-[#00A29E] font-bold">
                    <TabList>
                        <div className="grid grid-cols-2 text-center gap-2 bg-white rounded-sm shadow-shadow_category py-3 px-5 mt-6 mb-2">
                            <Tab className="px-2 cursor-pointer">
                                <button type="button">
                                    پزشکان مورد علاقه
                                </button>
                            </Tab>
                            <Tab className="px-2 cursor-pointer">
                                <button type="button">
                                    مقالات مورد علاقه
                                </button>
                            </Tab>
                        </div>
                    </TabList>
                    <TabPanel>
                        <div className="flex flex-col gap-2">
                            {isLoading ?
                                <PhysicianCardSecondaryLoading />
                                :
                                myFavorite?.length > 0 ?
                                    <>
                                        <div className='grid grid-cols-1 min-[1200px]:grid-cols-2 gap-2'>
                                            {
                                                myFavorite?.map((item: PhysicainProfileSecondaryType, index: number) => (
                                                    <PhysicianCardSecondary freeMode={false} key={`${item.id}-${index}`}  {...item} />
                                                ))
                                            }
                                        </div>

                                    </>
                                    :
                                    <div className='h-[calc(100vh-13.75rem)] flex justify-center items-center flex-col gap-8'>
                                        <div>
                                            <Image src={"/noPeoples.png"} width={500} height={500} alt='noPeoples_image' className='w-full' />
                                        </div>
                                        <div className='flex justify-start items-center gap-4 flex-col'>
                                            <p className='text-md '>تا بحال پزشک مورد علاقه ای ثبت نشده</p>
                                            <div className='w-[13.75rem]'>
                                                <LinkElement link={`search`}>
                                                    <ButtonElement typeButton='primary' fontWeight='bold' >
                                                        جستجو بین پزشکان
                                                    </ButtonElement>
                                                </LinkElement>
                                            </div>
                                        </div>

                                    </div>
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="flex flex-col gap-2">
                            {favoriteArticles.length > 0 ?
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus odio voluptate corrupti numquam ducimus laboriosam libero eligendi atque magnam. Vitae, voluptate maxime. Voluptates, veritatis quaerat quos facilis at unde consequatur.</p>
                                :
                                <div className='h-[calc(100vh-13.75rem)] flex justify-center items-center flex-col gap-8'>
                                    <div>
                                        <Image src={"/noPeoples.png"} width={500} height={500} alt='noPeoples_image' className='w-full' />
                                    </div>
                                    <div className='flex justify-start items-center gap-4 flex-col'>
                                        <p className='text-md '>تا بحال مقاله مورد علاقه ای ثبت نشده</p>
                                        <LinkElement link={`blog`} className='w-[13.75rem]'>
                                            <ButtonElement typeButton='primary' fontWeight='bold'>
                                                جستجو بین مقالات
                                            </ButtonElement>
                                        </LinkElement>
                                    </div>

                                </div>
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}

export default FavoritePage


const PhysicianCardSecondaryLoading = () => {
    return (
        <div className="grid grid-col-1 md:grid-cols-2 gap-2 w-full">
            <PhysicianLoadingPrimaryCard freeMode={false} />
            <PhysicianLoadingPrimaryCard freeMode={false} />
        </div>
    )
}

const ArticleCardLoading = () => {
    return (
        <div className={`p-4 flex justify-between items-start flex-col w-full bg-white rounded-sm shadow-shadow_category`}>
            <div className="pl-5">
                <div className="flex items-center gap-5">
                    <div className='rounded-sm overflow-hidden w-1/3'>
                        <div className='w-[7.5rem] rounded-sm overflow-hidden'><Skeleton className='h-[7.5rem] ' /> </div>
                    </div>
                    <div className='w-2/3'>
                        <div className='text-lg font-bold py-2 w-1/2'><Skeleton className='h-[1.25rem]' /> </div>

                        <div className='text-md short-text-3 w-1/2'>
                            <Skeleton className='h-[2.5rem]' />
                        </div>
                        <div className='w-full flex justify-between items-center text-md text-gray-500 mt-2'>
                            <div className='w-[1.25rem]'><Skeleton className='h-[0.75rem]' /></div>
                            <div className='w-[1.25rem]'><Skeleton className='h-[0.75rem]' /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}