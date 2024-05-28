"use client"
import ArrowLeft from '@icons/ArrowLeft'
import useUserInfo from '@/hooks/useUserInfo'
import { UserType } from '@/types/global'
import cn from '@/utils/clsxFun'
import Image from 'next/image'
import React, { useState } from 'react'
import LinkElement from './LinkElement'
import useSelectAppointment from '@/hooks/useSelectAppointment'
import { usePathname } from 'next/navigation'


const AcoountButtonHeader = ({ user }: { user: UserType }) => {

    const { getUser } = useUserInfo()
    const [showDrop, setShowDrop] = useState(false)
    const { offSelectHandler } = useSelectAppointment()
    const pathName = usePathname()

    const logOut = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        offSelectHandler()
        getUser()
    }

    return (
        <>
            {showDrop ? (<span className='fixed w-screen left-0 top-0 h-screen  block z-[20]' onClick={() => setShowDrop(false)}></span>) : ""}
            <div onClick={() => setShowDrop(!showDrop)} className='relative z-[20] flex justify-between items-center  p-1 h-[3.125rem] bg-white gap-2  font-bold rounded-3xl text-center w-[10.9375rem] cursor-pointer'>
                <Image src={"/user.png"} width={500} height={500} className='w-[2.5rem]' alt="profil_image" />
                <span className='text-black text-sm'>{user.firstName} {user.lastName}</span>
                <div className='px-3'>
                    <span className={cn("block transition-all duration-300", {
                        "rotate-90": showDrop,
                        "rotate-[270deg]": !showDrop,
                    })}>
                        <ArrowLeft />
                    </span>
                    <span></span>
                </div>
                {
                    showDrop ?
                        <div className='absolute top-full left-0 w-full py-2 text-black  '>
                            <div className='bg-white p-2 rounded-sm text-md  shadow-shadow_category '>
                                <LinkElement link={`profile`} className={cn(
                                    'py-2 border-b border-gray-200 w-full block hover:text-primary transition-all duration-300 hover:border-primary', {
                                        "text-primary border-primary" : pathName === "/profile"
                                }
                                )} >حساب کاربری</LinkElement>
                                <LinkElement link={`profile/wallet`} className={cn(
                                    'py-2 border-b border-gray-200 w-full block hover:text-primary transition-all duration-300 hover:border-primary', {
                                        "text-primary border-primary" : pathName === "/profile/wallet"
                                }
                                )} >کیف پول</LinkElement>
                                <LinkElement link={`profile/myappointments`} className={cn(
                                    'py-2 border-b border-gray-200 w-full block hover:text-primary transition-all duration-300 hover:border-primary', {
                                        "text-primary border-primary" : pathName === "/profile/myappointments"
                                }
                                )} >نوبت های من</LinkElement>
                                <LinkElement link={`profile/mymessages`} className={cn(
                                    'py-2 border-b border-gray-200 w-full block hover:text-primary transition-all duration-300 hover:border-primary', {
                                        "text-primary border-primary" : pathName === "/profile/myappointments"
                                }
                                )} >مشاوره های من</LinkElement>
                                <LinkElement link={`profile/favorites`} className={cn(
                                    'py-2 border-b border-gray-200 w-full block hover:text-primary transition-all duration-300 hover:border-primary', {
                                        "text-primary border-primary" : pathName === "/profile/favorites"
                                }
                                )}>علاقه مندی ها</LinkElement>
                                <button type='button' onClick={logOut} className='text-error text-md py-2 w-full text-center '>خروج</button>
                            </div>
                        </div> : null
                }
            </div>
        </>
    )
}

export default AcoountButtonHeader