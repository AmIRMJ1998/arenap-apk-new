"use client"
import SearchIcon from '@/components/icons/SearchIcon'
import TitlePagesMobile from '@/components/modules/titles/TitlePagesMobile'
import useTextConsulation from '@/hooks/useTextConsulation'
import { ConsultationCardType } from '@/types/consultation'
import cn from '@/utils/clsxFun'
import moment from 'jalali-moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const MyMessagesPage = () => {
    const [searchText, setSearchText] = useState("")
    const { data, isLoading } = useTextConsulation()


    const searchItems = data?.filter((item: ConsultationCardType) => item.physicianProfile?.firstName?.includes(searchText));
    console.log(data);
    return (
        <>
            <TitlePagesMobile title={"مشاوره های من "} />
            <section className=''>
                <div className='h-[3.5rem] rounded-[10rem] md:max-w-[28.125rem] mx-auto p-2   flex justify-between items-center bg-white'>
                    <input type="text" className='flex-1 h-full text-md px-2' value={searchText} placeholder='جستجو در بین مشاوره ها ...' onChange={(e) => {
                        setSearchText(e.target.value)
                    }} />
                    <span className=' size-[1.5rem] flex justify-center items-center'>
                        <SearchIcon color='stroke-primary' />
                    </span>
                </div>
                <div className="mt-4 grid grid-col-1 md:grid-cols-2 gap-2 flex-col ">
                    {isLoading ? (<>
                        <MessageLoadingCard />
                        <MessageLoadingCard /></>) : null
                    }

                    {
                        !isLoading && data?.length > 0 ? searchItems.map((item: ConsultationCardType, index: number) => <MessageCard key={item.id} {...item} />) : null
                    }
                </div>
                {
                    !isLoading && data?.length === 0 && <p className='text-center text-md'>مشاوره ای برای شما یافت نشد</p>
                }
            </section>
        </>
    )
}

export default MyMessagesPage



const MessageCard = (props: ConsultationCardType) => {
    const { physicianProfile, status, lastMessage, createdAt, id } = props



    return (
        <Link href={`/profile/mymessages/${id}`} className='flex justify-between items-center gap-2 h-[5rem] text-[#5B5F5E] bg-white p-4 rounded-sm  ' >
            <div className='min-w-[2.8125rem]'>
                <Image src={"/user.png"} width={500} height={500} alt='Pyhsician_image' className='size-[2.8125rem] min-w-[2.8125rem]' />
            </div>
            <div className='flex justify-between items-start gap-2 flex-col text-md flex-1'>
                <p className='text-black font-bold line-clamp-1'>دکتر {physicianProfile.firstName} {physicianProfile.lastName}</p>
                <p className='line-clamp-1'>{lastMessage?.text}</p>
            </div>
            <div className='flex justify-between items-end gap-2 flex-col text-sm min-w-fit'>
                <p className=''>{moment(createdAt, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")}</p>

                <span className={cn(
                    "px-1 py-0.5  block rounded-[5px]",
                    {
                        "bg-[#FFF6D4]": !status,
                        "bg-[#FFEBEB]": status,
                    }
                )}>
                    {
                        status ? "پایان یافته" : "در انتظار پاسخ"
                    }
                </span>
            </div>
        </Link>
    )
}


const MessageLoadingCard = () => {
    return (
        <div className='flex justify-between items-center gap-2 h-[5rem] text-[#5B5F5E] bg-white p-4 rounded-sm '>
            <div className='w-[2.8125rem]'>
                <Skeleton circle={true} className="h-[2.8125rem]" />{" "}

            </div>

            <div className='flex justify-between items-start gap-2 flex-col text-md flex-1 w-full'>
                <div className='w-full'>
                    <Skeleton className="w-[100px] h-[1.1875rem]" />
                </div>
                <div className='w-full'>
                    <Skeleton className="w-[100px] h-[1.1875rem]" />
                </div>
            </div>
            <div className='flex justify-between items-end gap-2 flex-col text-sm min-w-fit'>
                <div className='w-full'>
                    <Skeleton className="w-[100px] h-[1.1875rem]" />
                </div>
                <div className='w-full'>
                    <Skeleton className="w-[100px] h-[1.1875rem]" />
                </div>
            </div>
        </div>
    )
}