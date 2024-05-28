"use client";
import AccordionCard from "@/components/modules/cards/AccordionCard";

import faqData from "@/data/faqData";
import { useState } from "react";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import TitleHeading from "@modules/titles/TitleHeading";



const FaqPage = () => {
  const [activeQuestion, setActiveQuestion] = useState<null | number>(null);
 const questions = [...faqData]


  const activeHandler = (id : number) => {
    if (id === activeQuestion) {
      setActiveQuestion(null);
      return;
    }
    setActiveQuestion(id);
  };

  return (
    <>
     
      
      <div className=" w-full pb-5  mt-4 flex justify-start items-center gap-2 flex-col">
        {/* <BaseCardMultipleTitle content={content} /> */}
        {questions.map((item) => (
          <AccordionCard
            key={item.id}
            {...item}
            handler={activeHandler}
            active={activeQuestion}
          />
        ))}
      </div>
    </>
  );
};

export default FaqPage;
