"use client"
import React from 'react'
import Image from 'next/image'

import AppointmentIcon from '@icons/profile/AppointmentIcon'
import EditIcon from '@icons/profile/EditIcon'
import MessageIcon from '@icons/profile/MessageIcon'

import WalletIcon from '@icons/profile/WalletIcon'
import LogoutIcon from '@/components/icons/LogoutIcon'




import { usePathname, useRouter } from 'next/navigation'


import UserIcon from '@/components/icons/menu/UserIcon'
import cn from '@/utils/clsxFun'
import LinkElement from '@/components/elements/LinkElement'
import useLogoutModal from '@/hooks/useLogoutModal'
import useUserInfo from '@/hooks/useUserInfo'



const ProfileCard = ({ type }: { type: boolean }) => {
    const { openLogoutModal } = useLogoutModal()
    const { user } = useUserInfo()
    const pathName = usePathname()


    return (
        <>
            <div className={cn(`relative w-full`)}>

                <div className='bg-white rounded-sm p-3.5 relative'>
                    <div className='flex justify-between items-center '>
                        <LinkElement link={`profile/edit`} className={cn(`z-[10]`, {
                            "-mt-6": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })}    ><EditIcon /></LinkElement>

                        <div className={cn("", {
                            "absolute flex justify-center items-end w-full bg-white rounded-sm left-0  h-[5rem]": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })}>
                            <div className='bg-white  rounded-full w-20 h-20 flex justify-center items-center -mt-[3.375rem] '>
                                <Image src={"/user.png"} alt='user_picture' width={700} height={700} className=' size-[4.5625rem] rounded-lg ' />
                            </div>
                        </div>


                        <button type='button' className={cn(`z-[10]`, {
                            "-mt-6": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
                        })} onClick={openLogoutModal}><LogoutIcon /> </button>


                    </div>
                    <p className='flex justify-center items-center py-1 font-bold'>{user?.firstName} {user?.lastName}</p>
                    <div className={cn(`flex justify-center items-center gap-2 mt-4`, {
                        "flex-col": type
                    })}>
                        <div className='bg-gray-100 py-1 px-2 rounded-sm text-md'>
                            کدملی : <span className='text-sm min-[41.875rem]:text-md'>{user?.nationalNumber}</span>
                        </div>
                        <div className='bg-gray-100 py-1 px-2 rounded-sm text-md'>
                            شماره تماس : <span className='text-sm min-[41.875rem]:text-md'>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className={cn(`grid mt-6 `, {
                        "grid-cols-3 h-[5.625rem]": !type,
                        "grid-cols-1": type,

                    })} >
                        {
                            type && pathName !== "/profile" && pathName !== "/en/profile" && pathName !== "/fa/profile" ? (
                                <LinkElement link={`profile`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                                    "flex-col justify-center": !type,
                                    "flex-row justify-start py-3": type,
                                })} >
                                    <span><UserIcon /> </span>
                                    <span>حساب کاربری</span>
                                </LinkElement>
                            ) : null
                        }
                        <LinkElement link={"profile/mymessages"} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><MessageIcon /> </span>
                            <span>مشاوره های من</span>
                        </LinkElement>

                        <LinkElement link={`profile/myappointments`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center border-l-2 border-r-2 border-dashed": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><AppointmentIcon /> </span>
                            <span>نوبت های من</span>
                        </LinkElement>

                        <LinkElement link={`profile/wallet`} className={cn(`flex  items-center flex-col  gap-3 text-md font-bold text-primary   `, {
                            "flex-col justify-center": !type,
                            "flex-row justify-start py-3": type,
                        })} >
                            <span><WalletIcon /> </span>
                            <span>کیف پول</span>
                        </LinkElement>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProfileCard