import React from "react";
import ArrowLeft from "@icons/ArrowLeft";
import cn from "@/utils/clsxFun";
import ButtonElement from "@/components/elements/ButtonElement";
import LinkElement from "@/components/elements/LinkElement";

export type TitlePrimaryType = {
    title?: string,
    link?: string,
    textLink?: string,
    btn?: boolean,
    prefix?: boolean,
    handler?: () => void,
    subTitle?: string
}


const TitlePrimary = ({
    title,
    link,
    textLink,
    btn,
    prefix = false,
    handler,
    subTitle
}: TitlePrimaryType) => {
    return (
        <div className="flex justify-between items-center">
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
                        <ButtonElement
                            typeButton="gray-light"
                            fontSize="sm"
                            type={"button"}
                            size="sm"
                        >
                            {textLink}
                            <span className="ltr:rotate-180">
                                <ArrowLeft />
                            </span>
                        </ButtonElement>
                    </div>
                </LinkElement>
            )}
            {btn && !link && (
                <div className="w-[8.5rem]">
                    <ButtonElement
                        typeButton="gray-light"
                        fontSize="sm"


                        type={"button"}
                        size="sm"

                        handler={handler}
                    >
                        {textLink}
                        <span className="ltr:rotate-180">
                            <ArrowLeft />
                        </span>
                    </ButtonElement>
                </div>
            )}
        </div>
    );
};

export default TitlePrimary;
