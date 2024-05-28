import { getPrice } from '@/services/price/price'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const usePrice = () => {
      const price = useQuery(["myAppointment"], async () => {
            const result = await getPrice()
            
            return result
      }, { cacheTime: 1000 * 60 * 60 * 24 })

      
      return {
            price: price.data,
            isloading : price.isLoading
      }
}

export default usePrice