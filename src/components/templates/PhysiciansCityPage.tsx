"use client"
import React from 'react'
import TitlePagesMobile from '../modules/titles/TitlePagesMobile'
import useCity from '@/hooks/useCity'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import TitleHeading from '../modules/titles/TitleHeading'
import ArrowLeft from '../icons/ArrowLeft'

const PhysiciansCityPage = ({ data, city, cityEn }: {
    data: {
        specialtyId: number
        specialtyName: string
        specialtyEnName: string
        physicianCount: number
    }[], city: string, cityEn: string
}) => {




    return (
        <>
            <TitlePagesMobile title={`تخصص های شهر ${city}`} />

            <div className=" mt-4 rounded-sm bg-white max-w-[118.75rem] w-full border overflow-x-scroll breadcrumb">
                <div className="  p-2 flex justify-start items-center gap-2 w-fit text-primary rounded-sm">
                    <LinkElement link="" className="text-sm text-primary min-w-fit">
                        <Image src={"/arenapLogo.png"} width={500} height={500} alt='icon' className='size-[2rem]' />
                    </LinkElement>
                    <LinkElement link="physicians" className="text-sm text-primary min-w-fit">دکترها </LinkElement>/
                    <div className="text-sm text-primary min-w-fit">دکترهای {city}</div>


                </div>
            </div>


            {/* ----------header------------- */}
            <header className='py-4'>
                <TitleHeading title={`دکترهای شهر ${city}`} />
            </header>
            {/* ----------header------------- */}

            {/* ----------main------------- */}
            {
                data.length === 0 ? (
                    <p className=' text-center font-bold'>تخصصی برای استان مورد نظر پیدا نشد</p>
                ) : null
            }
            <main className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
                {data.map((item, index) => <LinkCard key={item.specialtyId} link={`physicians?specialty=${item.specialtyEnName}&city=${cityEn}`} title={item.specialtyName} count={item.physicianCount} />)}
            </main>
            {/* ----------main------------- */}

        </>
    )
}

export default PhysiciansCityPage


const LinkCard = (props: { link: string, title: string, count: number }) => {
    const { provinces } = useCity()

    return (
        <LinkElement link={props.link} className='flex justify-between items-center gap-2 rounded-sm shadow-shadow_category p-5 bg-white'>
            
            <h2 className='font-bold text-primary'>{props.title}</h2>
            <p className='flex justify-start items-center gap-2'><span className='font-bold'>{props.count}</span> دکتر <ArrowLeft /> </p>

        </LinkElement>
    )
}