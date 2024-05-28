import axios from "axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";
import Toastify from "@/components/elements/toasts/Toastify";

const searchPrimary = async (
  filter: string,
  provinceId: number,
  cityId: number
) => {
  const obj = {
    filter,
    cityId,
    provinceId,
  };
  try {
    const res = await axios.post(
      `${apiDomainNobat}${urls.search.searchPrimary.url}`,
      obj
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};

export { searchPrimary };
