import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const textConsultationList = async () => {
  try {
    const res = await http.get(
      `${apiDomainNobat}${urls.textConsultation.listUser.url}`
    );

    return res.data?.value;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const textConsultation = async (id: string) => {
  try {
    const res = await http.get(
      `${apiDomainNobat}${urls.textConsultation.consultation.url}${id}`
    );

    return res.data?.value;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const messageDetail = async (id: string) => {
  try {
    const res = await http.get(
      `${apiDomainNobat}${urls.textConsultation.messagesConsultation.url}${id}`
    );

    return res.data;
  } catch (error: any) {
    //     Toastify("error", error?.response?.data?.resultMessage);
    console.log(error);
  }
};

const createMessage = async (textConsultationId: string, text: string) => {
  const obj = {
    textConsultationId,
    text,
  };
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.textConsultation.createMessage.url}`,
      obj
    );

    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

const createConsulation = async (physicianProfileId: string) => {
  const obj = { physicianProfileId };
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.textConsultation.createConsulation.url}`,
      obj
    );

    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};
const deleteMessage = async (id: number) => {
  
  try {
    const res = await http.delete(
      `${apiDomainNobat}${urls.textConsultation.deleteMessage.url}${id}`,
    );

    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

export {
  textConsultationList,
  textConsultation,
  messageDetail,
  createMessage,
  createConsulation,
  deleteMessage,
};
