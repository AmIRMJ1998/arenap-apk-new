"use client"
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'

import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import TitleHeading from '@modules/titles/TitleHeading'
import BaseH2Card from '@modules/cards/BaseH2Card'
import { Field, Form, Formik, FormikProps } from 'formik'
import { ticketPublic } from '@/utils/validations'
import ButtonElement from '../elements/ButtonElement'
import cn from '@/utils/clsxFun'
import { sendTicketPublic } from '@/services/ticketPublic/ticketPublic'
import MapContainer from '../modules/map/MapContainer'
import Toastify from '../elements/toasts/Toastify'

interface InitialValuesType {
    fullName: string,
    emailAddre: string,
    phoneNumber: string,
    title: string,
    message: string
}

const ContactUsPage = () => {
    const [loadingButton, setLoadingButton] = useState(false)
    let initialValues: InitialValuesType = {
        fullName: "",
        emailAddre: "",
        phoneNumber: "",
        title: "",
        message: ""
    }



    return (
        <>
            <TitlePagesMobile title={"تماس با ما"} />
            <header className='py-4'>
                <TitleHeading title="تماس با آرناپ" />
            </header>
            <div className=" pb-5 mt-4">
                <BaseH2Card title={"تماس با ما"}>
                    <div className='flex justify-start items-stretch flex-col-reverse md:flex-row gap-4'>
                        <div className='w-full md:w-6/12'>
                            <p className='font-bold md:hidden'>ثبت دیدگاه</p>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={ticketPublic}
                                onSubmit={async (values, actions) => {

                                    setLoadingButton(true)
                                    const res = await sendTicketPublic(values.fullName, values.emailAddre, values.phoneNumber, values.title, values.message)
                                    if (res?.arenapResultCode === 200) {
                                        actions.resetForm()
                                        Toastify("success", "دیدگاه شما با موفقیت ثبت شد")
                                    }
                                    setLoadingButton(false)

                                }}


                            >
                                {(props: FormikProps<any>) => (
                                    <Form>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                            <Field name="fullName" type="text" placeholder="نام و نام خانوادگی خود را وارد کنید" title="نام و نام خانوادگی" component={FormControlEdit} />
                                            <Field name="emailAddre" type="text" placeholder="ایمیل خود را وارد کنید" title="ایمیل" component={FormControlEdit} />
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                            <Field name="phoneNumber" type="text" placeholder=" شماره همراه  خود را وارد کنید" title="شماره همراه" component={FormControlEdit} />
                                            <Field name="title" type="text" placeholder=" عنوان خود را وارد کنید" title="عنوان" component={FormControlEdit} />
                                        </div>
                                        <Field name="message" type="text" placeholder=" دیدگاه خود را وارد کنید" title="دیدگاه" component={TextAreaControl} />
                                        <div className='mt-4'>
                                            <ButtonElement type='submit' typeButton='primary' size='sm' loading={loadingButton} >
                                                ارسال
                                            </ButtonElement>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className='text-md  w-full md:w-6/12'>

                            <div className='grid grid-cols-2 gap-2 '>
                                <div className='bg-bg_content p-2 rounded-sm'><p className='flex justify-start items-center flex-wrap'>شماره تماس: <Link className='font-bold'
                                    href={"tel:021910966760"}>6760 - 9109 - 021</Link> </p></div>
                                <div className='bg-bg_content p-2 rounded-sm'><p className='flex justify-start items-center flex-wrap'>اینستاگرام ما : <Link className='font-bold'
                                    target='_blank' href={"https://www.instagram.com/arenap_team"} >Arenap_team@</Link> </p></div>
                                <div className='bg-bg_content p-2 rounded-sm'><p className='flex justify-start items-center flex-wrap'>لینکدین ما : <Link className='font-bold'
                                    target='_blank' href={"https://www.linkedin.com/company/arenap-team"} >Arenap-team@</Link> </p></div>
                                <div className='bg-bg_content p-2 rounded-sm'><p className='flex justify-start items-center flex-wrap'>ایمیل ما : <Link className='font-bold'
                                    target='_blank' href={"mailto:arenapgroup@gmail.com"} >ArenapGroup@Gmail.com</Link> </p></div>
                            </div>
                            <div className='mt-4  min-h-[12.5rem] md:h-[calc(100%-6.125rem)]'>
                                <div className='rounded-sm overflow-hidden shadow-shadow_category'>
                                    <MapContainer height={300} zoom={16} markerWidth={25} location={[35.71755526502500, 51.42751509295143]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </BaseH2Card>
            </div>

        </>
    )
}

export default ContactUsPage;

export type FormControlEditType = {
    type: "number" | "text" | "tel",
    children?: ReactNode,
    className?: string
    form: any,
    field: any,
    placeholder?: string,
    title?: string,
    disabled?: boolean,
    value: string | number
}

const FormControlEdit = (props: FormControlEditType) => {
    const { field, title, type, placeholder, form, value, disabled } = props

    return (
        <div className='border-b border-gray-500  px-2 h-[2.8125rem] relative '>
            <input type={type} name={field.name} value={value} className='w-full h-full text-sm ' placeholder={placeholder} {...field} />
            {
                form.errors?.[field.name] && form.touched?.[field.name] && (
                    <span
                        className={cn(
                            `text-sm px-2 text-error  absolute top-1/2 left-0`,
                            {
                                "opacity-100": form.errors?.[field.name] && form.touched?.[field.name],
                                "opacity-0": !form.errors?.[field.name] && !form.touched?.[field.name],
                            }
                        )}
                    >
                        {form.errors?.[field.name]}
                    </span>
                )
            }
        </div>
    )
}
const TextAreaControl = (props: FormControlEditType) => {
    const { field, title, type, placeholder, form, value, disabled } = props

    return (
        <div className='border-b border-gray-500  px-2 mt-4 h-[10rem] relative'>
            <textarea name={field.name} value={value} className='w-full h-full text-sm resize-none' placeholder={placeholder} {...field} ></textarea>
            {
                form.errors?.[field.name] && form.touched?.[field.name] && (
                    <span
                        className={cn(
                            `text-sm px-2 text-error  absolute bottom-0 left-0`,
                            {
                                "opacity-100": form.errors?.[field.name] && form.touched?.[field.name],
                                "opacity-0": !form.errors?.[field.name] && !form.touched?.[field.name],
                            }
                        )}
                    >
                        {form.errors?.[field.name]}
                    </span>
                )
            }
        </div>
    )
}