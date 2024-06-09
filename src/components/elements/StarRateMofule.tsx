import cn from "@/utils/clsxFun"
import StarIcon from "@icons/StarIcon"

const StarRateModule = ({ rate, size, ltr }: { rate: number, size: string, ltr: boolean }) => {
      return (
            <>
                  <div className={cn(
                        `flex gap-1 `,
                        {
                              "rtl:flex-row-reverse ltr:flex-row": ltr,
                              "rtl:flex-row ltr:flex-row-reverse": !ltr,
                        }
                  )}>
                        <StarIcon size={size} fill={rate >= 0.5} />
                        <StarIcon size={size} fill={rate >= 1.5} />
                        <StarIcon size={size} fill={rate >= 2.5} />
                        <StarIcon size={size} fill={rate >= 3.5} />
                        <StarIcon size={size} fill={rate >= 4.5} />
                  </div>
            </>
      )
}

export default StarRateModule
