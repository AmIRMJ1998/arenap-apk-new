"use client"
import React, { useEffect, useState } from 'react'
import PhysiciansPage from '@templates/PhysiciansPage'

import urls from '@/services/urls'
import { useQuery } from '@tanstack/react-query'
import { getAllSpecialities } from '@/services/specialities/specialties'
import axios from 'axios'
import { apiDomainNobat } from '@/services/getApiUrl'
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '../loading'
import { PhysicianDataSearch } from '@/types/search'
import Toastify from '@/components/elements/toasts/Toastify'
import generateUrlSearchPage from '@/utils/generateUrlSearchPage'



export type SlugsType = {
  specialty: string,
  consultingPlan: string,
  gender: string,
  page: string,
  disease: string,
  sign: string,
  service: string,
  search_key: string,
  city: string,
}



const Doctors = () => {
  const [searchData, setSearchData] = useState<PhysicianDataSearch[] | []>([])
  const [loadingData, setLoadingData] = useState(true)
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [infoPage, setInfoPage] = useState<{
    specialtyName: string,
    diseaseName: string,
    signName: string,
    serviceName: string,
    cityName: string,
  }>({
    specialtyName: "",
    diseaseName: "",
    signName: "",
    serviceName: "",
    cityName: "",
  })
  const [hasMore, setHasMore] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const specialtyParam = useSearchParams().get("specialty")
  const consultingPlanParam = useSearchParams().get("consultingPlan")
  const genderParam = useSearchParams().get("gender")
  const pageParam = useSearchParams().get("page")
  const diseaseParam = useSearchParams().get("disease")
  const signParam = useSearchParams().get("sign")
  const serviceParam = useSearchParams().get("service")
  const search_keyParam = useSearchParams().get("search_key")
  const cityParam = useSearchParams().get("city")

  const specialitiesQuery = useQuery(["specialities"], async () => {
    const res = await getAllSpecialities()

    if (res.resultCode === 200) {
      return res.value
    }
    return []
  })



  const servicesQuery = useQuery(["services"], async () => {
    const services = await axios(`${apiDomainNobat}${urls.services.url}`)
    if (services.data.resultCode === 200) {
      return services.data.value
    }
    return []
  })


  const getPhysicians = async () => {
    setLoadingData(true)
    const res = await axios(`${apiDomainNobat}${urls.advanceSearch.serach.url}?Filter=${search_keyParam ? search_keyParam : ""}&CityName=${cityParam ? cityParam : ""}&Gender=${genderParam ? genderParam : "0"}&Specialty=${specialtyParam ? specialtyParam : ""}&Disease=${diseaseParam ? diseaseParam : ""}&Sign=${signParam ? signParam : ""}&Service=${serviceParam ? serviceParam : ""}&ConsultingPlan=${consultingPlanParam ? consultingPlanParam : "All"}&PageNumber=${pageParam ? pageParam : 1}&ItemsCountPerPage=10`)

    if (res.data.resultCode === 200 && res.data.value !== null) {
      setTotalPages(res.data?.value?.totalPages)
      setInfoPage({
        specialtyName: res.data?.value?.value?.specialtyName,
        diseaseName: res.data?.value?.value?.diseaseName,
        signName: res.data?.value?.value?.signName,
        serviceName: res.data?.value?.value?.serviceName,
        cityName: res.data?.value?.value?.cityName,
      })
      setSearchData(res.data.value.value.physcians)
      setHasMore(
        res.data?.value?.currentPage === res.data?.value?.totalPages
          ? false
          : true
      );
    }
    setLoadingData(false)
    return res.data.value
  }



  useEffect(() => {
    getPhysicians()
  }, [
    specialtyParam,
    consultingPlanParam,
    genderParam,
    pageParam,
    diseaseParam,
    signParam,
    serviceParam,
    search_keyParam,
    cityParam,
  ])
  const router = useRouter()



  const fetchMoreData = (number: number) => {

    // setFetchMoreLoading(true)
    // fetch
    //   (
    //     `${apiDomainNobat}${urls.advanceSearch.serach.url}?Filter=${search_keyParam ? search_keyParam : ""}&CityName=${cityParam ? cityParam : ""}&Gender=${genderParam ? genderParam : "0"}&Specialty=${specialtyParam ? specialtyParam : ""}&Disease=${diseaseParam ? diseaseParam : ""}&Sign=${signParam ? signParam : ""}&Service=${serviceParam ? serviceParam : ""}&ConsultingPlan=${consultingPlanParam ? consultingPlanParam : "All"}&PageNumber=${number + 1}&ItemsCountPerPage=10`,
    //   )
    //   .then((res) => res.json()).then(data => {

    //     if (data?.value === null) {
    //       setSearchData([...searchData]);
    //       setHasMore(false);
    //       return;
    //     }
    //     setSearchData([...searchData]);
    //     setHasMore(
    //       data.value.currentPage === data.value.totalPages
    //         ? false
    //         : true
    //     );
    //     setPage(data.value.currentPage);
    //   })
    //   .catch((error) => {
    //     console.log(error);

    //     Toastify("error", "خطایی رخ داده است");
    //   });
    // setFetchMoreLoading(false)
    const url = generateUrlSearchPage({
      consultingPlan: consultingPlanParam ? consultingPlanParam : "",
      specialty: specialtyParam ? specialtyParam : "",
      city: cityParam ? cityParam : "",
      disease: diseaseParam ? diseaseParam : "",
      gender: genderParam ? genderParam : "",
      page: (number + 1).toString(),
      search_key: search_keyParam ? search_keyParam : "",
      service: serviceParam ? serviceParam : "",
      sign: signParam ? signParam : "",
    })
    
    router.push(`/physicians${url}`)
  }

  return (
    <>
      {
        loadingData || specialitiesQuery.isLoading || servicesQuery.isLoading ?
          <LoadingPage />
          :
          <PhysiciansPage
            fetchMoreData={fetchMoreData}
            fetchMoreLoading={fetchMoreLoading}
            loadingData={loadingData}
            slugs={{
              specialty: specialtyParam ? specialtyParam : "",
              consultingPlan: consultingPlanParam ? consultingPlanParam : "",
              gender: genderParam ? genderParam : "",
              page: pageParam ? pageParam : "1",
              disease: diseaseParam ? diseaseParam : "",
              sign: signParam ? signParam : "",
              service: serviceParam ? serviceParam : "",
              search_key: search_keyParam ? search_keyParam : "",
              city: cityParam ? cityParam : "",
            }}
            hasMore={hasMore}
            specialities={specialitiesQuery.data}
            services={servicesQuery.data}
            searchData={searchData}
            infoPage={infoPage}
            pageCount={totalPages}
          />

      }
    </>
  )
}

export default Doctors
