import axios from "axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";
import Toastify from "@/components/elements/toasts/Toastify";

const getCaptcha = async () => {
  try {
    const res = await axios.get(`${apiDomainNobat}${urls.captcha.captcha.url}`);
    const data = res.data;
    return data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultCode);
  }
};

export { getCaptcha };
