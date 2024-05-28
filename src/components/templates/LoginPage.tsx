"use client";

import React, { useEffect, useState } from "react";



import Image from "next/image";

import Link from "next/link";
import useModalLogin from "@/hooks/useModalLogin";

import { useRouter } from "next/navigation";

import Toastify from "@elements/toasts/Toastify";

import ButtonElement from "@elements/ButtonElement";
import BottomNavigation from "@modules/menu/BottomNavigation";
import LinkProfilePageCard from "@modules/cards/Link/LinkProfilePageCard";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import ModalLogin from "@layouts/ModalLogin/ModalLogin";
import useUserInfo from "@/hooks/useUserInfo";
import LinkElement from "@elements/LinkElement";

const LoginPage = () => {
    
    
    const router = useRouter();
    const { openModalLogin } = useModalLogin()
    const { isLogin } = useUserInfo()

    
    useEffect(() => {
        if (isLogin === "authorization") {
            router.replace(`/profile`)
        }
    }, [isLogin])






    return (
        <>
            <TitlePagesMobile title={"ثبت نام / ورود"} />
            <ModalLogin  />
            <div className=" pb-5 max-w-[62.5rem] mx-auto">
                <header className="mt-12">
                    <div className="relative w-full ">
                        <div className="bg-white  rounded-full w-20 h-20 flex justify-center items-center absolute left-[calc(50%-40px)] -top-10 ">
                            <Image
                                src={"/user.png"}
                                alt="user_picture"
                                width={700}
                                height={700}
                                className=" rounded-lg size-[4.5625rem]"
                            />
                        </div>
                        <div className="bg-white rounded-sm px-3.5 pt-[3.75rem] pb-3.5">
                            <ButtonElement
                                fontWeight={"bold"}
                                typeButton="primary"
                                size="sm"
                                fontSize={"md"}
                                handler={openModalLogin}
                            >
                                ثبت نام و ورود کاربر
                            </ButtonElement>
                        </div>
                    </div>
                </header>

                <section className="mt-4 flex justify-start items-center gap-2 flex-col">
                    <LinkProfilePageCard title={"قوانین و مقررات آرناپ"} link={"policy"} />
                    <LinkProfilePageCard
                        title={"تماس با ما"}
                        link={"contactus"}
                    />
                    <LinkProfilePageCard title={"درباره ما"} link={"aboutus"} />
                    <LinkProfilePageCard
                        title={"پرسش های متداول"}
                        link={"faq"}
                    />
                </section>

                <div className="flex justify-end items-center mt-2 ">
                    <LinkElement link={`Auth/Login`} className="w-[15.625rem]">
                        <ButtonElement typeButton="secondary" size="sm" >
                            <p className="text-md">
                                {" "}
                                پزشک هستید؟
                                <span className="font-bold">
                                ورود پزشکان
                                </span>
                            </p>
                        </ButtonElement>
                    </LinkElement>
                </div>
            </div>
            <BottomNavigation route={"login"} />
        </>
    );
};

export default LoginPage;
