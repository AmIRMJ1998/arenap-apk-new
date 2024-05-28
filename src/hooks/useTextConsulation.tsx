import { textConsultationList } from '@/services/textConsultation/textConsultation'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useTextConsulation = () => {

      const { data, isLoading } = useQuery(["myMessages"], async () => {
            const result = await textConsultationList()
            return result
      }, { cacheTime: 0 })

      return {
            isLoading,
            data
      }
}

export default useTextConsulation