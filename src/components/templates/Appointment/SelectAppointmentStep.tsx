"use client"
import React, { useEffect, useState } from 'react'
import { Firstppointment, PhysicianProfile, PhysicianProfileCalendar } from '@/types/appointment'
import TurnsIcon from '@icons/menu/TurnsIcon'

import convertMonthOfYear from '@/utils/convertMonthOfYear';
import cn from '@/utils/clsxFun';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import DayOfWeekButton from '@elements/DayOfWeekButton';
import convertDayOfWeek from '@/utils/convertDayOfWeek';
import ModalLogin from '@layouts/ModalLogin/ModalLogin';
import useModalLogin from '@/hooks/useModalLogin';
import useUserInfo from '@/hooks/useUserInfo';
import AppointmentRadioButton from '@elements/AppointmentRadioButton';
import useSelectAppointment from '@/hooks/useSelectAppointment';
import BaseCard from '@modules/cards/BaseCard';
import Image from 'next/image';
import ButtonElement from '@elements/ButtonElement';
import LinkElement from '@elements/LinkElement';
import Timer from '@modules/Timer';
import Modal from '@modules/modals/Modal';
import BottomSheetAndCenterContent from '@modules/modals/BottomSheetAndCenterContent';
import CloseButton from '@elements/CloseButton';


