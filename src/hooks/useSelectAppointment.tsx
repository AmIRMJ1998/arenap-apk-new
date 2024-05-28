import {
  selectAppointment,
  lockedAppointmentRedux,
  offSelectAppointment,

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


const useSelectAppointment = () => {
  const queryClient = useQueryClient()

  const {
    appointmentSelectInfo,
    isSelectAppointment,
    lockedAppointmentInfo,
    patient
  } = useAppSelector((state) => state.appointment);
  const { isLogin } = useUserInfo();
  const dispatch = useAppDispatch();
  const { user } = useUserInfo()
  const router = useRouter()
  const status = useSearchParams().get("status")
  const calendarId = useSearchParams().get("calendarId")
  const physicianUrl = useSearchParams().get("physicianUrl")
  const physicianId = useSearchParams().get("physicianId")
  const index = useSearchParams().get("index")
  const year = useSearchParams().get("year")
  const month = useSearchParams().get("month")
  const day = useSearchParams().get("day")
  const [isAutoLocked, setIsAutoLocked] = useState(false)



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
  };
  const offSelectHandler = () => {
    dispatch(offSelectAppointment());
  };




  const locked = useMutation({
    mutationFn: async () => {
      const res = await lockedAppointment(
        appointmentSelectInfo.calendarId,
        appointmentSelectInfo.physicianProfileId,
        appointmentSelectInfo.index
      );
      console.log(res)
      if (res.resultCode === 200) {
        const { chargeAmount, id, remainingSeconds, status } = res.value;
        dispatch(
          lockedAppointmentRedux({
            chargeAmount, id, remainingSeconds, status, firstName: user.firstName,
            lastName: user.lastName,
            nationalNumber: user.nationalNumber, phoneNumber: user.phoneNumber
          })
        );
      }
      return res.data;
    },
    onSuccess: async () => {

      const result = await queryClient.invalidateQueries({
        queryKey: [`myAppointment`],
      });
      console.log(result)
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
      console.log(lockedAppointmentInfo.chrageAmount )
      if (lockedAppointmentInfo.chrageAmount === 0) {
        const res = await createAppointment(appointmentSelectInfo.physicianProfileId, appointmentSelectInfo.calendarId, appointmentSelectInfo.index)

        if (res.resultCode === 200) {
          router.replace(
            `/Check/Payment/${appointmentSelectInfo.physicianProfileurl}?Status=Success&AppointmentId=${res?.value.id}`
          );
        }
        return res
      } else {
        const res = await createPayment(lockedAppointmentInfo.id, lockedAppointmentInfo.chrageAmount, 1)
        console.log(res)
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
      setIsAutoLocked(true)
      selectAppointmentHandler(year, month, day, +index, calendarId, physicianId, physicianUrl)
    }
  }, [])


  useEffect(() => {

    if (isAutoLocked) {
      locked.mutate()
    }

  }, [isAutoLocked])



  return {
    appointmentInfo: appointmentSelectInfo,
    selectIndex: appointmentSelectInfo.index,
    selectAppointment: selectAppointmentHandler,
    selectCalendarId: appointmentSelectInfo.calendarId,
    isSelectAppointment,
    isNextStep: isSelectAppointment && isLogin === "authorization",

    lockedAppointmentHandler: locked,
    firstAppointmentHandler: firstAppointment,
    offSelectHandler,
    lockAppointmentInfo: lockedAppointmentInfo,
    patient,
    payment
  };
};

export default useSelectAppointment;
