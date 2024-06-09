import StarRateModule from "@/components/elements/StarRateMofule"
import DownThumbIcon from "@/components/icons/DownThumbIcon"
import UpThumbIcon from "@/components/icons/UpThumbIcon"
import { CommentType } from "@/types/physicianProfile"
import { convertWaitingTime } from "@/utils/convertWaitingTime"



const PhysicianCommentCard = (props: CommentType) => {
      const { firstName, lastName, message, isSuggested, rate, waitingTime } = props
      return (
            <div className="rounded-sm shadow-shadow_category bg-white p-5">
                  <div className="flex justify-between items-center">
                        <div>
                              <p className="font-bold text-sm">
                                    {firstName} {lastName}
                              </p>
                              <p className="text-xs">
                                    زمان انتظار {convertWaitingTime(waitingTime)}
                              </p>
                        </div>
                        {isSuggested ?
                              <div className="rounded-[1.5rem] bg-[#DEFFDB] flex items-center gap-3 px-3 py-1">
                                    <UpThumbIcon size="19px" />
                                    <span className="text-[#4FA148] text-sm font-bold">این پزشک را پیشنهاد میکند</span>
                              </div> :
                              <div className="rounded-[1.5rem] bg-error/20 flex items-center gap-3 px-3 py-1">
                                    <DownThumbIcon size="19px" />
                                    <span className="text-error text-sm font-bold">این پزشک را پیشنهاد نمیکند</span>
                              </div>
                        }
                  </div>
                  <p className="text-sm pt-6 pb-3">
                        {message}
                  </p>
                  <div className="flex justify-end items-center gap-2">
                        <StarRateModule rate={rate} size="sm" ltr={true} />
                        <p className="font-bold text-sm h-[0.9375rem]">{rate}</p>
                  </div>
            </div>
      )
}

export default PhysicianCommentCard
