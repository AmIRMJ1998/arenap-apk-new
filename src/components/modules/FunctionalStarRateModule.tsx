
import cn from "@/utils/clsxFun";
import StarIcon from "@icons/StarIcon";
import { useState } from "react";

export type FunctionalStarRateModuleType = {
  rate: number,
  size: string,
  ltr: boolean,
  rateHandler: (rate: number) => void,
};

const FunctionalStarRateModule = ({
  rate,
  size,
  ltr,
  rateHandler,
}: FunctionalStarRateModuleType) => {

  const setRateHandler = (value: number) => {
    rateHandler(value);
  };

  return (
    <>
      <div
        className={cn(`flex gap-1 `, {
          "rtl:flex-row-reverse ltr:flex-row": ltr,
          "rtl:flex-row ltr:flex-row-reverse": !ltr,
        })}
      >
        <button
          type="button"
          onClick={() => {
            setRateHandler(1);
          }}
        >
          <StarIcon size={size} fill={rate >= 0.5} />
        </button>
        <button
          type="button"
          onClick={() => {
            setRateHandler(2);
          }}
        >
          <StarIcon size={size} fill={rate >= 1.5} />
        </button>
        <button
          type="button"
          onClick={() => {
            setRateHandler(3);
          }}
        >
          <StarIcon size={size} fill={rate >= 2.5} />
        </button>
        <button
          type="button"
          onClick={() => {
            setRateHandler(4);
          }}
        >
          <StarIcon size={size} fill={rate >= 3.5} />
        </button>
        <button
          type="button"
          onClick={() => {
            setRateHandler(5);
          }}
        >
          <StarIcon size={size} fill={rate >= 4.5} />
        </button>
      </div>
    </>
  );
};

export default FunctionalStarRateModule;
