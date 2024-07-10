"use client";
import React, { useState } from "react";

import TitlePagesMobile from "@components/modules/titles/TitlePagesMobile";
import SelectAppointmentStep from "./SelectAppointmentStep";
import PaymentAppointmentStep from "./PaymentAppointmentStep";
import {
  Firstppointment,
  PhysicianProfile,
  PhysicianProfileCalendar,
} from "@/types/appointment";
import { RelatedPhysicianType } from "@/types/physicianProfile";





export type AppointmentPageType = {
  calendar: PhysicianProfileCalendar[];
  physician: PhysicianProfile;
  firstAppointment: Firstppointment | null;
  ramainingTime: number;
  times: string[];
  relatedPhysicians?: RelatedPhysicianType[] | []
};

const AppointmentPage = ({
  calendar,
  physician,
  ramainingTime,
  times,
  firstAppointment,
  relatedPhysicians 
}: AppointmentPageType) => {

  const [step, setStep] = useState<1 | 2>(1)
  const changeStepHandler = (step: 1 | 2) => {
    setStep(step)
  }
  

  return (
    <>
      <TitlePagesMobile title={`صفحه ی نوبت دهی اینترنتی دکتر ${physician.firstName} ${physician.lastName}`} />
      {step === 1 ? (
        <SelectAppointmentStep
          calendar={calendar}
          physician={physician}
          ramainingTime={physician.appointmentTimeLimition ? ramainingTime : 0}
          times={times}
          firstAppointment={firstAppointment}
          changeStep={changeStepHandler}
          relatedPhysicians={relatedPhysicians ? relatedPhysicians : []}
        />
      ) : null}
      {step === 2 ? <PaymentAppointmentStep physician={physician} /> : null}
    </>
  );
};

export default AppointmentPage;
