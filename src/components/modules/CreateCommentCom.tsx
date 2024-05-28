import React, { useState } from 'react'
import Toastify from '../elements/toasts/Toastify';
import useUserInfo from '@/hooks/useUserInfo';
import useModalLogin from '@/hooks/useModalLogin';
import ModalLogin from '../layouts/ModalLogin/ModalLogin';
import ButtonElement from '../elements/ButtonElement';
import PencilIcon from '../icons/PencilIcon';
import Modal from './modals/Modal';
import BottomSheetAndCenterContent from './modals/BottomSheetAndCenterContent';
import CloseButton from '../elements/CloseButton';
import cn from '@/utils/clsxFun';
import UpThumbIcon from '../icons/UpThumbIcon';
import DownThumbIcon from '../icons/DownThumbIcon';
import ToastWarning from '../elements/toasts/ToastWarning';
import FunctionalStarRateModule from './FunctionalStarRateModule';
import RadioButton from '../elements/inputs/RadioButton';
import createComment from '@/services/comment/commen';

export type CreateCommentComType = {
    firstName: string,
    lastName: string,
    showComment: boolean,
    setShowComment: () => void,
    closeComment: () => void,
    physicianId: string
}

const CreateCommentCom = ({ firstName, lastName, physicianId, showComment, setShowComment, closeComment }: CreateCommentComType) => {
    const [isPresent, setIsPresent] = useState(false);

    const [showVisitTypeQuestionModal, setShowVisitTypeQuestionModal] =
        useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const [rate, setRate] = useState(0);
    const [waitingTime, setWaitingTime] = useState(0);
    const [recommendation, setRecommendation] = useState<boolean | null>(null);
    const [commentText, setCommentText] = useState("");
    const [loadingButtonComment, setLoadingButtonComment] = useState(false)




    const visitQuestionModalHandler = () => {


        setRate(0);
        setWaitingTime(0);
        setRecommendation(null);
        setCommentText("");

        setShowVisitTypeQuestionModal(false);
        setShowFormModal(false);
        setShowComment()
    };
    const visitTypeQuestionModalHandler = () => {
        closeComment()
        setShowFormModal(false);
        setShowVisitTypeQuestionModal(true);
    };

    const newCommentModalHandler = (isPresent: boolean) => {
        setIsPresent(isPresent);
        closeComment()
        setShowVisitTypeQuestionModal(false);
        setShowFormModal(true);
    };

    const rateHandler = (value: number) => {
        setRate(value);
    };

    const waitingTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaitingTime(+e.target.value);
    };





    const submitCommentHandler = async () => {
        if (commentText.length === 0) {
            Toastify("error", "لطفا متن نظر خود را وارد نمائید");
            return;
        }

        setLoadingButtonComment(true)
        try {
            const res = await createComment(
                physicianId,
                "",
                rate,
                waitingTime,
                recommendation,
                commentText
            );
            console.log(res)
        } catch (error: any) {

        }

        setRate(0)
        setWaitingTime(0)
        setRecommendation(null)
        setCommentText("")
        setShowFormModal(false)
        setLoadingButtonComment(false)
    };


    return (
        <>
            <ButtonElement
                typeButton="primary"
                fontWeight="bold"
                type={"button"}
                size="sm"
                handler={visitQuestionModalHandler}
            >
                <span className="ml-3">ثبت نظر جدید</span>
                <PencilIcon />
            </ButtonElement>
            {/* ----------modal------------- */}
            <Modal
                show={showComment}
                closeHandler={closeComment}
            >
                <div className="w-full h-full flex justify-center items-center  ">
                    <div className="bg-white p-5 w-[18.75rem] rounded-sm max-w-full">
                        <div className="flex justify-end items-center ">
                            <CloseButton
                                closeHanlder={closeComment}
                            />
                        </div>
                        <div className="mt-1">
                            {`آیا تا بحال توسط دکتر ${firstName} ${lastName} ویزیت شده اید؟`}
                        </div>
                        <div className="mt-8 flex justify-between items-center gap-2 ">
                            <ButtonElement
                                typeButton="primary"
                                size={"sm"}
                                handler={visitTypeQuestionModalHandler}
                            >
                                بله
                            </ButtonElement>
                            <ButtonElement
                                typeButton="transparent"
                                fontWeight="bold"


                                size={"sm"}
                                handler={() => {
                                    ToastWarning("امکان ثبت نظر برای شما وجود ندارد", "بعد از ویزیت شما توسط پزشک نظر خود را ثبت کنید", 3000)
                                    closeComment()
                                }}
                            >
                                خیر
                            </ButtonElement>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* ----------modal------------- */}
            {/* ----------modal------------- */}
            <Modal
                show={showVisitTypeQuestionModal}
                closeHandler={() => {
                    setShowVisitTypeQuestionModal(false);
                }}
            >
                <div className="w-full h-full flex justify-center items-center  ">
                    <div className="bg-white p-5 w-[18.75rem] rounded-sm max-w-full">
                        <div className="flex justify-end items-center ">
                            <CloseButton
                                closeHanlder={() => setShowVisitTypeQuestionModal(false)}
                            />
                        </div>
                        <div className="mt-1">نوع ویزیت شما به چه شکل بوده است؟</div>
                        <div className="mt-8 flex justify-between items-center gap-2 ">
                            <ButtonElement


                                typeButton="primary"
                                fontWeight="bold"
                                size={"sm"}
                                handler={() => newCommentModalHandler(true)}
                            >
                                حضوری
                            </ButtonElement>
                            <ButtonElement
                                typeButton="primary"
                                fontWeight="bold"
                                size={"sm"}
                                handler={() => newCommentModalHandler(false)}
                            >
                                تلفنی
                            </ButtonElement>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* ----------modal------------- */}
            {/* ----------modal------------- */}
            <Modal show={showFormModal} closeHandler={() => setShowFormModal(false)}>
                <BottomSheetAndCenterContent show={showFormModal}>
                    <div className="h-[calc(100vh-8.5625rem)] overflow-y-auto">
                        <div>
                            <span className="absolute top-[1.875rem]  rtl:left-[0.9375rem] ltr:right-[0.9375rem] xs:rtl:left-[1.875rem] xs:ltr:right[1.875rem]">
                                <CloseButton closeHanlder={() => setShowFormModal(false)} />
                            </span>
                        </div>
                        <p className="font-bold text-center mb-3">امتیاز</p>
                        <div className="flex justify-center mb-8">
                            <FunctionalStarRateModule
                                size="xl"
                                rate={rate}
                                rateHandler={rateHandler}
                                ltr={true}
                            />
                        </div>
                        {
                            isPresent && (
                                <>
                                    <p className="text-md font-bold mb-5">مدت زمان انتظار</p>
                                    <div className='flex flex-col gap-4 mb-8'>

                                        <RadioButton selected={waitingTime === 0} color='bg-primary' title="۰ تا ۱۵ دقیقه" changeHandler={waitingTimeHandler} index={0} name="time" value={0} />
                                        <RadioButton selected={waitingTime === 1} color='bg-primary' title="۱۵ تا ۴۵ دقیقه" changeHandler={waitingTimeHandler} index={1} name="time" value={1} />
                                        <RadioButton selected={waitingTime === 2} color='bg-primary' title="۴۵ تا ۹۰ دقیقه" changeHandler={waitingTimeHandler} index={2} name="time" value={2} />
                                        <RadioButton selected={waitingTime === 3} color='bg-primary' title="بیش از ۹۰ دقیقه" changeHandler={waitingTimeHandler} index={3} name="time" value={3} />

                                    </div>
                                </>
                            )
                        }

                        <p className="text-md font-bold mb-5">این پزشک را پیشنهاد میکنید؟</p>
                        <div className="grid grid-cols-2 gap-4 mb-8 overflow-hidden">
                            <label htmlFor="recommended">
                                <div
                                    className={cn(
                                        `p-1 flex justify-center bg-[#DEFFDB] rounded-[2.9375rem] items-center gap-3 text-md w-full cursor-pointer`,
                                        {
                                            "opacity-100 animate-opacity_60": recommendation,
                                            "opacity-60": !recommendation,
                                        }
                                    )}
                                >
                                    <div
                                        className={cn(`relative `, {
                                            "animate-like_thumb": recommendation,
                                        })}
                                    >
                                        <UpThumbIcon size="1.875rem" />
                                    </div>
                                    پیشنهاد میکنم
                                </div>
                                <input
                                    type="radio"
                                    name="recommendation"
                                    id="recommended"

                                    onChange={() => setRecommendation(true)}
                                    checked={recommendation ? true : false}
                                    hidden
                                />
                            </label>
                            <label htmlFor="not-recommended">
                                <div
                                    className={cn(
                                        `p-1 flex justify-center bg-[#FFF1F1] rounded-[2.9375rem] items-center gap-3 text-md w-full cursor-pointer`,
                                        {
                                            "opacity-100 animate-bouncing": recommendation === false,
                                            "opacity-60": recommendation === null || recommendation,
                                        }
                                    )}
                                >
                                    <DownThumbIcon size="1.875rem" />
                                    پیشنهاد نمیکنم
                                </div>
                                <input
                                    type="radio"
                                    name="recommendation"
                                    id="not-recommended"

                                    onChange={() => setRecommendation(false)}
                                    checked={recommendation === false}
                                    hidden
                                />
                            </label>
                        </div>
                        <label className="text-md font-bold" htmlFor="comment">
                            نظر
                        </label>
                        <textarea
                            name="comment"
                            id="comment"
                            rows={4}
                            className="w-full bg-gray-100 rounded-sm text-sm p-3 placeholder-[#B5B5B5] mt-3 mb-8"
                            placeholder="نظر خود را وارد کنید..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <div className="w-full">
                            <ButtonElement
                                typeButton="primary"
                                fontWeight="bold"
                                handler={submitCommentHandler}
                                disabled={loadingButtonComment}
                                loading={loadingButtonComment}
                            >
                                ثبت نظر
                            </ButtonElement>
                        </div>
                    </div>
                </BottomSheetAndCenterContent>
            </Modal>
            {/* ----------modal------------- */}
        </>
    )
}

export default CreateCommentCom



