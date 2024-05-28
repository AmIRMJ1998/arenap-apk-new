import cn from "@/utils/clsxFun"

const Loader = ({ color, size }: {
    size: string,
    color: "border-primary" | "border-white" | "border-error",
}) => {
    return (
        <div  className={cn(`perspective relative  rounded-full`,
            size
        )}>
            <div className={cn("absolute w-full h-full rounded-full left-0 top-0 animate-[loadingCircleOne_1.2s_linear_infinite] border-b-4",
                color
            )}></div>
            <div className={cn("absolute w-full h-full rounded-full right-0 top-0 animate-[loadingCircleTwo_1.2s_linear_infinite] border-r-4",
                color
            )}></div>
            <div className={cn("absolute w-full h-full rounded-full right-0 bottom-0 animate-[loadingCircleThree_1.2s_linear_infinite] border-t-4",
                color
            )}></div>
        </div>
    )
}

export default Loader