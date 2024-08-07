import { getUrlExtraImage, getUrlImage } from '@/services/getImageUrl/getImageUrl'
import { ExtraImageType } from '@/types/physicianProfile'
import Image from 'next/image'
import React from 'react'


const ExtraImageCard = (props: ExtraImageType) => {

      const { id, createdAt, physicianProfileId , clickHandler } = props

      return (
            <div className=' rounded-md cursor-pointer' onClick={clickHandler}>
                  <Image
                        src={getUrlExtraImage({ id, physicianId: physicianProfileId })}
                        width={500}
                        height={500}
                        alt="doctor_profile"
                        className="size-[12.5rem] object-cover rounded-sm "
                  />
            </div>
      )
}

export default ExtraImageCard;