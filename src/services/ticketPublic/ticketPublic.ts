import axios from "axios"
import { apiDomain } from "../getApiUrl"
import urls from "../urls"
import Toastify from "@/components/elements/toasts/Toastify"

const sendTicketPublic = async (fullName: string,
    emailAddress: string,
    phoneNumber: string,
    title = "ticket",
    message: string) => {
    const data = {
        fullName,
        emailAddress,
        phoneNumber,
        title,
        message
    }
    try {
        const res = await axios.post(`${apiDomain}${urls.commentSite.sendComment.url}`, data)
        return res.data
    } catch (error: any) {
        Toastify("error", "مشکلی رخ داده است")
    }
}


export { sendTicketPublic }