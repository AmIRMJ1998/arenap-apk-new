"use client";




import BaseCard from "@modules/cards/BaseCard"

import { useEffect, useState } from "react";
import ProfileSummaryCard from "@modules/cards/ProfileSummaryCard";
import Link from "next/link";
import useModalLogin from "@/hooks/useModalLogin";
import useFavorite from "@/hooks/useFavorite";
import { PhysicainProfileType } from "@/types/physicianProfile";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import TitlePrimary from "@modules/titles/TitlePrimary";
import ModalLogin from "@layouts/ModalLogin/ModalLogin";
import cn from "@/utils/clsxFun";
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import useUserInfo from "@/hooks/useUserInfo";
import ButtonElement from "@elements/ButtonElement";
import OfficeCard from "@modules/cards/OfficeCard";
import PhysicianProfileCard from "@modules/cards/Physicain/PhysicianProfileCard";
import LinkElement from "@elements/LinkElement";
import SwiperContainerFreeMode from "@modules/swiper/SwiperContianerFreeMode";
import PhysicainCardPrimary from '@modules/cards/Physicain/PhysicianCardPrimary';
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
import priceSplitter from "@/utils/priceSplitter";



const PhysicianProfilePage = ({ physician }: { physician: PhysicainProfileType }) => {

  const router = useRouter()
  const { price } = usePrice()
  const { isLogin, getUser, user } = useUserInfo();
  const { isShow, openModalLogin } = useModalLogin();
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

  //callbacks index
  const [callbackIndex, setCallbackIndex] = useState(0)
  //callbacks for after login
  const callbacks = [async () => {
    window.location.reload()
  }, () => {
    setShowVisitQuestionModal(true)
  }]



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
        url: `appointment?physician=${physician.physicianProfileUrl}`,
        title: " نوبت اینترنتی",
        price: price ? price / 10 : 10000,
        isHandler: false,
        // firstDescription: waitingTimeAvg ? `میانگین زمان انتظار ${waitingTimeAvg} دقیقه` : null,
        // secondDescription: physician.clinic ? `نوبت در ${physician.clinic}` : null,
        active: physician.onlineAppointment,
        status: null,
      },
      {
        id: "textConsultation",
        url: `appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: " مشاوره متنی",
        price: physician.textConsultationPrice ? physician.textConsultationPrice / 10 : null,
        isHandler: true,
        // firstDescription: physician.textConsultationWaitingTimeAvg ? `میانگین زمان انتظار ${physician.textConsultationWaitingTimeAvg} دقیقه` : null,
        // secondDescription: physician.maximumTextConsultationDuration ? `حداکثر مدت زمان مکالمه ${physician.maximumTextConsultationDuration} دقیقه` : null,
        active: physician.textConsultation,
        status: null,
      },
      {
        id: "emergencyPhoneConsultation",
        url: `appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی فوری",
        price: 1000 ? 100 : null,
        isHandler: false,
        // firstDescription: physician.emergencyPhoneConsultationDuration ? `${physician.emergencyPhoneConsultationDuration} دقیقه گفتگو` : null,
        // secondDescription: physician.emergencyphoneWaitingTime ? `پاسخ دهی کمتر از ${physician.phoneWaitingTime} دقیقه` : null,
        active: physician.immediateConsultation,
        status: physician.immediateConsultation,
      },
      {
        id: "phoneConsultation",
        url: `appointment/online-appointment/${physician.physicianProfileUrl}`,
        title: "مشاوره تلفنی",
        price: 1000 ? 100 : null,
        isHandler: false,
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
      if (isLogin === "isLoading") return;
      if (isLogin === "unauthorization") {
        openModalLogin();
        return;
      }
      let amountTextConsultation = user.accountBalance - physician.textConsultationPrice;

      if (amountTextConsultation > 0) {
        const res = await createConsulation(physician.id)
        if (res.resultCode == 200) {
          router.push(`/profile/mymessages/${res?.value?.id}`)
        }
      } else {
        const res = await paymentConsutationText(amountTextConsultation, physician.id, 2)
        if (res) {
          window.location.href = res
          return res
        }
      }
    }
  })

  const showConsultationModal = () => {

    setModals({ ...modals, [activeConsultation ? activeConsultation : "textConsultation"]: true })
  }


  return (
    <>
      <TitlePagesMobile title={`صفحه ی اختصاصی ${spliterName[0] === "مرکز" ? "" : "دکتر"} ${physician.firstName} ${physician.lastName}`} />
      <ModalLogin isCallback={true} callbacks={callbacks} callbacksIndex={callbackIndex} />
      <div className=" mt-4 rounded-sm bg-white max-w-[118.75rem] w-full border overflow-x-scroll breadcrumb">
        <div className="  p-2 flex justify-start items-center gap-2 w-fit text-primary rounded-sm">
          <LinkElement link="" className="text-sm text-primary min-w-fit">
            <Image src={"/favicon.png"} width={500} height={500} alt='icon' className='size-[2rem]' />
          </LinkElement>
          <LinkElement link="physicians" className="text-sm text-primary min-w-fit">دکترها </LinkElement>/
          <LinkElement link={`physicians/city?name=${physician.cityEnName}`} className="text-sm text-primary min-w-fit">دکترهای {physician.cityName}</LinkElement>/
          {physician.physicianSpecialities[0] ? <LinkElement link={`physicians?specialty=${physician?.physicianSpecialities[0]?.enName}`} className="text-sm text-primary min-w-fit">دکترهای {physician.physicianSpecialities[0]?.specialityTitle} /</LinkElement> : ""}
          <div className="text-sm text-primary min-w-fit pl-2">دکتر {physician.firstName} {physician.lastName}</div>
        </div>
      </div>
      {/* ----------content------------- */}
      <div className="relative md:pb-5 flex flex-wrap ">
        {/* ----------section------------- */}
        {/* Button */}
        {consultationList.find((item) => item.active) && (
          <div className="sticky  bottom-[1.25rem] left-0 order-[13] md:hidden  w-full flex justify-center items-center z-[14] pt-4">
            <div className=" w-full ">


              {activeConsultation && consultationList.find((item) => item.id === activeConsultation)?.isHandler ? (
                <ButtonElement typeButton="primary" customStyle="w-full block" handler={showConsultationModal}>
                  {buttonText}
                </ButtonElement>
              ) : (
                <LinkElement link={buttonLink as string} className="block w-full">
                  <ButtonElement
                    typeButton="primary"
                    fontWeight="bold"
                  >
                    دریافت {buttonText}
                  </ButtonElement>
                </LinkElement>
              )}
            </div>
          </div>
        )}
        {/* ----------section------------- */}


        {/* ----------section------------- */}
        {/* Physician Card  */}
        <div className="w-full order-0">
          <PhysicianProfileCard
            profileURL={physician.hasImage ? getUrlImage(physician.id) : "/noImage.jfif"}
            name={`${spliterName[0] === "مرکز" ? "" : "دکتر"} ${physician.firstName} ${physician.lastName}`}
            speciality={physician.physicianSpecialities[0]?.specialityTitle}
            rate={{ rate: physician.rate, count: physician.comments.length }}
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
            {activeConsultation && consultationList.find((item) => item.id === activeConsultation)?.isHandler ? (
              <ButtonElement typeButton="primary" handler={showConsultationModal}>
                دریافت {buttonText}
              </ButtonElement>
            ) : (
              <LinkElement link={buttonLink as string} className="w-[12.25rem] hidden md:block">
                <ButtonElement typeButton="primary">
                  دریافت {buttonText}
                </ButtonElement>
              </LinkElement>
            )
            }
          </PhysicianProfileCard>
        </div>
        {/* ----------section------------- */}
        {/* consultation plan */}
        <div className="w-full mt-4 ">
          <BaseCard title={"پلن مشاوره"} customStyle="grid grid-cols-1 md:grid-cols-2 gap-2 " >
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
          </BaseCard>
        </div>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* physicianSpecialities */}
        <div className="flex justify-between items-stretch flex-col md:flex-row  w-full  gap-2">
          {physician.physicianSpecialities.length > 0 && (
            <div className="w-full mt-4 order-2">
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
            <div className="w-full mt-4 order-3">
              <BaseCard title={"درباره پزشک"}>{physician.description}</BaseCard>
            </div>
          )}
          {/* ----------section------------- */}
        </div>
        {/* ----------section------------- */}


        {/* ----------section------------- */}
        {/* Office card */}
        <div className={cn(`mt-4 order-5 md:h-[13.125rem] w-full`, { " md:rtl:pr-2 md:ltr:pl-2": physician.comments.length > 0 })}>
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
        <div className="w-full mt-4 order-8">
          <TitlePrimary
            title={"پزشکان مرتبط"}
            textLink={"مشاهده بیشتر"}
            link={`physicians/specialty/${physician.physicianSpecialities[0]?.enName}`}
            btn={true}
            prefix={true}
          />
          <div className="mt-4 order-9">
            <SwiperContainerFreeMode data={physician.relatedPhysicians} gap={10} CardComponent={PhysicainCardPrimary} />
          </div>
        </div>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* Comments */}
        <div className="w-full mt-4 order-10" id="comment">
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
            physician.comments.map((item) => (
              <div key={item.id} className="mb-4">
                {/* <PhysicianCommentCard
                  name={`${item.firstName} ${item.lastName}`}
                  waitingTime={convertWaitingTime(item.waitingTime)}
                  rate={item.rate}
                  recommended={item.isSuggested}
                >
                  {item.message}
                </PhysicianCommentCard> */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 my-10">
              تا کنون نظری ثبت نشده!
            </p>
          )}
        </div>
        {/* ----------section------------- */}

        {/* ----------section------------- */}
        {/* Profile summary */}
        <div className="w-full mt-4 order-11">
          <ProfileSummaryCard
            physician={physician}
            tags={[]}
            title={"خلاصه پروفایل"}
            subTitle={"هشتگ های مرتبط"}
          />

        </div>
        {/* ----------section------------- */}



      </div>
      {/* ----------content------------- */}



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
            برای ثبت مشاوره متنی نیاز به پرداخت هزینه اعلام شده توسط پزشک میباشد، پس از پرداخت مشاوره متنی شما ثبت شده و توسط پزشک پاسخ داده میشود.(حداکثر 10 ساعت)
          </p>
          <p className="flex justify-start items-center gap-2 text-md pb-4">مبلغ مشاوره متنی دکتر {physician.firstName} {physician.lastName} : <span className="text-primary font-bold">{priceSplitter(10000)} تومان {physician.textConsultationPrice}</span></p>
          <ButtonElement typeButton="primary" handler={getConsultationHandler.mutate} disabled={getConsultationHandler.isLoading} loading={getConsultationHandler.isLoading} >
            دریافت {buttonText}
          </ButtonElement>
        </BottomSheetAndCenterContent>
      </Modal>
      {/* ----------Modal consultation ------------- */}
    </>
  );
};

export default PhysicianProfilePage;
