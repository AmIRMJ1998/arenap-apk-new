import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

// const createAppointment = async (physicianId, calendarId, index) => {

//     try {
//         const data = {
//             physicianProfileId: physicianId,
//             calendarId,
//             index
//         }

//         const res = await http.post(`${apiDomainNobat}/User/UserPhysicianProfileCalendar/Create`, data)
//         return res.data.value
//     } catch (error) {

//         return error
//     }
// }

const createAppointment = async (
  physicianProfileId: string,
  calendarId: string,
  index: number
) => {
  const obj = {
    physicianProfileId,
    calendarId,
    index,
  };
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.payment.createPaymentAppointment.url}`,
      obj
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const createPayment = async (
  id: number | string,
  amount: number,
  paymentType: number = 1
) => {
  try {
    const data = {
      id,
      amount,
      paymentType,
    };
    const res = await http.post(
      `${apiDomainNobat}${urls.payment.payment.url}`,
      data
    );
    return res?.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return;
    }
    return error;
  }
};

const paymentConsutationText = async (
  amount: number,
  physicianProfileId: string,
  paymentType: number = 2
) => {
  try {
    const data = {
      id: 0,
      amount,
      physicianProfileId,
      paymentType,
    };
    
    const res = await http.post(
      `${apiDomainNobat}${urls.payment.payment.url}`,
      data
    );
    
    return res?.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      return;
    }
    return error;
  }
};

export { createPayment, createAppointment, paymentConsutationText };
