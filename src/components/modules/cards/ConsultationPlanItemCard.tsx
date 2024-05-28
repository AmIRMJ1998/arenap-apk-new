import TurnsIcon from "@/components/icons/menu/TurnsIcon"
import RingingPhoneIcon from "@/components/icons/RingingPhoneIcon"
import PhoneIcon from "@/components/icons/RingingPhoneIcon"
import MessageIcon from "@/components/icons/profile/MessageIcon"
import priceSplitter from "@/utils/priceSplitter"
import cn from "@/utils/clsxFun"
import RadioButton from "@/components/elements/inputs/RadioButton"


export type ConsultationPlanItemCardType = {
      icon: string,
      title: string,
      price: number | null,
      firstDescription: string | null | undefined,
      secondDescription: string | null | undefined,
      selected: boolean,
      active: boolean,
      status: boolean | null
}


const ConsultationPlanItemCard = ({ icon, title, price, firstDescription, secondDescription, selected, active, status }: ConsultationPlanItemCardType) => {
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
                        {active && price &&
                              <p className="text-md">
                                    {priceSplitter(price)} تومان
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
                        <div className="flex gap-2">
                              {active ?
                                    <>
                                          {/* <CustomRadioButton selected={selected} color="bg-green-300" /> */}
                                          <div className={cn(`rounded-full w-[19px] h-[19px] flex items-center justify-center `, {
                                                "bg-green-300": selected,
                                                "bg-gray-100": !selected
                                          })}>
                                                {selected &&
                                                      <div className="rounded-full w-[11px] h-[11px] bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.5)]" />
                                                }
                                          </div>
                                          <p className="text-primary text-md font-bold">انتخاب</p>
                                    </>
                                    :
                                    <p className="text-primary text-md font-bold">غیرفعال</p>
                              }
                        </div>
                  </div>
            </div >
      )
}

export default ConsultationPlanItemCard
