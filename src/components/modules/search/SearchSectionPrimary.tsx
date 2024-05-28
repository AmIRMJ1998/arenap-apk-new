"use client"
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import cn from '@/utils/clsxFun'
import CloseButton from '@elements/CloseButton'
import ArrowLeft from '@icons/ArrowLeft'
import ButtonElement from '@elements/ButtonElement'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SpecialityType } from '@/types/global'
import genderContent from '@/data/genderContent'
import plansContent from '@/data/plansContent'
import generateUrlSearchPage from '@/utils/generateUrlSearchPage'
import convertGender from '@/utils/convertGender'
import planNameConvert from '@/utils/planNameConvert'
import { DiseaseType, ServiceType, SignType } from '@/types/search'
import { specialtyBelongings } from '@/services/specialtyBelongings/specialtyBelongings'
import Loader from '@/components/elements/Loader'
import { useCookies } from 'react-cookie'
import { useQueryClient } from '@tanstack/react-query'




export interface SearchSectionPrimaryProps {
    showFilters: boolean;
    closeFilterHandler: () => void;
    specialities: SpecialityType[]
    slugs?: {
        city?: string,
        specialty?: string,
        consultingPlan?: string,
        search_key?: string,
        page?: string,
        disease?: string,
        sign?: string,
        service?: string,
        gender?: string
    },
    searchText: string,
    services: ServiceType[],
    signs: SignType[],
    diseases: DiseaseType[],
    getDisease: (enName: string) => void,
    loading: boolean,

}



