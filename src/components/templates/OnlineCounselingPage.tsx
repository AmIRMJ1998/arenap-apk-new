"use client"
import React, { useState } from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import TitleHeading from '../modules/titles/TitleHeading'
import Image from 'next/image'
import { PhysicianDataSearch } from '@/types/search'

import SearchCardPrimary from '../modules/cards/Search/SearchCardPrimary'
import urls from '@/services/urls'


import PhysicianLoadingPrimaryCard from '../modules/cards/Skeletons/PhysicianLoadingPrimaryCard'
import BottomNavigation from '../modules/menu/BottomNavigation'
import { useRouter } from 'next/navigation'
import DropDownBasical from '../modules/DropDownBasical'
import ArrowLeft from '../icons/ArrowLeft'
import ReactPaginate from 'react-paginate'

export type OnlineCounselingPageType = {
      physicians?: PhysicianDataSearch[] | [],
      currentPage?: number,
      totalPages?: number,
      pageSize?: number,
      totalCount?: number,
      pageNumber: string;

      hasMore?: boolean
}


const OnlineCounselingPage = (props: OnlineCounselingPageType) => {
      const { physicians, hasMore, pageNumber, totalPages } = props

      const [physiciansData, setPhysiciansData] = useState<PhysicianDataSearch[] | []>(physicians ? physicians : [])
      const [loadingData, setLoadingData] = useState(false)
      const router = useRouter()



      const fetchMoreData = async (page: number) => {

            setLoadingData(true)
            console.log(page)
            router.push(`/onlinecounseling?page=${page}`)
            setLoadingData(false)

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
                  <section className='mt-6'>
                        <DropDownBasical customStyle='text-md'>
                              <p>
                                    مشاوره آنلاین پزشکی: راحتی و دسترسی آسان به خدمات درمانی
                              </p>
                              <p>
                                    با بهره‌مندی از اپلیکیشن آرناپ، ارتباط با پزشکان متخصص هر زمان و هر مکانی که باشید، به آسانی امکان‌پذیر است. مشاوره آنلاین یکی از امکانات برجسته این اپلیکیشن است که به شما این فرصت را می‌دهد تا بدون نیاز به حضور فیزیکی، مشاوره‌های پزشکی دریافت کنید.
                              </p>
                              <p>
                                    ویژگی‌های برجسته مشاوره آنلاین در پلتفرم آرناپ:
                              </p>
                              <p>
                                    1. دسترسی سریع و آسان: با استفاده از چت آنلاین، شما می‌توانید در هر زمان که نیاز به مشاوره پزشکی دارید، بدون نیاز به وقت‌گذرانی در ترافیک یا انتظار در مطب پزشک، با متخصصان مشورت کنید.
                              </p>
                              <p>
                                    2. حفظ حریم خصوصی: تمامی گفتگوها به‌صورت محرمانه و امن انجام می‌شود، به طوری که اطلاعات شخصی و پزشکی شما به‌خوبی محافظت شده و تنها در اختیار پزشک معالج قرار می‌گیرد.
                              </p>
                              <p>
                                    3. پاسخ‌های دقیق و کارآمد: پزشکان متخصص ما آماده‌اند تا به سوالات شما به‌طور کامل و دقیق پاسخ دهند و شما را در مسیر درمان مناسب راهنمایی کنند.
                              </p>
                              <p>
                                    4.صرفه‌جویی در زمان: با مشاوره آنلاین، نیازی به صرف وقت برای مراجعه حضوری ندارید و می‌توانید به‌سرعت به نیازهای درمانی خود پاسخ دهید.
                              </p>
                              <p>
                                    5.امکان پیگیری و مشاوره مداوم: از طریق اپلیکیشن، می‌توانید به راحتی پیگیری‌های لازم را انجام داده و در صورت نیاز، مشاوره‌های مداوم با پزشک خود داشته باشید.
                              </p>
                              <p>
                                    پلتفرم آرناپ با هدف ارتقاء کیفیت خدمات درمانی و بهبود دسترسی به مراقبت‌های پزشکی طراحی شده است. با استفاده از مشاوره آنلاین، شما می‌توانید تجربه‌ای راحت و مؤثر از خدمات درمانی را تجربه کنید و در هر لحظه از شبانه‌روز به کمک پزشکان متخصص دسترسی داشته باشید.
                              </p>
                        </DropDownBasical>

                  </section>
                  {/* ----------section------------- */}
                  {/* Content  */}
                  <section className='mt-4'>

                        <div className=' flex justify-between items-start  w-full flex-col'>
                              {/* <InfiniteScroll
                                    dataLength={physiciansData ? physiciansData.length : 0}
                                    next={fetchMoreData}
                                    hasMore={hasMoreState}
                                    className='infinite-scroll_consultation'
                                    loader={<span>loading</span>}
                              >
                                    {physiciansData?.map((item) => (
                                          <SearchCardPrimary key={item.id} {...item} online={item.immediateConsultation} freeMode={false} />
                                    ))}
                              </InfiniteScroll> */}
                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  w-full'>
                                    {physicians?.map((item) => (
                                          <SearchCardPrimary key={item.id} {...item} online={item.immediateConsultation} freeMode={false} />
                                    ))}
                              </div>
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

                        <ReactPaginate
                              nextLabel={
                                    <span className='flex justify-center items-center rounded-full size-[2rem]  bg-white'>
                                          <ArrowLeft />
                                    </span>
                              }
                              onPageChange={(event) => {
                                    fetchMoreData(event.selected + 1)
                              }}
                              pageRangeDisplayed={3}
                              marginPagesDisplayed={1}
                              initialPage={pageNumber ? +pageNumber - 1 : 1}
                              pageCount={totalPages ? totalPages : 0}
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
                  </section>
                  {/* ----------section------------- */}
                  <section className='mt-4'>
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
                  </section>

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