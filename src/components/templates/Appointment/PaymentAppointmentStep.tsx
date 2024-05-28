"use client"
import useSelectAppointment from '@/hooks/useSelectAppointment'
import { PhysicianProfile } from '@/types/appointment'
import convertDayTime from '@utils/convertDayTime'
import convertToHour from '@utils/convertHour'
import AppointmentPrimaryCard from '@modules/cards/Appointment/AppointmentPrimaryCard'
import React from 'react'
import usePrice from '@/hooks/usePrice'
import BaseCard from '@/components/modules/cards/BaseCard'
import ButtonElement from '@/components/elements/ButtonElement'
import WalletIcon from '@/components/icons/profile/WalletIcon'
import priceSplitter from '@/utils/priceSplitter'
import useUserInfo from '@/hooks/useUserInfo'
import cn from '@/utils/clsxFun'
import Loader from '@/components/elements/Loader'

const PaymentAppointmentStep = ({ physician }: { physician: PhysicianProfile }) => {

  const { selectIndex, lockAppointmentInfo, appointmentInfo, patient , payment } = useSelectAppointment()
  const { index, chrageAmount, id, remainingSeconds, status } = lockAppointmentInfo
  const {user} = useUserInfo()
  
  const { price } = usePrice()
  console.log(price);
  const hourSplit = convertToHour()[selectIndex]?.split(":");
  let timeAppointment = {
    hour: +hourSplit[0],
    minute: +hourSplit[1],

  }

  return (
    <div className='relative'>

      {/* ----------section------------- */}
      {/* Appointment Card */}
      <section>
        <AppointmentPrimaryCard physician={physician} index={index} lockTime={remainingSeconds} month={appointmentInfo.month} year={appointmentInfo.year} price={price} day={appointmentInfo.day} time={timeAppointment} payment={false} />
      </section>
      {/* ----------section------------- */}

      {/* ----------section------------- */}
      {/* patient section */}
      <section className='mt-8 pb-[2rem]'>
        <BaseCard radius="rounded-md" title="مشخصات بیمار">
          <div className="grid grid-cols-2 gap-y-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-md">نام :</p>
                <p className="text-md">{patient.firstName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-md">شماره موبایل :</p>
                <p className="text-md">{patient.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-md">نام خانوادگی :</p>
                <p className="text-md">{patient.lastName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-md">کد ملی :</p>
                <p className="text-md">{patient.nationalNumber}</p>
              </div>
            </div>
          </div>
        </BaseCard>
      </section>
      {/* ----------section------------- */}

      {/* ----------button------------- */}
      {/* payment button */}
      <div className='sticky bottom-[1rem] left-0 w-full  '>
        <div className="w-full  px-2">
          {false ? (
            <ButtonElement
              disabled={true}
              typeButton='primary'
              fontWeight='bold'
            >
              انجام شد
            </ButtonElement>
          ) : (
            <>
              <div className="w-full h-[2.6875rem]  bg-white mb-2 rounded-lg px-3 text-md    shadow-shadow_category flex justify-between items-center">
                <div className="flex justify-start items-center gap-1">
                  <span>
                    <WalletIcon />{" "}
                  </span>
                  <p>
                    موجودی کیف پول:
                    <span>
                      {user.accountBalance === 0
                        ? " 0 "
                        : priceSplitter(user?.accountBalance / 10)}{" "}
                      تومان
                    </span>
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1">
                    {/* <span
                      className={cn(
                        `size-[0.375rem] rounded-full  block  `,
                        {
                          "bg-primary-100":
                            Number(user?.accountBalance) >= +price,
                          "bg-error": Number(user?.accountBalance) < +price,
                        }
                      )}
                    ></span> */}
                  <p
                    className={cn(` font-bold`, {
                      "text-primary-100":
                        Number(user.accountBalance) >= +price,
                      "text-error": Number(user.accountBalance) < +price,
                    })}
                  >
                    {Number(user.accountBalance) >= +price
                      ? "موجودی کافی"
                      : "موجودی ناکافی"}
                  </p>
                </div>
              </div>

              <ButtonElement
                disabled={payment.isLoading}
                typeButton='primary'
                handler={() => payment.mutate()}
                loading={payment.isLoading}
              >
                  پرداخت
              </ButtonElement>
            </>
          )}
        </div>
      </div>
      {/* ----------button------------- */}
    </div>
  )
}

export default PaymentAppointmentStep