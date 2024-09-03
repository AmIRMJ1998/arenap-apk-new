"use client"
import React, { ReactNode, useRef, useState } from 'react'
import cn from '@/utils/clsxFun'
import ArrowLeft from '../icons/ArrowLeft'

const DropDownBasical = ({ children, customStyle, radius, bg }: { children: ReactNode, customStyle?: string, radius?: string, bg?: string }) => {
      const textRef = useRef<HTMLDivElement>(null)
      const [open, setOpen] = useState(false)
      return (
            <div className={cn(`bg-white py-2 px-4  shadow-shadow_category relative w-full  rounded-lg overflow-hidden transition-all duration-500`,
                  {
                        // "test": open
                        // "pb-8" : open
                  },
                  radius
                  , bg,
                  customStyle,
                  // className
            )}
                  style={{ height: open ? `${(textRef.current?.offsetHeight ? textRef.current?.offsetHeight : 0) + 30}px` : `10rem` }}
            >
                  <div ref={textRef} className='pb-3 flex justify-start gap-2 items-start flex-col'>
                        {children}
                        <div className={cn(
                              'flex justify-center items-center gap-2 font-bold text-primary  w-full cursor-pointer py-2 bg-white',
                              {
                                    " absolute bottom-0 left-0 after:absolute after:left-0 after:bottom-full after:w-full after:h-10 after:bg-white_to_up_transparent": !open
                              }
                        )} onClick={() => {
                              setOpen(!open)

                        }}>
                              {open ? null : <p>مشاهده بیشتر</p>}
                              <span className={cn(
                                    '-rotate-90',
                                    {
                                          'rotate-90': open
                                    }
                              )}>
                                    <ArrowLeft />
                              </span>
                        </div>
                  </div>
            </div>
      )
}

export default DropDownBasical