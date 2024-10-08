"use client";




import BaseCard from "@modules/cards/BaseCard"

import { useEffect, useState } from "react";
import ProfileSummaryCard from "@modules/cards/ProfileSummaryCard";
import Link from "next/link";
import useModalLogin from "@/hooks/useModalLogin";
import useFavorite from "@/hooks/useFavorite";
import { CommentType, ExtraImageType, PhysicainProfileType } from "@/types/physicianProfile";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import TitlePrimary from "@modules/titles/TitlePrimary";
import ModalLogin from "@layouts/ModalLogin/ModalLogin";
import cn from "@/utils/clsxFun";
import { getUrlExtraImage, getUrlImage } from "@/services/getImageUrl/getImageUrl";
import useUserInfo from "@/hooks/useUserInfo";
import ButtonElement from "@elements/ButtonElement";
import OfficeCard from "@modules/cards/OfficeCard";
import PhysicianProfileCard from "@modules/cards/Physicain/PhysicianProfileCard";
import LinkElement from "@elements/LinkElement";
import CreateCommentCom from "@modules/CreateCommentCom";
import Image from "next/image";
import ConsultationPlanItemCard from "../modules/cards/ConsultationPlanItemCard";
import usePrice from "@/hooks/usePrice";
import { useMutation } from "@tanstack/react-query";
import { paymentConsutationText } from "@/services/payment/payment";
import { createConsulation } from "@/services/textConsultation/textConsultation";
import { useRouter } from "next/navigation";
import Modal from "../modules/modals/Modal";
import BottomSheetAndCenterContent from "../modules/modals/BottomSheetAndCenterContent";
import CloseButton from "../elements/CloseButton";
import PhysicianCommentCard from "../modules/cards/PhysicianCommentCard";
import OkIcon from "../icons/OkIcon";
import CancelIcon from "../icons/CancelIcon";
import weekConverted from "@/utils/weekConverter";
import priceSplitter from "@/utils/priceSplitter";
import SectionTitle from "../modules/titles/SectionTitle";
import SwiperContainerFreeMode from "../modules/swiper/SwiperContianerFreeMode";
import { SwiperSlide } from "swiper/react";
import ExtraImageCard from "../modules/cards/ExtraImageCard";
import ArrowLeft from "../icons/ArrowLeft";



