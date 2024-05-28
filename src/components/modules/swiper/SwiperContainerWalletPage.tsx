"use client"
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';



import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import { ArticleCardType, CategoryPrimaryType, CommentCardPrimaryType, PhysicainCardPrimaryType } from '@/types/cards';
import cn from '@/utils/clsxFun';



interface SwiperContainerWalletPageType {
    activePrice: number;
    gap?: number;
    activePriceHandler: (count: number) => void,
    showCountHandler: () => void,
    isShowCount: boolean
}


const SwiperContainerWalletPage = ({ gap, activePrice, activePriceHandler, showCountHandler, isShowCount }: SwiperContainerWalletPageType) => {

    return (
        <Swiper
            spaceBetween={gap}
            slidesPerView="auto"
            speed={1000}
            modules={[FreeMode, Autoplay]}
            freeMode={true}
            dir="rtl"
        >
            <SwiperSlide className="swiper_width_auto ">
                <button type="button" onClick={() => activePriceHandler(1)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[6.25rem] border text-md border-primary", {
                    "bg-primary text-white ": activePrice === 1
                })} >
                    یک نوبت
                </button>
            </SwiperSlide>
            <SwiperSlide className="swiper_width_auto ">
                <button type="button" onClick={() => activePriceHandler(3)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[6.25rem] border text-md border-primary", {
                    "bg-primary text-white ": activePrice === 3
                })} >
                    سه نوبت
                </button>
            </SwiperSlide>
            <SwiperSlide className="swiper_width_auto ">
                <button type="button" onClick={() => activePriceHandler(5)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[6.25rem] border text-md border-primary", {
                    "bg-primary text-white ": activePrice === 5
                })} >
                    پنج نوبت
                </button>
            </SwiperSlide>
            <SwiperSlide className="swiper_width_auto ">
                <button type="button" onClick={() => activePriceHandler(10)} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[6.25rem] border text-md border-primary", {
                    "bg-primary text-white ": activePrice === 10
                })} >
                    ده نوبت
                </button>
            </SwiperSlide>
            <SwiperSlide className="swiper_width_auto ">
                <button type="button" onClick={showCountHandler} className={cn("p-2 bg-white shadow-shadow_category text-primary font-bold text-center rounded-[6.25rem] border text-md border-primary", {
                    "bg-primary text-white ": isShowCount
                })} >
                    تعداد دلخواه
                </button>
            </SwiperSlide>
        </Swiper>
    )
}

export default SwiperContainerWalletPage
