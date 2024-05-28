

import cn from "@/utils/clsxFun";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type ArticleCardSecondaryType = {
    link: string,
    freeMode?: boolean,
    shadow?: boolean,
    title: string,
    description: string[],
    author: string,
    image: string,
    date: string
}


const ArticleCardSecondary = ({ link, freeMode, shadow = true, title, description, author, image, date }: ArticleCardSecondaryType) => {


    return (
        <Link
            href={`/${link}`}
            className={cn(
                `p-4 flex justify-between items-start flex-col  bg-white rounded-sm group transition-all duration-300 hover:shadow-shadow_category`,
                {
                    "w-[11.25rem]": freeMode,
                    "w-full": !freeMode,
                    "shadow-shadow_category": shadow,
                }
            )}
        >
            <div className="">
                <div className="flex items-center gap-5">
                    <div className="rounded-sm overflow-hidden w-1/3">
                        <Image
                            src={`/${image}.jpg`}
                            width={300}
                            height={300}
                            alt="article_pic"
                            className="group-hover:scale-110 transition-all duration-500"
                        />
                    </div>
                    <div className="w-2/3">
                        <p className="text-md font-bold py-2 group-hover:text-primary transition-all duration-300">{title}</p>
                        <p className="text-sm short-text-3">
                            {description}
                        </p>
                        <div className="w-full flex justify-between items-center text-sm text-gray-500 mt-2">
                            <p>{author}</p>
                            <p>{date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCardSecondary;
