"use client"


import OnlineCounselingPage from '@/components/templates/OnlineCounselingPage'
import ServerErrorPage from '@/components/templates/ServerErrorPage'
import { apiDomainNobat } from '@/services/getApiUrl'

import urls from '@/services/urls'
import { PhysicianDataSearch } from '@/types/search'
import { useQuery } from '@tanstack/react-query'

import React from 'react'
import LoadingPage from '../loading'



const OnlineConsultation = async () => {
      

      const { data, isLoading, isError } = useQuery(["onlineCounseling"], async () => {
            const physicians = await fetch(`${apiDomainNobat}${urls.advanceSearch.serach.url}?Gender=0&ConsultingPlan=TextConsultation&PageNumber=1&ItemsCountPerPage=15`)

            const physiciansData = await physicians.json()
            
            if (physiciansData.resultCode === 200) {
                 
                  return physiciansData
            }
            return {
                  value: {
                        items: [],
                        currentPage: 0,
                        totalPages: 0,
                        pageSize: 0,
                        totalCount: 0
                  },
                  resultMessage: "",
                  resultCode: 0
            }
      })

      


      if(isError) return <ServerErrorPage /> 
      if(isLoading) return <LoadingPage /> 


      return (

            <OnlineCounselingPage physicians={data?.value.value.physcians} currentPage={data?.value.currentPage} pageSize={data?.value.pageSize} totalCount={data?.value.totalCount} totalPages={data?.value.totalPages} hasMore={data?.value?.totalPages === data?.value?.currentPage ? false : true} />


      )
}

export default OnlineConsultation;
