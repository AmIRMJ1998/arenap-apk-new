import LinkElement from '@/components/elements/LinkElement'
import { ArticleCardType } from '@/types/cards'
import cn from '@/utils/clsxFun'
import Image from 'next/image'
import React from 'react'




const ArticleCardPrimary = (props: ArticleCardType) => {
    const { id, title, description, image, date, author } = props
    return (
        <LinkElement
            link={`blog?title=${id}`}
            className={cn(
                `p-2 h-[16.25rem] group w-[11.25rem] flex justify-between items-start flex-col  bg-white rounded-sm`,
                {

                }
            )}
        >
            <div className="rounded-sm overflow-hidden w-full">
                <Image
                    src={`/${image}.jpg`}
                    width={500}
                    height={500}
                    className='group-hover:scale-110 transition-all duration-500'
                    alt="article_pic"
                />
            </div>
            <div className="w-full">
                <p className="text-md font-bold py-2 group-hover:text-primary transition-all duration-500">{title}</p>
                <p className="text-sm short-text-3">{description}</p>
            </div>
            <div className="w-full flex justify-between items-center text-sm font-[300] text-gray-500">
                <p>{author}</p>
                <p>{date}</p>
            </div>
        </LinkElement>
    )
}

export default ArticleCardPrimary