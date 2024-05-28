"use client"
import Image from 'next/image'

import { usePathname } from 'next/navigation'


import LinkElement from '@elements/LinkElement'
import ButtonElement from '@elements/ButtonElement'
import useUserInfo from '@/hooks/useUserInfo'
import Loader from '../elements/Loader'
import AcoountButtonHeader from '../elements/AccountButtonHeader'
import ModalLogOut from './ModalLogOut'


const Header = () => {
  const { user, isLogin } = useUserInfo()

  const pathName = usePathname()

  return (
    <header className='  bg-primary min-h-[5rem] mdSecondary:flex  justify-center items-center'>
      <div className="container py-2 hidden mdSecondary:block ">
        <div className='flex items-center w-full '>

          {/* Logo */}
          <LinkElement link='' prefetch={true} >
            <Image src={"/Logo.png"} width={1000} height={1000} alt='Logo website' className='w-[1.875rem]' />
          </LinkElement>
          {/* Navbar */}
          <nav className='rtl:mr-4 ltr:ml-4 w-full ' >
            <ul className='flex justify-start items-center gap-3 text-white  w-full'>
              <li>
                <LinkElement link="">

                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/' && pathName !== "/en" ? "primary" : pathName === '/' || pathName === "/en" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='min-w-[7rem]'
                  >
                    صفحه اصلی
                  </ButtonElement>

                </LinkElement>
              </li>
              <li>
                <LinkElement link="blog">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/blog' && pathName !== "/en/blog" ? "primary" : pathName === '/blog' || pathName === "/en/blog" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='min-w-[7rem]'
                  >
                    بلاگ آرناپ
                  </ButtonElement>
                </LinkElement>
              </li>
              <li>
                <LinkElement link="physicians">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/physicians' && pathName !== "/en/physicians" ? "primary" : pathName === '/physicians' || pathName === "/en/physicians" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='min-w-[7rem]'
                  >
                    جستجو پزشکان
                  </ButtonElement>
                </LinkElement>
              </li>
              <li>
                <LinkElement link="aboutus">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/aboutus' && pathName !== "/en/aboutus" ? "primary" : pathName === '/aboutus' || pathName === "/en/aboutus" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='min-w-[7rem]'
                  >
                    درباره ما
                  </ButtonElement>
                </LinkElement>
              </li>
              <li>
                <LinkElement link="contactus">
                  <ButtonElement type={"button"}
                    typeButton={pathName !== '/contactus' && pathName !== "/en/contactus" ? "primary" : pathName === '/contactus' || pathName === "/en/contactus" ? "gray" : undefined}
                    size={"sm"}
                    variant='contained'
                    width='min-w-[7rem]'
                  >
                    تماس با ما
                  </ButtonElement>
                </LinkElement>
              </li>
              <li className='rtl:mr-auto ltr:ml-auto flex justify-start items-center gap-4'>
                <a href={"https://dr.arenap.ir/Dashboard"} rel='nofollow noopener noreferrer external' target='_blank' className='text-md'   >
                  
                    ثبت نام / ورود پزشک
                  
                </a>
                {
                  isLogin === "isLoading" ?
                    <ButtonElement typeButton='secondary' size='md' variant='contained' width='w-[10.625rem]'>
                      <Loader size='size-[2.25rem]' color='border-primary' />
                    </ButtonElement> : null
                }
                {
                  isLogin === "authorization" ?
                    <AcoountButtonHeader user={user} />
                    : null
                }
                {
                  isLogin === "unauthorization" ?
                    <LinkElement link="login">
                      <ButtonElement type={"button"}
                        typeButton={"secondary"}
                        size={"md"}
                        variant='contained'
                        width='w-[10.9375rem] h-[3.125rem]'
                      >
                        ثبت نام / ورود
                      </ButtonElement>
                    </LinkElement>
                    : null
                }
              </li>
            </ul>
          </nav>

        </div>
      </div>
      <ModalLogOut />
    </header>
  )
}

export default Header