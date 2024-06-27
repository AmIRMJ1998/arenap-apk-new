"use client"
import React, { useState } from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import TitleHeading from '../modules/titles/TitleHeading'
import Image from 'next/image'
import { PhysicianDataSearch } from '@/types/search'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchCardPrimary from '../modules/cards/Search/SearchCardPrimary'
import urls from '@/services/urls'
import { apiDomainNobat } from '@/services/getApiUrl'
import Toastify from '../elements/toasts/Toastify'
import PhysicianLoadingPrimaryCard from '../modules/cards/Skeletons/PhysicianLoadingPrimaryCard'
import BottomNavigation from '../modules/menu/BottomNavigation'

export type OnlineCounselingPageType = {
      physicians?: PhysicianDataSearch[] | [],
      currentPage?: number,
      totalPages?: number,
      pageSize?: number,
      totalCount?: number,
      hasMore?: boolean
}


const OnlineCounselingPage = (props: OnlineCounselingPageType) => {
      const { physicians, hasMore } = props
      const [hasMoreState, setHasMoreState] = useState(hasMore ? hasMore : false)
      const [physiciansData, setPhysiciansData] = useState<PhysicianDataSearch[] | []>(physicians ? physicians : [])
      const [loadingData, setLoadingData] = useState(false)
      const [page, setPage] = useState(1)

      console.log(physicians)


      const fetchMoreData = async () => {

            setLoadingData(true)
            fetch
                  (
                        `${apiDomainNobat}${urls.advanceSearch.serach.url}?Gender=0&ConsultingPlan=All&PageNumber=${page + 1}&ItemsCountPerPage=15`,
                  )
                  .then((res) => res.json()).then(data => {

                        if (data?.value === null) {
                              setPhysiciansData([...physiciansData]);
                              setHasMoreState(false);
                              return;
                        }
                        setPhysiciansData([...physiciansData, ...data.value?.items]);
                        setHasMoreState(
                              data.value.currentPage === data.value.totalPages
                                    ? false
                                    : true
                        );
                        setPage(data.value.currentPage);
                        setLoadingData(false)
                  })
                  .catch((error) => {
                        setLoadingData(false)
                        Toastify("error", "خطایی رخ داده است");
                  });
      }



      return (
            <>
                  <TitlePagesMobile title={`مشاوره آنلاین با پزشکان`} />
                  <TitleHeading title="مشاوره آنلاین با پزشکان" />


                  {/* ----------section------------- */}
                  {/* Banner  */}
                  <section className='mt-4'>
                        <div className='relative bg-[#AEDCEF] p-6 rounded-[1.5rem] flex justify-between items-stretch bg-cosultation_pattern'>

                              <div className='flex justify-around items-start flex-col absolute -left-[1rem]  top-0 w-[2rem] h-full'>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                              </div>
                              <div className='flex justify-around items-start flex-col absolute -right-[1rem]  top-0 w-[2rem] h-full'>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                                    <span className='w-[2rem] bg-bg_content block h-[1rem] rounded-lg' ></span>
                              </div>

                              <div className='flex-1'>
                                    <h2 className='font-bold hidden md:block'>مشاوره آنلاین آرناپ</h2>
                                    <div className='md:mt-4 grid grid-cols-1 md:grid-cols-2 h-full md:h-[calc(100%-2.5rem)] gap-2  '>
                                          <div className='flex justify-start items-center gap-2'>
                                                <Icon />
                                                <p>امکان مشاوره آنلاین با بیش از ۱۰۰۰ پزشک و متخصص</p>
                                          </div>
                                          <div className='flex justify-start items-center gap-2'>
                                                <Icon />
                                                <p>تلفنی، تلفنی فوری یا متنی</p>
                                          </div>
                                          <div className='flex justify-start items-center gap-2'>
                                                <Icon />
                                                <p> امکان ارسال فایل تصویر و صوتی به پزشک در مشاوره متنی</p>
                                          </div>
                                          <div className='flex justify-start items-center gap-2'>
                                                <Icon />
                                                <p>ارسال علائم بیمار جهت تشخیص هوشمند</p>
                                          </div>
                                    </div>
                              </div>
                              <div className='md:flex justify-center items-center hidden'>
                                    <Image src={"/consultationImage.png"} width={500} height={500} className='w-[12.5rem]' alt='مشاوره آنلاین' />
                              </div>
                        </div>
                  </section>
                  {/* ----------section------------- */}
                  {/* ----------section------------- */}
                  {/* Content  */}
                  <section className='mt-4'>

                        <div className=' flex justify-between items-start  w-full flex-col'>
                              <InfiniteScroll
                                    dataLength={physiciansData ? physiciansData.length : 0}
                                    next={fetchMoreData}
                                    hasMore={hasMoreState}
                                    className='infinite-scroll_consultation'
                                    loader={<span>loading</span>}
                              >
                                    {physiciansData?.map((item) => (
                                          <SearchCardPrimary key={item.id} {...item} online={item.immediateConsultation} freeMode={false} />
                                    ))}
                              </InfiniteScroll>
                              {loadingData ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-2">
                                          <PhysicianLoadingPrimaryCard freeMode={false} />
                                          <PhysicianLoadingPrimaryCard freeMode={false} />
                                          <PhysicianLoadingPrimaryCard freeMode={false} />
                                          <PhysicianLoadingPrimaryCard freeMode={false} />
                                          <PhysicianLoadingPrimaryCard freeMode={false} />
                                    </div>
                              ) : null}
                        </div>
                  </section>
                  {/* ----------section------------- */}

                  <BottomNavigation route='onlinecounseling' />

            </>
      )
}

export default OnlineCounselingPage


const Icon = () => {
      return (
            <svg width="24" height="24" viewBox="0 0 24 24" className='!min-w-[1.5rem]' fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.091C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.091V7.92C2 4.38 4.28 2 7.67 2ZM11.43 14.99L16.18 10.24C16.52 9.9 16.52 9.35 16.18 9C15.84 8.66 15.28 8.66 14.94 9L10.81 13.13L9.06 11.38C8.72 11.04 8.16 11.04 7.82 11.38C7.48 11.72 7.48 12.27 7.82 12.62L10.2 14.99C10.37 15.16 10.59 15.24 10.81 15.24C11.04 15.24 11.26 15.16 11.43 14.99Z" fill="white" />
            </svg>
      )
}