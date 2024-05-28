import Toastify from "@/components/elements/toasts/Toastify"
import { http } from "../axios"
import { apiDomainNobat } from "../getApiUrl"
import urls from "../urls"



const editProfile = async (firstName : string , lastName : string , nationalNumber : string) => {
      const obj = {
            firstName,
            lastName,
            nationalNumber
      }
      try {
            const res = await http.put(`${apiDomainNobat}${urls.user.editUser.url}`, obj)
            return res.data
      } catch (error: any) {
            if (error.response) {
                  if (error.response?.status) {
                        Toastify("error", error.response?.data?.resultMessage);
                  }
            }
      }

}







export default editProfile