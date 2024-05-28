import React from 'react'
import LinkElement from './LinkElement'
import { title } from 'process'

const SpecialtyTag = ({ link, title }: { link: string, title: string }) => {
    return (
        <LinkElement link={link} className='px-3 h-[2.8125rem] rounded-3xl border border-gray-500'>
            {title}
        </LinkElement>
    )
}

export default SpecialtyTag