import { useState } from "react"
import Modal from "../modules/modals/Modal"
import BottomSheetAndCenterContent from "../modules/modals/BottomSheetAndCenterContent"
import ButtonElement from "../elements/ButtonElement"
import CloseButton from "../elements/CloseButton"
import useLogoutModal from "@/hooks/useLogoutModal"
import useUserInfo from "@/hooks/useUserInfo"
import { useRouter } from "next/navigation"


const ModalLogOut = () => {
    const { isShow, closeLogoutModal } = useLogoutModal()
    const { getUser } = useUserInfo()
    const router = useRouter()

    const [finalLogoutModalShow, setFinalLogoutModalShow] = useState(false)


    const finalLogoutModalHandler = () => {
        closeLogoutModal()
        setFinalLogoutModalShow(true)
    }


    const closeFinalLogoutModalHandler = () => {
        setFinalLogoutModalShow(false)
    }

    const logOutHanlder = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        getUser()
        closeLogoutModal()
        setFinalLogoutModalShow(false)
        router.replace(`/login`)
    }


    return (
        <>
            <Modal show={isShow} closeHandler={closeLogoutModal} >
                <BottomSheetAndCenterContent show={isShow}>
                    <span className='absolute top-[1.875rem] rtl:left-[0.9375rem] ltr:right-[0.9375rem] xs:rtl:left-[1.875rem] xs:ltr:right[1.875rem]' ><CloseButton closeHanlder={closeLogoutModal} /></span>

                    <p className="font-bold">
                        خارج شدن از حساب کاربری
                    </p>
                    <p className="text-md text-gray-600 mt-10">
                        در صورت خارج شدن از حساب کاربری بایستی برای وارد شدن دوباره به اپلیکیشن شماره تلفن خود را وارد کرده و سپس کد تاییدی که به صورت پیام به شما ارسال میشود را وارد کنید.
                    </p>
                    <div className="w-full mt-7">
                        <ButtonElement typeButton="error" size="sm" handler={finalLogoutModalHandler}>خارج شدن از حساب کاربری</ButtonElement>
                    </div>
                </BottomSheetAndCenterContent>
            </Modal>
            <Modal show={finalLogoutModalShow} closeHandler={closeFinalLogoutModalHandler}>
                <div className='w-full h-full flex justify-center items-center z-10  '>
                    <div className='bg-white p-5 w-[18.75rem] rounded-sm max-w-full'>
                        <div className='flex justify-end items-center '>
                            <CloseButton closeHanlder={closeFinalLogoutModalHandler} />
                        </div>
                        <div className='mt-1'>
                            حساب کاربری خود را ترک میکنید؟
                        </div>
                        <div className='mt-8 flex justify-between items-center gap-2 '>
                            <ButtonElement typeButton="error" fontWeight="bold" size={"sm"} handler={logOutHanlder}>
                                ترک کردن
                            </ButtonElement>
                            <ButtonElement typeButton="transparent" fontWeight="bold" size={"sm"} handler={closeFinalLogoutModalHandler} >
                                انصراف
                            </ButtonElement>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalLogOut