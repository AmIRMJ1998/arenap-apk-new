"use client"


import clsx from "clsx"
import RadioButton from "./inputs/RadioButton"
import cn from "@/utils/clsxFun"

export type AppointmentRadioButtonType = {
    time: string,
    active: boolean,
    selected: boolean,
    handler: () => void,
    ramainingTime: number,
    index: number,
    calendarId: string,
    name: string
}


const AppointmentRadioButton = ({ name, time, active, selected, handler, ramainingTime, index, calendarId }: AppointmentRadioButtonType) => {

    return (
        <>

            <label
                className={cn("", {
                    "cursor-pointer":
                        ramainingTime === 0,
                })}
                htmlFor={`${calendarId}-${index}`}
            >
                <div className={clsx(`flex group rounded-[1.75rem] justify-center items-center gap-3 font-bold h-[2.9375rem] w-[5.625rem] relative shadow-shadow_category transition-all duration-300 overflow-hidden `,


                    {
                        "text-gray-400": !active,
                        "bg-primary text-white": selected && active,
                        "bg-white": !selected && active,
                        "cursor-default": !selected && !active,
                        " after:absolute  after:transition-all after:duration-300 after:left-0 after:bottom-full after:block after:bg-primary after:w-full after:h-full after:-z-1 hover:after:bottom-0": !selected && active,

                    }
                )}>
                    {active && <div className={cn(`rounded-full size-[1.1875rem] flex items-center justify-center z-10 `, {
                        "bg-green-300": selected,
                        "bg-gray-100": !selected
                    })}>
                        {selected &&
                            <div className="z-10 rounded-full size-[0.6875rem] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.5)]" />
                        }
                    </div>}
                    <p className="z-10 ">
                        <span className={cn(
                            {
                                "hidden md:block md:group-hover:hidden": !active
                                
                            }
                        )}>{time}</span>
                        <span className={
                            cn(
                                "md:hidden text-sm text-error",
                                {
                                    "md:group-hover:block": !active
                                }
                            )
                        }>{!active && " رزرو شده"}</span>
                    </p>
                </div>
                <input
                    type="radio"
                    name={name}
                    disabled={ramainingTime > 0}
                    id={`${calendarId}-${index}`}
                    value={`${calendarId}-${index}`}
                    onChange={handler}
                    hidden
                />
            </label>
        </>
    )
}

export default AppointmentRadioButton
