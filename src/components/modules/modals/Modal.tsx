import cn from "@utils/clsxFun";
import React, { ReactNode } from "react";

type ModalLoginType = {
    show: boolean,
    children: ReactNode,
    closeHandler: () => void
}




const Modal = ({ children, show, closeHandler }: ModalLoginType) => {
    //close modal handler
    const closeModalHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (target.id === "modal_parent") {
            closeHandler();
        }
        return;
    };

    return (
        <div
            id="modal_parent"
            className={cn(
                `modal fixed bottom-0 animate-modal_search  w-full h-screen  backdrop-blur-md z-[15] transition-all duration-300   `,
                {
                    "left-0 opacity-100": show,
                    "left-full opacity-0": !show,
                }
            )}
            onClick={closeModalHandler}
        >
            {children}
        </div>
    );
};

export default Modal;
