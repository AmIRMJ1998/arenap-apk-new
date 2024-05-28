"use client"
import React, { useEffect, useState } from 'react'
import { getInfoAppointment } from '@/services/appointments/appointment'
import { OneAppointmentType, PhysicianProfile } from '@/types/appointment'
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import useModalLogin from '@/hooks/useModalLogin'
import useUserInfo from '@/hooks/useUserInfo'
import ModalLogin from '@layouts/ModalLogin/ModalLogin'
import { createPayment } from '@/services/payment/payment'
import ToastBlue from '@elements/ToastBlue'
import Toastify from '@elements/toasts/Toastify'
import useFavorite from '@/hooks/useFavorite'
import AppointmentPrimaryCard from '@modules/cards/Appointment/AppointmentPrimaryCard'
import BaseCard from '@modules/cards/BaseCard'
import LikeIcon from '@icons/LikeIcon'
import ShareIcon from '@icons/ShareIcon'
import Image from 'next/image'
import RefreshIcon from '@icons/RefreshIcon'
import ButtonElement from '@elements/ButtonElement'
import LinkElement from '@elements/LinkElement'

export type PaymentPageProps = {
    price: number,
    status: string,
    physician: PhysicianProfile,
    appointmentId: string
}







const PaymentPage = (props: PaymentPageProps) => {

    const [appointment, setAppointment] = useState<OneAppointmentType | null>(null)
    const [loadingPayment, setLoadingPayment] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)
    const [callbackIndex, setCallbackIndex] = useState<number>(0)
    const { openModalLogin } = useModalLogin()
    const { isLogin } = useUserInfo()


    const getAppointment = async () => {

        if (isLogin === "isLoading") return
        if (isLogin === "unauthorization") {
            setCallbackIndex(0)
            openModalLogin()
            return
        }

        setLoading(true)
        const res = await getInfoAppointment(props.appointmentId)


        setAppointment(res.value)
        setLoading(false)
    }

    const callbacks = [
        () => {
            getAppointment()
        }
    ]


    useEffect(() => {
        if (props.status === "Success") {

            getAppointment()
            setError(false)
        } else if (props.status === "Fail") {
            setError(true)
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])

    const addAppointmentHandler = async () => {
        setLoadingPayment(true)
        try {
            const res = await createPayment(props.appointmentId, props.price, 1)
            ToastBlue(
                "در حال انتقال به صفحه درگاه پرداخت...",
                "",
                props.price,
                "top-center"
            );
            window.location.href = res;
            return;

        } catch (error: any) {
            Toastify("error", error.response?.data?.resultMessage)
        }
        setLoadingPayment(true)
    }

    const { userFavorite, addFavorite, deleteFavorite } = useFavorite(props.physician.id)

    const favoritePhysicianHandler = async () => {
        if (isLogin === "isLoading") return;
        if (isLogin === "unauthorization") {
            setCallbackIndex(1)
            openModalLogin()
            return;
        }

        if (!userFavorite) {
            addFavorite()
        } else {
            deleteFavorite()
        }
    };

    let time = {
        hour: appointment ? +appointment.hour : 0,
        minute: appointment ? +appointment.minute : 0,
    }


    return (
        <>
            <ModalLogin isCallback={true} callbacks={callbacks} callbacksIndex={callbackIndex} />

            {
                props.status === "Success" ? (<TitlePagesMobile title={`نوبت اینترنتی از ${props.physician.firstName} ${props.physician.lastName}`} />) : (<TitlePagesMobile title={`خطا در نوبت گیری `} />)
            }

            {
                props.status === "Success" ? (
                    <>
                        {/* ----------section------------- */}
                        {/* appointment card */}
                        <AppointmentPrimaryCard
                            physician={props.physician}
                            day={appointment?.calendar.dayOfMonth ? appointment?.calendar.dayOfMonth : 0}
                            price={props.price}
                            lockTime={0}
                            payment={true}
                            year={appointment?.calendar.year ? appointment?.calendar.year : 0}
                            month={appointment?.calendar.month ? appointment?.calendar.month : 0}
                            index={0}
                            time={time}
                        />
                        {/* ----------section------------- */}

                        {/* ----------section------------- */}
                        {/* patient section */}
                        <section className='my-4 '>
                            <BaseCard radius="rounded-md" title="مشخصات بیمار">
                                <div className="grid grid-cols-2 gap-y-4">
                                    <div className="flex items-start gap-2">
                                        <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-md">نام :</p>
                                            <p className="text-md">{appointment?.userFirstName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-md">شماره موبایل :</p>
                                            <p className="text-md">{appointment?.userPhoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-md">نام خانوادگی :</p>
                                            <p className="text-md">{appointment?.userLastName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="rounded-full w-[0.4375rem] h-[0.4375rem] mt-[0.4375rem] bg-[#D9D9D9]" />
                                        <div className="flex flex-col gap-1">
                                            <p className="font-bold text-md">کد ملی :</p>
                                            <p className="text-md">{appointment?.userNationalNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </BaseCard>
                        </section>
                        {/* ----------section------------- */}

                        {/* ----------section------------- */}
                        {/* favorite  */}
                        <div className="mt-4">
                            <button className="rounded-md bg-white p-5 w-full" onClick={favoritePhysicianHandler}>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold">پزشک مورد علاقه</p>
                                    <LikeIcon liked={userFavorite} />
                                </div>
                            </button>
                        </div>
                        {/* ----------section------------- */}

                        {/* ----------section------------- */}
                        {/* share */}
                        <div className="mt-4">
                            <button className="rounded-md bg-white p-5 w-full">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold">معرفی پزشک به دوستان</p>
                                    <ShareIcon />
                                </div>
                            </button>
                        </div>
                        {/* ----------section------------- */}
                    </>
                ) : null
            }

            {/* ----------section------------- */}
            {/* when status = fail */}
            {
                props.status === "Fail" && (
                    <div className='min-h-screen flex justify-center items-center '>
                        <div className='flex justify-start items-center gap-3 flex-col'>
                            <Image src={"/failPayment.png"} width={1000} height={1000} alt='image' className='w-full' />
                            <p className='text-center'> لطفا دوباره امتحان کنید</p>
                            <div className='w-[9.375rem]'>
                                <ButtonElement typeButton='primary' handler={addAppointmentHandler} loading={loadingPayment} disabled={loadingPayment}>
                                    <RefreshIcon />
                                    تلاش مجدد
                                </ButtonElement>
                            </div>
                            <div className='w-[9.375rem]'>
                                <LinkElement link='/' >
                                    <ButtonElement typeButton='primary' >
                                        صفحه اصلی
                                    </ButtonElement>
                                </LinkElement>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* ----------section------------- */}

        </>
    ) 
}

export default PaymentPage