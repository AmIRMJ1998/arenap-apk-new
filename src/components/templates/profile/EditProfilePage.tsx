"use client"
import React, { useEffect, useState } from 'react'
import { editProfileSchema } from '@/utils/validations'
import {
      Formik,
      Form,
      Field,
      FormikProps,
} from 'formik';
import ButtonElement from '@elements/ButtonElement';
import FormControlEdit from '@elements/inputs/FormControlEdit';
import useUserInfo from '@/hooks/useUserInfo';
import { UserType } from '@/types/global';
import editProfile from '@/services/user/user';
import TitlePagesMobile from '@/components/modules/titles/TitlePagesMobile';
import Toastify from '@/components/elements/toasts/Toastify';

interface InitialValuesType {
      firstName: string;
      lastName: string;
      notionalNumber: string;
      phoneNumber: string
}


const EditProfilePage = () => {

      const { user, getUser } = useUserInfo()
      const [loadingButton, setLoadingButton] = useState(false)

      let initialValues: InitialValuesType = {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            notionalNumber: user.nationalNumber || "",
            phoneNumber: user.phoneNumber || ""
      }




      return (
            <>
                  <TitlePagesMobile title={"ویرایش حساب کاربری"} />

                  <div>
                        <Formik
                              initialValues={initialValues}
                              validationSchema={editProfileSchema}
                              onSubmit={async (values, actions) => {
                                    setLoadingButton(true)
                                    const res = await editProfile(values.firstName, values.lastName, values.notionalNumber)
                                    if (res.resultCode) {
                                          Toastify("success", "حساب کاربری با موفقیت ویرایش شد")
                                          getUser()
                                    }
                                    setLoadingButton(false)

                              }}
                              enableReinitialize={true}
                        >
                              {(props: FormikProps<any>) => (
                                    <Form>
                                          <Field name="firstName" type="text" placeholder=" نام خود را وارد کنید" title="نام" component={FormControlEdit} />
                                          <Field name="lastName" type="text" placeholder=" نام خانوادگی خود را وارد کنید" title="نام خانوادگی " component={FormControlEdit} />
                                          <Field name="notionalNumber" type="text" disabled={true} placeholder=" کدملی  خود را وارد کنید" title="کدملی" component={FormControlEdit} />
                                          <Field name="phoneNumber" type="string" disabled={true} placeholder=" شماره همراه خود را وارد کنید" title="شماره همراه" component={FormControlEdit} />
                                          <div className='mt-4'>
                                                <ButtonElement type='submit' typeButton='primary' size='sm' loading={loadingButton} >
                                                      ارسال
                                                </ButtonElement>
                                          </div>
                                    </Form>
                              )}
                        </Formik>
                  </div>
            </>
      )
}

export default EditProfilePage

