"use client"

import AppointmentPage from "@/components/templates/Appointment/AppointmentPage"
import { apiDomainNobat } from "@/services/getApiUrl"
import urls from "@/services/urls"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import LoadingPage from "../loading"
import convertToHour from "@/utils/convertHour"
import { useEffect } from "react"



const Appointment = () => {
    const physicianProfileUrl = useSearchParams().get("physician")
    const router = useRouter()


    useEffect(() => {
        if(physicianProfileUrl === null){
            router.replace("/physicians")
        }
    } , [])

    return (
        <>
            {
                physicianProfileUrl !== null ? <AppointmentPhysician physicianUrl={physicianProfileUrl} /> : <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nisi possimus odio voluptate quasi accusamus laudantium earum placeat maxime nulla, natus a debitis necessitatibus quo esse explicabo! Esse, repellendus ut.</div>
            }
        </>
    )
}

export default Appointment



const AppointmentPhysician = async ({ physicianUrl }: { physicianUrl: string }) => {
    const router = useRouter()

    const physicianCalendar = useQuery(["physician_calendar"], async () => {
        const res = await axios(`${apiDomainNobat}${urls.appointment.calendarPhysician.url}${physicianUrl}`)
        if (res.data.resultCode === 200) {
            return res.data.value
        } else {
            router.replace("/physicians")
        }
    })

    const ramainingTime = useQuery(["ramainingTime"], async () => {
        const res = await axios(`${apiDomainNobat}${urls.appointment.ramainingTime}`)
        if (res.data.resultCode === 200) {
            return res.data.value.ramaningTime
        } else {
            return 0
        }
    })

    

    return (
        <>
            {
                physicianCalendar.isLoading  ? <LoadingPage /> : (
                    <AppointmentPage calendar={physicianCalendar.data?.physicianProfileCalendars} physician={physicianCalendar.data.physicianProfile} ramainingTime={ramainingTime.data} times={convertToHour()} firstAppointment={physicianCalendar.data.firstppointment} />
                )
            }
        </>
    )
}

