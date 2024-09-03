"use client"
import React, { useEffect, useState } from 'react'
import SearchSectionPrimary from '@modules/search/SearchSectionPrimary'
import LinkElement from '@elements/LinkElement'
import ChnageCityButton from '@elements/ChangeCityButton'
import FilterIcon from '@icons/FilterIcon'
import ViewOrderIcon from '@icons/ViewOrderIcon'
import CloseIcon from '@icons/CloseIcon'
import { useDebouncedCallback } from 'use-debounce'
import { useCookies } from 'react-cookie'
import { usePathname, useRouter } from 'next/navigation'
import FilterTag from '../elements/FilterTag'
import InfiniteScroll from "react-infinite-scroll-component";
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import { SpecialityType } from '@/types/global'
import useCity from '@/hooks/useCity'
import convertGender from '@/utils/convertGender'
import planNameConvert from '@/utils/planNameConvert'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { DiseaseType, PhysicianDataSearch, ServiceType, SignType } from '@/types/search'
import { specialtyBelongings } from '@/services/specialtyBelongings/specialtyBelongings'
import SearchCardPrimary from '../modules/cards/Search/SearchCardPrimary'
import PhysicianLoadingPrimaryCard from '../modules/cards/Skeletons/PhysicianLoadingPrimaryCard'
import { SlugsType } from '@/app/physicians/page'
import generateUrlSearchPage from '@/utils/generateUrlSearchPage'

import ReactPaginate from 'react-paginate';
import ArrowLeft from '../icons/ArrowLeft'
import DropDownBasical from '../modules/DropDownBasical'
import Script from 'next/script';

export type PhysiciansPageProps = {
    searchKey?: string | undefined,
    specialities: SpecialityType[],
    services: ServiceType[],
    searchData: PhysicianDataSearch[],
    hasMore: boolean,
    slugs: SlugsType,
    fetchMoreData: (number: number) => void,
    loadingData: boolean,
    fetchMoreLoading: boolean,
    infoPage: {
        specialtyName: string,
        diseaseName: string,
        signName: string,
        serviceName: string,
        cityName: string
    }
    pageCount: number
}


