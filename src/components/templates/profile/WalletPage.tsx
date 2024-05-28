"use client";
import React, { useEffect, useRef, useState } from "react";

import BaseCard from "@modules/cards/BaseCard";

import Image from "next/image";




import Skeleton from "react-loading-skeleton";

import moment from "jalali-moment";






import Loader from "@/components/elements/Loader";



import useTransactions from "@/hooks/useTransactions";
import useUserInfo from "@/hooks/useUserInfo";
import CloseButton from "@/components/elements/CloseButton";
import Checkbox from "@/components/elements/inputs/Checkbox";
import cn from "@/utils/clsxFun";

import priceSplitter from "@/utils/priceSplitter";
import BottomSheetAndCenterContent from "@/components/modules/modals/BottomSheetAndCenterContent";
import Modal from "@/components/modules/modals/Modal";
import ButtonElement from "@/components/elements/ButtonElement";
import TitlePagesMobile from "@/components/modules/titles/TitlePagesMobile";
import { TransctionsType } from "@/types/global";
import SwiperContainerWalletPage from "@/components/modules/swiper/SwiperContainerWalletPage";
import { SearchParamsWalletType } from "@/app/profile/wallet/page";
import usePrice from "@/hooks/usePrice";


const WalletPage = (props: { params: SearchParamsWalletType }) => {


  const { transactions, isLoading, loadingPayment, paymentHandler } = useTransactions()

  const { isLogin, user } = useUserInfo();
  const [activePrice, setActivePrice] = useState(1)
  const [showCount, setShowCount] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [countAppointment, setCountAppointment] = useState<number | string>("")
  const [showModalIncrease, setShowModalIncrease] = useState(false);
  const [showSuccessDepositModal, setShowSuccessDepositModal] = useState(false);
  const [showFailureDepositModal, setShowFailureDepositModal] = useState(false);
  const [price, setPrice] = useState(props.params?.amount ? +props.params.amount : "");
  const pricePrimary = usePrice()



  const [date, setDate] = useState<{
    year: string | undefined,
    month: string | undefined,
    day: string | undefined,
  }>({
    year: "",
    month: "",
    day: "",
  });
  const [disabledButtonPayment, setDisabledButtonPayment] = useState(false);




  const showModalIncreaseHandler = () => {
    setShowModalIncrease(true);
  };



  useEffect(() => {
    if (props.params?.Status === "Fail") {
      setShowFailureDepositModal(true);
    }
    if (props.params?.Status === "Success") {
      setShowSuccessDepositModal(true);
      setDate({
        year: props.params?.date?.slice(0, 4),
        month: props.params?.date?.slice(4, 6),
        day: props.params?.date?.slice(6, 8),
      });
    }
  }, []);

  useEffect(() => {
    
      setTotalPrice(pricePrimary.price)
    
  }, [pricePrimary.price])




  const inputRef = useRef<HTMLInputElement>(null);


  // active button price handler for charge wallet
  const activePriceHandler = (count: number) => {
    setCountAppointment("")
    setDisabledButtonPayment(false)
    setShowCount(false)
    setTotalPrice(count * pricePrimary.price)
    setActivePrice(count)
  }


  // change handler for input count appointment
  const changeCountAppointmentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > 500) {
      setCountAppointment(500)
      setTotalPrice(500 * pricePrimary.price)
      setDisabledButtonPayment(false)
      return
    }
    if (+e.target.value > 0) {
      setCountAppointment(+e.target.value)
      setTotalPrice(+e.target.value * pricePrimary.price)
      setDisabledButtonPayment(false)
    } else {
      setCountAppointment("")
      setTotalPrice(0)
      setDisabledButtonPayment(true)
    }
  }

  // focus in count input
  useEffect(() => {
    if (showCount === false) return;

    inputRef?.current?.focus()
  }, [showCount]);

  // show input for insert count appointment
  const showcountPriceHandler = () => {
    setShowCount(true)
    setActivePrice(0)
    setTotalPrice(0)
    setDisabledButtonPayment(true)
  }



  return (
    <>
      <TitlePagesMobile title={"کیف پول"} />
      <div className=" mt-4">

        {/* header  */}
        <header>
          <BaseCard title={"کیف پول"}>
            <div className="py-4 px-6 bg-gray-100 rounded-sm mt-4">
              <div className="flex justify-start items-center gap-2 ">
                <span>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.4116 14.3957H18.2851C16.77 14.3948 15.5419 13.1909 15.541 11.7045C15.541 10.218 16.77 9.01409 18.2851 9.01318H22.4116"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.7522 11.6429H18.4345"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.25224 3H17.0625C20.0165 3 22.4114 5.34951 22.4114 8.24766V15.4247C22.4114 18.3229 20.0165 20.6724 17.0625 20.6724H8.25224C5.29817 20.6724 2.90332 18.3229 2.90332 15.4247V8.24766C2.90332 5.34951 5.29817 3 8.25224 3Z"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.52637 7.5382H13.0295"
                      stroke="#313033"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <p className="font-bold text-md flex justify-start gap-2 items-center ">
                  موجودی کیف پول:
                  {isLogin === "isLoading" && (
                    <span className="w-[6.25rem] block">
                      <Skeleton className="h-[1.25rem]" />{" "}
                    </span>
                  )}
                  <span className="font-normal">
                    {isLogin === "authorization" &&
                      `${+user.accountBalance === 0
                        ? 0
                        : priceSplitter(+user.accountBalance / 10)
                      } تومان`}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-[11.25rem] absolute top-4 ltr:right-4 rtl:left-4">
              <ButtonElement
                typeButton="primary"
                fontWeight="bold"
                handler={showModalIncreaseHandler}
                size="sm"
              >
                افزایش اعتبار
              </ButtonElement>
            </div>
          </BaseCard>
        </header>
        {/* content page */}
        <section className="mt-4">
          {/* if  transactions is 0 length or empty */}
          {transactions?.length === 0 && !isLoading ? (
            <div className="h-[calc(100vh-31.25rem)] flex justify-center items-center flex-col gap-8">
              <div>
                <Image
                  src={"/noTransactions.png"}
                  width={500}
                  height={500}
                  alt="noTransactions"
                  className="w-full"
                />
              </div>
              <div className="flex justify-start items-center gap-4 flex-col">
                <p className="text-md ">در حال حاضر تراکنشی صورت نگرفته !</p>
                <p className="text-sm ">برای گرفتن نوبت به صفحه جستجو وارد شوید  </p>
                <div className="w-[21.25rem]">
                  <ButtonElement
                    typeButton="primary"
                    fontWeight="bold"
                    handler={showModalIncreaseHandler}
                  >
                    افزایش اعتبار
                  </ButtonElement>
                </div>
              </div>
            </div>
          ) : null}
          {/* if  transactions is length > 0 */}
          {!isLoading && transactions?.length > 0 ?
            <BaseCard title={"تاریخچه تراکنش ها"}>
              <div className="flex justify-start items-center flex-col gap-2">
                {transactions?.map((item: TransctionsType, index: number) => (
                  <TransactionCard key={item.id} {...item} />
                ))}
              </div>
            </BaseCard>
            : null
          }
          {/* loding */}
          {
            isLoading ?
              <BaseCard title={"تاریخچه تراکنش ها"}>


                <div className="flex justify-start items-center gap-2 flex-col">
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                  <TransactionCardLoading />
                </div>
              </BaseCard> : null
          }
        </section>
        {/* charge wallet modal  */}
        <Modal
          show={showModalIncrease}
          closeHandler={() => setShowModalIncrease(false)}
        >
          <BottomSheetAndCenterContent show={showModalIncrease}>
            <div>
              <span className="absolute top-[1.875rem] rtl:left-[0.9375rem] ltr:right-[0.9375rem] xs:rtl:left-[1.875rem] xs:ltr:right[1.875rem]">
                <CloseButton
                  closeHanlder={() => setShowModalIncrease(false)}
                />
              </span>
              <p className="text-md font-bold">موجودی کیف پول : <span className={cn("   ", {
                "text-error": +user.accountBalance < pricePrimary.price,
                "text-primary": +user.accountBalance > 0
              })}>{+user.accountBalance === 0
                ? 0
                : priceSplitter(+user.accountBalance / 10)} تومان</span></p>
              <div className="mt-4 flex justify-start items-center gap-3 py-3">
                <p className="text-center text-md w-full font-bold">برای چند نوبت میخوای شارژ کنی؟</p>
              </div>
              <div className="py-2">
                <SwiperContainerWalletPage gap={10} activePrice={activePrice} activePriceHandler={activePriceHandler} isShowCount={showCount} showCountHandler={showcountPriceHandler} />
              </div>
              {
                showCount ?
                  <div className="py-4 flex justify-between items-center gap-2">
                    <p className="text-md">تعداد نوبت : </p>
                    <input type="number" ref={inputRef} placeholder="تعداد نوبت " value={countAppointment} onChange={changeCountAppointmentHandler} className="direction-ltr border border-primary flex-1 p-1 rounded-3xl px-2 text-center placeholder:text-sm text-primary text-md " />
                  </div> : null
              }


              <div className="mt-4">
                {!disabledButtonPayment ? (<ButtonElement
                  typeButton={disabledButtonPayment ? "secondary" : "primary"}
                  variant={disabledButtonPayment ? "outlined" : "contained"}
                  fontSize="md"
                  disabled={disabledButtonPayment}
                  handler={() => paymentHandler.mutate({ id: 0, price: +totalPrice  , paymentType: 0 })}
                  loading={loadingPayment}
                >

                  <p>ثبت <span className="text-sm">({priceSplitter(totalPrice / 10)} تومان)</span></p>

                </ButtonElement>) : null}

              </div>
            </div>
          </BottomSheetAndCenterContent>
        </Modal>
        {/* payment status = success  */}
        <Modal
          show={showSuccessDepositModal}
          closeHandler={() => {
            setShowSuccessDepositModal(false);
          }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white p-5 w-[23.125rem] rounded-sm max-w-full relative">
              <div className="flex justify-end items-center absolute left-[1.25rem] top-[1.25rem]">
                <CloseButton
                  closeHanlder={() => {
                    setShowSuccessDepositModal(false);
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <Image
                  width={500}
                  height={500}
                  className="w-[9.6875rem] h-[9.25rem]"
                  src="/SuccessfulDepositInfo.png"
                  alt="پرداخت موفقیت آمیز"
                />
                <p>پرداخت شما با موفقیت انجام شد</p>
                <div className="w-full p-1 bg-gray-100 rounded-sm flex gap-2 justify-center items-center">
                  <label htmlFor="paid">
                    {/* <Checkbox
                        id="paid"
                        defaultChecked={true}
                        bg="bg-primary"
                        disabled
                      /> */}
                  </label>
                  <p className="font-bold">
                    مبلغ {priceSplitter(+price)} ریال
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <p className="text-md">
                    <span className="font-bold">تاریخ انجام: </span>
                    <span>
                      {date.year}/{date.month}/{date.day}
                    </span>
                  </p>
                  <p className="text-md">
                    <span className="font-bold">شماره تراکنش: </span>
                    <span>{props.params?.["transaction-number"]}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/* payment status = fail  */}
        <Modal
          show={showFailureDepositModal}
          closeHandler={() => {
            setShowFailureDepositModal(false);
          }}
        >
          <div className="w-full h-full flex justify-center items-center px-4">
            <div className="bg-white p-5 w-[23.125rem] rounded-sm max-w-full relative">
              <div className="flex justify-end items-center absolute left-[1.25rem] top-[1.25rem]">
                <CloseButton
                  closeHanlder={() => {
                    setShowFailureDepositModal(false);
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <Image
                  width={500}
                  height={500}
                  className="w-[9.6875rem] h-[8.4375rem]"
                  src="/FailureDepositInfo.png"
                  alt="پرداخت ناموفق"
                />
                <p className="font-bold">پرداخت شما با مشکل مواجه شده!</p>
                <p className="text-center">
                  در صورت کسر مبلغ، تا 72 ساعت آینده هزینه به حساب شما برگشت
                  داده خواهد شد.
                </p>
                <div className="w-full">
                  <ButtonElement
                    typeButton="primary"
                    fontWeight="bold"
                    handler={() => paymentHandler.mutate({ id: 0, price: +price , paymentType: 0 })}
                    loading={loadingPayment}
                  >

                    تلاش مجدد

                  </ButtonElement>
                </div>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default WalletPage;




const TransactionCard = (props: TransctionsType) => {


  return (
    <div className="p-4 rounded-sm border border-gray-200  flex justify-between items-center w-full">
      <div>
        <p className="text-md">
          <span className="font-bold"> مبلغ:</span>{" "}
          {priceSplitter(props.amount / 10)}
          تومان
        </p>
      </div>
      <div>
        <p className="text-md font-bold">
          {moment(props.createdAt).format("jYYYY/jMM/jDD")}
        </p>
      </div>
      <div>
        {/* {
                    paymentActionType(props.actionType)?.isPositive ?
                        <span className={`bg-link-light text-link py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}>{t(paymentActionType(props.actionType)?.title)}</span>
                        :
                        <span className={`bg-error-light text-error-100 py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}>
                            {t(paymentActionType(props.actionType)?.title)}
                        </span>
                    } */}
        {props.actionType === 3 || props.actionType === 0 && props.isSuccess ? (
          <span
            className={`bg-link-light text-link py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            واریزی
          </span>
        ) : null}
        {props.actionType === 2 && (
          <span
            className={`bg-error-light text-error-100 py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            برداشت
          </span>
        )}
        {props.isSuccess === null && (
          <span
            className={`bg-error-light bg-error/20 text-error py-2 px-4 flex justify-center items-center rounded-sm text-md font-bold`}
          >
            لغو
          </span>
        )}
      </div>
    </div>
  );
};


export const TransactionCardLoading = () => {
  return (
    <div className="p-4 rounded-sm border border-gray-200  gap-2  w-full grid grid-cols-3">
      <div className="text-md ">
        <Skeleton className="h-[1.25rem]" />{" "}
      </div>

      <div className="text-md font-bold ">
        <Skeleton className="h-[1.25rem]" />{" "}
      </div>

      <div className="">
        <Skeleton className="h-[1.25rem]" />{" "}
      </div>
    </div>
  );
};
