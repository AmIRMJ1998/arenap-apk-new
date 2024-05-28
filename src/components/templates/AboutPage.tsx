"use client"
import React from 'react'
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import priceSplitter from '@utils/priceSplitter'
import TitleHeading from '@modules/titles/TitleHeading'
import BaseH2Card from '@modules/cards/BaseH2Card'


const AboutPage = () => {
  return (
    <>
      <TitlePagesMobile title={"درباره ما (آرناپ)"} />
      <header className='py-4'>
        <TitleHeading title='درباره آرناپ' />
      </header>
      <div className=" pb-5 mt-4 flex justify-start items-start gap-4 flex-col">

        <BaseH2Card title={"درباره ما (آرناپ)"}>
          <p className='my-2 font-bold'>به آرناپ خوش آمدید</p>
          <ul className='text-md  flex justify-start items-start gap-2 flex-col'>
            <li>شما در آرناپ همواره آخرین متدهای روز را در حوزه سلامت مشاهده می کنید</li>
          </ul>
        </BaseH2Card>
        <BaseH2Card title={"چرخه فرآیند سامانه آرناپ"}>


          <div className='mt-4'>

            <p className='my-3'>آرناپ سرویسی آنلاین شامل بهترین مجموعه ها مختص پزشکان و دستیاران آن ها، منشی ها و مراجعین مطب می باشد.</p>


            <ul className='flex justify-start items-start gap-4 flex-col'>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'>دریافت نوبت :</h3>
                <p>  بیمار با مراجعه به سامانه دریافت نوبت پزشک،
                  تاریخ و نحوه مراجعه ( حضوری یا آنلاین )
                  مورد نظر خود را انتخاب و نوبت دریافت می کند</p>
              </div>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'>ویزیت توسط پزشک :</h3>پزشک بیمار خود را با مشاهده سوابق پزشکی او،
                ویزیت و با توجه به نیاز وی برای او نسخه نویسی می کند</div>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'>
                ارسال نسخه به سازمان بیمه :</h3>به صورت خودکار پس از تأیید نسخه نهایی توسط پزشک نسخه بیمار به سازمان بیمه گر ارسال می شود
              </div>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'>ارسال نسخه و تحویل در داروخانه :</h3>نسخه نوشته شده پزشک به داروخانه ارسال می شود و داروخانه اقدام به نسخه پیچی می کند</div>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'> ارسال نسخه دارو به سازمان بیمه
                :</h3>داروخانه به صورت خودکار نسخه بیمار را پس از اقدامات نهایی به سازمان بیمه ی بیمار ارسال می کند

              </div>
              <div className='flex justify-start items-start gap-1 flex-col'><h3 className='text-primary font-bold'> دریافت نسخه :</h3>بیمار با انتخاب شیوه حضوری یا ارسال درب منزل نسخه دارویی خود داروی خود را دریافت می کند

              </div>

            </ul>
          </div>
        </BaseH2Card>
        <BaseH2Card title={"نوبت دهی آنلاین برای بیماران و مراجعه کنندگان"}>
          <p>
            برای رفع پیچیدگی نوبت گیری از پزشکان کل کشور آرناپ با ارائه پلتفرمی جامع جهت بهبود عملکرد نوبت گیری به صورت آنلاین آماده خدمت رسانی می باشد.
          </p>
          <p className='my-4'>
            شما در هر ساعت از شبانه روز به لیست نوبت های خالی پزشک دسترسی دارید، پس از ورود به سایت بدون نیاز به حضور منشی در مطب و اتلاف وقت و هزینه، میتوانید نوبت خود را دریافت نمائید.
          </p>

          <p className='mt-4'>
            در هر نقطه ای از کشور می توانید از پزشک مورد نظرتان از شهر و استانی دیگر نوبت دریافت کنید.
          </p>
        </BaseH2Card>
        <BaseH2Card title={"نرم افزاری جامع برای مدیریت مطب"}>
          <p>پزشکان و درمانگران عزیز می توانند از خدمات آرناپ که شامل هوشمند سازی مطب به صورت تمام الکترونیک می باشد بهره مند شوند.</p>
          <p className='font-bold text-primary my-4'>از جمله امکانات آرناپ برای پزشکان :</p>
          <ul className='flex justify-start items-start gap-2 flex-col'>
            <li><span className='font-bold text-primary'>ثبت سریع و راحت نسخه الکترونیک : </span>امکان ثبت و ارسال نسخه الکترونیک بیماران به سازمان های بیمه گر و دیگر مراکز پزشکی در سریع ترین و راحت ترین روش ممکن</li>
            <li><span className='font-bold text-primary'>پرونده سازی الکترونیک : </span>امکان پرونده سازی خودکار و هوشمند سلامت بیماران، در یک بستر با هر نوع پوشش بیمه ای</li>
            <li><span className='font-bold text-primary'>اپلیکیشن نسخه نویسی مخصوص موبایل : </span>امکان نسخه نویسی الکترونیک با سرعت بالا با نصب اپلیکیشن آرناپ</li>

            <li><span className='font-bold text-primary'>قابلیت استفاده از قلم نوری : </span>نوشتن شرح حال به صورت دست نویس جهت صرفه جویی در زمان پزشک  </li>
            <li><span className='font-bold text-primary'>دارای مجوز های پایه کشور : </span>دارای تاییدیه و مجوز از بیمه های پایه کشور و وزارت بهداشت و دارنده رتبه اول نسخه الکترونیک</li>
          </ul>
        </BaseH2Card>
        <BaseH2Card title={"چه چیزهایی آرناپ را متمایز می کند ؟"}>
          <ul className='list-disc px-4'>
            <li className='font-bold '>
              <p>همکاری با بیش از {priceSplitter(10000)} پزشک در سراسر ایران</p>
              <p className='font-normal mt-4'>پزشکان با ثبت نام در سامانه جامع آرناپ می توانند با ایجاد پروفایل شخصی خود و معرفی تخصص و خدماتشان در زمان های  مشخصی توسط منشی یا پزشک نوبت های خود را به شکل اینترنتی و آنلاین مدیریت کنند و پس از آن مراجعه کنندگان و بیماران با دسترسی سریع پس از اخذ نوبت بدون هیچگونه اتلاف وقت و هزینه به مطب مراجعه فرمایند.</p>
            </li>

          </ul>
        </BaseH2Card>
      </div></>
  )
}

export default AboutPage