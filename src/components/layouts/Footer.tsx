"use client"


import React, { ChangeEvent, useState } from 'react'
import LinkElement from '../elements/LinkElement'
import Image from 'next/image'
import ButtonElement from '../elements/ButtonElement';
import { phoneNumberValidator } from '@persian-tools/persian-tools';
import Toastify from '../elements/toasts/Toastify';
import { sendTicketPublic } from '@/services/ticketPublic/ticketPublic';
import Link from 'next/link';
import categoryData, { categoryDataFooter } from '@/data/categoryData';

interface FormType {
  firstName: string;
  lastName: string;
  comment: string;
}



const Footer = () => {
  const [form, setForm] = useState({
    fullName: "",
    emailAddre: "",
    message: "",
    title: "",
    phoneNumber: ""
  })

  const [loadingButton, setLoadingButton] = useState(false)



  const sendComment = async () => {
    if (form.fullName.trim() === "" ||
      form.phoneNumber.trim() === "" ||
      form.message.trim() === "" ||
      form.title.trim() === "" ||
      form.emailAddre.trim() === ""

    ) {
      Toastify("error", "لطفا تمام فیلدها را کامل کنید")
      return
    }
    if (!phoneNumberValidator(form.phoneNumber) || !/\S+@\S+\.\S+/.test(form.emailAddre)) {
      Toastify("error", "اطلاعات معتبر وارد کنید")
      return
    }

    try {
      setLoadingButton(true)
      const res = await sendTicketPublic(form.fullName, form.emailAddre, form.phoneNumber, form.title, form.message)
      if (res.arenapResultCode === 200) {
        Toastify("success", "دیدگاه شما با موفقیت ثبت شد")
        setForm({
          fullName: "",
          emailAddre: "",
          message: "",
          title: "",
          phoneNumber: ""
        })
      }
      setLoadingButton(false)
    } catch (error) {
      setLoadingButton(false)
      console.log(error)
    }
  }

  // change inpunts handler
  const changeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  const specialities = [...categoryDataFooter]


  return (

    <footer className='bg-white'>
      <div className="mx-auto max-w-[81.25rem] pb-[5.8125rem] lg:pb-5 pt-4 px-4">
        <div className='flex justify-between items-start flex-wrap'>
          <div className='w-full lg:w-1/3 flex justify-between items-start gap-1 px-2' >
            <div className='flex justify-center items-center flex-col w-full'>
              <h4 className='text-primary text-md font-bold text-center'>پربازدیدترین تخصص ها</h4>
              <ul className='flex justify-start items-center gap-1 flex-col text-sm mt-4'>
                {
                  specialities.map((item, index) => (
                    <li className='hover:font-bold hover:text-primary transition-all duration-300' key={item.id} ><LinkElement link={item.link}>{item.title}</LinkElement></li>
                  ))
                }
              </ul>
            </div>
            <div className='flex justify-center items-center flex-col w-full'>
              <h4 className='text-primary text-md font-bold text-center'>پربازدیدترین شهرها</h4>
              <ul className='flex justify-start items-center gap-1 flex-col text-sm mt-4'>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/tehran`}>پزشکان شهر  تهران</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/kerman`}>پزشکان شهر  کرمان</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/esfahan`}>پزشکان شهر  اصفهان</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/shiraz`}>پزشکان شهر  شیراز</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' > <LinkElement link={`physicians/city/mashhad`}>پزشکان شهر  مشهد </LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/karaj`}>پزشکان شهر  کرج</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/tabriz`}>پزشکان شهر  تبریز</LinkElement></li>
                <li className='hover:font-bold hover:text-primary transition-all duration-300 cursor-pointer' ><LinkElement link={`physicians/city/ahvaz`}>پزشکان شهر  اهواز</LinkElement></li>
              </ul>
            </div>
          </div>
          <div className='lg:order-1 w-full my-2 lg:my-0' >
            <h4 className='text-primary text-md font-bold text-center'>درباره ما</h4>
            <p className=' text-sm mt-2 text-center font-bold'>
              هدف ما در آرناپ، تلاش در جهت ایجاد بهبود در فرآیند پرونده الکترونیک بیماران و همچنین ارائه‌ی خدمات نرم افزاری علمی به پزشکان است.
            </p>
          </div>
          <div className='w-full xsOne:w-1/2 lg:w-1/3 px-2 mt-4 lg:mt-0' >
            <h4 className='text-primary text-md font-bold text-center'>تماس با ما</h4>
            <div className='mt-4 text-center flex justify-start items-start gap-2 flex-col'>
              {/* <p className='text-md w-full'>آدرس : کرمان -میدان آزادی - ابتدای بلوار جمهوری - ساختمان رویش - طبقه دو   </p> */}
              <p  className="text-md w-full">شماره تماس : 6760 - 9109 - 021</p>

              <div className='flex justify-center items-center gap-2 w-full'>

                <a href="https://www.instagram.com/arenap_team" rel='nofollow noopener noreferrer external' target='_blank' className='group p-2 border border-gray-500 rounded-full hover:bg-primary hover:shadow-shadow_category transition-all duration-500 '>
                  <svg xmlns="http://www.w3.org/2000/svg" className='transition-all duration-500 ' x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/arenap-team" rel='nofollow noopener noreferrer external' target='_blank' className='group p-2 border border-gray-500 rounded-full hover:bg-primary hover:shadow-shadow_category transition-all duration-500 '>
                  <Image src={"/linkedin.png"} width={500} height={500} alt='linkedin' className='w-5 h-5' />
                </a>
                <div className='group p-2 border border-gray-500 rounded-full hover:bg-primary hover:shadow-shadow_category transition-all duration-500 '>
                  <Image src={"/mail.png"} width={500} height={500} alt='linkedin' className='w-5 h-5' />
                </div>
              </div>
            </div>
          </div>
          {/* Send Comment */}
          <div className='w-full order-3 xsOne:order-none xsOne:w-1/2 lg:w-1/3 px-2 mt-4 lg:mt-0  rounded-sm p-2'  >
            <div className='grid grid-cols-2 gap-1 '>
              <div className='border-b border-gray-500   px-2 h-[2.8125rem] '>
                <input type="text" name='fullName' value={form.fullName} onChange={changeHandler} className='w-full h-full text-sm ' placeholder='نام و نام خانوادگی' />
              </div>
              <div className='border-b border-gray-500   px-2 h-[2.8125rem] '>
                <input type="text" name='emailAddre' value={form.emailAddre} onChange={changeHandler} className='w-full h-full text-sm ' placeholder='ایمیل' />
              </div>
              <div className='border-b border-gray-500   px-2 h-[2.8125rem] '>
                <input type="number" name='phoneNumber' value={form.phoneNumber} onChange={changeHandler} className='w-full h-full text-sm ' placeholder='شماره تلفن همراه' />
              </div>
              <div className='border-b border-gray-500   px-2 h-[2.8125rem] '>
                <input type="text" name='title' value={form.title} onChange={changeHandler} className='w-full h-full text-sm ' placeholder='عنوان' />
              </div>
            </div>
            <textarea name='message' value={form.message} onChange={changeHandler} className='w-full resize-none  mt-4 border-b border-gray-500 text-md bg-transparent ' placeholder='دیدگاه شما درباره ما ' ></textarea>
            <ButtonElement typeButton="primary" handler={sendComment} loading={loadingButton} disabled={loadingButton}>ثبت دیدگاه</ButtonElement>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer