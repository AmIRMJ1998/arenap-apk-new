"use client"
import PaymentPage from '@/components/templates/PaymentPage'
import ServerErrorPage from '@/components/templates/ServerErrorPage'
import usePrice from '@/hooks/usePrice'
import { apiDomainNobat } from '@/services/getApiUrl'

import urls from '@/services/urls'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Payment = async () => {
    const Status = useSearchParams().get("Status")
    const AppointmentId = useSearchParams().get("AppointmentId")
    const slug = useSearchParams().get("slug")
    const router = useRouter()


    if (!Status && !AppointmentId) {
        router.replace("/404")
    }

    if (slug && Status !== "Success") {
        router.replace("/404")
    }



    try {
        const { price } = usePrice()

        const appointment = useQuery([`appointment-${AppointmentId}`], async () => {

            const physician = await fetch(`${apiDomainNobat}${urls.physician.physicianProfile.url}${slug}`)
            const data = await physician.json()
            console.log(data);

            return data
        })

        

        if(appointment.isLoading) return <div>test</div>
        if(appointment.isError) return <div>Error</div>
        return (
            <PaymentPage price={price} status={Status ? Status : ""} physician={appointment.data?.value} appointmentId={AppointmentId ? AppointmentId : ""} />
        )
    } catch (error) {
        return <ServerErrorPage />
    }

}

export default Payment