const SelectAppointmentStep = ({ calendar, physician, ramainingTime, times, firstAppointment, changeStep }: { calendar: PhysicianProfileCalendar[], physician: PhysicianProfile, ramainingTime: number, times: string[], firstAppointment: Firstppointment | null, changeStep: (step: 1 | 2) => void }) => {


  const [selectAppointmentBeforeSign, setSelectAppointmentBeforeSign] = useState({
    year: "",
    month: "",
    day: "",
    physicianId: "",
    physicianUrl: "",
    index: 0,
    calendar: ""
  })
  const [showModalRules, setShowModalRules] = useState(false)
  const [showModalRulesArenap, setShowModalRulesArenap] = useState(false)



  const [activeTab, setActiveTab] = useState(calendar.findIndex(item => item.available === true) ? calendar.findIndex(item => item.available === true) : 0)
  const [activeMonth, setActiveMonth] = useState<string | number | undefined>(calendar.findIndex(item => item.available === true) ? calendar.find(item => item.available === true)?.calendar.month : calendar.find(item => item.available === false)?.calendar.month)
  const [showWarningRules, setShowWarningRules] = useState(false)

  const showHoursType = !physician.doNotShowMyCalendar



  //Authorization
  const { openModalLogin } = useModalLogin()
  const { isLogin, user } = useUserInfo()
  const [callbackIndex, setCallbackIndex] = useState(0)
  const callbacks = [() => {
    selectAppointment(selectAppointmentBeforeSign.year, selectAppointmentBeforeSign.month, selectAppointmentBeforeSign.day, selectAppointmentBeforeSign.index, selectAppointmentBeforeSign.calendar, selectAppointmentBeforeSign.physicianId, selectAppointmentBeforeSign.physicianUrl)
    setShowModalRules(true)
  }, () => {
    firstAppointmentHandler.mutate({ physicianProfileId: physician.id, physicianProfileUrl: physician.physicianProfileUrl })

    for (let i = 0; i < calendar.length; i++) {
      if (calendar[i].calendar.id === appointmentInfo.calendarId) {
        setActiveTab(i);
      }
    }


  }, () => { lockedAppointmentHandler.mutate() }]




  //selectAppointment
  const { selectAppointment, offSelectHandler, isSelectAppointment, selectIndex, selectCalendarId, isNextStep, lockedAppointmentHandler, firstAppointmentHandler, appointmentInfo } = useSelectAppointment()



  const nextStepHandler = () => {
    if (isLogin === "isLoading") return
    if (isLogin === "unauthorization") {
      openModalLogin()
      setCallbackIndex(2)
      return
    }

    lockedAppointmentHandler.mutate()
  }

  useEffect(() => {
    if (lockedAppointmentHandler.isSuccess) {
      changeStep(2)
    }


  }, [lockedAppointmentHandler.isSuccess])



  let time = new Date()
  time.setSeconds(time.getSeconds() + ramainingTime)


  const getFirstAppointment = () => {
    if (isLogin === "isLoading") return;
    if (isLogin === "unauthorization") {
      openModalLogin()
      setCallbackIndex(1)
      return
    }
    firstAppointmentHandler.mutate({ physicianProfileId: physician.id, physicianProfileUrl: physician.physicianProfileUrl })


  }

  const selectHandler = (calendar: PhysicianProfileCalendar, index: number) => {
    if (isLogin === "isLoading") return
    if (isLogin === "unauthorization") {
      setSelectAppointmentBeforeSign({
        year: calendar.calendar.year,
        month: calendar.calendar.month,
        day: calendar.calendar.dayOfMonth,
        index: index,
        calendar: calendar.calendar.id,
        physicianId: physician.id,
        physicianUrl: physician.physicianProfileUrl
      })
      openModalLogin()
      setCallbackIndex(0)
      return
    }


    selectAppointment(calendar.calendar.year, calendar.calendar.month, calendar.calendar.dayOfMonth, index, calendar.calendar.id, physician.id, physician.physicianProfileUrl)

  }

  useEffect(() => {
    if (
      showHoursType === false
    ) {

      const timesPanel = document.getElementById(`day-${appointmentInfo.calendarId}`);
      const timeElement: any = document.getElementById(
        `btn-${appointmentInfo.calendarId}-${appointmentInfo.index}`
      );

      timesPanel?.scroll({
        left: timeElement.offsetLeft + 90 - timesPanel.offsetWidth,
        behavior: "smooth",
      });
    }

    for (let i = 0; i < calendar.length; i++) {
      if (calendar[i].calendar.id === appointmentInfo.calendarId) {
        setActiveTab(i);
      }
    }
  }, [appointmentInfo])


  useEffect(() => {
    offSelectHandler()
    setActiveTab(calendar.findIndex(item => item.available === true) ? calendar.findIndex(item => item.available === true) : 0)
  }, [])


  return (
    <>
      <ModalLogin callbacks={callbacks} isCallback={true} callbacksIndex={callbackIndex} />

      {/* ----------header------------- */}
      <header className=''>
        <div className="mt-4 flex justify-start items-center gap-2">
          <div className="size-[2.625rem] rounded-full bg-white shadow-shadow_category flex justify-center items-center">
            <TurnsIcon active={false} />
          </div>
          <h1 className="h-[2.625r] px-2 rounded-3xl text-lg font-bold bg-white shadow-shadow_category flex justify-center items-center">
            نوبت دهی اینترنتی مطب دکتر {physician.firstName} {physician.lastName}
          </h1>
        </div>
      </header>
      {/* ----------header------------- */}

      {/* ----------main------------- */}
      <main>

        {/* ----------section------------- */}
        {/* Tabs section */}
        <section>
          {
            ramainingTime > 0 ? (<div className="flex flex-col gap-3 p-4 bg-white shadow-no_appointment_timer rounded-sm mt-5">
              <div className="flex items-center gap-3">
                <Image
                  width={400}
                  height={400}
                  className="size-[5.3125rem]"
                  src={"/Clock.png"}
                  alt="clock-image"
                />
                <p>امکان ثبت نوبت از ۱۲ شب تا ۹:۳۰ امکان پذیر نخواهد بود</p>
              </div>

              <div className="flex">
                <p className="ml-2">زمان تا شروع نوبت دهی:</p>
                <div className="font-bold">
                  <Timer

                    expiryTimestamp={time}
                    expireHandler={() => window.location.reload()}
                  />
                </div>
              </div>
            </div>
            ) : (
              <div className="mt-8 flex justify-center items-center gap-2">
                <span className="text-lg font-bold">
                  {convertMonthOfYear(activeMonth)} {1402}
                </span>
                <span>
                  <TurnsIcon active={false} />{" "}
                </span>
              </div>
            )
          }


          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => {
              setActiveTab(index)
            }}
            className="mt-6"
          >
            <TabList
              className={cn(
                `flex justify-start items-center appointments_scroll pb-2 gap-1 overflow-x-auto `, {
                "hidden": ramainingTime > 0
              }
              )}
            >
              {calendar.map((item, index) => (
                <Tab
                  key={item.calendar.id}

                  className={"outline-none"}
                  disabled={!item.available}
                >
                  <label htmlFor={item.calendar.id} >
                    <DayOfWeekButton
                      disabled={item.available}
                      selected={activeTab === index}
                      dayOfWeek={convertDayOfWeek(
                        +item.calendar.dayOfWeek
                      )}
                      isAppointment={item.calendar.id === selectCalendarId}
                      dayOfMonth={item.calendar.dayOfMonth}
                    />
                    <input
                      name="day-of-week"
                      type="radio"
                      id={item.calendar.id}
                      value={item.calendar.id}
                      onChange={(e) => {
                        if (item.available === false) return;
                        setActiveTab(index);
                        setActiveMonth(item?.calendar?.month)
                      }}
                      hidden
                    />
                  </label>
                </Tab>
              ))}
            </TabList>
            <div className="mt-6 py-2 relative min-h-[6.25rem]">
              <div
                className={cn(
                  `flex justify-center items-center gap-2 text-center text-lg font-bold mb-4 `,
                  {
                    "text-gray-500": ramainingTime > 0,
                  }
                )}
              >
                انتخاب ساعت مشاوره

              </div>
              {firstAppointment === null && ramainingTime <= 0 && (
                <div className="flex flex-col gap-2 absolute z-[15]  left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-md drop-shadow-[0px_0px_4px_rgba(0,0,0,1)] ">
                    نوبت خالی پیدا نشد!
                  </p>

                </div>
              )}

              {
                // map in calendar 
                calendar.map((item, indexP) => (
                  <TabPanel key={item.calendar.id}>
                    <div
                      id={`day-${item.calendar.id}`}
                      className={cn(
                        `w-auto flex justify-start items-center gap-2 `,
                        {
                          "flex-wrap grid grid-cols-3 min-[380px]:grid-cols-4 md:grid-cols-6":
                            showHoursType,
                          "overflow-auto appointments_scroll py-2":
                            !showHoursType,
                        }
                      )}

                    >
                      {times.map((time, index) =>
                        calendar[indexP].availableHours[index] === "1" ? (
                          <button
                            type="button"
                            key={index}
                            id={`btn-${item.calendar.id}-${index}`}
                            className={cn(`w-full gap-2 relative`, {
                              "flex justify-start items-center ":
                                !showHoursType,
                            })}
                          >
                            {isLogin === "unauthorization" ? (
                              <span className="absolute top-0 left-0 z-10 block w-full h-full" onClick={() => {
                                selectHandler(item, index)
                              }}></span>
                            ) : null}
                            <AppointmentRadioButton name="Appointment_time" active={true} calendarId={item.calendar.id}
                              handler={() => selectHandler(item, index)}

                              index={index} ramainingTime={ramainingTime} selected={selectIndex === index && selectCalendarId === item.calendar.id} time={times[index]} />
                          </button>

                        ) : calendar[indexP].availableHours[index] ===
                          "2" ||
                          calendar[indexP].availableHours[index] ===
                          "3" ? (
                          <button
                            type="button"
                            key={index}
                            className={cn(` w-full gap-2`, {
                              "flex justify-start items-center cursor-default ":
                                !showHoursType,
                            })}
                            disabled
                          >
                            <AppointmentRadioButton name="Appointment_time" active={false} calendarId={item.calendar.id} handler={() => console.log("first")} index={index} ramainingTime={ramainingTime} selected={false} time={times[index]} />
                          </button>
                        ) : null
                      )}
                    </div>
                  </TabPanel>
                ))
              }
            </div>
          </Tabs>
        </section>
        {/* ----------section------------- */}




        {/* ----------section------------- */}
        {/* buttons */}
        <section className="mt-6  sticky bottom-[1.25rem] w-full left-0 flex justify-center items-center z-[14]">
          <div className="w-full max-w-[118.75rem]   gap-2 ">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ButtonElement
                  disabled={
                    ramainingTime > 0 || firstAppointmentHandler.isLoading || firstAppointment === null
                  }
                  fontWeight='bold'
                  loading={firstAppointmentHandler.isLoading}
                  typeButton={
                    ramainingTime > 0 || firstAppointment === null ? "gray-light" : "primary"
                  }

                  handler={getFirstAppointment}
                >


                  اولین نوبت خالی

                </ButtonElement>


              </div>
              <div>
                <ButtonElement
                  disabled={!isNextStep}
                  typeButton={!isNextStep ? "gray-light" : "primary"}
                  fontWeight='bold'
                  handler={() => setShowModalRules(true)}
                  loading={lockedAppointmentHandler.isLoading}
                >

                  قدم بعدی

                </ButtonElement>
              </div>
            </div>
          </div>
        </section>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        <section>
          {
            isLogin === "authorization" && user?.accountBalance < 100000 && (
              <>
                <p className="text-sm md:text-md mt-4 text-center"> میتوانید کیف پول خود را برای دریافت یک  یا چند نوبت شارژ کنید </p>
                <div className="text-center text-sm md:text-md"><LinkElement className="text-primary font-bold" link={`profile/wallet`}>افزایش اعتبار کیف پول</LinkElement></div>
              </>
            )
          }
        </section>
        {/* ----------section------------- */}

      </main>
      {/* ----------main------------- */}


      {/* ----------Modal------------- */}
      {/* rules modal and lock appointment */}
      <Modal show={showModalRules} closeHandler={() => setShowModalRules(false)}>
        <BottomSheetAndCenterContent show={showModalRules}>
          <div className="flex justify-between items-center ">
            <div></div>
            <p className="font-bold">شرایط پزشک</p>
            <div><CloseButton closeHanlder={() => setShowModalRules(false)} /></div>
          </div>
          <div className="mt-6 rounded-sm bg-bg_content p-4 max-h-[12.5rem] overflow-y-auto">
            <DropInfo
              physician={physician}
            />
          </div>
          <div className="flex justify-start items-center gap-1 my-2 text-md">
            <p>مشاهده</p>
            <button type="button" className="text-primary font-bold" onClick={() => {
              setShowModalRulesArenap(true)
              setShowModalRules(false)

            }} >شرایط و قوانین آرناپ</button>
          </div>
          <div className="mt-4">
            <ButtonElement loading={lockedAppointmentHandler.isLoading} typeButton='primary' handler={nextStepHandler} disabled={ramainingTime > 0 || firstAppointment === null || selectIndex === null}>
              شرایط پزشک و آرناپ را میپذیرم
            </ButtonElement>
          </div>
        </BottomSheetAndCenterContent>
      </Modal>
      {/* ----------Modal------------- */}

      {/* ----------Modal------------- */}
      {/* Arenap Rules Modal */}
      <Modal
        show={showModalRulesArenap}
        closeHandler={() => {
          setShowModalRulesArenap(false)
          setShowModalRules(true)
        }}
      >
        <BottomSheetAndCenterContent show={showModalRulesArenap} >
          <div className=" overflow-y-auto h-[calc(100vh-150px)]">
            <span className="absolute top-[1.875rem] rtl:left-[0.9375rem] ltr:right-[0.9375rem] xs:rtl:left-[1.875rem] xs:ltr:right[1.875rem] z-50">
              <CloseButton closeHanlder={() => {
                setShowModalRulesArenap(false)
                setShowModalRules(true)
              }} />
            </span>
            <p className="text-center font-bold text-lg mt-2">
              قوانین و شرایط آرناپ
            </p>
            <div className="mt-6 flex justify-between items-center gap-6 flex-col  py-[3.125rem]">
              <BaseCard bg="bg-bg_content" title={"قوانین و مقررات آرناپ"}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col'>
                  <p>
                    سلام و درود خدمت همراهان گرامی آرناپ
                  </p>
                  <p>
                    به پاس اعتماد شما عزیزان تیم آرناپ همواره در تلاش برای ایجاد فضایی امن و راحت برای نوبت گیری از پزشکان مورد نظرتان میباشد.
                  </p>
                  <p>
                    جهت بهبود عملکرد قوانین و مقررات را مطالعه و تایید نمایید.
                    (سپاس از همراهی شما)
                  </p>
                  <p className='text-error font-bold'> عدم رعایت هر یک از قوانین توسط شما منجر به غیر فعال شدن حساب کاربریتان میشود . </p>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"قوانین و شرایط حساب کاربری :"}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                    <li className='w-full'>نگهداری اطلاعات از طریق رمزنگاری پیشرفته به وسیله بروزترین روش های روز دنیا بروی فضای امن ابری صورت میگیرد.</li>
                    <li>از حساب کاربری خود حفاظت کنید در صورت هرگونه خسارت و آسیب آرناپ هیچگونه مسئولیتی را بر عهده نمی گیرد.</li>
                    <li>درهنگام وارد کردن اطلاعات خود در حساب کاربری از صحت آن اطمینان حاصل فرمایید,درصورت مشاهده هرگونه تناقض اطلاعات وارده شده با اطلاعات واقعی شما حساب کاربریتان غیرفعال میشود.</li>
                    <li>پس از ثبت اطلاعات خود شما اجازه ی ارسال پیامک از سمت آرناپ  به شماره ای که وارد کرده اید را می دهید .</li>
                    <li>این پیامک جهت اطلاع رسانی خدمات و سرویس های مناسب با درخواست شما از پلتفرم آرناپ مثل: ثبت نوبت , لغو نوبت و ورود به سایت میباشد.</li>
                  </ul>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"لغو نوبت توسط بیمار :"}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                    <li>اگر در طی یک ماه تعداد نوبت های لغو شده توسط شما به 5 عدد برسد شما تا 24ساعت پس از آن قابلیت نوبت گیری نخواهید داشت</li>
                    <li>با هر حساب کاربری شما در یک شیفت کاری پزشک مورد نظرتان فقط نوبت میتوانید دربافت کنید.</li>
                    <li>سامانه آرناپ محدودیتی برای نوبت گرفتن از چند پزشک ندارد.</li>
                    <li>در صورت لغو نوبت توسط شما مبلغ پرداختی به طور کامل به کیف پول شما در حساب کاربریتان انتقال خواهد یافت.</li>
                    <li>شش ساعت مانده به زمان نوبت قابلیت لغو وجود نخواهد داشت.</li>
                    <li>برای دریافت اعتبار موجود در کیف پول با پشتیبان تماس بگیرید.</li>
                  </ul>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"قوانین و مقررات ثبت و امتیاز دهی :"}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                    <li>انتقال تجربه مراجعه شما به سایر کاربران در بهبود فرایند در زمان و ارتقا خدمات پزشکی نقش به سزایی دارد و این امکان را فراهم می سازد تا سایر کاربران برای گرفتن نوبت و خدمات مورد نظرشان از پزشک پروسه راحت و دقیق تری را طی کند.</li>
                  </ul>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"چگونه در آرناپ امتیاز دهی به پزشک را انجام دهیم :"}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                    <li>پس از ورود و ثبت نام شما در سامانه آرناپ شما میتوانید نظرتان را برای پزشک ثبت نمایید. اما برای امتیازدهی باید توسط پزشک ویزیت شده باشید.</li>
                    <li>در صورت تمایل به امتیازدهی برای پزشک شما ملزم به ثبت زمان انتظار در مطب میباشید.</li>

                  </ul>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"نمایش نظرات شما : "}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                    <li>به منظور قوانین و مقررات و رعایت اصول اخلاقی نظر شما قبل از نشان دادن در پروفایل پزشک نیاز به تایید کارشناسان سایت دارد.</li>
                  </ul>
                </div>
              </BaseCard>
              <BaseCard bg="bg-bg_content" title={"قوانین ثبت نظر: "}>
                <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                  <p>در هنگام ثبت نظر موارد زیر را در نظر بگیرید : </p>
                  <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2 mt-2'>
                    <li>
                      <span className='font-bold'>نظرات با عنوان تبلیغاتی : </span>
                      نوشتن هرگونه نظر با مضنون تبلیغ برای برندها و محصولات درمانی و بهداشتی و مراکز اکیدا ممنوع می باشد و از طرف کارشناسان سایت تایید نخواهد شد.
                    </li>
                    <li>
                      <span className='font-bold'> محتوای غیر مجاز : </span>
                      ثبت نظر با محتوای سیاسی , نژادپرستانه , غیراخلاقی , توهین به عقاید و مذهب مجاز نمی باشد.
                    </li>
                    <li>
                      <span className='font-bold'>رعایت احترام و ادب : </span>
                      نظر ثبت شده باید با رعایت اصول اخلاقی , ادب و احترام نوشته شوند هرگونه بی احترامی به پزشک , منشی و کادر درمان منجر به رد نظر و عدم نمایش و انتشار خواهد شد.
                    </li>
                    <li>
                      <span className='font-bold'>حقوق مادی و معنوی و اختصاصی بودن محتوا : </span>
                      کلیه حقوق مادی و معنوی این وب سایت متعلق به شرکت فنی و مهندسی طراحان سیستم پنام است و هرگونه کپی برداری از محتوای سایت پیگرد قانونی دارد.
                    </li>

                  </ul>

                </div>
              </BaseCard>

            </div>
          </div>
        </BottomSheetAndCenterContent>
      </Modal>
      {/* ----------Modal------------- */}

    </>
  )
}

export default SelectAppointmentStep

const DropInfo = ({ physician }: { physician: PhysicianProfile }) => {


  const splitTerms = physician?.terms?.split("\n");

  return (

    <div >
      <ul
        className={cn(
          `flex justify-start items-start flex-col px-2 gap-1  text-md relative `,

        )}
      >
        <li className="list-disc">
          ساعت اعلام شده تقریبی است و زمان ویزیت شما توسط منشی تعیین میگردد
        </li>
        {physician?.description ? (
          <li className="list-disc">{physician?.description}</li>
        ) : null}

        {
          splitTerms?.length
            ? splitTerms.map((item: string, index: number) => (
              <li className="list-disc" key={index}>
                {item}
              </li>
            ))
            : null}
      </ul>

    </div>

  );
};