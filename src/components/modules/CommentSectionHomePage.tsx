import commentsList from '@/data/commentData';
import React from 'react'
import { EffectCoverflow , Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CommentCardPrimary from './cards/Comments/CommentCardPrimary';

const CommentSectionHomePage = () => {

    const comments = [...commentsList]


    return (

        <Swiper
            modules={[EffectCoverflow , Autoplay]}
            initialSlide={2}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={true}
            loop={true}
            speed={1000}
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            centerInsufficientSlides={true}
            centeredSlidesBounds={true}
            className='commnet-slider'
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 500,
                modifier: 1,
                // slideShadows : true
            }}
            breakpoints={{
                
               
                1000: {
                    width : 1000,
                    slidesPerView : 1
                },
                1300: {
                    width : 1300,
                    slidesPerView : 3.5
                }
            }}
        >
            {
                comments.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <CommentCardPrimary {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>

    )
}

export default CommentSectionHomePage