const SearchSectionPrimary = (props: SearchSectionPrimaryProps) => {
    const { specialities, slugs, searchText, services, showFilters, closeFilterHandler, diseases, signs, loading, getDisease } = props
    const [cookies] = useCookies(["cityInfo"])
    const queryClient = useQueryClient();



    const genders = [...genderContent]
    const plans = [...plansContent]

    const [activeCard, setActiveCard] = useState<null | number>(0)

    const router = useRouter()

    const [searchsFilterCards, setSearchsFilterCards] = useState({
        specialty: "",
        services: "",
        diseases: "",
        signs: ""
    })
    const [searchParametrs, setSearchParametrs] = useState({
        search_key: slugs?.search_key ? slugs?.search_key : "",
        cityName: slugs?.city ? slugs?.city : "",
        gender: slugs?.gender ? slugs?.gender : "",
        specialty: slugs?.specialty ? slugs?.specialty : "",
        disease: slugs?.disease ? slugs?.disease : "",
        sign: slugs?.sign ? slugs?.sign : "",
        service: slugs?.service ? slugs?.service : "",
        consultingPlan: slugs?.consultingPlan ? slugs?.consultingPlan : "",
        page: slugs?.page ? slugs?.page : "",
        itemsCountPerPage: 10
    })
    const [titlesActive, setTitlesActive] = useState({
        gender: slugs?.gender ? convertGender(slugs.gender) : "جنسیت",
        specialty: slugs?.specialty ? specialities.find(item => item.enName === slugs.specialty)?.specialityTitle : "تخصص",
        disease: slugs?.disease ? diseases.find(item => item.enName === slugs.disease)?.name : "بیماری",
        sign: slugs?.sign ? signs.find(item => item.enName === slugs.sign)?.name : "علائم",
        service: slugs?.service ? services.find(item => item.enName === slugs.service)?.name : "خدمات",
        ConsultingPlan: slugs?.consultingPlan ? planNameConvert(slugs.consultingPlan) : "پلن مشاوره",
    })




    const openFilterCard = (fitlerIndex: number | null) => {
        setActiveCard(fitlerIndex)
    }

    const radioButtonHandler = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setSearchParametrs({
            ...searchParametrs,
            [name]: e.target.value
        })
    }

    const searchedSpecialities = specialities.filter(item => item.specialityTitle.toLowerCase().includes(searchsFilterCards.specialty.toLocaleLowerCase()))
    const serachedServices = services?.filter(item => item.name.toLowerCase().includes(searchsFilterCards.services.toLocaleLowerCase()))
    const serachedDiseases = diseases?.filter(item => item.name.toLowerCase().includes(searchsFilterCards.diseases.toLocaleLowerCase()))
    const serachedSigns = signs?.filter(item => item.name.toLowerCase().includes(searchsFilterCards.signs.toLocaleLowerCase()))


    

    const filterHandler = async () => {

        const url = generateUrlSearchPage({
            specialty: searchParametrs.specialty,
            consultingPlan: searchParametrs.consultingPlan,
            disease: searchParametrs.disease,
            city: slugs?.city ? slugs.city : cookies.cityInfo ? cookies.cityInfo.slug : "",
            sign: searchParametrs.sign,
            service: searchParametrs.service,
            gender: searchParametrs.gender,
            page: searchParametrs.page === "0" ? "" : searchParametrs.page.toString(),
            search_key: searchText,
            // itemsCountPerPage: searchParametrs.itemsCountPerPage === 0 ? "" : searchParametrs.itemsCountPerPage.toString()
        })
        closeFilterHandler()
        router.push(`/physicians${url}`)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }



    useEffect(() => {
        setTitlesActive({
            ...titlesActive,
            disease: slugs?.disease ? diseases.find(item => item.enName === slugs.disease)?.name : "بیماری",
            sign: slugs?.sign ? signs.find(item => item.enName === slugs.sign)?.name : "علائم"
        })
    }, [diseases, signs])


    return (
        <section className={cn(
            ' md:sticky top-2.5 right-0',
            {
                " md:block": showFilters,
                "hidden md:block": !showFilters
            }
        )}>
            <div className={
                cn(
                    'fixed  left-0 h-screen w-full  bg-white-200 p-4 bg-bg_content transition-all duration-300',
                    "md:static md:h-auto md:w-[18.75rem] md:rounded-sm md:bg-white md:shadow-shadow_category ",
                    {
                        "top-0 z-[20]": showFilters,
                        "-top-full": !showFilters
                    }
                )
            }>
                <div className='absolute top-4 left-4 md:hidden '>
                    <CloseButton closeHanlder={closeFilterHandler} />
                </div>
                <div className='flex justify-between items-center gap-4 font-bold'>
                    <p className='text-primary md:min-w-fit  w-full font-[900] md:font-normal text-center md:text-right '>فیلتر ها</p>
                    <button type='button' className='text-error hidden md:block min-w-fit font-normal text-md' onClick={() => {
                        router.push("/physicians")
                    }} >حذف فیلترها</button>
                </div>
                <div className='grid grid-cols-1 gap-4 mt-6 md:mt-4'>
                    <FilterCard title={titlesActive.specialty} name='filter_card' index={1} active={activeCard === 1} openHandler={openFilterCard} >
                        <div className='bg-gray-100 md:bg-white h-[2.8125rem] md:h-auto rounded-3xl p-1'>
                            <input type="text" className='text-md text-black h-full px-2' placeholder='جستجو' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSearchsFilterCards({
                                    ...searchsFilterCards,
                                    specialty: e.target.value
                                })
                            }} />
                        </div>
                        <div className='h-[6.25rem] overflow-y-auto mt-2 bg-white rounded-sm p-1 text-md'>

                            <label htmlFor={`specialities-`} className='my-2 flex justify-start items-center gap-1 cursor-pointer'>
                                {
                                    searchParametrs.specialty === "" ? <span className={cn(
                                        ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                    )}>
                                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                        </svg>
                                    </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                    </span>
                                }
                                <span>همه تخصص ها</span>
                                <input id={`specialities-`} type="radio" name='specialty' className='hidden' onChange={() => {
                                    setSearchParametrs({
                                        ...searchParametrs,
                                        specialty: ""
                                    })
                                    setTitlesActive({
                                        ...titlesActive,
                                        specialty: "تخصص"
                                    })
                                }} />
                            </label>
                            {searchedSpecialities.map((item, index) => (
                                <label htmlFor={`specialities-${index}`} className='my-2 flex justify-start items-center gap-1 cursor-pointer' key={item.id}>
                                    {
                                        item.enName === searchParametrs.specialty ? <span className={cn(
                                            ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                        )}>
                                            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                            </svg>
                                        </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                        </span>
                                    }
                                    <span>{item.specialityTitle}</span>
                                    <input id={`specialities-${index}`} type="radio" name='specialty' className='hidden' onChange={() => {
                                        
                                        setSearchParametrs({
                                            ...searchParametrs,
                                            specialty: item.enName
                                        })
                                        setTitlesActive({
                                            ...titlesActive,
                                            specialty: item.specialityTitle
                                        })
                                        getDisease(item.enName)
                                    }} />
                                </label>
                            ))}
                        </div>
                    </FilterCard>
                    <FilterCard title={titlesActive.service} name='filter_card' index={2} active={activeCard === 2} openHandler={openFilterCard} >
                        <div className='bg-gray-100 md:bg-white h-[2.8125rem] md:h-auto rounded-3xl p-1'>
                            <input type="text" className='text-md text-black h-full px-2' placeholder='جستجو' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSearchsFilterCards({
                                    ...searchsFilterCards,
                                    services: e.target.value
                                })
                            }} />
                        </div>
                        <div className='h-[6.25rem] overflow-y-auto mt-2 bg-white rounded-sm p-1 text-md'>

                            <label htmlFor={`services-`} className='my-2 flex justify-start items-center gap-1 cursor-pointer'>
                                {
                                    searchParametrs.service === "" ? <span className={cn(
                                        ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                    )}>
                                        <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                        </svg>
                                    </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                    </span>
                                }
                                <span>همه خدمات</span>
                                <input id={`services-`} type="radio" name='services' className='hidden' onChange={() => {
                                    setSearchParametrs({
                                        ...searchParametrs,
                                        service: ""
                                    })
                                    setTitlesActive({
                                        ...titlesActive,
                                        service: "خدمات"
                                    })


                                }} />
                            </label>
                            {serachedServices?.map((item, index) => (
                                <label htmlFor={`services-${index}`} className='my-2 flex justify-start items-center gap-1 cursor-pointer' key={item.id}>
                                    {
                                        item.enName === searchParametrs.service ? <span className={cn(
                                            ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                        )}>
                                            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                            </svg>
                                        </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                        </span>
                                    }
                                    <span>{item.name}</span>
                                    <input id={`services-${index}`} type="radio" name='services' className='hidden' onChange={() => {
                                        setSearchParametrs({
                                            ...searchParametrs,
                                            service: item.enName
                                        })
                                        setTitlesActive({
                                            ...titlesActive,
                                            service: item.name
                                        })
                                    }} />
                                </label>
                            ))}
                        </div>
                    </FilterCard>
                    {loading ? <div className='flex justify-center items-center'>
                        <Loader color='border-primary' size='size-[2.5rem]' />
                    </div> : null}
                    {
                        diseases?.length > 0 ?
                            <FilterCard title={titlesActive.disease} name='filter_card' index={3} active={activeCard === 3} openHandler={openFilterCard} >
                                <div className='bg-gray-100 md:bg-white h-[2.8125rem] md:h-auto rounded-3xl p-1'>
                                    <input type="text" className='text-md text-black h-full px-2' placeholder='جستجو' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSearchsFilterCards({
                                            ...searchsFilterCards,
                                            diseases: e.target.value
                                        })
                                    }} />
                                </div>
                                <div className='h-[6.25rem] overflow-y-auto mt-2 bg-white rounded-sm p-1 text-md'>

                                    <label htmlFor={`diseases-`} className='my-2 flex justify-start items-center gap-1 cursor-pointer'>
                                        {
                                            searchParametrs.disease === "" ? <span className={cn(
                                                ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                            )}>
                                                <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                                </svg>
                                            </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                            </span>
                                        }
                                        <span>همه بیماری ها</span>
                                        <input id={`diseases-`} type="radio" name='diseases' className='hidden' onChange={() => {
                                            setSearchParametrs({
                                                ...searchParametrs,
                                                disease: ""
                                            })
                                            setTitlesActive({
                                                ...titlesActive,
                                                disease: "بیماری"
                                            })
                                        }} />
                                    </label>
                                    {serachedDiseases?.map((item, index) => (
                                        <label htmlFor={`diseases-${index}`} className='my-2 flex justify-start items-center gap-1 cursor-pointer' key={item.id}>
                                            {
                                                item.enName === searchParametrs.disease ? <span className={cn(
                                                    ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                                )}>
                                                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                                    </svg>
                                                </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                                </span>
                                            }
                                            <span>{item.name}</span>
                                            <input id={`diseases-${index}`} type="radio" name='diseases' className='hidden' onChange={() => {
                                                setSearchParametrs({
                                                    ...searchParametrs,
                                                    disease: item.enName
                                                })
                                                setTitlesActive({
                                                    ...titlesActive,
                                                    disease: item.name
                                                })
                                            }} />
                                        </label>
                                    ))}
                                </div>
                            </FilterCard> : null
                    }
                    {
                        signs?.length > 0 ?
                            <FilterCard title={titlesActive.sign} name='filter_card' index={4} active={activeCard === 4} openHandler={openFilterCard} >
                                <div className='bg-gray-100 md:bg-white h-[2.8125rem] md:h-auto rounded-3xl p-1'>
                                    <input type="text" className='text-md text-black h-full px-2' placeholder='جستجو' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSearchsFilterCards({
                                            ...searchsFilterCards,
                                            signs: e.target.value
                                        })
                                    }} />
                                </div>
                                <div className='h-[6.25rem] overflow-y-auto mt-2 bg-white rounded-sm p-1 text-md'>

                                    <label htmlFor={`signs-`} className='my-2 flex justify-start items-center gap-1 cursor-pointer'>
                                        {
                                            searchParametrs.sign === "" ? <span className={cn(
                                                ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                            )}>
                                                <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                                </svg>
                                            </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                            </span>
                                        }
                                        <span>همه علائم</span>
                                        <input id={`signs-`} type="radio" name='signs' className='hidden' onChange={() => {
                                            setSearchParametrs({
                                                ...searchParametrs,
                                                sign: ""
                                            })
                                            setTitlesActive({
                                                ...titlesActive,
                                                sign: "علائم"
                                            })
                                        }} />
                                    </label>
                                    {serachedSigns?.map((item, index) => (
                                        <label htmlFor={`signs-${index}`} className='my-2 flex justify-start items-center gap-1 cursor-pointer' key={item.id}>
                                            {
                                                item.enName === searchParametrs.sign ? <span className={cn(
                                                    ' min-w-[1rem] size-[1rem] rounded-[0.25rem] bg-primary flex justify-center items-center'
                                                )}>
                                                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.8 4.2998L1.2 2.6998L0 3.8998L2.8 6.6998L8 1.4998L6.8 0.299805L2.8 4.2998Z" fill="white" />
                                                    </svg>
                                                </span> : <span className='min-w-[1rem] size-[1rem] rounded-[0.25rem] border border-gray-300 flex justify-center items-center'>

                                                </span>
                                            }
                                            <span>{item.name}</span>
                                            <input id={`signs-${index}`} type="radio" name='signs' className='hidden' onChange={() => {
                                                setSearchParametrs({
                                                    ...searchParametrs,
                                                    sign: item.enName
                                                })
                                                setTitlesActive({
                                                    ...titlesActive,
                                                    sign: item.name
                                                })
                                            }} />
                                        </label>
                                    ))}
                                </div>
                            </FilterCard> : null
                    }

                    <FilterCardSecondary inputContent={genders} defaultCheck={searchParametrs.gender} changeInputHandler={radioButtonHandler} title={titlesActive.gender} name='gender' index={5} active={activeCard === 5} openHandler={openFilterCard} />
                    <FilterCardSecondary inputContent={plans} defaultCheck={searchParametrs.consultingPlan} changeInputHandler={radioButtonHandler} title={titlesActive.ConsultingPlan} name='consultingPlan' index={6} active={activeCard === 6} openHandler={openFilterCard} />
                </div>
                <div className='mt-4 grid md:grid-cols-1 grid-cols-2 gap-4'>
                    <ButtonElement typeButton='primary' handler={filterHandler} >اعمال فیلتر</ButtonElement>
                    <div className='md:hidden'><ButtonElement typeButton='transparent'  >حذف فیلتر</ButtonElement></div>
                </div>
            </div>
        </section>
    )
}

