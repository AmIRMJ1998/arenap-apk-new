import Toastify from "@/components/elements/toasts/Toastify";
import { apiDomainNobat } from "../getApiUrl";
import { http } from "../axios";
import urls from "../urls";


const createComment = async (
  physicianId : string,
  userPhysicianProfileCalnedarId : string,
  rate : number,
  waitingTime : number,
  recommendation : boolean | null,
  commentText : string
) => {
  const dataObj = {
    userPhysicianProfileCalnedarId,
    physicianProfileId: physicianId,
    message: commentText,
    isSuggested: recommendation,
    rate,
    waitingTime,
  };

  try {
    const { status, data } = await http.post(
      `${apiDomainNobat}${urls.comment.create.url}`,
      dataObj
    );
    if (status === 200) {
      Toastify("success", "نظر با موفقیت ثبت شد منتظر تایید ما باشید");
      return data;
    }
    return data;
  } catch (error : any) {
    if (error.response) {
      if (error.response?.status) {
        Toastify("error", error.response?.data?.resultMessage);
      }
    }
  }
};

export default createComment;