const PhysicianProfilePage = ({ physician }: { physician: PhysicainProfileType }) => {
  const [consultationModal, setConsultationModal] = useState(false)
  const router = useRouter()
  const [activeImage, setActiveImage] = useState("")
  const [showActiveImage, setShowActiveImage] = useState(false)
  const [showCountComments, setShowCountComments] = useState<number>(5)
  const { price, textConsultationPrice } = usePrice()
  const { isLogin, getUser, user } = useUserInfo();
  const { isShow, openModalLogin } = useModalLogin();
  let waitingTimeArray = [0, 0, 0, 0];

  for (let item of physician?.comments) {
    waitingTimeArray[item.waitingTime] += 1;
  }
  const watingTimeProgressPercent = waitingTimeArray.map((item: number) =>

    (item / waitingTimeArray.reduce((partialSum: number, a: number) => partialSum + a, 0)) *
    100

  );
  const waitingTimeAvg = Math.round(
    (waitingTimeArray[0] * 7.5 +
      waitingTimeArray[1] * 30 +
      waitingTimeArray[2] * 67.5 +
      waitingTimeArray[3] * 90) /
    waitingTimeArray.reduce((partialSum, a) => partialSum + a, 0)
  );

  const consultationList: {
    id: string,
    url: string,
    title: string,
    price: number | null,
    firstDescription?: string | null,
    secondDescription?: string | null,
    active: boolean,
    status: boolean | null,
    isHandler: boolean
  }[] = [
      {
        id: "appointment",
        url: `/appointment?physician=${physician.physicianProfileUrl}`,
        title: " نوبت اینترنتی",
        price: price ? price / 10 : 15000,
        isHandler: false,
        // firstDescription: waitingTimeAvg ? `میانگین زمان انتظار ${waitingTimeAvg} دقیقه` : null,
        secondDescription: physician.address ? `نوبت در ${physician.address}` : null,
        active: physician.onlineAppointment,
        status: null,
      },
      {
        id: "textConsultation",
        url: `appointment?physician=${physician.physicianProfileUrl}`,
        title: " مشاوره متنی",
        price: physician.textConsultationPrice + textConsultationPrice ? physician.textConsultationPrice / 10 + textConsultationPrice / 10 : null,
        isHandler: true,
        // firstDescription: physician.textConsultationWaitingTimeAvg ? `میانگین زمان انتظار ${physician.textConsultationWaitingTimeAvg} دقیقه` : null,
        secondDescription: 'حداکثر زمان پاسخگویی 12 ساعت',
        active: physician.textConsultation,
        status: null,
      },
      {
        id: "emergencyPhoneConsultation",
        url: `appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی فوری",
        price: 1000,
        isHandler: true,
        // firstDescription: physician.emergencyPhoneConsultationDuration ? `${physician.emergencyPhoneConsultationDuration} دقیقه گفتگو` : null,
        // secondDescription: physician.emergencyphoneWaitingTime ? `پاسخ دهی کمتر از ${physician.phoneWaitingTime} دقیقه` : null,
        active: physician.immediateConsultation,
        status: physician.immediateConsultation,
      },
      {
        id: "phoneConsultation",
        url: `appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی",
        price: 1000,
        isHandler: true,
        // firstDescription: physician.phoneConsultationDuration ? `${physician.phoneConsultationDuration} دقیقه گفتگو` : null,
        // secondDescription: physician.phoneWaitingTime ? `پاسخ دهی بین ${physician.phoneWaitingTime[0]} تا ${physician.phoneWaitingTime[1]} دقیقه` : null,
        active: physician.voiceConsultation,
        status: null,
      },

    ];
  const [buttonText, setButtonText] = useState(
    consultationList.find((item) => item.active)?.title
  );

  const [buttonLink, setButtonLink] = useState<string | undefined>(
    consultationList.find((item) => item.active)?.url
  );

  const [activeConsultation, setActiveConsultation] = useState<string | undefined>(
    consultationList.find((item) => item.active)?.id
  );

  const [showVisitQuestionModal, setShowVisitQuestionModal] = useState(false);
  const [modals, setModals] = useState({
    textConsultation: false
  })

  const showCreateCommentHandler = () => {
    if (isLogin === "unauthorization") {
      openModalLogin()
      setCallbackIndex(1)
      return
    }

    setShowVisitQuestionModal(true)


  }

  //callbacks index
  const [callbackIndex, setCallbackIndex] = useState(0)
  //callbacks for after login
  const callbacks = [async () => {
    window.location.reload()
  }, () => {
    setShowVisitQuestionModal(true)
  }, () => {
    setModals({ ...modals, [activeConsultation ? activeConsultation : "textConsultation"]: true })
  }]
  //use favorite hook
  const { userFavorite, addFavorite, deleteFavorite, likeLoading } = useFavorite(physician.id)

  const favoritePhysicianHandler = async () => {
    if (isLogin === "isLoading") return;
    if (isLogin === "unauthorization") {
      setCallbackIndex(0)
      openModalLogin();
      return;
    }

    if (!userFavorite) {
      const res = addFavorite();
    } else {
      const status = deleteFavorite();
    }
  };








  useEffect(() => {
    const findName = consultationList.find(
      (item) => item.id === activeConsultation && item.active === true
    );

    if (findName) setButtonText(findName.title);
    if (findName) setButtonLink(findName.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConsultation]);

  const spliterName = physician.firstName.split(" ")



  const getConsultationHandler = useMutation({
    mutationFn: async () => {

      let amountTextConsultation = user.accountBalance - (physician.textConsultationPrice + textConsultationPrice);


      if (amountTextConsultation >= 0) {
        const res = await createConsulation(physician.id)
        if (res.resultCode == 200) {
          router.push(`/profile/mymessages/${res?.value?.id}`)
        }
      } else {
        const res = await paymentConsutationText((amountTextConsultation * -1), physician.id, 2)

        if (res) {
          window.location.href = res
          return res
        }
      }
    }
  })

  const showConsultationModal = (consultation: string) => {
    if (isLogin === "isLoading") return;
    if (isLogin === "unauthorization") {
      setConsultationModal(false)
      setCallbackIndex(2)
      openModalLogin();
      return;
    }
    setConsultationModal(false)
    setModals({ ...modals, [consultation ? consultation : "textConsultation"]: true })
  }

  // let speciality = `${physician.physicianSpecialities[0]?.specialityTitle} ${physician.physicianSpecialities[1]?.specialityTitle ? "|" : ""} ${physician.physicianSpecialities[1]?.specialityTitle}`


  return (
    <>
      <TitlePagesMobile title={`صفحه‌ی اختصاصی ${physician.firstName.startsWith("مرکز") ? " " : "دکتر"} ${physician.firstName} ${physician.lastName}`} />
      <ModalLogin isCallback={true} callbacks={callbacks} callbacksIndex={callbackIndex} />
      <div className=" mt-4 rounded-sm bg-white max-w-[118.75rem] w-full border overflow-x-scroll breadcrumb">
        <div className="  p-2 flex justify-start items-center gap-2 w-fit text-primary rounded-sm">
          <LinkElement link="" className="text-sm text-primary min-w-fit">
            <Image src={"/arenapLogo.png"} width={500} height={500} alt='icon' className='size-[2rem]' />
          </LinkElement>
          <LinkElement link="physicians" className="text-sm text-primary fillRulew-fit">دکترها </LinkElement>/
          <LinkElement link={`physicians/city/${physician.cityEnName}`} className="text-sm text-primary min-w-fit">دکترهای {physician.cityName}</LinkElement>/
          {physician.physicianSpecialities[0] ? <LinkElement link={`physicians/specialty/${physician?.physicianSpecialities[0]?.enName}`} className="text-sm text-primary !min-w-fit block text-nowrap">دکترهای {physician.physicianSpecialities[0]?.specialityTitle} </LinkElement> : ""}
          <div className="text-sm text-primary min-w-fit pl-2">/ دکتر {physician.firstName} {physician.lastName}</div>
        </div>
      </div>
      <div className="flex justify-between items-start relative ">
        {/* ----------content------------- */}
        <div className="relative flex flex-wrap md:w-6/12 lg:w-8/12 ">
          {/* ----------section------------- */}
          {/* Button */}
          {consultationList.find((item) => item.active) && (
            <div className="sticky  bottom-[1.25rem] left-0 order-[13] md:hidden  w-full flex justify-center items-center z-[14] pt-4">
              <div className=" w-full ">


                {/* {activeConsultation && consultationList.find((item) => item.id === activeConsultation)?.isHandler ? (
                <ButtonElement typeButton="primary" customStyle="w-full block" handler={showConsultationModal}>
                  {buttonText}
                </ButtonElement>
              ) : ( */}

                <ButtonElement
                  typeButton="primary"
                  fontWeight="bold"
                  handler={() => setConsultationModal(true)}
                >
                  نوبت بگیرید
                </ButtonElement>
                {/* )} */}
              </div>
            </div>
          )}
          {/* ----------section------------- */}


          {/* ----------section------------- */}
          {/* Physician Card  */}
          <div className="w-full order-0">
            <PhysicianProfileCard
              profileURL={physician.hasImage ? getUrlImage(physician.id) : "/noImage.jfif"}
              name={`${physician.firstName.startsWith("مرکز") ? " " : "دکتر"} ${physician.firstName} ${physician.lastName}`}
              speciality={physician.physicianSpecialities}
              rate={{ rate: physician.rate, count: physician.comments.length }}
              linkShare={`https://arenap.ir/Physician/${physician.physicianProfileUrl}`}
              services={{
                appointment: physician.onlineAppointment,
                textConsultation: physician.textConsultation,
                phoneConsultation: physician.voiceConsultation,
                emergencyPhoneConsultation: physician.immediateConsultation,
              }}
              MENumber={physician.medicalSystemCode}
              city={physician.cityName}
              liked={userFavorite}
              likeLoading={likeLoading}
              status={physician.immediateConsultation}
              addFavorite={favoritePhysicianHandler}
              physicianUrl={buttonLink as string}
            >


            </PhysicianProfileCard>
          </div>
          {/* ----------section------------- */}


          {/* ----------section------------- */}
          {/* Office card */}
          <div className={cn(`mt-4  md:h-[13.125rem] w-full`, { " ": physician.comments.length > 0 })}>
            <OfficeCard
              title={"اطلاعات مطب"}
              address={physician.address}
              numbers={physician?.telePhoneNumber}
              latitude={physician.latitude}
              longitude={physician.longitude}
            />
          </div>
          {/* ----------section------------- */}

          {/* ----------section------------- */}
          {/* consultation plan */}
          {/* <div className="w-full mt-4 ">
          <BaseCard title={"نوع مشاوره"} customStyle="" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              {consultationList?.map((consultation) => (
                <label
                  className="block mb-3"
                  htmlFor={consultation?.id}
                  key={consultation.id}
                >
                  <ConsultationPlanItemCard
                    icon={consultation?.id}
                    title={consultation?.title}
                    price={consultation?.price}
                    firstDescription={consultation?.firstDescription}
                    secondDescription={consultation?.secondDescription}
                    selected={activeConsultation === consultation?.id}
                    active={consultation?.active}
                    status={
                      consultation?.status !== null ? consultation?.status : null
                    }
                  />
                  <input
                    onChange={(e) => setActiveConsultation(e.target.value)}
                    type="radio"
                    name="consultation-plan"
                    id={consultation?.id}
                    value={consultation?.id}
                    hidden
                    disabled={!consultation?.active}
                  />
                </label>
              ))}
            </div>

            <div className="hidden md:flex justify-center items-center ">
              {activeConsultation && consultationList.find((item) => item.id === activeConsultation)?.isHandler ? (
                <ButtonElement typeButton="primary" handler={showConsultationModal} customStyle="w-fit">
                  {buttonText} بگیرید
                </ButtonElement>
              ) : (
                <LinkElement link={buttonLink as string} className="w-fit">
                  <ButtonElement typeButton="primary" customStyle="w-fit">
                    {buttonText} بگیرید
                  </ButtonElement>
                </LinkElement>
              )}
            </div>

          </BaseCard>
        </div> */}
          {/* ----------section------------- */}




          {/* ----------section------------- */}
          {/* physicianSpecialities */}
          <div className="flex justify-between items-stretch flex-col md:flex-row  w-full  gap-2">
            {physician.physicianSpecialities.length > 0 && (
              <div className="w-full mt-4 ">
                <BaseCard title={"تخصص ها "}>
                  <div className="flex justify-start items-center gap-2 flex-wrap">
                    {physician.physicianSpecialities.map((item, index) => (
                      <Link
                        href={`/physicians/specialty/${item.enName}`}
                        key={index}
                        className="bg-gray-100 w-auto px-3 py-1 rounded-sm text-md transition-all duration-300 hover:bg-gray-400 hover:text-white"
                      >
                        {item.specialityTitle}
                      </Link>
                    ))}
                  </div>
                </BaseCard>
              </div>
            )}
            {/* ----------section------------- */}

            {/* ----------section------------- */}
            {/* Physician Description */}
            {physician.description && (
              <div className="w-full mt-4 ">
                <BaseCard title={"درباره پزشک"}>{physician.description}</BaseCard>
              </div>
            )}
            {/* ----------section------------- */}
          </div>
          {/* ----------section------------- */}

          {/* ----------section------------- */}
          {/* waitingTimeAvg */}
          {/* {physician.comments.length > 0 && (
          <div className="mt-4 order-7 md:order-4 md:h-[13.125rem] w-full md:w-1/2 md:rtl:pl-2 md:ltr:pr-2">
            <BaseCard title={"مدت زمان انتظار در مطب"}>
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between">
                <div className="rounded-sm bg-gray-100 p-3 text-center rtl:ml-5 ltr:mr-5 w-full xs:w-auto mb-5 xs:mb-0">
                  <p className="text-[#342E2E]">میانگین زمان انتظار</p>
                  <p className="text-[1.25rem] font-bold text-[#342E2E] my-1">
                    {waitingTimeAvg}
                  </p>
                  <p className="text-[#342E2E]">دقیقه</p>
                </div>
                <div className="flex flex-col gap-3 w-full xs:w-auto justify-center">
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      0 تا 15 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div

                        className={cn(
                          "rounded-lg bg-[#30C018] h-[.5rem] absolute",
                          `w-[${watingTimeProgressPercent[0]}%]`
                        )}
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap text-right">
                      {waitingTimeArray[0]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      15 تا 45 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div

                        className={cn(
                          "rounded-lg bg-[#30C018] h-[.5rem] absolute",
                          `w-[${watingTimeProgressPercent[1]}%]`
                        )}
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[1]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      45 تا 90 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div

                        className={cn(
                          "rounded-lg bg-[#30C018] h-[.5rem] absolute",
                          `w-[${watingTimeProgressPercent[2]}%]`
                        )}
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[2]} نفر
                    </p>
                  </div>
                  <div className="grid grid-cols-[2fr_4.375rem_1fr] gap-2 items-center mx-auto">
                    <p className="text-md whitespace-nowrap rtl:text-left ltr:text-right">
                      بیش از 90 دقیقه
                    </p>
                    <div
                      dir="ltr"
                      className="rounded-lg max-w-[4.375rem] w-full bg-gray-100 h-[.5rem] relative"
                    >
                      <div

                        className={cn(
                          "rounded-lg bg-[#30C018] h-[.5rem] absolute",
                          `w-[${watingTimeProgressPercent[3]}%]`
                        )}
                      ></div>
                    </div>
                    <p className="text-md whitespace-nowrap">
                      {waitingTimeArray[3]} نفر
                    </p>
                  </div>
                </div>
              </div>
            </BaseCard>
          </div>
        )} */}
          {/* ----------section------------- */}


          {/* ----------section------------- */}
          {/* relatedPhysicians Slider */}
          {/* <div className="w-full mt-4 order-8">
          <SectionTitle
            title={"پزشکان مرتبط"}
            textLink={"مشاهده بیشتر"}
            link={
              `physicians/specialty/${physician.physicianSpecialities[0].enName}`
            }
            btn={true}
          />
          <div className=" order-9">
            <SwiperContainerFreeMode data={physician.relatedPhysicians} gap={10} CardComponent={PhysicainCardPrimary} />
          </div>
        </div> */}
          {/* ----------section------------- */}

          {/* ----------section------------- */}
          {/* Profile summary */}
          <div className="w-full mt-4 order-10">
            <ProfileSummaryCard
              physician={physician}
              tags={[]}
              title={"خلاصه پروفایل"}
              subTitle={"هشتگ های مرتبط"}
            />

          </div>
          {/* ----------section------------- */}

          {/* ----------section------------- */}
          {/* Extra images */}
          {
            physician.extraImages.length ? (
              <div className="mt-4">
                <SectionTitle
                  title={"تصاویر  مطب"}
                  textLink={"مشاهده بیشتر"}
                  link={
                    `physicians/specialty/`
                  }
                  btn={false}
                />

                <SwiperContainerFreeMode CardComponent={ExtraImageCard} data={physician.extraImages} >
                  {
                    physician.extraImages?.map((item: ExtraImageType, index) => (
                      <SwiperSlide className='swiper_width_auto' key={item.id ? item.id : index}>
                        <ExtraImageCard {...item} alt={`دکتر ${physician.firstName} ${physician.lastName} متخصص ${physician.physicianSpecialities?.[0].specialityTitle} در شهر ${physician.cityName}`} clickHandler={() => {
                          setActiveImage(item.id)
                          setShowActiveImage(true)

                        }} />
                      </SwiperSlide>
                    ))
                  }
                </SwiperContainerFreeMode>
                <Modal show={showActiveImage} closeHandler={() => {
                  setActiveImage("")
                  setShowActiveImage(false)
                }}
                  customClassname="flex justify-center items-center"

                >
                  <span
                    className="absolute top-4 left-4"
                  ><CloseButton closeHanlder={() => {
                    setActiveImage("")
                    setShowActiveImage(false)
                  }} /> </span>

                  {activeImage &&
                    <Image src={getUrlExtraImage({ physicianId: physician.id, id: activeImage })} width={500} height={500} alt="active image" className="max-w-full" />
                  }

                </Modal>
              </div>
            ) : null
          }
          {/* ----------section------------- */}
          {/* ----------section------------- */}
          {/* Comments */}
          <div className="w-full mt-4 order-11" id="comment">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold rtl:mr-[1.25rem] ltr:ml-[1.25rem] relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full">
                نظرات کاربران{" "}
                <span className="text-md text-gray-500 font-normal">
                  ({physician.comments.length}نظر)
                </span>
              </h3>
              <div className="w-[11.25rem]">
                <CreateCommentCom physicianId={physician.id} firstName={physician.firstName} lastName={physician.lastName} showComment={showVisitQuestionModal} setShowComment={showCreateCommentHandler} closeComment={() => setShowVisitQuestionModal(false)} />
              </div>
            </div>

            {physician.comments.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  {physician.comments.slice(0, showCountComments).map((comment: CommentType) => (
                    <div key={comment.id} className="">
                      <PhysicianCommentCard
                        {...comment}
                      >
                        {comment.message}
                      </PhysicianCommentCard>
                    </div>
                  ))}
                </div>
                {
                  showCountComments <= physician.comments.length ? (
                    <div className=" py-2 flex justify-center items-center gap-1 text-primary cursor-pointer font-bold"
                      onClick={() => {
                        setShowCountComments(prev => {
                          return prev + 5
                        })
                      }}
                    >
                      <p>مشاهده بیشتر</p>
                      <span className="-rotate-90"><ArrowLeft /> </span>
                    </div>
                  ) : null
                }
              </div>
            ) : (
              <p className="text-center text-gray-500 my-10">
                تا کنون نظری ثبت نشده!
              </p>
            )}


          </div>
          {/* ----------section------------- */}


        </div>
        {/* ----------content------------- */}

        {/* ----------section------------- */}
        {/* ----------Cosultation------------- */}
        <div

          className={cn(
            "  md:animate-none md:block md:w-6/12 lg:w-4/12 md:py-4 md:pr-4 md:sticky md:top-[4.5rem]  mdSecondary:top-0 md:h-auto",
            {
              "hidden": !consultationModal,
              "flex justify-end items-end  fixed top-0 left-0 right-0 h-screen  animate-modal_search  w-full  backdrop-blur-md z-[20] transition-all duration-300": consultationModal
            }
          )}>
          <span className="md:hidden fixed top-0 left-0 w-full h-screen " onClick={() => setConsultationModal(false)} ></span>
          <div className={cn(`bg-white p-5 shadow-shadow_category relative  rounded-tr-xl rounded-tl-xl md:rounded-sm w-full  max-h-[calc(100vh-2rem)] md:max-h-full`)}>
            <span className="absolute top-4 left-4 md:hidden"><CloseButton closeHanlder={() => {
              setConsultationModal(false)
            }} /></span>
            <div className='text-lg font-bold  '>نوع مشاوره</div>
            <div className={cn(
              'mt-6',
              "max-h-[calc(100vh-9.5rem)]  md:max-h-[calc(100vh-7.5rem)] overflow-auto"
            )}>
              {consultationList?.map((consultation) => {
                if (!consultation.isHandler) {
                  return (
                    <Link
                      href={consultation.url}
                      className={cn("block mb-3",
                        {
                          "pointer-events-none": !consultation?.active
                        }
                      )}
                      aria-disabled={!consultation?.active}
                      tabIndex={!consultation?.active ? -1 : undefined}
                      key={consultation.id}
                    >
                      <ConsultationPlanItemCard
                        icon={consultation?.id}
                        showPrice={false}
                        title={consultation?.title}
                        price={consultation?.price}
                        firstDescription={consultation?.firstDescription}
                        secondDescription={consultation?.secondDescription}
                        selected={activeConsultation === consultation?.id}
                        firstAppointment={physician.firstAppointment}
                        active={consultation?.active}
                        status={
                          consultation?.status !== null ? consultation?.status : null
                        }
                      />
                    </Link>
                  )
                } else {
                  return (
                    <div
                      className="mb-3"
                      onClick={() => {
                        if (consultation.active) {
                          setActiveConsultation(consultation.id)
                          showConsultationModal(consultation.id)
                        }
                      }}
                      key={consultation.id}
                    >
                      <ConsultationPlanItemCard
                        showPrice={true}
                        icon={consultation?.id}
                        title={consultation?.title}
                        price={consultation?.price}
                        firstDescription={consultation?.firstDescription}
                        secondDescription={consultation?.secondDescription}
                        firstAppointment={physician.firstAppointment}
                        selected={activeConsultation === consultation?.id}
                        active={consultation?.active}
                        status={
                          consultation?.status !== null ? consultation?.status : null
                        }
                      />
                    </div>
                  )
                }
              })}
            </div>
          </div>

        </div>
        {/* ----------section------------- */}
      </div>



      {/* ----------Modal consultation ------------- */}
      <Modal show={modals.textConsultation} closeHandler={() => {
        setModals({ ...modals, [activeConsultation ? activeConsultation : ""]: false })
      }}>
        <BottomSheetAndCenterContent show={modals.textConsultation}>
          <span className="absolute top-2  left-2"><CloseButton closeHanlder={() => {
            setModals({ ...modals, [activeConsultation ? activeConsultation : ""]: false })
          }} /> </span>
          <p className="font-bold text-primary text-md text-center">دریافت {buttonText}</p>
          <p className="my-4 text-md">
            برای ثبت مشاوره متنی نیاز به پرداخت هزینه اعلام شده توسط پزشک میباشد، پس از پرداخت مشاوره متنی شما ثبت شده و توسط پزشک پاسخ داده میشود.(حداکثر 12 ساعت)
          </p>
          <p className="text-md my-2 ">موجودی کیف پول شما : <span className="text-primary font-bold">{user.accountBalance / 10 ? priceSplitter(user.accountBalance / 10) : 0} تومان</span></p>
          <p className="flex justify-start items-center gap-2 text-md pb-4">مبلغ مشاوره متنی دکتر {physician.firstName} {physician.lastName} : <span className="text-primary font-bold">{physician.textConsultationPrice + textConsultationPrice ? ` ${priceSplitter(physician.textConsultationPrice / 10 + textConsultationPrice / 10)} تومان` : "رایگان"}</span></p>
          {
            physician.physicianProfileSetting ? (
              <>
                <p className="text-sm sm:text-md">جدول روزهای پاسخ گویی پزشک به شکل زیر میباشد : </p>
                <table className="w-full my-3">
                  <thead className=" bg-primary w-full text-md text-white ">
                    <tr>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[0])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[1])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[2])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[3])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[4])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[5])}</th>
                      <th className="p-1">{weekConverted(Object.keys(physician.physicianProfileSetting ? physician.physicianProfileSetting : {})[6])}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.saturdayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.sundayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.mondayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.tuesdayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.wednesdayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.thursdayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                      <td className="">
                        <span className="flex justify-center items-center ">{physician.physicianProfileSetting?.fridayConsultationTextPlan ? <OkIcon disabled={false} /> : <CancelIcon />}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ) : null
          }
          <ButtonElement typeButton="primary" handler={getConsultationHandler.mutate} disabled={getConsultationHandler.isLoading} loading={getConsultationHandler.isLoading} >
            {
              user.accountBalance >= +physician.textConsultationPrice + +textConsultationPrice ? `دریافت ${buttonText}` : "پرداخت"
            }
          </ButtonElement>
        </BottomSheetAndCenterContent>
      </Modal>
      {/* ----------Modal consultation ------------- */}


      {/* ----------Modal consultation ------------- */}
      {/* <Modal show={consultationModal} closeHandler={() => setConsultationModal(false)} customClassname="w-full" >
        <BottomSheetAndCenterContent show={consultationModal} className="md:w-[40.625rem]   "  >
          <div className="  h-[calc(100vh-6.25rem)] md:h-auto overflow-auto pb-6">
            <span className="absolute top-4 left-4 z-20"><CloseButton closeHanlder={() => setConsultationModal(false)} /> </span>
            <div className="flex justify-center items-center flex-col ">
              <p className="font-bold">انتخاب نوع مشاوره</p>
              <p className="text-md my-2">یکی از انواع ویزیت فعال پزشک انتخاب کنید</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              {consultationList?.map((consultation) => (
                <label
                  className="block mb-3"
                  htmlFor={consultation?.id}
                  key={consultation.id}
                >
                  <ConsultationPlanItemCard
                    icon={consultation?.id}
                    title={consultation?.title}
                    price={consultation?.price}
                    firstDescription={consultation?.firstDescription}
                    secondDescription={consultation?.secondDescription}
                    selected={activeConsultation === consultation?.id}
                    active={consultation?.active}
                    status={
                      consultation?.status !== null ? consultation?.status : null
                    }
                  />
                  <input
                    onChange={(e) => setActiveConsultation(e.target.value)}
                    type="radio"
                    name="consultation-plan"
                    id={consultation?.id}
                    value={consultation?.id}
                    hidden
                    disabled={!consultation?.active}
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-center items-center sticky bottom-0 ">
              {activeConsultation && consultationList.find((item) => item.id === activeConsultation)?.isHandler ? (
                <ButtonElement typeButton="primary" handler={() => showConsultationModal("textConsultation")} customStyle="w-fit">
                  {buttonText} بگیرید
                </ButtonElement>
              ) : (
                <LinkElement link={buttonLink as string} className="w-fit">
                  <ButtonElement typeButton="primary" customStyle="w-fit">
                    {buttonText} بگیرید
                  </ButtonElement>
                </LinkElement>
              )}
            </div>
          </div>
        </BottomSheetAndCenterContent>
      </Modal> */}
      {/* ----------Modal consultation ------------- */}

    </>
  );
};

export default PhysicianProfilePage;
