"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import cn from '@/utils/clsxFun'
import ProfileCard from './ProfileCard'
import useUserInfo from '@/hooks/useUserInfo'


const SidebarProfile = () => {
    

    const pathName = usePathname()



    return (
        <div className={cn(`sticky top-2 left-0  h-fit min-[1200px]:w-[18.75rem] hidden md:block  pt-12`, {
            "pt-10": pathName === "/profile" || pathName === "/en/profile" || pathName === "/fa/profile"
        })} >
            <div className=''>
                <ProfileCard  type={true}  />
            </div>
        </div>
    )
}

export default SidebarProfile