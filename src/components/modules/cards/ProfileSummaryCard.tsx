"use client";


import cn from "@/utils/clsxFun";
import React, { useState } from "react";
import { PhysicainProfileType } from '@/types/physicianProfile'
import Link from "next/link";



export type ProfileSummaryCardType = {
  title: string,
  subTitle: string,
  tags: string[],
  physician: PhysicainProfileType,
}


const ProfileSummaryCard = (props: ProfileSummaryCardType) => {
  const [showMore, setShowMore] = useState(false);
  const { title, subTitle, tags, physician } = props

  return (
    <div
      className={cn(
        `bg-white  p-5 shadow-shadow_category rounded-sm`,
        {
          "rounded-sm": showMore,
          "rounded-tr-sm rounded-tl-sm": !showMore,
        }
      )}
    >
      <div className="text-lg font-bold relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
        {title}
      </div>
      <div
        className={cn(
          `mt-4  relative flex justify-start items-start gap-2 flex-col`,
          {
            // "after:w-full after:h-[1.5625rem] after:absolute after:bottom-0 after:left-0 after:bg-white/70 short-text-3": !showMore
          }
        )}
      >
        <p>
          {physician.firstName.startsWith("مرکز") ? "" : "دکتر"} <span className="text-primary">{physician.firstName} {physician.lastName}، </span> {physician.firstName.startsWith("مرکز") ? "مرکز" : "متخصص"}   <span className="text-primary">{physician.physicianSpecialities?.[0].specialityTitle} </span>در <span className="text-primary">{physician.cityName} </span>است. {physician.firstName.startsWith("مرکز") ? "آدرس مرکز " : "آدرس مطب ایشان"} در <span className="text-primary">{physician.address}</span> قرار دارد. برای تماس با {physician.firstName.startsWith("مرکز") ? "مرکز" : "مطب دکتر"} <span className="text-primary">{physician.lastName}</span>، می‌توانید از شماره‌ <Link className="text-primary" href={`tel:${physician.telePhoneNumber}`}>{`${physician.telePhoneNumber}`}</Link> استفاده کنید.
        </p>
        {/* <p>
          {`آدرس ${physician.firstName.startsWith("مرکز") ? "" : "مطب"}  ${physician.firstName.startsWith("مرکز") ? "" : "دکتر"} ${physician.firstName} ${physician.lastName} : `} <strong className="font-bold">{physician.address}</strong>
        </p>
        {
          physician.telePhoneNumber ? (
            <p>
              {`شماره تماس ${physician.firstName.startsWith("مرکز") ? "" : "مطب"}  ${physician.firstName.startsWith("مرکز") ? "" : "دکتر"} ${physician.firstName} ${physician.lastName} : `}
              <Link className="font-bold" href={`tel:${physician?.telePhoneNumber}`}>{physician?.telePhoneNumber}</Link>
            </p>
          ) : null
        } */}
        <p>
          آرناپ به شما این امکان را می‌دهد که به راحتی از دکترهای متخصص مختلف در سراسر ایران نوبت بگیرید. در ارناپ، می‌توانید نوبت خود را به صورت آنلاین، تلفنی، یا متنی دریافت کنید. علاوه بر این، امکان دسترسی به اطلاعات تماس، آدرس مطب، و مطالب نوشته شده توسط دکتر نیز برای شما فراهم شده است. همچنین می‌توانید نظرات بیماران دیگر را درباره هر پزشک مشاهده کرده و بر اساس تجربه دیگران، بهترین تصمیم را بگیرید.
        </p>
        <p>
          با اجرایی شدن کامل قانون نسخه‌نویسی الکترونیک، ارناپ این امکان را برای پزشکان فراهم کرده تا نسخه‌های الکترونیکی صادر کنند. از این رو، می‌توانید از خدماتی نظیر مشاوره تلفنی و آنلاین بهره‌مند شوید و نیاز به مراجعه حضوری را کاهش دهید.
        </p>
        <p>
          ارناپ با همکاری با بیش از 8000 پزشک و متخصص درمانی در سراسر ایران، فرآیند نوبت‌دهی را برای شما آسان‌تر کرده و به بهبود سطح سلامت جامعه کمک می‌کند. به راحتی از طریق ارناپ نوبت دکتر خود را تنظیم کرده و تجربه بهتری از مراجعه به پزشک داشته باشید.
        </p>

      </div>

      {/* {showMore && (
        <div className=" animate-opacity">
          <div className="mt-4">
            <div className="text-lg font-bold relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
              {subTitle}
            </div>
          </div>
          <div className={"flex justify-start items-center gap-2 mt-2"}>
            {tags.map((item: string, index: number) => (
              <p key={index}>#{item}</p>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-end items-center">
        <button
          type="button"
          className="text-primary text-lg font-bold"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </button>
      </div> */}
    </div>
  );
};

export default ProfileSummaryCard;
