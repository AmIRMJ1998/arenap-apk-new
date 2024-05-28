"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "react-loading-skeleton/dist/skeleton.css";





import useUserInfo from "@/hooks/useUserInfo";
import BottomNavigation from "@modules/menu/BottomNavigation";
import SidebarProfile from "@modules/cards/Profile/SidebarProfile";


const ProfileLayout = ({ children }: { children: ReactNode }) => {

    

    const { isLogin, getUser } = useUserInfo()
    const router = useRouter()

    useEffect(() => {
        
        if (isLogin === "unauthorization") {
            router.replace(`/login`)
        }
    }, [isLogin])

    return (
        <div className=" max-w-[81.25rem]  relative pb-5  flex justify-start items-stretch gap-2">
            <SidebarProfile  />
           
            <div className="flex-1 md:px-2.5">
                {children}
            </div>
            <BottomNavigation
                route={"profile"}

            />
            
           
        </div>
    );
};

export default ProfileLayout;
