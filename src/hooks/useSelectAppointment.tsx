import {
  selectAppointment,
  lockedAppointmentRedux,
  offSelectAppointment,
  showRalatedPhysicians,
  isFamily,
  isAutoLockHan,

} from "@/store/features/appointmentSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";
import useUserInfo from "./useUserInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  lockedAppointment,
  getFirstForce,
} from "@/services/appointments/appointment";
import { createAppointment, createPayment } from "@/services/payment/payment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Toastify from "@/components/elements/toasts/Toastify";


const useSelectAppointment = () => {
  const queryClient = useQueryClient()

  const {
    appointmentSelectInfo,
    isSelectAppointment,
    lockedAppointmentInfo,
    patient,
    showRelatedPhysician,
    family,
    isAutoLock
  } = useAppSelector((state) => state.appointment);
  const { isLogin } = useUserInfo();
  const dispatch = useAppDispatch();
  const router = useRouter()
  const status = useSearchParams().get("status")
  const calendarId = useSearchParams().get("calendarId")
  const physicianUrl = useSearchParams().get("physicianUrl")
  const isForFamily = useSearchParams().get("isForFamily")
  const familyId = useSearchParams().get("familyId")
  const physicianId = useSearchParams().get("physicianId")
  const index = useSearchParams().get("index")
  const year = useSearchParams().get("year")
  const month = useSearchParams().get("month")
  const day = useSearchParams().get("day")




  const selectAppointmentHandler = (
    year: string,
    month: string,
    day: string,
    index: number,
    calendarId: string,
    physicianProfileId: string,
    physicianProfileUrl: string
  ) => {

    dispatch(
      selectAppointment({
        year,
        month,
        day,
        index,
        calendarId,
        physicianProfileId,
        physicianProfileUrl
      })
    );
    dispatch(
      isFamily({
        isForFamily: false,
        familyId: ""
      })
    );
  };
  const offSelectHandler = () => {
    dispatch(offSelectAppointment());
  };

  const isFamilyState = (isForFamily: boolean, familyId: string) => {
    dispatch(isFamily({ familyId, isForFamily }))
  }


  const locked = useMutation({
    mutationFn: async () => {
      const res = await lockedAppointment(
        calendarId ? calendarId : appointmentSelectInfo.calendarId,
        physicianId ? physicianId : appointmentSelectInfo.physicianProfileId,
        index ? +index : appointmentSelectInfo.index,
        isForFamily && isForFamily === "1" ? true : family.isForFamily,
        familyId ? familyId : family.familyId,
      );

      if (res.resultCode === 205) {
        dispatch(showRalatedPhysicians())
        throw new Error("")
      }
      if (res.resultCode === 200) {
        const { chargeAmount, id, remainingSeconds, status, user, isForFamily, family } = res.value;

        dispatch(
          lockedAppointmentRedux({
            chargeAmount, id, remainingSeconds, status, firstName: isForFamily ? family?.firstName : user?.firstName,
            lastName: isForFamily ? family?.lastName : user?.lastName,
            nationalNumber: isForFamily ? family?.nationalNumber : user?.nationalNumber, phoneNumber: isForFamily ? "" : user?.phoneNumber
          })

        );

        return res.data;
      }
      throw new Error("")
    },
    onSuccess: async () => {
      const result = await queryClient.invalidateQueries({
        queryKey: [`myAppointment`],
      });
    },
  });


  const firstAppointment = useMutation({
    mutationFn: async ({
      physicianProfileId,
      physicianProfileUrl,
    }: {
      physicianProfileId: string;
      physicianProfileUrl: string;
    }) => {
      const res = await getFirstForce(physicianProfileId);
      selectAppointmentHandler(
        res.year,
        res.month,
        res.dayOfMonth,
        res.index,
        res.calendarId,
        res.physicianProfileId,
        physicianProfileUrl
      );
      return res;
    },
  });
  const payment = useMutation({
    mutationFn: async () => {
      if (lockedAppointmentInfo.chrageAmount === 0) {
        const res = await createAppointment(appointmentSelectInfo.physicianProfileId, appointmentSelectInfo.calendarId, appointmentSelectInfo.index, family.isForFamily, family.familyId)

        if (res.resultCode === 200) {
          router.replace(
            `/Payment/slug?slug=${appointmentSelectInfo.physicianProfileurl}&Status=Success&AppointmentId=${res?.value.id}`
          );
        }
        isFamilyState(false, "")
        return res
      } else {
        const res = await createPayment(lockedAppointmentInfo.id, lockedAppointmentInfo.chrageAmount, 1, family.isForFamily, family.familyId)
        window.location.href = res
        return res
      }
    },
    onSuccess: async () => {
      const result = await queryClient.invalidateQueries({
        queryKey: [`myAppointment`],
      });
    },
  });


  useEffect(() => {
    if (status && calendarId && index && year && month && day && physicianUrl && physicianId) {
      console.log("test use");
      selectAppointmentHandler(year, month, day, +index, calendarId, physicianId, physicianUrl)
      locked.mutate()
    }
  }, [])



  return {
    appointmentInfo: appointmentSelectInfo,
    selectIndex: appointmentSelectInfo.index,
    selectAppointment: selectAppointmentHandler,
    selectCalendarId: appointmentSelectInfo.calendarId,
    isSelectAppointment,
    isNextStep: isSelectAppointment && isLogin === "authorization",
    chargeAmount: lockedAppointmentInfo.chrageAmount,
    lockedAppointmentHandler: locked,
    isForFamily: false,
    firstAppointmentHandler: firstAppointment,
    offSelectHandler,
    lockAppointmentInfo: lockedAppointmentInfo,
    patient,
    payment,
    showRelatedPhysician,
    isFamilyState,
  };
};

export default useSelectAppointment;
 