"use client"
import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import useCity from '@/hooks/useCity'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import TitleHeading from '../modules/titles/TitleHeading'
import ArrowLeft from '../icons/ArrowLeft'
import Loader from '../elements/Loader'

const PhysiciansCityPage = ({ data, city }: {
    data: {
        specialtyId: number
        specialtyName: string
        specialtyEnName: string
        physicianCount: number
    }[], city: string
}) => {
    

    const { provinces, isLoadingCity } = useCity()

    return (
        <>
            <TitlePagesMobile title={`تخصص های شهر ${isLoadingCity ? <Loader size='size-[1.5rem]' color='border-white' /> : provinces.find((item: {
                cityId: number,
                cityName: string,
                centerName: string,
                provinceId: number,
                provinceName: string,
                cityEnName: string
            }) => item.cityEnName === city)?.cityName}`} />

            <div className=" mt-4 rounded-sm bg-white max-w-[118.75rem] w-full border overflow-x-scroll breadcrumb">
                <div className="  p-2 flex justify-start items-center gap-2 w-fit text-primary rounded-sm">
                    <LinkElement link="" className="text-sm text-primary min-w-fit">
                        <Image src={"/favicon.png"} width={500} height={500} alt='icon' className='size-[2rem]' />
                    </LinkElement>
                    <LinkElement link="physicians" className="text-sm text-primary min-w-fit">دکترها </LinkElement>/
                    <div className="text-sm text-primary min-w-fit">دکترهای {provinces.find((item: {
                        cityId: number,
                        cityName: string,
                        centerName: string,
                        provinceId: number,
                        provinceName: string,
                        cityEnName: string
                    }) => item.cityEnName === city)?.cityName}</div>


                </div>
            </div>


            {/* ----------header------------- */}
            <header className='py-4'>
                <TitleHeading isLoading={isLoadingCity} title={`دکترهای شهر ${provinces.find((item: {
                    cityId: number,
                    cityName: string,
                    centerName: string,
                    provinceId: number,
                    provinceName: string,
                    cityEnName: string
                }) => item.cityEnName === city)?.cityName}`} />
            </header>
            {/* ----------header------------- */}

            {/* ----------main------------- */}
            <main className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
                {data.map((item, index) => <LinkCard key={item.specialtyId} link={`physicians?specialty=${item.specialtyEnName}&city=${city}`} title={item.specialtyName} count={item.physicianCount} />)}
            </main>
            {/* ----------main------------- */}

        </>
    )
}

export default PhysiciansCityPage


const LinkCard = (props: { link: string, title: string, count: number }) => {
    

    return (
        <LinkElement link={props.link} className='flex justify-between items-center gap-2 rounded-sm shadow-shadow_category p-5 bg-white'>
            <Image src={"/favicon.png"} width={500} height={500} alt='icon' className='size-[1.5rem]' />
            <p className='font-bold text-primary'>{props.title}</p>
            <p className='flex justify-start items-center gap-2'><span className='font-bold'>{props.count}</span> دکتر <ArrowLeft /> </p>
        </LinkElement>
    )
}