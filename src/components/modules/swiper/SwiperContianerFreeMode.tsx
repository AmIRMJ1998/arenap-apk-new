"use client"

import { Swiper, SwiperSlide } from 'swiper/react';



import { FreeMode, Autoplay } from 'swiper/modules';



import { AIPhysicianProfileCardType, ArticleCardType, AutohrCardType, CategoryPrimaryType, CommentCardPrimaryType, PhysicainCardPrimaryType } from '@/types/cards';
import { ExtraImageType, RelatedPhysicianType } from '@/types/physicianProfile';
import { PhysicianSpecialityType, SearchSmallCardType, SpecialitySearchTagType } from '@/types/search';
import { ServicesDataType } from '@/data/servicesData';
import { FilterTagProps } from '@/components/elements/FilterTag';
import cn from '@/utils/clsxFun';
import { ReactNode } from 'react';





interface SwiperContainerFreeModeType {
    CardComponent: React.ComponentType<any>;
    gap?: number;
    data: CategoryPrimaryType[] | PhysicainCardPrimaryType[] | ArticleCardType[] | CommentCardPrimaryType[] | RelatedPhysicianType[] | SearchSmallCardType[] | SpecialitySearchTagType[] | PhysicianSpecialityType[] | AutohrCardType[] | ServicesDataType[] | FilterTagProps[] | AIPhysicianProfileCardType[] | ExtraImageType[]
    center?: boolean
    children?: ReactNode

}


const SwiperContainerFreeMode = ({ data, gap, CardComponent, center = true , children }: SwiperContainerFreeModeType) => {

    return (
        <div className={
            cn(
                "flex  items-center",
                {
                    "justify-center": center,
                    "justify-start": !center
                }
            )
        }>
            <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                speed={1000}
                modules={[FreeMode]}
                freeMode={true}
                centerInsufficientSlides={center}
                lazyPreloadPrevNext={6}
                dir="rtl"
                className={cn(
                    "swiper_freemode",
                    {
                        "!mx-0": !center
                    }
                )}
            >
                {
                    !children && data?.map((item, index) => (
                        <SwiperSlide className='swiper_width_auto' key={item.id ? item.id : index}>
                            <CardComponent {...item} />
                        </SwiperSlide>
                    ))
                }
                {
                    children
                }
            </Swiper>
        </div>
    )
}

export default SwiperContainerFreeMode
