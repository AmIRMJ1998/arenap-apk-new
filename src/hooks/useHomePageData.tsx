"use client"

import { getNewestPhysician, getBestPhysician } from '@/services/physicians/physician';
import { useQuery } from '@tanstack/react-query'


const useHomePageData = () => {

      const newPhysicians = useQuery(["new_physicians"], async () => {
            const res = await getNewestPhysician()
            return res
      } , {
            cacheTime : 1000 * 60 * 60 * 24 //one day
      })
      const bestPhysicians = useQuery(["best_physicians"], async () => {
            const res = await getBestPhysician(0, 0, 1, 12)
            return res
      } , {
            cacheTime : 1000 * 60 * 60 * 24, //one day
            staleTime: 1000 * 60 * 10 * 24 //one day
      })

      return {
            newestPhysicians: {
                  isLoading: newPhysicians.isLoading,
                  data: newPhysicians.data,
            },
            bestPhysicians: {
                  isLoading: bestPhysicians.isLoading,
                  data: bestPhysicians.data,
            },
      }

}

export default useHomePageData