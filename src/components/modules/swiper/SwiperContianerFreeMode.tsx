"use client"

import { Swiper, SwiperSlide } from 'swiper/react';



import { FreeMode, Autoplay } from 'swiper/modules';



import { ArticleCardType, AutohrCardType, CategoryPrimaryType, CommentCardPrimaryType, PhysicainCardPrimaryType } from '@/types/cards';
import { RelatedPhysicianType } from '@/types/physicianProfile';
import { PhysicianSpecialityType, SearchSmallCardType, SpecialitySearchTagType } from '@/types/search';
import { ServicesDataType } from '@/data/servicesData';
import { FilterTagProps } from '@/components/elements/FilterTag';

import 'swiper/css';
import 'swiper/css/free-mode';


interface SwiperContainerFreeModeType {
    CardComponent: React.ComponentType<any>;
    gap?: number;
    data: CategoryPrimaryType[] | PhysicainCardPrimaryType[] | ArticleCardType[] | CommentCardPrimaryType[] | RelatedPhysicianType[] | SearchSmallCardType[] | SpecialitySearchTagType[] | PhysicianSpecialityType[] | AutohrCardType[] | ServicesDataType[] | FilterTagProps[]
}


const SwiperContainerFreeMode = ({ data, gap, CardComponent }: SwiperContainerFreeModeType) => {

    return (
        <div className='flex justify-center items-center'>
            <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                speed={1000}
                modules={[FreeMode]}
                freeMode={true}
                centerInsufficientSlides={true}
                lazyPreloadPrevNext={6}
                dir="rtl"
                className='swiper_freemode '
            >
                {
                    data?.map((item, index) => (
                        <SwiperSlide className='swiper_width_auto' key={item.id ? item.id : index}>
                            <CardComponent {...item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default SwiperContainerFreeMode
