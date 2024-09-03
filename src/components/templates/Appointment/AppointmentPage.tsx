"use client";
import React, { useEffect, useState } from "react";

import TitlePagesMobile from "@components/modules/titles/TitlePagesMobile";
import SelectAppointmentStep from "./SelectAppointmentStep";
import PaymentAppointmentStep from "./PaymentAppointmentStep";
import {
  Firstppointment,
  PhysicianProfile,
  PhysicianProfileCalendar,
} from "@/types/appointment";
import { RelatedPhysicianType } from "@/types/physicianProfile";


import createArrayBetween from "@/utils/createArrayBetween";

import LoadingPage from "@/app/loading";
import useUserInfo from "@/hooks/useUserInfo";
import { checkNewPatient } from "@/services/physicians/physicinaClient";



export type AppointmentPageType = {
  calendar: PhysicianProfileCalendar[];
  physician: PhysicianProfile;
  firstAppointment: Firstppointment | null;
  ramainingTime: number;
  times: string[];
  relatedPhysicians?: RelatedPhysicianType[] | []
  appointmentPrice: number
};

const AppointmentPage = ({
  calendar,
  physician,
  ramainingTime,
  times,
  firstAppointment,
  relatedPhysicians,
  appointmentPrice
}: AppointmentPageType) => {

  const [step, setStep] = useState<1 | 2>(1)
  const changeStepHandler = (step: 1 | 2) => {
    setStep(step)
  }

  const [showForNewPatient, setShowForNewPatient] = useState(true)
  const [loadingNewPatient, setLoadingNewPatient] = useState(physician.doNotShowMyCalendar)
  const { isLogin } = useUserInfo()



  const checkNewPatientHandler = async () => {
    const res = await checkNewPatient(physician.id)
    console.log(res);
    if (res.resultCode === 200) {
      setShowForNewPatient(res.value.isNew)
    }
    if (res.resultCode === 400) {
      setShowForNewPatient(true)
    }
    setLoadingNewPatient(false)
  }


  useEffect(() => {
    if (physician.doNotShowMyCalendar) {
      checkNewPatientHandler()
    }
  }, [isLogin])

  if (loadingNewPatient) return <LoadingPage />



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
          appointmentPrice={appointmentPrice}
          months={calendar ? createArrayBetween(calendar?.[0]?.calendar.month ? +calendar?.[0]?.calendar.month : 0, calendar?.[calendar.length - 1]?.calendar.month ? +calendar?.[calendar.length - 1]?.calendar.month : 0) : []}
          
          showCalendar={showForNewPatient}
          showCalenderHan={checkNewPatientHandler}
        />
      ) : null}
      {step === 2 ? <PaymentAppointmentStep physician={physician} /> : null}
    </>
  );
};

export default AppointmentPage;
