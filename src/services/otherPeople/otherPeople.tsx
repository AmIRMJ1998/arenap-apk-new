import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const createPeople = async (obj: {
      firstName: string,
      lastName: string,
      nationalNumber: string
}) => {
      try {
            const res = await http.post(`${apiDomainNobat}${urls.user.createPeople.url}`, obj);
            return res.data;
      } catch (error: any) {
            Toastify("error", error?.response?.data?.resultMessage);
      }
}
const deletePeople = async (id: string) => {
      try {
            const res = await http.delete(`${apiDomainNobat}${urls.user.deletePeople.url}${id}`);
            return res.data;
      } catch (error: any) {
            Toastify("error", error?.response?.data?.resultMessage);
      }
}



export { createPeople, deletePeople }