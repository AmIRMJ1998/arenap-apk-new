import {  createSlice } from "@reduxjs/toolkit";

export type AppointmentType = {
  appointmentSelectInfo: AppointmentSelectInfoType;
  isSelectAppointment: boolean;
  isLocked: boolean;
  lockedAppointmentInfo: {
    index: number;
    chrageAmount: number;
    remainingSeconds: number;
    status: boolean;
    id: number;
  };
  patient: {
    firstName: string;
    lastName: string;
    nationalNumber: string;
    phoneNumber: string;
  };
};

type AppointmentSelectInfoType = {
  year: number;
  month: number;
  day: number;
  index: number;
  calendarId: string;
  physicianProfileId: string;
  physicianProfileurl: string;
};

const initialState: AppointmentType = {
  appointmentSelectInfo: {
    year: 0,
    month: 0,
    day: 0,
    index: 0,
    calendarId: "",
    physicianProfileId: "",
    physicianProfileurl: "",
  },
  patient: {
    firstName: "",
    lastName: "",
    nationalNumber: "",
    phoneNumber: "",
  },
  isSelectAppointment: false,
  
  isLocked: false,
 
  lockedAppointmentInfo: {
    index: 0,
    chrageAmount: 0,
    remainingSeconds: 0,
    status: false,
    id: 0,
  },
};

const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    selectAppointment: (state, { payload }): void => {
      
      const data = {
        year: payload.year,
        month: payload.month,
        day: payload.day,
        index: payload.index,
        calendarId: payload.calendarId,
        physicianProfileId: payload.physicianProfileId,
        physicianProfileurl: payload.physicianProfileUrl,
      };
      state.appointmentSelectInfo = data;
      state.isSelectAppointment = true;
    },
    offSelectAppointment: (state) => {
      state.appointmentSelectInfo = {
        year: 0,
        month: 0,
        day: 0,
        index: 0,
        calendarId: "",
        physicianProfileId: "",
        physicianProfileurl : ""
      };
      state.isSelectAppointment = false;
    },
    lockedAppointmentRedux: (state, { payload }) => {
      state.lockedAppointmentInfo = {
        index: payload.index,
        chrageAmount: payload.chargeAmount,
        id: payload.id,
        remainingSeconds: payload.remainingSeconds,
        status: payload.status,
      };
      state.patient = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        nationalNumber: payload.nationalNumber,
        phoneNumber: payload.phoneNumber,
      };
      state.isLocked = true;
    },
  },
});

export const {
  selectAppointment,
  offSelectAppointment,
  lockedAppointmentRedux,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