export default SearchSectionPrimary;


export type FilterCardProps = {
    openHandler: (filterIndex: number | null) => void,
    name: string,
    active: boolean,
    index: number,
    title?: string,
    children: ReactNode,

}

const FilterCard = (props: FilterCardProps) => {

    const { openHandler, active, name, index, title, children } = props


    return (
        <div className={cn(
            " rounded-sm shadow-shadow_category max-w-full cursor-pointer ",
            "bg-white p-5",
            "md:bg-gray-100 md:py-2 md:px-3 md:text-primary md:font-bold",
        )}
            id={name}

        >
            <div className={
                cn(
                    'flex justify-between items-center  relative ',
                    "after:absolute after:-right-5 md:after:-right-3 after:rounded-lg after:top-0 after:block after:bg-primary after:w-1 after:h-full"
                )
            }
                onClick={() => {
                    if (!active) {
                        openHandler(index)
                    } else {
                        openHandler(null)
                    }
                }}
            >
                <p className='text-md'>{title}</p>
                <span className={cn(
                    '', {
                    "-rotate-90": !active,
                    "rotate-90": active
                }
                )}><ArrowLeft /></span>
            </div>
            <div className={cn(
                ' mt-4 relative h-[9.375rem] cursor-auto',
                {
                    "hidden": !active
                }
            )}>
                {children}

            </div>
        </div>
    )
}

