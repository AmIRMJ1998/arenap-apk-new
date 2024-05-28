"use client"
import React from "react";
import Image from "next/image";

import PathLine from "@components/elements/PathLine";
import LocationIcon from "@components/icons/LocationIcon";
import Timer from "@modules/Timer";
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import priceSplitter from "@utils/priceSplitter";

import convertDayTime from "@utils/convertDayTime";
import cn from "@utils/clsxFun";
import ButtonElement from "@components/elements/ButtonElement";


import { AppointmentPrimaryCardType } from "@/types/cards";
import LinkElement from "@/components/elements/LinkElement";

const AppointmentPrimaryCard = (props: AppointmentPrimaryCardType) => {


  const { index, payment, physician: { hasImage, id, firstName, lastName, specialties, address, latitude, longitude, physicianSpecialities }, price, lockTime, year, month, day, time } = props


  const timerTime = new Date();
  timerTime.setSeconds(timerTime.getSeconds() + lockTime);

  return (
    <div className=" bg-white rounded-md pb-6 overflow-hidden relative">

      <div className="fixed md:absolute top-[6.875rem] z-[10] md:top-[3.125rem] left-0 w-[6.25rem] h-[2.1875rem] bg-primary rounded-tr-full rounded-br-full  flex justify-center items-center font-bold text-white text-md shadow-shadow_comment">
        حضوری
      </div>

      <div className="px-6 pt-6 -mb-3">
        <div className="flex justify-start items-start">
          <div className="min-w-[3.75rem] h-[3.75rem] rounded-full bg-white shadow-shadow_category  overflow-hidden border-2 border-white">
            <Image
              src={hasImage ? getUrlImage(id) : "/noImage.jfif"}
              width={500}
              height={500}
              className="w-full h-full "
              alt="تست"
            />
          </div>
          <div className="px-4 h-[3.75rem] flex justify-around items-start flex-col">
            <p className="text-primary font-bold">
              دکتر {firstName} {lastName}
            </p>
            <p>{specialties ? specialties[0].name : ""}</p>
            <p>{physicianSpecialities ? physicianSpecialities[0].specialityTitle : ""}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-bold">
            آخرین وضعیت :
            <span
              className={cn("", {
                "font-[400]": payment,
                "text-error font-bold": !payment,
              })}
            >
              {payment === true ? "نوبت تایید شده " : "در انتظار پرداخت"}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold text-center bg-[#EFF4FF] py-2 rounded-sm">
            مبلغ {payment ? "پرداخت شده" : "قابل پرداخت"}:{" "}
            <span>{priceSplitter(price / 10)}</span> تومان
          </p>
        </div>

        {lockTime && lockTime > 0 ? (
          <div className="flex flex-col items-center my-5 max-w-[9.375rem] mx-auto text-center">
            <small>تا</small>
            <div className="font-bold">
              <Timer
                customStyle="text-2xl"
                expiryTimestamp={timerTime}
                expireHandler={() => window.location.reload()}
              />
            </div>
            <small>دیگر فرصت دارید نوبت را دریافت کنید</small>
          </div>
        ) : null}

        <div className="mt-4 px-6 flex justify-between items-start flex-col gap-2  rounded-sm">
          <div className="flex justify-start items-center gap-2">
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4109 3.14362L16.4119 3.89324C19.1665 4.10914 20.9862 5.9862 20.9891 8.86475L21 17.2905C21.0039 20.429 19.0322 22.36 15.8718 22.365L8.15189 22.375C5.0112 22.379 3.01482 20.402 3.01087 17.2546L3.00001 8.92772C2.99606 6.03017 4.75153 4.15811 7.50618 3.90524L7.50519 3.15561C7.5042 2.71583 7.83002 2.385 8.26445 2.385C8.69887 2.384 9.02469 2.71383 9.02568 3.15361L9.02666 3.85326L14.8914 3.84527L14.8904 3.14562C14.8894 2.70584 15.2152 2.376 15.6497 2.375C16.0742 2.37401 16.4099 2.70384 16.4109 3.14362ZM4.52149 9.23657L19.4696 9.21658V8.86675C19.4272 6.71783 18.349 5.59039 16.4139 5.42248L16.4148 6.19209C16.4148 6.62188 16.0801 6.96271 15.6556 6.96271C15.2212 6.96371 14.8944 6.62388 14.8944 6.19409L14.8934 5.3845L9.02864 5.39249L9.02962 6.20109C9.02962 6.63187 8.70479 6.9717 8.27037 6.9717C7.83595 6.9727 7.50914 6.63387 7.50914 6.20309L7.50815 5.43347C5.58286 5.62638 4.51754 6.75781 4.5205 8.92572L4.52149 9.23657ZM15.2399 13.7793V13.7903C15.2498 14.2501 15.625 14.5989 16.0801 14.5889C16.5244 14.5779 16.8789 14.1971 16.869 13.7373C16.8483 13.2975 16.4918 12.9387 16.0485 12.9397C15.5944 12.9497 15.2389 13.3195 15.2399 13.7793ZM16.0554 18.267C15.6013 18.257 15.235 17.8782 15.234 17.4185C15.2241 16.9587 15.5884 16.5779 16.0426 16.5669H16.0525C16.5165 16.5669 16.8927 16.9457 16.8927 17.4155C16.8937 17.8852 16.5185 18.266 16.0554 18.267ZM11.1721 13.7953C11.1919 14.2551 11.568 14.6139 12.0222 14.5939C12.4665 14.5729 12.821 14.1931 12.8012 13.7333C12.7904 13.2835 12.425 12.9337 11.9807 12.9347C11.5266 12.9547 11.1711 13.3355 11.1721 13.7953ZM12.0262 18.2221C11.572 18.2421 11.1968 17.8832 11.1761 17.4235C11.1761 16.9637 11.5305 16.5839 11.9847 16.5629C12.429 16.5619 12.7953 16.9117 12.8052 17.3605C12.8259 17.8213 12.4705 18.2011 12.0262 18.2221ZM7.10434 13.8303C7.12408 14.29 7.50025 14.6499 7.95442 14.6289C8.39872 14.6089 8.75317 14.2281 8.73244 13.7683C8.72257 13.3185 8.35725 12.9687 7.91197 12.9697C7.4578 12.9897 7.10335 13.3705 7.10434 13.8303ZM7.95837 18.2271C7.5042 18.2481 7.12902 17.8882 7.10828 17.4285C7.1073 16.9687 7.46274 16.5879 7.91691 16.5679C8.3612 16.5669 8.7275 16.9167 8.73738 17.3665C8.75811 17.8263 8.40366 18.2071 7.95837 18.2271Z"
                  fill="#8E9190"
                />
              </svg>
            </span>
            <span className="font-bold"> تاریخ نوبت :</span>
            <span>
              {year}/{month < 10 ? `0${month}` : month}/
              {day < 10 ? `0${day}` : day}
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 22.9287C6.48 22.9287 2 18.4587 2 12.9287C2 7.40871 6.48 2.92871 12 2.92871C17.53 2.92871 22 7.40871 22 12.9287C22 18.4587 17.53 22.9287 12 22.9287ZM15.19 16.6387C15.31 16.7087 15.44 16.7487 15.58 16.7487C15.83 16.7487 16.08 16.6187 16.22 16.3787C16.43 16.0287 16.32 15.5687 15.96 15.3487L12.4 13.2287V8.60871C12.4 8.18871 12.06 7.85871 11.65 7.85871C11.24 7.85871 10.9 8.18871 10.9 8.60871V13.6587C10.9 13.9187 11.04 14.1587 11.27 14.2987L15.19 16.6387Z"
                  fill="#8E9190"
                />
              </svg>
            </span>
            <span className="font-bold"> ساعت مراجعه :</span>
            {time ? (
              <span>
                {`${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}`} {convertDayTime(+time.hour)}
              </span>
            ) : null}
            {index ? (
              <p>
                <span>{time.hour}:{time.minute}</span>
                <span>{convertDayTime(+time.hour)}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {payment && (
        <div className="h-[3.4375rem] relative">
          <span className="w-[3.4375rem] h-[3.4375rem] block bg-bg_content rounded-full shadow-inner absolute top-0 -right-[1.71875rem]"></span>
          <div className="absolute top-1/2 left-0 w-full ">
            <PathLine color={"stroke-bg_content"} />
          </div>
          <span className="w-[3.4375rem] h-[3.4375rem] block bg-bg_content rounded-full shadow-inner absolute top-0 -left-[1.71875rem]"></span>
        </div>
      )}

      <div className="-mt-3 ">
        {true ? (
          <>
            {payment && (
              <>
                <div className="flex justify-start items-start flex-col gap-4 px-9">
                  <div className="w-full flex justify-start gap-2">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4077 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6697 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793ZM14.4181 5.48994C13.942 5.402 13.5048 5.70579 13.4142 6.17047C13.3236 6.63515 13.6283 7.08884 14.0914 7.17978C15.4857 7.45159 16.5623 8.53085 16.8351 9.92989V9.93089C16.9128 10.3336 17.2674 10.6264 17.6757 10.6264C17.7305 10.6264 17.7852 10.6214 17.841 10.6114C18.3041 10.5185 18.6088 10.0658 18.5182 9.60012C18.1109 7.51055 16.5025 5.89666 14.4181 5.48994ZM16.0001 15.0905C16.4515 14.8302 16.9615 14.5362 17.6047 14.673C18.1873 14.7959 20.1731 16.4078 20.7169 16.9665C21.0734 17.3322 21.2716 17.7099 21.3025 18.0877C21.3562 19.5697 19.3425 21.2615 18.976 21.4724C18.489 21.8231 17.9224 22 17.286 22C16.6357 22 15.9106 21.8151 15.1199 21.4464C10.8296 19.6556 4.27553 13.231 2.54266 8.97395C1.82362 7.38903 1.81864 6.08193 2.53071 5.09961C2.81454 4.63892 4.43288 2.71325 5.88192 2.7742C6.26733 2.80718 6.64179 3.00505 7.00928 3.3648C7.56499 3.90942 9.13653 5.90106 9.25803 6.48565C9.39247 7.13521 9.09769 7.65185 8.83576 8.10554C8.7799 8.20307 8.70463 8.31881 8.62217 8.4456C8.3092 8.92683 7.89264 9.56735 8.04004 9.97626C9.09669 12.5705 11.5376 14.8339 14.133 15.8972C14.5343 16.0431 15.1745 15.6235 15.6542 15.3092C15.7791 15.2273 15.8932 15.1525 15.9893 15.0967L16.0001 15.0905Z"
                          fill="#8E9190"
                        />
                      </svg>
                    </span>
                    <p className="font-bold">
                      تلفن :{" "}
                      <span className="font-[400]">۳۴۳۴***-۰۹۱۳۴۲****</span>
                    </p>
                  </div>
                  <div className="w-full flex justify-start gap-2">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.5 10.3178C3.5 5.71789 7.34388 2 11.9934 2C16.6561 2 20.5 5.71789 20.5 10.3178C20.5 12.6357 19.657 14.7876 18.2695 16.6116C16.7388 18.6235 14.8522 20.3765 12.7285 21.7524C12.2425 22.0704 11.8039 22.0944 11.2704 21.7524C9.13474 20.3765 7.24809 18.6235 5.7305 16.6116C4.34198 14.7876 3.5 12.6357 3.5 10.3178ZM9.19423 10.5768C9.19423 12.1177 10.4517 13.3297 11.9934 13.3297C13.5362 13.3297 14.8058 12.1177 14.8058 10.5768C14.8058 9.0478 13.5362 7.77683 11.9934 7.77683C10.4517 7.77683 9.19423 9.0478 9.19423 10.5768Z"
                          fill="#8E9190"
                        />
                      </svg>
                    </span>
                    <p className="font-bold">
                      آدرس مطب : <span className="font-[400]">{address}</span>
                    </p>
                  </div>
                </div>
                {latitude && longitude ? (
                  <div className="w-full px-6 mt-4">
                    <a
                      href={`geo:${latitude},${longitude}?q=${latitude},${longitude}`}
                      className="md:hidden"
                    >
                      <ButtonElement
                        fontWeight="bold"
                        typeButton="link"
                      >
                        <span>
                          <LocationIcon color={"fill-white"} />
                        </span>

                        <span>مسیریابی روی نقشه </span>
                      </ButtonElement>
                    </a>


                    <div className="hidden md:block">
                      <ButtonElement
                        fontWeight="bold"
                        typeButton="link"
                        handler={() =>
                          window.open(
                            "https://maps.google.com?q=" +
                            latitude +
                            "," +
                            longitude
                          )
                        }
                      >
                        <span>
                          <LocationIcon color={"fill-white"} />{" "}
                        </span>

                        <span>مسیریابی روی نقشه </span>
                      </ButtonElement>
                    </div>
                  </div>
                ) : null}
                <div className="md:hidden mt-4 px-5">
                  {
                    payment ?
                      <ButtonElement typeButton="transparent" >
                        <LinkElement link="profile/myappointments" >
                          دیدن نوبت ها
                        </LinkElement>
                      </ButtonElement> : null
                  }
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex justify-center items-start flex-col gap-4 px-9">
            <div className="w-full h-[2.8125rem] bg-[#D4FFDB] text-md rounded-sm flex justify-center items-center">
              {" "}
              بزودی با شما تماس گرفته خواهد شد
            </div>
            <div className="mt-2">
              <p className="text-md text-center ">
                <span className="font-bold">توجه : </span> تا ۳ مرتبه با شما
                تماس گرفته میشود، درصورت عدم پاسخگویی مشاوره شما سوخت خواهد شد.
                و در صورت عدم پاسخگویی پزشک هزینه پرداختی شما به کیف پول برگشت
                داده میشود.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* {
        payment ? (
          <div className="py-4 px-6">
            <ButtonElement typeButton="error" >لغو نوبت</ButtonElement>
          </div>
        ) : null
      } */}
    </div>
  );
};

export default AppointmentPrimaryCard;