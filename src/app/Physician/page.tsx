"use client"
import { getPhysicianDetail } from '@/services/physicians/physician';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import LoadingPage from '../loading';
import PhysicianDetailesPage from '@templates/PhysicianDetailesPage';

const Physician = () => {

    const physicianUrl = useSearchParams()


    const { isLoading, data } = useQuery(["physician_deatil"], async () => {
        const url = physicianUrl.get("url")
        if (physicianUrl) {
            const physician = await getPhysicianDetail(url as string)
            console.log(physician);
            return physician
        }
        return
    })


    return (
        <>
            {
                isLoading ? <LoadingPage /> : <PhysicianDetailesPage physician={data} />
            }
        </>
    )
}

export default Physician