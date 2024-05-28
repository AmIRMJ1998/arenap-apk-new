"use client"
import useLogin from '@hooks/useLogin'
import React, { useEffect, useState } from 'react'
import { SetpLoginType } from './ModalLogin'
import OtpInput from '@modules/OtpElement'
import Timer from '@modules/Timer'
import ButtonElement from '@/components/elements/ButtonElement'

const VerifyCodeOpt = ({ changeStep, callbacks, isCallback, callbacksIndex = 0 }: SetpLoginType) => {
  const { loginVerifications, sendOtpHandler } = useLogin()
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState("")


  const verficationOtp = async (otp: number, verifycation: string) => {
    setLoading(true)
    const result = await sendOtpHandler(otp, verifycation)

    if (result?.resultCode === 200) {
      changeStep(1)
      setOtp("")
    }

    if (result?.resultCode === 200 && isCallback) {
      callbacks?.[callbacksIndex]()
    }
    if (result?.resultCode === 1200) {
      changeStep(3)
      setOtp("")
    }
    setLoading(false)
  }

  // useEffect(() => {
  //   if (otp.length === 5) {
  //     verficationOtp(+otp, loginVerifications.phoneVerificationCodeId)
  //   }
  // }, [otp])

  const time = new Date();
  time.setSeconds(time.getSeconds() + 179); // 2:59 minutes timer

  const expireTimerHanlder = () => {
    setOtp("")
    changeStep(1)
  }


  return (
    <div>
      <OtpInput
        value={otp}
        onChange={(val) => {
          setOtp(val);
        }}
      />
      <Timer expiryTimestamp={time} expireHandler={expireTimerHanlder} />
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">
          {" "}
          دریافت نکردید؟{" "}
          <button
            type="button"
          >
            {" "}
            ارسال مجدد کد
          </button>
        </p>
        <button
          type="button"
          onClick={() => {
            setOtp("")
            changeStep(1)
          }}
          className="text-primary font-bold text-sm"
        >
          تغییر شماره موبایل
        </button>
      </div>
      <ButtonElement typeButton={otp.length < 5 ? "gray-light" : "primary"} handler={() => {
        verficationOtp(+otp, loginVerifications.phoneVerificationCodeId);
      }} disabled={otp.length < 5 || loading} loading={loading} customStyle='mt-4' >ارسال کد تایید</ButtonElement>
    </div>
  )
}

export default VerifyCodeOpt