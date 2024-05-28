import React from 'react'

import TitlePrimary from './titles/TitlePrimary'
import categoryData from '@/data/categoryData'
import CategoryPrimaryCard from '@modules/cards/CategoryPrimaryCard';
import SwiperContainerFreeMode from './swiper/SwiperContianerFreeMode';

const BestSpeciality = () => {
    const categories = [...categoryData]

    return (
        <>
            <div className="py-4">
                <TitlePrimary
                    title={"پربازدیدترین تخصص ها"}
                    btn={false}
                    textLink={"مشاهده بیشتر"}
                />
            </div>
            
           
                <SwiperContainerFreeMode gap={10} data={categories} CardComponent={CategoryPrimaryCard} />
            
        </>
    )
}

export default BestSpeciality