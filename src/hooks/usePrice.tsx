import { getPrice } from '@/services/price/price'
import { useQuery } from '@tanstack/react-query'


const usePrice = () => {
      const price = useQuery(["getPrice"], async () => {
            const result = await getPrice()

            return result
      }, { cacheTime: 1000 * 60 * 60 * 24 })


      return {
            price: price.data?.appointment,
            textConsultationPrice: price.data?.textConsultation,
            isloading: price.isLoading
      }
}

export default usePrice