import LinkElement from '@/components/elements/LinkElement'
import { getUrlImage } from '@/services/getImageUrl/getImageUrl'

import { RelatedPhysicianType } from '@/types/physicianProfile'
import { PhysicianProfileType } from '@/types/search'

import cn from '@/utils/clsxFun'
import Image from 'next/image'
import React from 'react'




const SearchSmallCard = (props: RelatedPhysicianType | PhysicianProfileType) => {
      const { hasImage, id, bg, physicianSpecialities,  physicianProfileUrl, firstName, lastName } = props
      return (
            <LinkElement link={`Physician/${physicianProfileUrl}`} className={cn('flex justify-start items-center bg-white w-full py-2 px-4 rounded-sm', bg)} >
                  <div className='rtl:pl-2 ltr:pr-2'>
                        <Image src={hasImage ? getUrlImage(id) : "/noImage.jfif"} width={500} height={500} alt='avatar' className='size-[3.4375rem] rounded-full' />
                  </div>
                  <div className='flex-1 text-sm'>
                        <p className='font-bold'>دکتر {firstName} {lastName}</p>
                        {physicianSpecialities ? <p>{physicianSpecialities[0]?.specialityTitle}</p> : "مختصص داخلی"}
                  </div>
            </LinkElement>
      )
}

export default SearchSmallCard