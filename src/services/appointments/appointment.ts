import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const getMyAppointment = async () => {
  const data = {
    pagedListInputDto: {
      pageNumber: 1,
      itemsCountPerPage: 200,
    },
  };
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.appointment.myAppointment.url}`,
      data
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultMessage);
  }
};

const deleteAppointment = async (
  calendarId: string,
  index: number,
  physicianProfileUrl: string
) => {
  try {
    const res = await http.delete(
      `${apiDomainNobat}${urls.appointment.cancel.url}${calendarId}/${index}/${physicianProfileUrl}`
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const lockedAppointment = async (
  calendarId: string,
  physicianProfileId: string,
  index: number | null
) => {
  const obj = { calendarId, physicianProfileId, index };

  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.appointment.lockedAppointment.url}`,
      obj
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const getFirstForce = async (physicianId: string) => {
  try {
    const res = await http.get(
      `${apiDomainNobat}${urls.appointment.firstAppointment.url}${physicianId}`
    );
    return res.data.value;
  } catch (error: any) {
    console.log(error)
    Toastify("error", error.response?.data?.resultMessage)
  }
};

const getInfoAppointment = async (appointmentId : string) => {
  try {
    const res = await http.get(`${apiDomainNobat}${urls.appointment.getOneAppointment.url}${appointmentId}`)
    return res?.data
  } catch (error : any) {
    console.log(error)
    Toastify("error", error.response?.data?.resultMessage)
  }
}


export {
  getMyAppointment,
  deleteAppointment,
  lockedAppointment,
  getFirstForce,
  getInfoAppointment
};
