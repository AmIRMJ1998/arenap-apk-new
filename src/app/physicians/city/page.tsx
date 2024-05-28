"use client"
import LoadingPage from '@/app/loading'
import PhysiciansCityPage from '@/components/templates/PhysiciansCityPage'
import { apiDomainNobat } from '@/services/getApiUrl'
import urls from '@/services/urls'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React from 'react'


const PhysiciansCityNotFound = () => {
  const cityName = useSearchParams().get("name")
  



  return (
    <>
      {
        cityName !== null ? <PhysiciansCity cityName={cityName} /> :
          <div> PhysiciansCityNotFound</div >
      }
    </>
  )
}

export default PhysiciansCityNotFound;



const PhysiciansCity = async ({ cityName }: { cityName: string }) => {

  const physicians = useQuery(["physician_city"], async () => {
    const res = await axios(`${apiDomainNobat}${urls.provinces.physicians.url}${cityName}`)
    return res.data
  })


  return (
    <>
      {
        physicians.isLoading ? <LoadingPage /> : <PhysiciansCityPage data={physicians.data.value} city={cityName} />
      }

    </>
  )
}

