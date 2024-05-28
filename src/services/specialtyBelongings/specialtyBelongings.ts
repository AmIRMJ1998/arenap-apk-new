import axios from "axios"
import { apiDomainNobat } from "../getApiUrl"
import urls from "../urls"
import Toastify from "@/components/elements/toasts/Toastify"

const specialtyBelongings = async (enName: string) => {

    try {
        const res = await axios.get(`${apiDomainNobat}${urls.specialtyBelongings.url}${enName}`)
        return res.data?.value
    } catch (error: any) {
        Toastify("error", error?.response?.data?.resultMessage)
    }


}



export { specialtyBelongings }