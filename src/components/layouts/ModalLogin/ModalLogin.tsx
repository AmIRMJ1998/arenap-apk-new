"use client"
import BottomSheetAndCenterContent from '@modules/modals/BottomSheetAndCenterContent'
import useModalLogin from '@hooks/useModalLogin'
import Modal from '@modules/modals/Modal'
import React, { useState } from 'react'
import SendPhone from './SendPhone'
import CloseButton from '@elements/CloseButton'
import VerifyCodeOpt from './VerifyCodeOpt'
import Signup from './Signup'

export type SetpLoginType = {

    changeStep: (nextStep: number) => void,
    callbacks?: Function[],
    callbacksIndex?: number,
    isCallback?: boolean
}
export type PropsType = {
    callbacks?: Function[],
    callbacksIndex?: number,
    isCallback?: boolean
}





const ModalLogin = (props: PropsType) => {
    const [stepLogin, setStepLogin] = useState(1)
    const { isShow, closeModalLogin } = useModalLogin()

    const changeStepHandler = (nextStep: number) => {
        setStepLogin(nextStep)
    }


    return (
        <Modal show={isShow} closeHandler={closeModalLogin}>
            <BottomSheetAndCenterContent show={isShow}>
                <div className='grid grid-cols-3'>
                    <span ></span>
                    <p className='flex justify-center items-center font-bold'>
                        ورود / ثبت نام
                    </p>
                    <div className='flex justify-end items-center'>
                        <CloseButton closeHanlder={closeModalLogin} />
                    </div>
                </div>
                <div className='mt-4'>
                    {
                        stepLogin === 1 ? <SendPhone  changeStep={changeStepHandler} /> : null
                    }
                    {
                        stepLogin === 2 ? <VerifyCodeOpt isCallback={props.isCallback} callbacks={props.callbacks} callbacksIndex={props.callbacksIndex} changeStep={changeStepHandler} /> : null
                    }
                    {
                        stepLogin === 3 ? <Signup isCallback={props.isCallback} callbacks={props.callbacks} callbacksIndex={props.callbacksIndex} changeStep={changeStepHandler} /> : null
                    }
                </div>
            </BottomSheetAndCenterContent>
        </Modal>
    )
}

export default ModalLogin