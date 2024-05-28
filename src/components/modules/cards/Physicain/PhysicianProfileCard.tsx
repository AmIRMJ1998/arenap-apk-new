"use client";

import Image from "next/image";
import LocationIcon from "@/components/icons/LocationIcon";
import ApprovedIcon from "@/components/icons/ApprovedIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import LikeIcon from "@/components/icons/LikeIcon";


import StarIcon from "@/components/icons/StarIcon";

import cn from "@/utils/clsxFun";
import TagPhysicain from "@/components/elements/TagPhysician";
import Loader from "@/components/elements/Loader";
import LinkElement from "@/components/elements/LinkElement";
import ButtonElement from "@/components/elements/ButtonElement";
import { ReactNode } from "react";


export type PhysicianProfileCardType = {
  name: string,
  profileURL: string,
  speciality: string,
  rate: {
    count: number,
    rate: number
  },
  services: {
    appointment: boolean,
    textConsultation: boolean,
    phoneConsultation: boolean,
    emergencyPhoneConsultation: boolean,
  },
  MENumber: string,
  city: string,
  liked: boolean,
  status: boolean,
  addFavorite: () => void,
  likeLoading: boolean,
  physicianUrl: string,
  children: ReactNode
}

const PhysicianProfileCard = ({
  name,
  profileURL,
  speciality,
  rate,
  services,
  MENumber,
  city,
  liked,
  status,
  addFavorite,
  likeLoading,
  children
}: PhysicianProfileCardType) => {






  return (
    <>
      <div className="flex flex-col gap-5 justify-between p-5 rounded-sm bg-white mt-3 min-h-[19.375rem] shadow-shadow_category">
        <div className="flex gap-3">
          <div className="rounded-full relative size-[5.75rem] min-w-[5.75rem] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.08)]">
            <Image
              src={profileURL}
              width={200}
              height={200}
              alt={name}
              priority={false}
              className="rounded-full w-full h-full"
            />
            {/* {status &&
                            <span className='size-[1rem] bg-white rounded-full absolute bottom-[1px] rtl:right-[9px] ltr:-left-[5px] flex justify-center items-center '>
                                <span className={`w-[10px]  h-[10px] ${status === "online" ? "bg-primary-100 animate-pulse" : "bg-gray-400"} rounded-full `}>
                                </span>
                            </span>
                        } */}
            <span className="size-[4] bg-white rounded-full absolute bottom-[1px] rtl:right-[9px] ltr:-left-[5px] flex justify-center items-center ">
              <span
                className={cn(`size-[0.625rem] rounded-full `, {
                  "bg-primary-100 animate-pulse": status,
                  "bg-gray-400": !status,
                })}
              ></span>
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <h1 className="font-bold">{name}</h1>
            <h2 className="font-normal text-md">{speciality}</h2>
            <div className="flex items-center gap-2">
              <StarIcon />
              {/* <StarRateModule size="lg" rate={rate.rate} ltr={false} /> */}
              <p>{rate.count === 0 ? "-" : `${rate.count} نفر`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <TagPhysicain disabled={!services.appointment} title={"نوبت دهی ویزیت"} />
          <TagPhysicain
            disabled={!services.phoneConsultation}
            title={"مشاوره متنی"}
          />
          <TagPhysicain
            disabled={!services.phoneConsultation}
            title={"مشاوره تلفنی"}
          />

          <TagPhysicain
            disabled={!services.emergencyPhoneConsultation}
            title={"مشاوره تلفنی فوری"}
          />
        </div>
        <div className="flex justify-between items-end ">
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <span>
                <ApprovedIcon />
              </span>
              <span>کد نظام پزشکی: {MENumber}</span>
            </div>
            <div className="flex gap-3 items-center mb-2">
              <span>
                <LocationIcon color="fill-gray-500" />
              </span>
              <span>{city}</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            {children}

            <button
              type="button"
              className="flex justify-center items-center rounded-full p-2 bg-gray-100 size-[2.6875rem]"
            >
              <ShareIcon />
            </button>
            {
              likeLoading ? (

                <Loader size="size-[2rem]" color="border-primary" />
              ) : (
                <button
                  type="button"
                  className="flex justify-center items-center rounded-full p-2 bg-gray-100 size-[2.6875rem]"
                  onClick={addFavorite}
                >
                  <LikeIcon liked={liked} />
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default PhysicianProfileCard;