const PhysiciansPage = (props: PhysiciansPageProps) => {
    const { specialities, slugs, services, searchData, hasMore, fetchMoreData, loadingData, fetchMoreLoading, infoPage, pageCount } = props


    const pathName = usePathname()
    const [diseasesLoading, setDiseasesLoading] = useState(false)
    const [searchText, setSearchText] = useState(slugs?.search_key ? slugs?.search_key : "")
    const router = useRouter()
    const [diseases, setDiseases] = useState<DiseaseType[]>([])
    const [signs, setSigns] = useState<SignType[]>([])
    const [doNotshowDisabledPhysician, setDoNotShowDisabledPhysician] = useState(false)

    const getDiseaseHandler = async (enName: string) => {
        setDiseasesLoading(true)
        const data = await specialtyBelongings(enName)
        const diseases = data?.diseases
        const signs = data?.signs
        setDiseases(diseases)
        setSigns(signs)
        setDiseasesLoading(false)
    }

    useEffect(() => {
        if (slugs?.specialty) {
            getDiseaseHandler(slugs?.specialty)
        }
    }, [])






    const [cookies] = useCookies(["cityInfo"])
    const [showFilters, setShowFilters] = useState(false)
    const [infoSearch, setInfoSearch] = useState({
        city: slugs?.city ? slugs.city : ""
    })



    const debouncedTextSearch = useDebouncedCallback(() => {

        const url = generateUrlSearchPage({
            consultingPlan: slugs?.consultingPlan ? slugs.consultingPlan : "",
            specialty: slugs?.specialty ? slugs.specialty : "",
            city: slugs?.city ? slugs.city : cookies.cityInfo ? cookies.cityInfo.slug : "",
            disease: slugs?.disease ? slugs.disease : "",
            gender: slugs?.gender ? slugs.gender : "",
            page: slugs?.page ? slugs.page : "",
            search_key: searchText,
            service: slugs?.service ? slugs.service : "",
            sign: slugs?.sign ? slugs.sign : "",
        })
        router.push(`/physicians${url}`)
    }, 750)
    useEffect(() => {

        debouncedTextSearch()
    }, [searchText, cookies?.cityInfo])

    const { provinces, setAllProvince } = useCity()



    return (
        <>
            <TitlePagesMobile title={`جستجو پزشکان آرناپ`} />

            {/* ----------section------------- */}
            {/* serach component */}
            <section className='py-4'>
                <div className='h-[3.3125rem] bg-white max-w-[50rem] mx-auto rounded-[10rem] p-2 flex justify-between items-center relative '>
                    <input value={searchText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (searchText.length >= 30) {
                            setSearchText(prev => {
                                const textSpliter = prev.split("")
                                const sliceTextSpliter = textSpliter.slice(0, 29)
                                const resultText = sliceTextSpliter.join("")
                                return resultText
                            })
                            return
                        }
                        setSearchText(event.target.value)
                    }} className='md:hiddn text-md placeholder:text-gray-300 flex-1 text-right h-full  md:z-[15]' placeholder='نام پزشک، تخصص ...' />
                    <ChnageCityButton />
                </div>
            </section>
            {/* ----------section------------- */}


            {/* ----------header------------- */}
            {/* header */}
            <header className='w-full rounded-sm shadow-shadow_category bg-white py-2 px-4'>
                {pathName !== "/physicians" ? <h1 className='text-md text-center' >
                    <span className=''>دکترهای </span>
                    {slugs?.specialty && infoPage.specialtyName ? (<LinkElement className='text-primary underline underline-offset-4 ' link={`physicians?specialty=${slugs.specialty}`}>{infoPage.specialtyName} </LinkElement>) : null}
                    {slugs?.city && infoPage.cityName ? (<>
                        در شهر <LinkElement className='text-primary underline underline-offset-4 ' link={`physicians/city?name=${slugs.city}`}>
                            {infoPage.cityName}
                        </LinkElement></>) : (<span> در آرناپ</span>)}
                </h1> : null}
                {pathName === "/physicians" ? <h1 className='text-md text-center' >نوبت دهی از بهترین دکتر های آرناپ</h1> : null}
            </header>
            {/* ----------header------------- */}

            {/* ----------section------------- */}
            {/* tags in mobile */}
            {pathName !== "/physicians" || Object.keys(slugs).length ? (
                <section className='md:hidden pt-4 '>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView="auto"
                        speed={1000}
                        modules={[FreeMode, Autoplay]}
                        freeMode={true}

                        dir="rtl"
                    >

                        {slugs?.city ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={infoPage.cityName} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                    setAllProvince()

                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.specialty ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={infoPage.specialtyName} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.service ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={infoPage.serviceName} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.disease ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={infoPage.diseaseName} handler={() => {
                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.sign ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={infoPage.signName} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.gender ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={convertGender(slugs.gender)} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.consultingPlan ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={planNameConvert(slugs.consultingPlan)} handler={() => {

                                    const url = generateUrlSearchPage({
                                        consultingPlan: "All",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: slugs?.search_key ? slugs.search_key : "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                }} />
                            </SwiperSlide> : null
                        }
                        {slugs?.search_key ?
                            <SwiperSlide className='swiper_width_auto' >
                                <FilterTag id={1} title={slugs.search_key} handler={() => {
                                    setSearchText("")
                                    const url = generateUrlSearchPage({
                                        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                        specialty: slugs?.specialty ? slugs?.specialty : "",
                                        city: slugs?.city ? slugs?.city : "",
                                        disease: slugs?.disease ? slugs?.disease : "",
                                        gender: slugs?.gender ? slugs?.gender : "",
                                        page: slugs?.page ? slugs?.page : "",
                                        search_key: "",
                                        service: slugs?.service ? slugs?.service : "",
                                        sign: slugs?.sign ? slugs?.sign : "",
                                    })
                                    router.push(`/physicians${url}`)
                                    setSearchText("")
                                }} />
                            </SwiperSlide> : null
                        }
                    </Swiper>
                </section>
            ) : null}
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* filter button mobile */}
            <section className='md:hidden flex justify-between items-center gap-4 mt-6'>

                <button
                    type="button"
                    onClick={() => setShowFilters(true)}
                    className="bg-white w-[8.75rem] h-[3.4375rem] rounded-sm shadow-shadow_category flex justify-center items-center gap-2"
                >
                    <FilterIcon />
                    <span className="text-lg font-bold ">فیلترها</span>
                </button>
                <button
                    type="button"

                    className="flex justify-center items-center gap-2"
                >
                    <ViewOrderIcon />
                    <span className="text-lg font-bold ">نمایش براساس</span>
                </button>

            </section>
            {/* ----------section------------- */}

            {/* ----------main------------- */}
            <main className='flex justify-between items-start gap-4 flex-col mt-4 relative'>

                {/* ----------section------------- */}
                {/* search section */}


                <SearchSectionPrimary
                    showDisabledPhysicianHandler={() => {
                        setDoNotShowDisabledPhysician(!doNotshowDisabledPhysician)
                    }}
                    showDisabledPhysician={doNotshowDisabledPhysician}
                    loading={diseasesLoading} getDisease={getDiseaseHandler} services={services} diseases={diseases} signs={signs} searchText={searchText} showFilters={showFilters} closeFilterHandler={() => setShowFilters(false)} specialities={specialities} slugs={slugs} infoPage={infoPage} />

                {/* ----------section------------- */}

                {/* ----------section------------- */}
                {/* Search content */}
                <section className='w-full'>
                    <DropDownBasical customStyle='text-md mb-4'>
                        <p>
                            نوبت‌دهی حضوری: ملاقات مستقیم با پزشکان متخصص
                        </p>
                        <p>
                            با استفاده از پلتفرم آرناپ، می‌توانید به راحتی و در کوتاه‌ترین زمان ممکن نوبت حضوری خود را از پزشکان متخصص رزرو کنید. این ویژگی به شما امکان می‌دهد تا در زمان مشخص و بدون انتظار طولانی، به صورت مستقیم با پزشک ملاقات داشته باشید و از خدمات درمانی به طور کامل بهره‌مند شوید.
                        </p>
                        <p>
                            ویژگی‌های برجسته نوبت‌دهی حضوری در پلتفرم آرناپ:
                        </p>
                        <p>
                            1-تعیین وقت دقیق: با آرناپ، شما می‌توانید زمان مناسب برای ملاقات حضوری با پزشک خود را به دقت انتخاب کنید و برنامه‌ریزی درمانی خود را با هماهنگی دقیق انجام دهید.
                        </p>
                        <p>

                            2-انتخاب پزشکان برتر: در آرناپ، دسترسی به لیست گسترده‌ای از پزشکان متخصص فراهم است. شما می‌توانید بر اساس تخصص، موقعیت جغرافیایی، و نظرات بیماران دیگر، پزشک مورد نظر خود را انتخاب کنید.
                        </p>
                        <p>
                            3-راهنمایی مسیر: پس از رزرو نوبت حضوری، می‌توانید از امکانات نقشه برای مسیریابی دقیق به مطب پزشک استفاده کنید و بدون نگرانی از ترافیک یا گم شدن، به موقع به مطب برسید.
                        </p>
                        <p>

                            4-                                ملاقات حضوری و تشخیص دقیق: ارتباط مستقیم با پزشک در یک ملاقات حضوری به شما این امکان را می‌دهد که با معاینه‌های دقیق‌تر و ارتباط چهره‌به‌چهره، بهترین تصمیمات درمانی را بگیرید.
                        </p>
                        <p>
                            5-پیگیری درمان: با استفاده از آرناپ، شما می‌توانید نوبت‌های بعدی خود را به راحتی پیگیری کرده و در صورت نیاز، جلسات بعدی را با پزشک خود تنظیم کنید.
                        </p>
                        <p>
                            پلتفرم آرناپ با هدف تسهیل در دسترسی به خدمات درمانی حضوری طراحی شده است. با نوبت‌دهی حضوری از طریق آرناپ، شما می‌توانید با اطمینان کامل، در زمانی مناسب به پزشک خود مراجعه کرده و از خدمات درمانی حرفه‌ای و با کیفیت بهره‌مند شوید. این راهکار سریع و آسان به شما کمک می‌کند تا روند درمان خود را با آرامش و اطمینان پیش ببرید.
                        </p>
                    </DropDownBasical>
                    {pathName !== "/physicians" || Object.keys(slugs).length ? (
                        <div className='hidden md:flex shadow-shadow_category justify-start items-center  gap-2 w-full text-md p-2 bg-white rounded-sm min-h-[2.8125rem]'>
                            <p className='font-bold text-primary min-w-fit'>نتایج فیلتر : </p>
                            <div className='flex justify-start items-center gap-2 flex-wrap'>
                                {
                                    slugs?.city ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {
                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                                setAllProvince()
                                            }}>
                                            <span className='text-gray-500'>{provinces.find((item: {
                                                cityId: number,
                                                cityName: string,
                                                centerName: string,
                                                provinceId: number,
                                                provinceName: string,
                                                cityEnName: string
                                            }) => item.cityEnName === slugs?.city)?.cityName}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.specialty ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}>
                                            <span className='text-gray-500'>{infoPage.specialtyName}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.disease ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}>
                                            <span className='text-gray-500'>{infoPage.diseaseName}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.sign ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}>
                                            <span className='text-gray-500'>{infoPage.signName}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.service ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}>
                                            <span className='text-gray-500'>{infoPage.serviceName}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.gender ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}>
                                            <span className='text-gray-500'>{convertGender(slugs.gender)}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.consultingPlan ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'

                                            onClick={() => {

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: "All",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: slugs?.search_key ? slugs.search_key : "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                            }}

                                        >
                                            <span className='text-gray-500'>{planNameConvert(slugs.consultingPlan)}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }
                                {
                                    slugs?.search_key ?
                                        <div className='flex justify-center items-center gap-2 px-2 py-1 border border-gray-500 rounded-full cursor-pointer'
                                            onClick={() => {
                                                setSearchText("")

                                                const url = generateUrlSearchPage({
                                                    consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
                                                    specialty: slugs?.specialty ? slugs?.specialty : "",
                                                    city: slugs?.city ? slugs?.city : "",
                                                    disease: slugs?.disease ? slugs?.disease : "",
                                                    gender: slugs?.gender ? slugs?.gender : "",
                                                    page: slugs?.page ? slugs?.page : "",
                                                    search_key: "",
                                                    service: slugs?.service ? slugs?.service : "",
                                                    sign: slugs?.sign ? slugs?.sign : "",
                                                })
                                                router.push(`/physicians${url}`)
                                                setSearchText("")
                                            }}
                                        >
                                            <span className='text-gray-500'>{slugs.search_key}</span>
                                            <span ><CloseIcon color='stroke-gray-500' /> </span>
                                        </div> : null
                                }

                            </div>
                        </div>
                    ) : null}

                    {
                        !loadingData && searchData.length === 0 &&
                        <div className='bg-white p-5 shadow-shadow_category rounded-sm mt-4'>
                            <p className='text-center font-bold'>متاسفانه پزشکی با فیلترهای جستجوی شما پیدا نشد</p>
                            <p className='text-center text-md max-w-[16rem] mx-auto mt-4'>برای داشتن نتایج بهتر فیلترهای جستجوی خود را عوض کنید</p>
                            <div className='flex justify-center items-center mt-4'>
                                <button type='button' className='text-error font-bold' onClick={() => {
                                    router.push("/physicians")
                                    setSearchText("")
                                }}>حذف فیلترها</button>
                            </div>
                        </div>
                    }

                    <div className=' flex justify-between items-center gap-2 flex-col w-full'>


                        <div className='w-full grid  grid-cols-1 lg:grid-cols-2 gap-2 mt-4'>
                            {!loadingData && searchData?.map((item) => (
                                <SearchCardPrimary key={item.id} showDisabled={doNotshowDisabledPhysician} {...item} online={item.immediateConsultation} freeMode={false} />
                            ))}

                        </div>
                        {loadingData ? <LoadingComponent /> : null}

                        <ReactPaginate
                            nextLabel={
                                <span className='flex justify-center items-center rounded-full size-[2rem]  bg-white'>
                                    <ArrowLeft />
                                </span>
                            }
                            onPageChange={(event) => {
                                fetchMoreData(event.selected)
                            }}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            initialPage={slugs ? +slugs.page - 1 : 1}
                            pageCount={pageCount}
                            previousLabel={
                                <span className='flex justify-center items-center rounded-full rotate-180 size-[2rem] bg-white'>
                                    <ArrowLeft />
                                </span>
                            }
                            className='flex justify-center items-center gap-2 text-xl w-full'
                            pageClassName="page-item p-2"

                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active font-bold"
                            disabledClassName='opacity-20 '
                            renderOnZeroPageCount={null}
                        />

                        {/* <InfiniteScroll
dataLength={searchDataClient ? searchDataClient.length : 0}
next={fetchMoreData}
hasMore={hasMoreSatet}
loader={<span></span>}
// endMessage={<div className="text-error font-bold">پایان😁</div>}
>
{searchDataClient?.map((item) => (
    <SearchCardPrimary key={item.id} showDisabled={doNotshowDisabledPhysician} {...item} online={item.immediateConsultation} freeMode={false} />
))}
</InfiniteScroll> */}

                    </div>
                </section>
                {/* ----------section------------- */}

                <DropDownBasical customStyle='text-md'>
                    <p>
                        سایت آرناپ یک پلتفرم جامع برای نوبت‌دهی آنلاین پزشکان متخصص و فوق‌تخصص است که به شما این امکان را می‌دهد تا به راحتی و با کمترین زمان ممکن با پزشکان مختلف ارتباط برقرار کنید. در آرناپ، امکانات متنوعی فراهم شده است تا بدون نیاز به مراجعه حضوری و در هر زمان، از طریق سامانه نوبت‌دهی اینترنتی، نوبت مشاوره پزشکی خود را دریافت کنید.
                    </p>
                    <p>
                        مشاوره پزشکی آنلاین در آرناپ به گونه‌ای طراحی شده که شما می‌توانید به راحتی تخصص موردنظر خود را جستجو کرده و لیست پزشکان مرتبط را مشاهده کنید. سپس، بر اساس نوع مشاوره‌ای که ترجیح می‌دهید—تلفنی، متنی یا ویدیویی—نوبت خود را انتخاب کنید. مراحل ثبت نوبت ساده و سریع بوده و شما تنها با وارد کردن شماره تلفن و تایید کد دریافتی از طریق پیامک، مشاوره خود را ثبت می‌کنید.
                    </p>
                    <p>
                        یکی از مزایای بزرگ آرناپ، ارائه مشاوره پزشکی تلفنی و متنی است که به شما این امکان را می‌دهد تا بدون هیچ معطلی با پزشک مورد نظر خود در ارتباط باشید. این خدمات به صورت ۲۴ ساعته و در کوتاه‌ترین زمان ممکن ارائه می‌شود. همچنین، می‌توانید از طریق پنل کاربری، با پزشک خود چت کنید و عکس‌ها یا فایل‌های لازم را برای او ارسال کنید.

                    </p>
                    <p>
                        هزینه مشاوره پزشکی در آرناپ بسته به نوع مشاوره و تخصص پزشک متفاوت است. به طور کلی، مشاوره تلفنی معمولاً هزینه بیشتری نسبت به مشاوره متنی دارد.
                    </p>
                    <p>
                        از مزایای مشاوره پزشکی آنلاین در آرناپ می‌توان به دسترسی سریع و آسان به پزشکان مختلف، صرفه‌جویی در هزینه‌ها، امکان مشاوره در هر زمان و مکان، و حفظ حریم خصوصی بیماران اشاره کرد.

                    </p>
                    <p>
                        در آرناپ، امکان دریافت نزدیک‌ترین نوبت مشاوره پزشک آنلاین نیز فراهم شده است، به گونه‌ای که می‌توانید در کمترین زمان با دکترهای آماده مشاوره ارتباط برقرار کنید.
                    </p>
                    <p>
                        با آرناپ به راحتی می‌توانید نوبت اینترنتی خود را از پزشکان متخصص و فوق‌تخصص در زمینه‌های مختلفی چون روانشناسی، پوست، زنان، مغز و اعصاب، قلب، تغذیه، و غیره دریافت کنید. آرناپ اینجاست تا شما را در مسیر بهبود سلامتتان همراهی کند.
                    </p>
                </DropDownBasical>

            </main>
            {/* ----------main------------- */}
        </>
    )
}

export default PhysiciansPage

const LoadingComponent = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full mt-2">
            <PhysicianLoadingPrimaryCard freeMode={false} />
            <PhysicianLoadingPrimaryCard freeMode={false} />
            <PhysicianLoadingPrimaryCard freeMode={false} />
            <PhysicianLoadingPrimaryCard freeMode={false} />
            <PhysicianLoadingPrimaryCard freeMode={false} />
        </div>
    );
};