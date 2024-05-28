import axios from "axios"
import { apiDomainNobat } from "../getApiUrl"
import urls from "../urls"
import Toastify from "@/components/elements/toasts/Toastify"

const getProvinces = async () => {
    try {
        const res = await axios(`${apiDomainNobat}${urls.provinces.provinces.url}`)
        return res.data
    } catch (error: any) {
        Toastify("error", error?.response?.data?.resultMessage)
    }
}
const getCities = async (provinceId: number) => {

    try {
        const res = await axios(`${apiDomainNobat}${urls.provinces.cities.url}${provinceId}`)
        return res.data
    } catch (error: any) {
        console.log(error)
        Toastify("error", error?.response?.data?.resultMessage)
    }

}



export { getProvinces, getCities }