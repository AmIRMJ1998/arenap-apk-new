"use client";


import cn from "@/utils/clsxFun";
import React, { useState } from "react";
import { PhysicainProfileType } from '@/types/physicianProfile'



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
        `bg-white  p-5 shadow-shadow_category`,
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
            "after:w-full after:h-[1.5625rem] after:absolute after:bottom-0 after:left-0 after:bg-white/70short-text-3": !showMore
          }
        )}
      >

        <p>
          {`دکتر ${physician.firstName} ${physician.lastName} متخصص ${physician.physicianSpecialities[0]?.specialityTitle} فعال در حوزه سلامت در شهر   ${physician.cityName} در استان ${physician.provinceName} میباشد`}
        </p>
        <p>
          {`آدرس مطب  دکتر ${physician.firstName} ${physician.lastName} : `} <strong className="font-bold">{physician.address}</strong>
        </p>
        {
          physician.telePhoneNumber ? (
            <p>
              {`شماره تماس   دکتر ${physician.firstName} ${physician.lastName} : `} <strong className="font-bold">{physician?.telePhoneNumber}</strong>
            </p>
          ) : null
        }

      </div>

      {showMore && (
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
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
