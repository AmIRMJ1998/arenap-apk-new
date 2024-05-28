"use client";


import Loader from "@/components/elements/Loader";


import FilterIcon from "@/components/icons/FilterIcon";

import convertDayTime from "@utils/convertDayTime";
import planNameConvert from "@utils/planNameConvert";
import statusApppointmentHandler from "@utils/statusApppointment";





import Image from "next/image";


import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import cn from "@/utils/clsxFun";
import Modal from "@modules/modals/Modal";
import BottomSheetAndCenterContent from "@modules/modals/BottomSheetAndCenterContent";
import ButtonElement from "@elements/ButtonElement";
import CloseButton from "@elements/CloseButton";
import useMyAppointments from "@/hooks/useMyAppointments";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import Checkbox from "@elements/inputs/Checkbox";
import { MyAppointmentType } from "@/types/appointment";
import LinkElement from "@elements/LinkElement";

const MyAppointmentsPage = () => {





  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // appointments hook
  const { isLoading, myAppointments } = useMyAppointments()

  const [pastAppointmentsUi, setPastAppointmentsUi] = useState<MyAppointmentType[]>([])
  const [fetureAppointmentsUi, setFetureAppointmentsUi] = useState<MyAppointmentType[]>([])

  const [disabledFilter, setDisabledFilter] = useState(false)

  const [filters, setFilters] = useState<{
    onlineAppointment: boolean,
    textConsultation: boolean,
    voiceConsultation: boolean,
    immediateConsultation: boolean,
    [key: string]: boolean;
  }>({
    onlineAppointment: true,
    textConsultation: true,
    voiceConsultation: true,
    immediateConsultation: true,
  });


  //disabled filter
  const disabledFilterHandler = (val: boolean) => {
    if (val) {
      const futureAppointments = myAppointments?.filter((item: MyAppointmentType) => item.passedOrFuture !== "Passed")
      const pastAppointments = myAppointments?.filter((item: MyAppointmentType) => item.passedOrFuture === "Passed")

      const pastArray: MyAppointmentType[] = pastAppointments.filter((item: MyAppointmentType) => item?.status === "Is Deleted By User" || item?.status === "Is Deleted By Physician")

      const fetureArray: MyAppointmentType[] = futureAppointments.filter((item: MyAppointmentType) => item?.status === "Is Deleted By User" || item?.status === "Is Deleted By Physician")

      setPastAppointmentsUi(pastArray)
      setFetureAppointmentsUi(fetureArray)
      return {
        past: pastArray,
        feture: fetureArray
      }
    }


    return {
      past: myAppointments?.filter((item: MyAppointmentType) => item.passedOrFuture === "Passed"),
      feture: myAppointments?.filter((item: MyAppointmentType) => item.passedOrFuture !== "Passed")
    }
  }


  //Filtering appointments based on defined filters
  useEffect(() => {



    if (!isLoading) {
      let pastArray: MyAppointmentType[] = []
      let fetureArray: MyAppointmentType[] = []

      for (let i in filters) {
        if (filters[i]) {
          const past = disabledFilterHandler(disabledFilter)?.past?.length > 0 ? disabledFilterHandler(disabledFilter)?.past?.filter((item: MyAppointmentType) => item[i] === filters[i]) : [];

          const feture = disabledFilterHandler(disabledFilter)?.feture?.length > 0 ? disabledFilterHandler(disabledFilter)?.feture?.filter((item: MyAppointmentType) => item[i] === filters[i]) : [];

          pastArray = [...pastArray, ...past];
          fetureArray = [...fetureArray, ...feture];
        }
      }

      let sortFetureArray = fetureArray.filter((value, index) => { return fetureArray.indexOf(value) === index; })

      let sortPastArray = pastArray.filter((value, index) => { return pastArray.indexOf(value) === index; })

      setPastAppointmentsUi(sortPastArray)
      setFetureAppointmentsUi(sortFetureArray)
    }

  }, [filters, disabledFilter, myAppointments, isLoading]);





  return (
    <>
      <TitlePagesMobile title={"نوبت های من"} />
      <div className="">
        <Tabs
          selectedIndex={activeTab}
          onSelect={(index) => setActiveTab(index)}
          selectedTabClassName="pb-2 border-b-[0.1875rem] border-[#00A29E] font-bold"
        >
          <TabList>
            <div className="grid grid-cols-2 text-center gap-2 bg-white rounded-sm shadow-shadow_category py-3 px-5 mt-6 mb-2">
              <Tab className="px-2 cursor-pointer">
                <button type="button">نوبت های آینده من</button>
              </Tab>
              <Tab className="px-2 cursor-pointer">
                <button type="button">نوبت های گذشته من</button>
              </Tab>
            </div>
          </TabList>

          <div
            className="flex justify-start items-center"
            onClick={() => setShowModal(true)}
          >
            <button
              type="button"
              // onClick={() => setShowFilterModal(true)}
              className="bg-white  min-w-[12.5rem] h-[3.4375rem] rounded-sm shadow-shadow_category flex justify-center items-center gap-2 px-2"
            >
              <FilterIcon />
              <span className="text-lg font-bold ">فیلترها</span>
              <span className="text-sm ">
                ({Object.values(filters).filter((item) => item === true).length + (disabledFilter ? 1 : 0)}
                مورد)
              </span>
            </button>
          </div>
          {/* feture appointments */}
          <TabPanel>
            {isLoading ? (
              <div className="mt-4 grid grid-col-1 md:grid-cols-2 gap-2 flex-col ">
                <AppointmentCardLoading />
                <AppointmentCardLoading />
                <AppointmentCardLoading />
                <AppointmentCardLoading />
                <AppointmentCardLoading />
              </div>
            ) : null}

            {!fetureAppointmentsUi?.length && !isLoading ? (
              <div className="h-[calc(100vh-400px)] flex justify-center items-center flex-col gap-8">
                <div>
                  <Image
                    src={"/noPeoples.png"}
                    width={500}
                    height={500}
                    alt="noPeoples_image"
                    className="w-full"
                  />
                </div>
                <div className="flex justify-start items-center gap-4 flex-col">
                  <p className="text-md font-bold ">در حال حاضر نوبتی گرفته نشده !!</p>
                  <p className="text-md ">برای گرفتن نوبت به صفحه جستجو وارد شوید </p>
                  <div className="w-[13.75rem]">
                    <LinkElement link="/search">
                      <ButtonElement
                        typeButton="primary"
                        fontWeight="bold"
                        fontSize="md"
                        size="sm"
                      >
                        جستجو کن!
                      </ButtonElement>
                    </LinkElement>
                  </div>
                </div>
              </div>
            ) : null}

            {fetureAppointmentsUi?.length && !isLoading ? (
              <div className="mt-4 grid grid-cols-1 min-[1200px]:grid-cols-2 gap-2">
                {fetureAppointmentsUi?.map((item: MyAppointmentType) => (
                  <AppointmentCard key={item.id} {...item} />
                ))}
              </div>
            ) : null}
          </TabPanel>
          {/* past appointments */}
          <TabPanel>
            {!pastAppointmentsUi?.length ? (
              <div className="h-[calc(100vh-400px)] flex justify-center items-center flex-col gap-8">
                <div>
                  <Image
                    src={"/noPeoples.png"}
                    width={500}
                    height={500}
                    alt="noPeoples_image"
                    className="w-full"
                  />
                </div>
                <div className="flex justify-start items-center gap-4 flex-col">
                  <p className="text-md font-bold ">نوبت گذشته ای وجود ندارد</p>
                  <p className="text-md ">برای گرفتن نوبت به صفحه جستجو وارد شوید  </p>
                  <div className="w-[13.75rem]">
                    <LinkElement link="/search">
                      <ButtonElement
                        typeButton="primary"
                        fontSize="md"
                        fontWeight="bold"
                        size="sm"
                      >
                        جستجو کن!
                      </ButtonElement>
                    </LinkElement>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="mt-4 grid grid-cols-1 min-[1200px]:grid-cols-2 gap-2">
                  {pastAppointmentsUi?.map((item: MyAppointmentType) => (
                    <AppointmentCardOff key={item.id} {...item} />
                  ))}
                </div>
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>

      <Modal show={showModal} closeHandler={() => setShowModal(false)}>
        <BottomSheetAndCenterContent show={showModal}>
          <div>
            <span className="absolute top-[1.875rem] rtl:left-[0.9375rem] ltr:right-[0.9375rem] xs:rtl:left-[1.875rem] xs:ltr:right[1.875rem]">
              <CloseButton closeHanlder={() => setShowModal(false)} />
            </span>
            <p className="flex justify-center items-center h-[2.5rem] font-bold ">
              فیلترها
            </p>
            <div className="mt-4 flex justify-start items-start gap-2 flex-col ">
              {Object.keys(filters).map((item, index) => (

                <Checkbox
                  key={item}
                  title={planNameConvert(item)}
                  id={item}
                  checkHandler={(e) => {
                    setFilters({
                      ...filters,
                      [e.target.name]: !Object.values(filters)?.[index]
                    })
                    // filterAppintmentHandler(e.target.checked, item)
                  }}
                  checked={Object.values(filters)?.[index]}
                  name={Object.keys(filters)?.[index]}
                />



              ))}
              <Checkbox

                title={planNameConvert("disabled")}

                checkHandler={(e) => {
                  setDisabledFilter(!disabledFilter)
                  disabledFilterHandler(e.target.checked)
                }}
                checked={disabledFilter}
                name={"disabled"}
              />
            </div>
          </div>
        </BottomSheetAndCenterContent>
      </Modal>
    </>
  );
};

export default MyAppointmentsPage;

const AppointmentCard = (props: MyAppointmentType) => {

  const [showModalDelete, setShowModalDelete] = useState(false)
  const { calendar, index, physicianProfileId, physicianProfileUrl } = props;
  const { cancelMutation } = useMyAppointments()

  //cancel appointment handler
  const cancelHanlder = (calendarId: string, index: number, physicianProfileUrl: string) => {
    cancelMutation.mutate({
      calendarId,
      index,
      physicianProfileUrl
    })
  }
  useEffect(() => {
    if (cancelMutation.isSuccess) {
      setShowModalDelete(false)
    }
  }, [cancelMutation.isSuccess])
  return (
    <>
      <div className="bg-white rounded-sm shadow-shadow_category  w-full  flex justify-start items-start flex-col gap-2">
        <div className="p-4  w-full flex justify-between items-center ">

          <LinkElement link={`appointment/online-appointment/${props.physicianProfileUrl}`} className="relative">
            <Image
              src={props.hasImage ? getUrlImage(props.physicianProfileId) : "/noImage.jfif"}
              width={500}
              height={500}
              alt="doctor_profile"
              className="w-[3.75rem] h-[3.75rem] rounded-full z-1"
            />

            <span className="w-[1rem] h-[1rem] bg-white rounded-full absolute bottom-0 rtl:right-0 ltr:left-0 flex justify-center items-center ">
              <span
                className={cn(`w-[0.75rem] h-[0.75rem]  rounded-full `, {
                  "bg-primary-100": props.immediateConsultation,
                  "bg-gray-400": !props.immediateConsultation,
                })}
              ></span>
            </span>
          </LinkElement>
          <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[3.75rem]">
            <div className="flex justify-between items-center w-full">
              <p className="text-lg  ">{props.physicianName}</p>
              <div className="flex justify-between items-center ">
                <span className="min-w-[5.9375rem] h-[2.1875rem] bg-[#EBFFEC] text-[#80BB82] rounded-sm flex justify-center items-center text-md font-bold">
                  حضوری
                </span>
                {/* <span className='min-w-[5.9375rem] h-[2.1875rem] bg-[#F0F6FF] text-[#5C7ED7] rounded-sm flex justify-center items-center text-md font-bold'>متنی</span> */}
                {/* <span className='min-w-[5.9375rem] h-[2.1875rem] bg-[#F8F1FF] text-[#9270E2] rounded-sm flex justify-center items-center text-md font-bold'>تلفنی</span> */}
              </div>
            </div>
            <p className="short-text-2 text-md">
              {props.specialities[0]?.specialityTitle}
            </p>
          </div>
        </div>
        <div className="flex justify-start items-start gap-2 flex-col px-4 text-md">
          <div className="flex justify-start items-center gap-3">
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
                  d="M16.4109 2.76862L16.4119 3.51824C19.1665 3.73413 20.9862 5.61119 20.9891 8.48975L21 16.9155C21.0039 20.054 19.0322 21.985 15.8718 21.99L8.15188 22C5.01119 22.004 3.01482 20.027 3.01087 16.8795L3.00001 8.55272C2.99606 5.65517 4.75153 3.78311 7.50617 3.53024L7.50518 2.78061C7.5042 2.34083 7.83001 2.01 8.26444 2.01C8.69886 2.009 9.02468 2.33883 9.02567 2.77861L9.02666 3.47826L14.8914 3.47027L14.8904 2.77062C14.8894 2.33084 15.2152 2.001 15.6497 2C16.0742 1.999 16.4099 2.32884 16.4109 2.76862ZM4.52148 8.86157L19.4696 8.84158V8.49175C19.4272 6.34283 18.349 5.21539 16.4138 5.04748L16.4148 5.81709C16.4148 6.24688 16.0801 6.5877 15.6556 6.5877C15.2212 6.5887 14.8943 6.24887 14.8943 5.81909L14.8934 5.0095L9.02863 5.01749L9.02962 5.82609C9.02962 6.25687 8.70479 6.5967 8.27036 6.5967C7.83594 6.5977 7.50913 6.25887 7.50913 5.82809L7.50815 5.05847C5.58286 5.25137 4.51753 6.38281 4.52049 8.55072L4.52148 8.86157ZM15.2399 13.4043V13.4153C15.2498 13.8751 15.625 14.2239 16.0801 14.2139C16.5244 14.2029 16.8789 13.8221 16.869 13.3623C16.8483 12.9225 16.4918 12.5637 16.0485 12.5647C15.5944 12.5747 15.2389 12.9445 15.2399 13.4043ZM16.0554 17.892C15.6013 17.882 15.235 17.5032 15.234 17.0435C15.2241 16.5837 15.5884 16.2029 16.0426 16.1919H16.0525C16.5165 16.1919 16.8927 16.5707 16.8927 17.0405C16.8937 17.5102 16.5185 17.891 16.0554 17.892ZM11.1721 13.4203C11.1919 13.8801 11.568 14.2389 12.0222 14.2189C12.4665 14.1979 12.821 13.8181 12.8012 13.3583C12.7903 12.9085 12.425 12.5587 11.9807 12.5597C11.5266 12.5797 11.1711 12.9605 11.1721 13.4203ZM12.0262 17.8471C11.572 17.8671 11.1968 17.5082 11.1761 17.0485C11.1761 16.5887 11.5305 16.2089 11.9847 16.1879C12.429 16.1869 12.7953 16.5367 12.8052 16.9855C12.8259 17.4463 12.4705 17.8261 12.0262 17.8471ZM7.10433 13.4553C7.12408 13.915 7.50025 14.2749 7.95442 14.2539C8.39872 14.2339 8.75317 13.8531 8.73243 13.3933C8.72256 12.9435 8.35725 12.5937 7.91196 12.5947C7.45779 12.6147 7.10334 12.9955 7.10433 13.4553ZM7.95837 17.8521C7.5042 17.8731 7.12901 17.5132 7.10828 17.0535C7.10729 16.5937 7.46273 16.2129 7.9169 16.1929C8.3612 16.1919 8.7275 16.5417 8.73737 16.9915C8.7581 17.4513 8.40365 17.8321 7.95837 17.8521Z"
                  fill="#313033"
                />
              </svg>
            </span>
            <p>
              <span>{`${props.hour}:${props.minute}`}</span>{" "}
              <span>{convertDayTime(+props.hour)}</span>
            </p>
          </div>
          <div className="flex justify-start items-center gap-3">
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
                  d="M16.335 2.75021H7.66598C4.64498 2.75021 2.75098 4.88921 2.75098 7.91621V16.0842C2.75098 19.1112 4.63498 21.2502 7.66598 21.2502H16.334C19.365 21.2502 21.251 19.1112 21.251 16.0842V7.91621C21.251 4.88921 19.365 2.75021 16.335 2.75021Z"
                  stroke="#313033"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.392 14.0177L12.001 11.9947V7.63373"
                  stroke="#313033"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              <span>تاریخ : </span>
              <span>
                {calendar.year}/{calendar.month}/{calendar.dayOfMonth}
              </span>
            </p>
          </div>
        </div>
        <div className="px-4 pb-4 flex justify-between items-center gap-2 flex-col min-[500px]:flex-row w-full">
          <div
            className={cn("flex  items-center gap-1 text-md w-full", {
              "justify-center min-[500px]:justify-start":
                props.status !== "Awaiting Payment",
            })}
          >
            <p>آخرین وضعیت :</p>
            <p
              className={cn(`text-m`, {
                "text-primary-100": props.status === "Paid",
                "text-error": props.status === "Awaiting Payment",
              })}
            >
              {statusApppointmentHandler(props.status)}
            </p>
          </div>
          <div className="flex justify-between min-[500px]:justify-end items-center gap-1 w-full">
            {props.status !== "Is Deleted By User" ? (
              <div
                className={cn(`flex justify-end items-center gap-1 w-full`, {
                  "min-[500px]:justify-end justify-center ":
                    props.status !== "Awaiting Payment",
                })}
              >
                {props.status !== "Is Deleted By User" &&
                  props.status !== "Is Deleted By User" && (
                    <>
                      {props.status === "Awaiting Payment" && (
                        <LinkElement
                          link={`appointment/online-appointment/${props.physicianProfileUrl}?status=noPayment&physicianUrl=${physicianProfileUrl}&physicianId=${physicianProfileId}&calendarId=${calendar.id}&index=${index}&appointmentId=${props.id}&year=${calendar.year}&month=${calendar.month}&day=${calendar.dayOfMonth}`}

                        >
                          {/* "Awaiting Payment" */}
                          <button
                            type="button"
                            className="w-[7.5rem] flex justify-center items-center text-primary bg-[#EFF1F0] h-[2.5rem] font-bold rounded-sm"
                          >
                            مشاهده جزییات
                          </button>
                        </LinkElement>
                      )}
                      {props.status === "Paid" && (
                        <LinkElement
                          link={`Check/Payment/${props.physicianProfileUrl}?Status=Success&AppointmentId=${props.id}`}

                        >
                          {/* "Paid Payment" */}
                          <button
                            type="button"
                            className="w-[7.5rem] flex justify-center items-center text-primary bg-[#EFF1F0] h-[2.5rem] font-bold rounded-sm"
                          >
                            مشاهده جزییات
                          </button>
                        </LinkElement>
                      )}
                    </>
                  )}
                {props.status !== "Awaiting Payment" && (
                  <button
                    disabled={cancelMutation.isLoading}
                    type="button"
                    className="border flex justify-center items-center border-error-100 transition-all duration-300 text-error hover:bg-error-100 hover:text-white w-[6.25rem] rounded-sm h-[2.5rem]"
                    onClick={() =>
                      setShowModalDelete(true)
                    }
                  >
                    لغو
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Modal show={showModalDelete} closeHandler={() => setShowModalDelete(false)}>

        <div className="p-5 bg-white shadow-shadow_category rounded-sm w-[18.75rem] max-w-full absolute top-1/2 -translate-y-1/2  left-[calc(50%-9.375rem)]">
          <div className="flex justify-start gap-10 items-center w-full flex-col">
            <p className="font-bold text-center w-full">برای لغو این نوبت اطمینان دارید ؟</p>
            <div className="flex justify-between items-center gap-2">
              <button type="button" className="rounded-sm border border-gray-450 w-[6.25rem] text-md  h-[2.5rem]" onClick={() => setShowModalDelete(false)} >انصراف</button>
              <button type="button" className="rounded-sm border border-error text-error text-md w-[6.25rem] h-[2.5rem] flex justify-center items-center"
                onClick={() => cancelHanlder(props.calendarId, props.index, props.physicianProfileUrl)}  >

                {cancelMutation.isLoading ? (
                  <Loader
                    size="size-[1.5625rem]"
                    color="border-error"
                  />
                ) : (
                  "لغو نوبت"
                )}
              </button>
            </div>
          </div>
        </div>

      </Modal >
    </>
  );
};
const AppointmentCardOff = (props: MyAppointmentType) => {


  return (
    <div className="bg-white rounded-sm shadow-shadow_category  w-full  flex justify-start items-start flex-col gap-2">
      <div className="p-4  w-full flex justify-between items-center">
        <div className="relative">
          <Image
            src={false ? getUrlImage(props.physicianProfileId) : "/noImage.jfif"}
            width={500}
            height={500}
            alt="doctor_profile"
            className="w-[3.75rem] h-[3.75rem] rounded-full grayscale"
          />
          <span className="w-[1rem] h-[1rem] bg-white rounded-full absolute bottom-0 rtl:right-0 ltr:left-0 flex justify-center items-center ">
            <span
              className={cn(`w-[0.75rem] h-[0.75rem]  rounded-full `, {
                "bg-primary-100": props.immediateConsultation,
                "bg-gray-400": !props.immediateConsultation,
              })}
            ></span>
          </span>
        </div>
        <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[3.75rem]">
          <div className="flex justify-between items-center w-full">
            <p className="text-lg  ">{props.physicianName}</p>
            <div className="flex justify-between items-center ">
              <span className="min-w-[5.9375rem] h-[2.1875rem] bg-[#EBFFEC] text-[#80BB82] rounded-sm flex justify-center items-center text-md font-bold">
                حضوری
              </span>
              {/* <span className='min-w-[5.9375rem] h-[2.1875rem] bg-[#F0F6FF] text-[#5C7ED7] rounded-sm flex justify-center items-center text-md font-bold'>متنی</span> */}
              {/* <span className='min-w-[5.9375rem] h-[2.1875rem] bg-[#F8F1FF] text-[#9270E2] rounded-sm flex justify-center items-center text-md font-bold'>تلفنی</span> */}
            </div>
          </div>
          <p className="short-text-2 text-md">
            {props.specialities[0]?.specialityTitle}
          </p>
        </div>
      </div>
      <div className="flex justify-start items-start gap-2 flex-col px-4 text-md text-[#8E9190]">
        <div className="flex justify-start items-center gap-3">
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
                d="M16.4109 2.76862L16.4119 3.51824C19.1665 3.73413 20.9862 5.61119 20.9891 8.48975L21 16.9155C21.0039 20.054 19.0322 21.985 15.8718 21.99L8.15188 22C5.01119 22.004 3.01482 20.027 3.01087 16.8795L3.00001 8.55272C2.99606 5.65517 4.75153 3.78311 7.50617 3.53024L7.50518 2.78061C7.5042 2.34083 7.83001 2.01 8.26444 2.01C8.69886 2.009 9.02468 2.33883 9.02567 2.77861L9.02666 3.47826L14.8914 3.47027L14.8904 2.77062C14.8894 2.33084 15.2152 2.001 15.6497 2C16.0742 1.999 16.4099 2.32884 16.4109 2.76862ZM4.52148 8.86157L19.4696 8.84158V8.49175C19.4272 6.34283 18.349 5.21539 16.4138 5.04748L16.4148 5.81709C16.4148 6.24688 16.0801 6.5877 15.6556 6.5877C15.2212 6.5887 14.8943 6.24887 14.8943 5.81909L14.8934 5.0095L9.02863 5.01749L9.02962 5.82609C9.02962 6.25687 8.70479 6.5967 8.27036 6.5967C7.83594 6.5977 7.50913 6.25887 7.50913 5.82809L7.50815 5.05847C5.58286 5.25137 4.51753 6.38281 4.52049 8.55072L4.52148 8.86157ZM15.2399 13.4043V13.4153C15.2498 13.8751 15.625 14.2239 16.0801 14.2139C16.5244 14.2029 16.8789 13.8221 16.869 13.3623C16.8483 12.9225 16.4918 12.5637 16.0485 12.5647C15.5944 12.5747 15.2389 12.9445 15.2399 13.4043ZM16.0554 17.892C15.6013 17.882 15.235 17.5032 15.234 17.0435C15.2241 16.5837 15.5884 16.2029 16.0426 16.1919H16.0525C16.5165 16.1919 16.8927 16.5707 16.8927 17.0405C16.8937 17.5102 16.5185 17.891 16.0554 17.892ZM11.1721 13.4203C11.1919 13.8801 11.568 14.2389 12.0222 14.2189C12.4665 14.1979 12.821 13.8181 12.8012 13.3583C12.7903 12.9085 12.425 12.5587 11.9807 12.5597C11.5266 12.5797 11.1711 12.9605 11.1721 13.4203ZM12.0262 17.8471C11.572 17.8671 11.1968 17.5082 11.1761 17.0485C11.1761 16.5887 11.5305 16.2089 11.9847 16.1879C12.429 16.1869 12.7953 16.5367 12.8052 16.9855C12.8259 17.4463 12.4705 17.8261 12.0262 17.8471ZM7.10433 13.4553C7.12408 13.915 7.50025 14.2749 7.95442 14.2539C8.39872 14.2339 8.75317 13.8531 8.73243 13.3933C8.72256 12.9435 8.35725 12.5937 7.91196 12.5947C7.45779 12.6147 7.10334 12.9955 7.10433 13.4553ZM7.95837 17.8521C7.5042 17.8731 7.12901 17.5132 7.10828 17.0535C7.10729 16.5937 7.46273 16.2129 7.9169 16.1929C8.3612 16.1919 8.7275 16.5417 8.73737 16.9915C8.7581 17.4513 8.40365 17.8321 7.95837 17.8521Z"
                fill="#313033"
              />
            </svg>
          </span>
          <p>
            <span>{`${props.hour}:${props.minute}`}</span>{" "}
            <span>{convertDayTime(+props.hour)}</span>
          </p>
        </div>
        <div className="flex justify-start items-center gap-3">
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
                d="M16.335 2.75021H7.66598C4.64498 2.75021 2.75098 4.88921 2.75098 7.91621V16.0842C2.75098 19.1112 4.63498 21.2502 7.66598 21.2502H16.334C19.365 21.2502 21.251 19.1112 21.251 16.0842V7.91621C21.251 4.88921 19.365 2.75021 16.335 2.75021Z"
                stroke="#313033"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.392 14.0177L12.001 11.9947V7.63373"
                stroke="#313033"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p>
            <span>تاریخ : </span>
            <span>
              {props.calendar.year}/{props.calendar.month}/{props.calendar.dayOfMonth}
            </span>
          </p>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center w-full">
        <div className="flex justify-start items-center gap-1 text-md">
          <p>آخرین وضعیت :</p>
          <p className="text-md  ">{statusApppointmentHandler(props.status)}</p>
        </div>
        <div>
          {props.status !== "Is Deleted By User" &&
            props.status !== "Is Deleted By User" && (
              <>
                {props.status === "Paid" && (
                  <LinkElement
                    link={`Check/Payment/${props.physicianProfileUrl}?Status=Success&AppointmentId=${props.id}`}

                  >
                    {/* "Paid Payment" */}
                    <button
                      type="button"
                      className="px-2 flex justify-center items-center text-primary bg-[#EFF1F0] h-[2.5rem] font-bold rounded-sm"
                    >
                      مشاهده جزییات
                    </button>
                  </LinkElement>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
};
const AppointmentCardLoading = () => {
  return (
    <div className="bg-white rounded-sm shadow-shadow_category  w-full  flex justify-start items-start flex-col gap-2">
      <div className="p-4  w-full flex justify-between items-center">
        <div className="relative">
          <div className="w-[3.75rem]">
            <Skeleton circle={true} className="h-[3.75rem]" />{" "}
          </div>
        </div>
        <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[3.75rem]">
          <div className="flex justify-between items-center w-full">
            <div className="text-lg  w-[6.25rem]">
              <Skeleton className="h-[1.5rem]" />{" "}
            </div>
            <div className="flex justify-between items-center ">
              <div className="w-[5.9375rem] ">
                <Skeleton className="h-[2.1875rem]" />
              </div>
            </div>
          </div>
          <div className="w-[6.25rem] ">
            <Skeleton className="h-[1.5rem]" />
          </div>
        </div>
      </div>
      <div className="flex justify-start items-start gap-2 flex-col px-4 text-md">
        <div className="flex justify-start items-center gap-3">
          <div className="w-[1.5rem]">
            <Skeleton className="h-[1.5rem]" />
          </div>
          <div className="w-[6.25rem]">
            <Skeleton className="h-[1.25rem]" />
          </div>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-[1.5rem]">
            <Skeleton className="h-[1.5rem]" />
          </div>
          <div className="w-[6.25rem]">
            <Skeleton className="h-[1.25rem]" />
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-between items-center w-full">
        <div className="flex justify-start items-center gap-1 text-md">
          <div className="w-[6.25rem]">
            <Skeleton className="h-[1.25rem]" />
          </div>
        </div>
        <div>
          <div className="w-[6.25rem]">
            <Skeleton className="h-[1.875rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};
