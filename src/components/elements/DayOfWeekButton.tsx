import cn from "@/utils/clsxFun"

export type DayOfWeekButtonType = {
    selected: boolean,
    dayOfWeek: string,
    dayOfMonth: string,
    disabled: boolean,
    isAppointment: boolean
}

const DayOfWeekButton = ({ selected, dayOfWeek, dayOfMonth, disabled, isAppointment }: DayOfWeekButtonType) => {
    return (
        <div className={cn(`group overflow-hidden relative flex flex-shrink-0 flex-col justify-center items-center rounded-[2.5625rem] cursor-pointer h-[6.25rem] w-[4.375rem] text-md p-2 transition-all duration-300`, {
            "bg-gray-200 text-gray-450 cursor-default": !disabled,
            "bg-primary text-white": disabled && selected,
            "bg-white text-black": disabled && !selected,
            "after:absolute  after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-primary after:w-full after:h-full after:-z-1 hover:after:bottom-0 hover:text-white after:z-0 ": disabled && !selected,
            "border border-primary": isAppointment,
        })}>
            <div className={cn("text-center z-10")}>
                <p>{dayOfWeek}</p>
                <p>{dayOfMonth}</p>
            </div>
        </div>
    )
}

export default DayOfWeekButton
