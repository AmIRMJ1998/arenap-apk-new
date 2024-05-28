"use client"
import React from 'react'
import TitleHeading from '@modules/titles/TitleHeading'
import FaqPage from '@templates/FaqPage'
import TitlePagesMobile from '@modules/titles/TitlePagesMobile'

const Faq = () => {
  return (
    <>
      <header className='py-4'>
        <TitleHeading title='سوالات متداول' />
      </header>
      <TitlePagesMobile title={"پرسش های متداول"} />
      <FaqPage />
    </>
  )
}

export default Faq