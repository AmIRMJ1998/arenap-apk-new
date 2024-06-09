
import StarRateModule from "@/components/elements/StarRateMofule"
import UpThumbIcon from "@/components/icons/UpThumbIcon"
import { CommentType } from "@/types/physicianProfile"
// import StarRateModule from "../StarRateModule"

const PhysicianCommentCard = (props: CommentType) => {
      const { firstName, lastName, message } = props
      return (
            <div className="rounded-sm shadow-shadow_category bg-white p-5">
                  <div className="flex justify-between items-center">
                        <div>
                              <p className="font-bold text-sm">
                                    {firstName} {lastName}
                              </p>
                              <p className="text-xs">
                                    زمان انتظار {10}
                              </p>
                        </div>
                        {true &&
                              <div className="rounded-[1.5rem] bg-[#DEFFDB] flex items-center gap-3 px-3 py-1">
                                    <UpThumbIcon size="19px" />
                                    <span className="text-[#4FA148] text-sm font-bold">این پزشک را پیشنهاد میکند</span>
                              </div>
                        }
                  </div>
                  <p className="text-sm pt-6 pb-3">
                        {message}
                  </p>
                  <div className="flex justify-end items-center gap-2">
                        <StarRateModule rate={5} size="sm" ltr={true} />
                        <p className="font-bold text-sm h-[0.9375rem]">{5}</p>
                  </div>
            </div>
      )
}

export default PhysicianCommentCard
