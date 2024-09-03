"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import BaseCard from '../../modules/cards/BaseCard'
import MoreIcon from '../../icons/profile/MoreIcon'
import Skeleton from 'react-loading-skeleton'
import useUserInfo from '@/hooks/useUserInfo'
import TitlePagesMobile from '@/components/modules/titles/TitlePagesMobile'
import ButtonElement from '@/components/elements/ButtonElement'
import Modal from '@/components/modules/modals/Modal'
import BottomSheetAndCenterContent from '@/components/modules/modals/BottomSheetAndCenterContent'
import CloseButton from '@/components/elements/CloseButton'
import FormControl from '@/components/elements/inputs/FormControl'
import { useMutation } from '@tanstack/react-query'
import { createPeople, deletePeople } from '@/services/otherPeople/otherPeople'
import { Field, Form, Formik, FormikProps } from 'formik'
import { otherPeopleSchema } from '@/utils/validations'


const MyFamilyPage = () => {
    // modals
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [addAndEditModal, setAddAndEditModal] = useState(false)
    const [peopleInfo, setPeopleInfo] = useState<{
        firstName: string
        lastName: string
        nationalNumber: string
        id: string
    }>({
        firstName: "",
        lastName: "",
        nationalNumber: "",
        id: "",
    })
    const [modalDelete, setModalDelete] = useState(false)
    const { isLogin, user, getUser } = useUserInfo()

    const initialPeopleValues = {
        firstName: "",
        lastName: "",
        nationalNumber: ""
    }
    const createPeopleHan = useMutation({
        mutationFn: async (obj: { firstName: string, lastName: string, nationalNumber: string }) => {
            const result = await createPeople(obj)
            if (result.resultCode === 200) return
        },
        onSuccess: async () => {
            getUser()
            setAddAndEditModal(false)
        }
    })
    const deletePeopleHan = useMutation({
        mutationFn: async () => {
            const result = await deletePeople(peopleInfo.id)
            if (result.resultCode === 200) return
        },
        onSuccess: async () => {
            getUser()
            setModalDelete(false)
            setPeopleInfo({
                firstName: "",
                id: "",
                lastName: "",
                nationalNumber: ""
            })
        }
    })


    return (
        <>


            <TitlePagesMobile title={"بستگان من"} />
            <div className='container'>
                <header className='bg-white mt-4 rounded-sm h-[65px] flex justify-center items-center px-4'>
                    <div className='w-full  flex justify-between items-center'>
                        <p className='font-bold'>بستگان من</p>
                        <div className='w-[140px]'>
                            <ButtonElement typeButton='primary' customStyle={"bg-primary"} size={"sm"} handler={() => {
                                setAddAndEditModal(true)
                            }}  >
                                افزودن عضو جدید
                            </ButtonElement>
                        </div>
                    </div>
                </header>
                <section className='mt-4' >
                    {!user.families.length && isLogin !== "isLoading" ? (
                        <div className='h-[calc(100vh-220px)] flex justify-center items-center flex-col gap-8'>
                            <div>
                                <Image src={"/noPeoples.png"} width={500} height={500} alt='noPeoples_image' className='w-full' />
                            </div>
                            <div className='flex justify-start items-center gap-2 flex-col'>
                                <p className='text-md '>تا بحال عضوی در این لیست ثبت نشده</p>
                                <p className='text-sm '>با افزودن عضو جدید میتوانید برای افراد دیگر نوبت ثبت کنید</p>
                            </div>

                        </div>
                    ) : null}

                    {
                        user.families.length && isLogin === "authorization" ? (
                            <BaseCard title={"اعضا"}>
                                <div className='flex  justify-start items-start flex-col gap-2'>
                                    {user.families.map(item => <CardPeople key={item.id} showModal={addAndEditModal} deletHandler={() => {
                                        setModalDelete(true)
                                        setPeopleInfo({ ...item })
                                    }}  {...item} clickHandler={() => {
                                        setShowModalEdit(true)
                                    }} />)}
                                </div>
                            </BaseCard>
                        ) : null
                    }

                    {isLogin === "isLoading" && (
                        <BaseCard title={"اعضا"}>
                            <div className='flex justify-start items-center gap-2 flex-col'>
                                <CardPeopleLoading />
                                <CardPeopleLoading />
                                <CardPeopleLoading />
                                <CardPeopleLoading />
                            </div>
                        </BaseCard>
                    )}

                    {/* modal more btns */}
                    <div className=''>
                        <Modal show={showModalEdit} closeHandler={() => setShowModalEdit(false)}>
                            <BottomSheetAndCenterContent show={showModalEdit}>
                                <div>
                                    <span className='absolute top-[30px] rtl:left-[15px] ltr:right-[15px] xs:rtl:left-[30px] xs:ltr:right[30px]' ><CloseButton closeHanlder={() => setShowModalEdit(false)} /></span>
                                    <p className='text-center font-bold '>عملیات</p>
                                    <div className='mt-4 flex justify-start items-center  flex-col '>
                                        <div className='py-2 cursor-pointer md:text-gray-500 w-full border-b border-gray-300  ' onClick={() => { }}>ویرایش عضو</div>
                                        <div className='py-2 cursor-pointer md:text-gray-500 hover:text-error transition-all duration-500 w-full ' onClick={() => { }}  >حذف عضو</div>
                                    </div>
                                </div>
                            </BottomSheetAndCenterContent>
                        </Modal>
                    </div>
                    {/* modal add and edit people */}
                    <div>
                        <Modal show={addAndEditModal} closeHandler={() => setAddAndEditModal(false)}>
                            <BottomSheetAndCenterContent show={addAndEditModal}>
                                <>
                                    {/* <p className='text-center text-lg font-bold'>{!switchAddAndEdit ? `ویرایش عضو ` : "ثبت نام"} </p> */}
                                    <>
                                        <p className="text-center text-lg font-bold">اضافه کردن افراد</p>

                                        <Formik
                                            initialValues={initialPeopleValues}
                                            validationSchema={otherPeopleSchema}
                                            onSubmit={async (values, actions) => {
                                                createPeopleHan.mutate(values)
                                                actions.resetForm()
                                            }}
                                        >
                                            {(props: FormikProps<any>) => (
                                                <Form>
                                                    <div className='grid grid-cols-2 gap-2 mt-4'>
                                                        <Field name="firstName" type="text" placeholder=" نام خود را وارد کنید" title="نام" component={FormControl} />
                                                        <Field name="lastName" type="text" placeholder=" نام خانوادگی خود را وارد کنید" title="نام خانوادگی " component={FormControl} />
                                                    </div>

                                                    <Field name="nationalNumber" type="tel" placeholder=" کدملی  خود را وارد کنید" title="کدملی" component={FormControl} />



                                                    <div className='mt-4'>
                                                        <ButtonElement type='submit' typeButton='primary' size='sm' loading={createPeopleHan.isLoading}  >
                                                            ارسال
                                                        </ButtonElement>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                    </>
                                </>
                            </BottomSheetAndCenterContent>
                        </Modal>
                    </div>
                    {/* modal delete people */}
                    <div>
                        <Modal show={modalDelete} closeHandler={() => setModalDelete(false)}>
                            <div className='w-full h-full flex justify-center items-center  '>
                                <div className='bg-white p-5 w-[300px] rounded-sm max-w-full'>
                                    <div className='flex justify-end items-center '>
                                        <CloseButton closeHanlder={() => setModalDelete(false)} />
                                    </div>
                                    <div className='mt-1 text-md'>
                                        ایا مایلید {peopleInfo.firstName} {peopleInfo.lastName}  از لیست افراد خود حذف کنید؟
                                    </div>
                                    <div className='mt-4 flex justify-between items-center gap-2 '>
                                        <ButtonElement typeButton='primary' customStyle={"bg-error border hover:border-error hover:text-error"} size={"sm"} handler={deletePeopleHan.mutate}
                                            loading={deletePeopleHan.isLoading}
                                        >
                                            حذف شود
                                        </ButtonElement>
                                        <ButtonElement typeButton='primary' customStyle={"bg-transparent border border-primary text-primary"} size={"sm"} handler={() => setModalDelete(false)} >
                                            انصراف
                                        </ButtonElement>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </section >
            </div >

        </>
    )
}

export default MyFamilyPage



const CardPeople = (props: {
    firstName: string;
    lastName: string;
    id: string;
    nationalNumber: string;
    clickHandler: () => void;
    showModal?: boolean,
    deletHandler: () => void
}) => {
    const {
        firstName, id, lastName, nationalNumber, deletHandler
    } = props
    const [showMore, setShowMore] = useState(false)
    return (
        <div className='p-2 border rounded-sm border-gray-200 w-full relative flex justify-between items-center gap-2'>

            <div>
                <div className='flex justify-start items-center gap-3'>
                    <p className='font-bold text-md'>{firstName} {lastName}</p>
                    <p className='bg-gray-650 py-1 text-md text-gray-500 rounded-[7px] px-2'>کد ملی : <span>{nationalNumber}</span></p>
                </div>
                <div>
                    {/* <p className='text-gray-500 text-md'>شماره تماس : <span>{phoneNumber}</span></p> */}
                </div>
            </div>
            <div className='relative'>
                <span className=' cursor-pointer w-[45px] h-[45px   ] flex justify-center items-center  ' onClick={() => setShowMore(true)} ><MoreIcon /> </span>
                {showMore ? (<span className='fixed top-0 left-0 w-full h-screen z-10 ' onClick={() => {
                    setShowMore(false)
                }}></span>) : null}
                {
                    showMore ? (
                        <div className='text-center absolute top-[calc(100%+5px)] z-[10] left-[calc(100%+5px)] p-2 bg-white rounded-sm shadow-shadow_toast'>
                            {/* <div>ویرایش</div> */}
                            <div className='text-error py-2 cursor-pointer' onClick={deletHandler}>حذف</div>
                        </div>
                    ) : null
                }
            </div>
        </div >
    )
}
const CardPeopleLoading = () => {

    return (
        <div className='p-2 border rounded-sm border-gray-200 w-full relative flex justify-between items-start  flex-col h-[76px] '>

            <div className='flex justify-start items-center gap-1 w-full'>
                <div className='font-bold text-md w-4/12'> <Skeleton className='h-[18px]' /></div>
                <div className=' py-1 text-md  rounded-[7px]  w-4/12'> <Skeleton className='h-[18px]' /></div>
            </div>
            <div className='w-1/2'>
                <Skeleton className='h-[22px]' />
            </div>


        </div>
    )
}