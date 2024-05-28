
import cn from "@/utils/clsxFun";
import React, { ReactNode } from "react";

type BottomSheetAndCenterContentType = {
    children: ReactNode,
    show: boolean
}



const BottomSheetAndCenterContent = ({ children, show }: BottomSheetAndCenterContentType) => {
    return (
        <div
            className={cn(
                ` bg-white max-h-[calc(100vh-6.25rem)]    rounded-tr-xl rounded-tl-xl md:rounded-xl w-full transtion-all  shadow-shadow_category duration-700 delay-300  md:duration-300 absolute  left-0 p-4 xs:p-[1.875rem] md:w-[28.125rem] md:bottom-[50%] md:left-[50%] md:-translate-x-1/2 md:translate-y-1/2 z-[15] `,
                {
                    "bottom-0 md:opacity-100": show,
                    "-bottom-full md:opacity-0": !show,
                }
            )}
        >
            <div className="">
                {children}
            </div>
        </div>
    );
};

export default BottomSheetAndCenterContent;
