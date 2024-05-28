
import ArrowLeft from "@/components/icons/ArrowLeft";
import cn from "@/utils/clsxFun";

export type AccordionCardType = {
      title: string,
      description: string,
      active: number | null,
      handler: (id: number) => void,
      id: number
}


const AccordionCard = ({ title, description, active, handler, id }: AccordionCardType) => {
      return (
            <div
                  className={`bg-white  p-5 shadow-shadow_category relative rounded-sm w-full cursor-pointer overflow-hidden 
                        transition-all duration-300 group hover:relative
                  `}
                  onClick={() => handler(id)}
            >
                  <div className={cn(
                        "text-lg flex justify-between items-center font-bold relative group-hover:static ",
                        "after:absolute after:rtl:-right-[1.25rem] after:rounded-sm after:transition-all after:duration-500 after:top-0 after:block after:bg-primary after:w-1.5 after:h-full",
                        "group-hover:after:bg-primary group-hover:after:h-[calc(100%+2.5rem)] group-hover:after:-top-[1.25rem] group-hover:after:w-[calc(100%+1.25rem)] group-hover:after:-z-1"
                  )}>
                        <h3 className="group-hover:text-white transition-all duration-300 z-[1]">{title}</h3>
                        <span
                              className={cn(` transition-all duration-500 delay-700 z-[1]`, {
                                    "rotate-90": active === id,
                              })}
                        >
                              <ArrowLeft />{" "}
                        </span>
                  </div>
                  <div
                        className={cn(`mt-6 animate-opacity group-hover:text-white transition-all duration-300`, {
                              "hidden": active !== id,
                        })}
                  >
                        {description}
                  </div>
            </div>
      );
};


export default AccordionCard