import LinkElement from '@/components/elements/LinkElement'
import { SpecialitySearchTagType } from '@/types/search'
import React from 'react'

const SpecialityTagSearch = (props: SpecialitySearchTagType) => {
      const { name , enName } = props
      
      return (
            <LinkElement link={`physicians/specialty/${enName}`} className='border border-gray-300 bg-white rounded-3xl flex justify-center items-center text-md h-[2.8125rem] transition-all duration-300 px-4 hover:bg-gray-300 hover:text-white '>
                  {name}
            </LinkElement>
      )
}

export default SpecialityTagSearch