export type FilterCardSecondaryProps = {
    openHandler: (filterIndex: number | null) => void,
    name: string,
    active: boolean,
    index: number,
    title: string,
    changeInputHandler: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void,
    inputContent: { id: number, value: number | string, name: string }[],
    defaultCheck: string

}

const FilterCardSecondary = (props: FilterCardSecondaryProps) => {
    const { openHandler, active, name, index, title, changeInputHandler, inputContent, defaultCheck } = props
    const [titleState, setTitleState] = useState("")
    return (
        <div className={cn(
            " rounded-sm shadow-shadow_category max-w-full cursor-pointer ",
            "bg-white p-5",
            "md:bg-gray-100 md:py-2 md:px-3 md:text-primary md:font-bold",
        )}
            id={name}

        >
            <div className={
                cn(
                    'flex justify-between items-center  relative ',
                    "after:absolute after:-right-5 md:after:-right-3 after:rounded-lg after:top-0 after:block after:bg-primary after:w-1 after:h-full"
                )
            }
                onClick={() => {
                    if (!active) {
                        openHandler(index)
                    } else {
                        openHandler(null)
                    }
                }}
            >
                <p>{title} <span className='text-md text-gray-500'>{titleState ? `(${titleState})` : ""}</span> </p>
                <span className={cn(
                    '', {
                    "-rotate-90": !active,
                    "rotate-90": active
                }
                )}><ArrowLeft /></span>
            </div>
            <div className={cn(
                ' mt-4 relative  cursor-auto',
                {
                    "hidden": !active
                }
            )}>
                <div className=' mt-2  rounded-sm   flex justify-start md:justify-between items-center flex-wrap gap-2 text-sm'>
                    {
                        inputContent.map(item => (
                            <label key={item.id} className='flex justify-start items-center  gap-2 cursor-pointer '>
                                <input onChange={(e) => {
                                    changeInputHandler(e, name)
                                    setTitleState(item.name)
                                }} hidden type="radio" name={name} className='peer' value={item.value} checked={defaultCheck === item.value} />
                                <div className={cn(
                                    "size-5 rounded-full bg-gray-100 peer-checked:bg-primary md:bg-white md:peer-checked:bg-primary relative peer-checked:after:block",
                                    "after:absolute after:top-1 after:left-1 after:rounded-full after:bg-white md:after:bg-white after:hidden after:w-3 after:h-3"
                                )}>
                                </div>
                                <span>{item.name}</span>
                            </label>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
