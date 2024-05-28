import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const getPrice = async () => {
  try {
    const res = await http.post(`${apiDomainNobat}${urls.price.getPrice.url}`);
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

export { getPrice };
