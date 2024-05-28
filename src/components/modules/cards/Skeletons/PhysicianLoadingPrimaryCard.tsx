import PathLine from "@/components/elements/PathLine";
import cn from "@/utils/clsxFun";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PhysicianLoadingPrimaryCard = ({ freeMode }: { freeMode: boolean }) => {
  return (
    <div
      className={cn(
        `bg-white rounded-sm shadow-shadow_category    flex justify-between items-start flex-col`,
        {
          "w-[20rem]": freeMode,
          "w-full": !freeMode,
        }
      )}
    >
      <div className="p-4  w-full flex justify-between items-start">
        <div className="relative w-[3.75rem]">
          <Skeleton circle={true} className=" w-[3.75rem] h-[3.75rem]" />
        </div>
        <div className="flex-1 rtl:pr-4 ltr:pl-4 flex justify-between items-start flex-col min-h-[3.75rem]">
          <div className="w-2/4">
            <Skeleton />{" "}
          </div>
          <div className="w-3/4">
            <Skeleton />{" "}
          </div>
        </div>
      </div>
      <div className="px-4 w-full">
        <PathLine color={"stroke-bg_content"} />
      </div>
      <div className="px-4  w-full grid grid-cols-2 gap-1 py-2">
        <div className="w-3/4">
          <Skeleton className="h-[1.75rem]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[1.75rem]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[1.75rem]" />{" "}
        </div>
        <div className="w-3/4">
          <Skeleton className="h-[1.75rem]" />{" "}
        </div>
      </div>
      <div className="px-2 pb-2 w-full">
        <Skeleton className="h-[1.875rem]" />
      </div>
    </div>
  );
};

export default PhysicianLoadingPrimaryCard;
