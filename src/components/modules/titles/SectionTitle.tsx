import React from "react";
import Link from "next/link";





import cn from "@utils/clsxFun";


import ArrowLeft from "@icons/ArrowLeft";

import LinkElement from "@elements/LinkElement";


interface SectionTitleType {
    title?: string;
    subTitle?: string;
    link?: string;
    textLink?: string;
    btn?: boolean;
    prefix?: boolean;
    handler?: () => {};
}



const SectionTitle = ({
    title,
    link,
    textLink,
    btn,
    prefix = false,
    handler,
    subTitle
}: SectionTitleType) => {

    return (
        <div className="flex justify-between items-center pb-4">
            <h2
                className={cn(`text-lg font-bold `, {
                    "rtl:mr-[1.25rem] ltr:ml-[1.25rem] relative after:absolute after:rtl:-right-[1.25rem] after:rounded-lg after:top-0 after:block after:bg-primary after:w-1.5 after:h-full":
                        prefix,
                })}
            >
                {title} {subTitle ? `(${subTitle})` : ""}
            </h2>
            {btn && link && (
                <LinkElement link={`${link}`} >
                    <div className="w-[7.5rem]">
                        <button
                            type="button"
                            className="bg-gray-200 text-sm border-gray-200 text-primary h-[2.5rem] px-4 flex justify-center items-center gap-2 w-full rounded-3xl"
                        >
                            {textLink}
                            <span className="ltr:rotate-180">
                                <ArrowLeft />
                            </span>
                        </button>
                    </div>
                </LinkElement>
            )}
            {btn && !link && (
                <div className="w-[7.5rem]">
                    <button
                        type="button"
                        className="bg-gray-200 text-sm border-gray-200 text-primary h-[2.5rem] px-4 flex justify-center items-center gap-2 w-full rounded-3xl"
                        onClick={handler}
                    >
                        {textLink}
                        <span className="ltr:rotate-180">
                            <ArrowLeft />
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionTitle;
