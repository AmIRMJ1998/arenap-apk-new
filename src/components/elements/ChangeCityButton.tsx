"use client"
import React, { useRef, useState } from 'react'
import ButtonElement from './ButtonElement'
import LocationIcon from '../icons/LocationIcon'
import useCity from '@/hooks/useCity'
import Loader from './Loader'
import cn from '@/utils/clsxFun'
import Modal from '../modules/modals/Modal'
import BottomSheetAndCenterContent from '../modules/modals/BottomSheetAndCenterContent'


import MagnifierIcon from '../icons/menu/MagnifierIcon'
import { useCookies } from 'react-cookie'
import InputSearch from './inputs/InputSearch'



const ChnageCityButton = () => {
  const { provinces, isLoadingProvince, cityName, isLoadingCity, setAllProvince, cityHandler } = useCity()
  const [show, setShow] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(['cityInfo']);

  const showHandler = () => {
    setShow(!show)
  }


  const searchProvince = provinces?.filter((item: {
    cityId: number,
    cityName: string,
    centerName: string,
    provinceId: number,
    provinceName: string,
    cityEnName: string

  }) => item.cityName.toLowerCase().includes(searchText.toLocaleLowerCase()))


  return (
    <div className={
      cn(
        "relative",
        {
          'md:z-[19]': !show,
          "md:z-[20]": show
        }
      )
    }>
      <ButtonElement typeButton='primary' handler={showHandler} customStyle='group min-w-[8.125rem]'>
        <span>{isLoadingCity ? <Loader size='size-[1.8rem]' color='border-white' /> : cityName}</span>
        <LocationIcon color='fill-white' />
      </ButtonElement>
      <span className={cn('fixed top-0 left-0 w-full h-screen bg-black/30 ', {
        "hidden": !show
      })} onClick={() => {
        setShow(false)

      }}>

      </span>
      <div className={cn(
        'absolute top-full left-0 w-[10rem] h-[18.75rem] py-2', {
        "z-10": show,
        "hidden": !show,
      }
      )}>




        <Modal show={show} closeHandler={() => setShow(false)}>
          <BottomSheetAndCenterContent show={show}>


            <InputSearch value={searchText} changeHandler={(e) => setSearchText(e.target.value)} />

            <ul className='flex justify-start items-center gap-1 flex-col h-[18.75rem] max-h-[calc(100vh-11rem)] overflow-scroll'>
              <li
                className="border-b border-gray-550 py-2 cursor-pointer text-center w-full hover:bg-gray-100  transition-all duration-300"
                onClick={() => {
                  setAllProvince()
                  setShow(false)
                  setSearchText("")
                }}
              >
                همه استان ها
              </li>

              {
                searchProvince?.map((item: {
                  cityId: number,
                  cityName: string,
                  centerName: string,
                  provinceId: number,
                  provinceName: string,
                  cityEnName: string
                }) => (

                  <li
                    className="border-b border-gray-550 py-2 cursor-pointer text-center w-full hover:bg-gray-100  transition-all duration-300"
                    onClick={() => {
                      cityHandler(item.cityEnName, item.cityName, item.cityId)
                      setSearchText("")
                      setShow(false)
                    }}
                    key={item.cityName}
                  >

                    {item.provinceName} / {item.cityName}
                  </li>))
              }
            </ul>

            {/* 
            <Swiper
              modules={[EffectCoverflow , Mousewheel]}
              spaceBetween={10}
              slidesPerView={5}
              speed={1000}
              effect='coverflow'
              grabCursor={true}
              centeredSlides={true}
              direction={'vertical'}
              mousewheel={true}
              className='swiper-vertical overflow-hidden'
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 20,

                modifier: 3,
                slideShadows: false
                // slideShadows : true
              }}
            >
              <SwiperSlide  >
                <li
                  className="border-b border-gray-550 py-2 cursor-pointer text-center"
                  onClick={() => {
                    setAllProvince()
                    setShow(false)
                    setSearchText("")
                  }}
                >
                  همه استان ها
                </li>
              </SwiperSlide>
              {
                searchProvince?.map((item: {
                  cityId: number,
                  cityName: string,
                  centerName: string,
                  provinceId: number,
                  provinceName: string,
                  cityEnName : string
                }) => (
                  <SwiperSlide key={item.cityId} >
                    <li
                      className="border-b border-gray-550 py-2 cursor-pointer text-center"
                      onClick={() => {
                        cityHandler(item.cityEnName, item.cityName, item.cityId)
                        setSearchText("")
                        setShow(false)
                      }}
                    >
                      
                       {item.provinceName} / {item.cityName}
                    </li>
                  </SwiperSlide>
                ))
              }

            </Swiper> */}

          </BottomSheetAndCenterContent>
        </Modal>

      </div>
    </div >
  )
}

export default ChnageCityButton


