"use client"
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'
import TitleHeading from '@modules/titles/TitleHeading'
import BaseH2Card from '../modules/cards/BaseH2Card'



const PolicyPage = () => {



    return (
        <>
            <TitlePagesMobile title={"قوانین و مقررات آرناپ"} />
            <header className='py-4'>
                <TitleHeading title="قوانین و مقررات آرناپ" />
            </header>
            <div className=" pb-5 mt-4  flex justify-start items-center gap-4 flex-col">
                <BaseH2Card title={"قوانین و مقررات آرناپ"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col'>
                        <p>
                            سلام و درود خدمت همراهان گرامی آرناپ
                        </p>
                        <p>
                            به پاس اعتماد شما عزیزان تیم آرناپ همواره در تلاش برای ایجاد فضایی امن و راحت برای نوبت گیری از پزشکان مورد نظرتان میباشد.
                        </p>
                        <p>
                            جهت بهبود عملکرد قوانین و مقررات را مطالعه و تایید نمایید.
                            (سپاس از همراهی شما)
                        </p>
                        <p className='text-error font-bold'> عدم رعایت هر یک از قوانین توسط شما منجر به غیر فعال شدن حساب کاربریتان میشود . </p>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"قوانین و شرایط حساب کاربری :"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                            <li className='w-full'>نگهداری اطلاعات از طریق رمزنگاری پیشرفته به وسیله بروزترین روش های روز دنیا بروی فضای امن ابری صورت میگیرد.</li>
                            <li>از حساب کاربری خود حفاظت کنید در صورت هرگونه خسارت و آسیب آرناپ هیچگونه مسئولیتی را بر عهده نمی گیرد.</li>
                            <li>درهنگام وارد کردن اطلاعات خود در حساب کاربری از صحت آن اطمینان حاصل فرمایید,درصورت مشاهده هرگونه تناقض اطلاعات وارده شده با اطلاعات واقعی شما حساب کاربریتان غیرفعال میشود.</li>
                            <li>پس از ثبت اطلاعات خود شما اجازه ی ارسال پیامک از سمت آرناپ  به شماره ای که وارد کرده اید را می دهید .</li>
                            <li>این پیامک جهت اطلاع رسانی خدمات و سرویس های مناسب با درخواست شما از پلتفرم آرناپ مثل: ثبت نوبت , لغو نوبت و ورود به سایت میباشد.</li>
                        </ul>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"لغو نوبت توسط بیمار :"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                            <li>اگر در طی یک ماه تعداد نوبت های لغو شده توسط شما به 5 عدد برسد شما تا 24ساعت پس از آن قابلیت نوبت گیری نخواهید داشت</li>
                            <li>با هر حساب کاربری شما در یک شیفت کاری پزشک مورد نظرتان فقط نوبت میتوانید دربافت کنید.</li>
                            <li>سامانه آرناپ محدودیتی برای نوبت گرفتن از چند پزشک ندارد.</li>
                            <li>در صورت لغو نوبت توسط شما مبلغ پرداختی به طور کامل به کیف پول شما در حساب کاربریتان انتقال خواهد یافت.</li>
                            <li>شش ساعت مانده به زمان نوبت قابلیت لغو وجود نخواهد داشت.</li>
                            <li>برای دریافت اعتبار موجود در کیف پول با پشتیبان تماس بگیرید.</li>
                        </ul>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"قوانین و مقررات ثبت و امتیاز دهی :"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                            <li>انتقال تجربه مراجعه شما به سایر کاربران در بهبود فرایند در زمان و ارتقا خدمات پزشکی نقش به سزایی دارد و این امکان را فراهم می سازد تا سایر کاربران برای گرفتن نوبت و خدمات مورد نظرشان از پزشک پروسه راحت و دقیق تری را طی کند.</li>
                        </ul>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"چگونه در آرناپ امتیاز دهی به پزشک را انجام دهیم :"}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                            <li>پس از ورود و ثبت نام شما در سامانه آرناپ شما میتوانید نظرتان را برای پزشک ثبت نمایید. اما برای امتیازدهی باید توسط پزشک ویزیت شده باشید.</li>
                            <li>در صورت تمایل به امتیازدهی برای پزشک شما ملزم به ثبت زمان انتظار در مطب میباشید.</li>

                        </ul>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"نمایش نظرات شما : "}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2'>
                            <li>به منظور قوانین و مقررات و رعایت اصول اخلاقی نظر شما قبل از نشان دادن در پروفایل پزشک نیاز به تایید کارشناسان سایت دارد.</li>
                        </ul>
                    </div>
                </BaseH2Card>
                <BaseH2Card title={"قوانین ثبت نظر: "}>
                    <div className='text-md  flex justify-start items-start gap-2 flex-col w-full'>
                        <p>در هنگام ثبت نظر موارد زیر را در نظر بگیرید : </p>
                        <ul className='list-disc px-2 flex justify-start items-start flex-col gap-2 mt-2'>
                            <li>
                                <span className='font-bold'>نظرات با عنوان تبلیغاتی : </span>
                                نوشتن هرگونه نظر با مضنون تبلیغ برای برندها و محصولات درمانی و بهداشتی و مراکز اکیدا ممنوع می باشد و از طرف کارشناسان سایت تایید نخواهد شد.
                            </li>
                            <li>
                                <span className='font-bold'> محتوای غیر مجاز : </span>
                                ثبت نظر با محتوای سیاسی , نژادپرستانه , غیراخلاقی , توهین به عقاید و مذهب مجاز نمی باشد.
                            </li>
                            <li>
                                <span className='font-bold'>رعایت احترام و ادب : </span>
                                نظر ثبت شده باید با رعایت اصول اخلاقی , ادب و احترام نوشته شوند هرگونه بی احترامی به پزشک , منشی و کادر درمان منجر به رد نظر و عدم نمایش و انتشار خواهد شد.
                            </li>
                            <li>
                                <span className='font-bold'>حقوق مادی و معنوی و اختصاصی بودن محتوا : </span>
                                کلیه حقوق مادی و معنوی این وب سایت متعلق به شرکت فنی و مهندسی طراحان سیستم پنام است و هرگونه کپی برداری از محتوای سایت پیگرد قانونی دارد.
                            </li>

                        </ul>

                    </div>
                </BaseH2Card>
            </div>
        </>
    )
}

export default PolicyPage