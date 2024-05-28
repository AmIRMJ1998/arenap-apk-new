"use client"


import ChnageCityButton from '@/components/elements/ChangeCityButton'
import CloseButton from '@/components/elements/CloseButton'
import cn from '@/utils/clsxFun'
import React, { useEffect, useRef, useState } from 'react'
import SwiperContainerFreeMode from '../swiper/SwiperContianerFreeMode'
import { RelatedPhysicianType } from '@/types/physicianProfile'
import SearchSmallCard from '../cards/Search/SearchSmallCard'

import { useDebouncedCallback } from "use-debounce";
import axios from 'axios'
import { apiDomainNobat } from '@/services/getApiUrl'
import urls from '@/services/urls'
import Toastify from '@/components/elements/toasts/Toastify'
import SpecialityTagSearch from './SpecialityTagSearch'
import { PhysicianProfileType, PhysicianSpecialityType } from '@/types/search'
import Skeleton from 'react-loading-skeleton'
import { useCookies } from 'react-cookie';



const SearchHomePage = ({ physicians }: { physicians: RelatedPhysicianType[] }) => {
    const input = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [showSearchContent, setShowSearchContent] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const [isSearched, setIsSearched] = useState(false);
    const [cookies] = useCookies(["cityInfo"])



    const [searchData, setSearchData] = useState<{
        physicianProfiles: RelatedPhysicianType[] | PhysicianProfileType[],
        specialties: PhysicianSpecialityType[],
        diseases: any[],
        signs: any[],
        services: any[],
        clinics: any[],
    }>({
        physicianProfiles: [],
        specialties: [],
        diseases: [],
        signs: [],
        services: [],
        clinics: [],
    })
    const focusHandler = () => {
        setShowSearchContent(true)
        input?.current?.focus()
    }



    const debouncedTextSearch = useDebouncedCallback((signal: any) => {
        if (searchText.trim().length === 0 && isSearched) {
            setSearchData({
                physicianProfiles: [],
                specialties: [],
                diseases: [],
                signs: [],
                services: [],
                clinics: [],
            })
            setIsSearched(false)
        }
        if (showSearchContent && searchText.trim().length > 0) {
            const obj = {
                filter: searchText,
                cityId: cookies?.cityInfo?.cityId ? cookies.cityInfo.cityId : 0,
                provinceId: cookies?.cityInfo?.provinceId ? cookies.cityInfo.provinceId : 0,

            }
            setSearchLoading(true)
            axios.post(`${apiDomainNobat}${urls.search.searchPrimary.url}`, obj, { signal }).then(res => {
                setSearchData(res.data.value)
                setIsSearched(true)
                setSearchLoading(false)
                contentRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
            }).catch(error => {
                if (error.name === "CanceledError") {
                    return;
                }
                Toastify("error", "خطایی رخ داده است");
                setSearchLoading(false)
            })
        }
    }, 750)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }


    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        debouncedTextSearch(signal);

        return () => {
            controller.abort();
        }
    }, [searchText, showSearchContent, cookies?.cityInfo])

    return (
        <>
            <div className={cn(
                'h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative ', {
                // "overflow-hidden": !showSearchContent
            }
            )}>
                <input className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full  md:z-[15]' onChange={changeHandler} value={searchText} placeholder='نام پزشک، تخصص ...' onFocus={focusHandler} />
                <div>
                    <ChnageCityButton />
                </div>


                <span className={cn(
                    "fixed w-0 h-0  block top-0 left-0 z-[15] ",
                    {
                        "w-full h-screen": showSearchContent
                    }
                )} onClick={() => {
                    setShowSearchContent(false)
                }}></span>

                {/* ----------Search Content------------- */}

                {/* Content */}
                <div className={cn(
                    "transition-all duration-500",
                    "fixed top-full left-full w-full h-screen z-[15]",//mobile
                    "md:absolute md:-top-[3rem] md:opacity-0 md:left-0 md:w-full md:h-0  md:pt-4 ",//descktop
                    {
                        "top-0 left-0": showSearchContent,//mobile
                        "md:h-[40vh] md:top-full md:left-0 md:opacity-100 ": showSearchContent//descktop
                    }
                )}>
                    <div className={cn(
                        "w-full h-full overflow-hidden p-4",
                        " bg-bg_content shadow-shadow_category",//mobile
                        " md:rounded-sm md:bg-white md:shadow-shadow_category ",//descktop
                        {
                            "overflow-y-scroll": showSearchContent
                        }
                    )}
                        ref={contentRef}

                    >
                        {/* close button */}
                        <div className='p-4 flex justify-end items-center md:hidden'>
                            <CloseButton closeHanlder={() => setShowSearchContent(false)} />
                        </div>

                        {/* input search */}
                        <div className=' gap-5 h-[3.3125rem] md:hidden bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative'>
                            <input ref={input} className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full ' onChange={changeHandler} value={searchText} placeholder='نام پزشک، تخصص ...' />
                            <div>
                                <ChnageCityButton />
                            </div>
                        </div>
                        {/* Loading */}
                        {
                            searchLoading ? (
                                <div>
                                    <div>
                                        <TitleSection title="تخصص ها" />
                                        <div className='flex justify-start items-center gap-2'>
                                            <TagSkeleton />
                                            <TagSkeleton />
                                            <TagSkeleton />
                                        </div>
                                    </div>
                                    <div>
                                        <TitleSection title="پزشک" />
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                            <SearchSkeleton />
                                            <SearchSkeleton />
                                            <SearchSkeleton />
                                            <SearchSkeleton />
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        {/* specialities */}
                        {
                            !searchLoading && searchData.specialties.length > 0 ?
                                (
                                    <div>
                                        <TitleSection title="تخصص ها" />
                                        <SwiperContainerFreeMode data={searchData.specialties} CardComponent={SpecialityTagSearch} gap={10} />
                                    </div>
                                ) : null
                        }


                        {/* physicians */}
                        {
                            !searchLoading && searchData.physicianProfiles.length > 0 ?
                                (

                                    <div>
                                        <TitleSection title="پزشک" />
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                            {searchData.physicianProfiles.map((item, index) => <SearchSmallCard key={item.id} {...item} bg='md:bg-gray-100 bg-white' />)}
                                        </div>
                                    </div>
                                ) : null
                        }


                        {/* For when no data was found */}
                        {
                            !searchLoading && searchData.physicianProfiles.length === 0 &&
                                searchData.specialties.length === 0 &&
                                searchData.diseases.length === 0 &&
                                searchData.signs.length === 0 &&
                                searchData.services.length === 0 &&
                                searchData.clinics.length === 0 ? (
                                <>
                                    {
                                        isSearched ? (
                                            <>
                                                <p className='font-bold text-center h-[10rem] flex justify-center items-center'>
                                                    نتیجه مورد نظر یافت نشد!
                                                </p>
                                                <p className='font-bold text-right'>
                                                    پیشنهاد شده برای شما
                                                </p>
                                            </>
                                        ) : null
                                    }
                                    <div>
                                        <TitleSection title="پزشک" />
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                            {physicians?.slice(0, 6).map((item, index) => <SearchSmallCard key={item.id} {...item} bg='md:bg-gray-100 bg-white' />)}
                                        </div>
                                    </div>
                                </>
                            ) : null
                        }


                    </div>

                </div>
                {/* ----------Search Content------------- */}
            </div>
            <div className="py-2 font-bold md:text-right text-center text-gray-500 text-sm max-w-[50rem] mx-auto px-5">
                <p>برای دریافت نوبت اینترنتی یا مشاوره متنی، تلفنی و تلفنی فوری می توانید از بین پزشکان آرناپ جستجو کنید.</p>
            </div>
        </>
    )
}

export default SearchHomePage



const TitleSection = ({ title }: { title: string }) => {
    return (
        <p className='flex justify-start items-start  text-gray-300 font-bold text-md py-4'>{title}</p>
    )
}


const TagSkeleton = () => {
    return (
        <div className='border border-gray-100 bg-white  px-4 h-[2.8125rem] flex justify-center items-center rounded-3xl'>
            <div className='w-[7.5rem]'><Skeleton className='h-full' /> </div>
        </div>
    )
}

const SearchSkeleton = () => {
    return (
        <div className='flex justify-start items-center bg-white md:border md:border-gray-300 w-full py-2 px-4 rounded-sm'>
            <div className=' w-[3.4375rem]'>
                <Skeleton circle={true} className='size-[3.4375rem] rounded-full' />
            </div>
            <div className='flex-1 text-sm px-2 justify-between flex-col gap-2 flex '>
                <p className='font-bold'><Skeleton className='h-[1.25rem]' /></p>
                <p className='w-1/2'><Skeleton className='h-[1.25rem]' /></p>
            </div>
        </div>
    )
}