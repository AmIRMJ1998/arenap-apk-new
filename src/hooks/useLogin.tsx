"use client"
import Toastify from '@/components/elements/toasts/Toastify';
import { apiDomainNobat } from '@/services/getApiUrl';
import urls from '@/services/urls';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './useRedux';
import { savePhoneVerificationCodeId, saveSessionId, saveTokens } from '@/store/features/LoginSlice';
import { getCaptcha } from '@/services/captcha/captcha';
import { useEffect, useState } from 'react';
import useModalLogin from './useModalLogin';
import useUserInfo from './useUserInfo';


const useLogin = (isCallback: boolean = false, indexCallback: number = 0, callbacks: Function[] = []) => {
    const state = useAppSelector(state => state.login)
    const dispatch = useAppDispatch()
    const [captcha, setCaptcha] = useState("")
    const [key, setKey] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)
    const { closeModalLogin, isShow } = useModalLogin()
    const { getUser } = useUserInfo()

    const getCaptchaApi = async () => {
        setLoading(true)
        const captcha = await getCaptcha()

        setCaptcha(captcha.captchaBase64Data)
        setKey(captcha.key)
        setLoading(false)
    }




    useEffect(() => {
        if (isShow) {
            getCaptchaApi()
        }
    }, [isShow])


    const sendPhoneHandler = async (
        phoneNumber: string,
        captcha: string,
        key: string
    ) => {
        const obj = {
            input: {
                phoneNumber: phoneNumber,
            },
            captcha: {
                input: captcha,
                key,
            },
        };

        try {
            setLoadingButton(true)
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.sendPhone.url}`,
                obj
            );
            const data = res.data;

            if (res.data.resultCode === 200) {
                dispatch(savePhoneVerificationCodeId({ phoneVerificationCodeId: res.data.value.phoneVerificationCodeId, phoneNumber }))
            }
            return data;
        } catch (error: any) {
            getCaptchaApi()
            Toastify("error", error.response?.data?.resultMessage);
        } finally {
            setLoadingButton(false)
        }

    };

    const sendOtpHandler = async (verificationCode: number, phoneVerificationCodeId: string) => {
        const obj = {
            verificationCode,
            phoneVerificationCodeId
        };
        try {
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.sendOtp.url}`,
                obj
            );
            const data = res.data;
            if (data?.resultCode === 200) {
                localStorage.setItem("accessToken", data.value.accessToken)
                localStorage.setItem("refreshToken", data.value.refreshToken)
                dispatch(saveTokens({ accessToken: data.value.accessToken, refreshToken: data.value.refreshToken }))
                closeModalLogin()
                getUser()

                if (isCallback) {
                    callbacks[indexCallback]()
                }
            }

            if (data?.resultCode === 1200) {
                dispatch(saveSessionId({ sessionId: data.value.sessionId }))
            }


            return data;
        } catch (error: any) {
            Toastify("error", error.response?.data?.resultMessage);
        }
    }

    const signUpHandler = async (
        nationalNumber: string,
        firstName: string,
        lastName: string,
        sessionId: string,
    ) => {
        const obj = {
            nationalNumber,
            gender: "U",
            cityId: 98,
            firstName,
            lastName,
            sessionId,
        };
        try {
            const res = await axios.post(
                `${apiDomainNobat}${urls.login.signUp.url}`,
                obj
            );
            const data = res.data;
            if (data?.resultCode === 200) {
                closeModalLogin()
                localStorage.setItem("accessToken", data.value.accessToken)
                localStorage.setItem("refreshToken", data.value.refreshToken)
                getUser()

                if (isCallback) {
                    callbacks[indexCallback]()
                }
            }
            return data;
        } catch (error: any) {
            Toastify("error", error.response?.data?.resultMessage);
        }
    }


    return {
        sendPhoneHandler, sendOtpHandler, signUpHandler, loginVerifications: {
            phoneVerificationCodeId: state.phoneVerificationCodeId,
            sessionId: state.sessionId
        },
        captcha, key, loading, resetCaptcha: getCaptchaApi, loadingButton
    }
}

export default useLogin