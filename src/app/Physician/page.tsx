"use client"
import { getPhysicianDetail } from '@/services/physicians/physician';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '../loading';
import PhysicianDetailesPage from '@templates/PhysicianDetailesPage';
import { useEffect, useState } from 'react';
import { PhysicainProfileType } from '@/types/physicianProfile';

const Physician = () => {

    const physicianUrl = useSearchParams()
    const url = physicianUrl.get("url")
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [physician, setPhysician] = useState<any>({})


    useEffect(() => {
        if (url === null) {
            router.push("/404")
        }
    }, [])

    const getPhysicianDetailHandle = async () => {
        setLoading(true)

        const physician = await getPhysicianDetail(url as string)
        setLoading(false)
        setPhysician(physician)
        return physician
    }

    useEffect(() => {
        if (url) {
            getPhysicianDetailHandle()
        }
    }, [])






    return (
        <>

            {
                loading ? <LoadingPage /> : <PhysicianDetailesPage physician={physician} />
            }
        </>
    )
}

export default Physician