import TurnsIcon from "@/components/icons/menu/TurnsIcon"
import RingingPhoneIcon from "@/components/icons/RingingPhoneIcon"
import PhoneIcon from "@/components/icons/RingingPhoneIcon"
import MessageIcon from "@/components/icons/profile/MessageIcon"
import priceSplitter from "@/utils/priceSplitter"
import cn from "@/utils/clsxFun"
import RadioButton from "@/components/elements/inputs/RadioButton"
import { Firstppointment } from "@/types/appointment"
import convertMonthOfYear from "@/utils/convertMonthOfYear"


export type ConsultationPlanItemCardType = {
      icon: string,
      title: string,
      price: number | null,
      firstDescription: string | null | undefined,
      secondDescription: string | null | undefined,
      selected: boolean,
      active: boolean,
      status: boolean | null,
      firstAppointment: Firstppointment
}


const ConsultationPlanItemCard = ({ icon, title, price, firstDescription, secondDescription, selected, active, status , firstAppointment }: ConsultationPlanItemCardType) => {
      return (
            <div className={cn(
                  `flex flex-col gap-5 rounded-sm border-2 border-gray-100 p-3 `,
                  {
                        "bg-[#EFF4FF]": selected,
                        "bg-white": !selected,
                        "cursor-pointer": active,
                        "grayscale opacity-50": !active,
                  }
            )}>
                  <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                              <div className="rounded-sm p-2 bg-green-300 relative">
                                    {icon === "appointment" ? <TurnsIcon active={true} white={true} /> : icon === "emergencyPhoneConsultation" ? <RingingPhoneIcon width="20" height="20" color="fill-white" /> : icon === "phoneConsultation" ? <PhoneIcon color="red" /> : icon === "textConsultation" ? <MessageIcon /> : null}
                                    {/* {status &&
                            <span className='w-[16px] h-[16px] bg-white rounded-full absolute -bottom-[3px] rtl:-left-[5px] ltr:-right-[5px] flex justify-center items-center '>
                                <span className={`w-[10px] h-[10px] ${status === "online" ? "bg-primary-100 animate-pulse" : "bg-gray-400"} rounded-full `}>
                                </span>
                            </span>
                        } */}
                                    {status !== null &&
                                          <span className='w-[16px] h-[16px] bg-white rounded-full absolute -bottom-[3px] rtl:-left-[5px] ltr:-right-[5px] flex justify-center items-center '>
                                                <span className={cn(
                                                      `w-[10px] h-[10px]  rounded-full `,
                                                      {
                                                            "bg-primary-100 animate-pulse": status,
                                                            "bg-gray-400": status,

                                                      }
                                                )}>
                                                </span>
                                          </span>
                                    }
                              </div>
                              <p className="font-bold">
                                    {title}
                              </p>
                        </div>
                        {active && firstAppointment &&
                              <p className="text-md">
                                    اولین نوبت خالی :
                                    <span className="font-bold">
                                          {firstAppointment?.dayOfMonth}
                                          {convertMonthOfYear(firstAppointment?.month)}
                                    </span>
                              </p>
                        }
                  </div>
                  <p className="text-md">
                        {firstDescription}
                  </p>
                  <div className="flex justify-between">
                        <p className="text-md">
                              {secondDescription}
                        </p>
                        <div className="flex gap-2 ">
                              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="38" height="38" rx="9" className="fill-primary" />
                                    <path d="M11.25 18.2739L26.25 18.2739" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.2998 24.2985L11.2498 18.2745L17.2998 12.2495" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                        </div>
                  </div>
            </div >
      )
}

export default ConsultationPlanItemCard
