"use client"
import { getCities, getProvinces } from '@/services/provicesandcity/province'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'


const useCity = () => {
    
    
    const [isLoadingCity, setIsLoadingCity] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['cityInfo']);
    const [provinceInfo, setProvinceInfo] = useState({
        provinceId: 0,
        provinceName: ""
    })
    const [cityName, setCityName] = useState("انتخاب شهر")


    const getProvincesHandler = async () => {
        const res = await getProvinces()
        return res
    }


    const province = useQuery(["provinces"], getProvincesHandler, { cacheTime: 1000 * 60 * 10, staleTime: 1000 * 60 * 10 })



    useEffect(() => {
        const cityInfoLocal = localStorage.getItem("cityInfo")

        if(cityInfoLocal === null) {
            setCityName("انتخاب شهر")
        }
        if (typeof cityInfoLocal === "string") {
            let cityInfo = JSON.parse(cityInfoLocal)
            setCityName(cityInfo?.cityName ? cityInfo.cityName : "انتخاب شهر")
        }
        
        setIsLoadingCity(false)

        return () => {
            setIsLoadingCity(true)
        }
    }, [cookies?.cityInfo])


    const cityHandler = (slug: string, cityName: string, cityId: number) => {
        setCityName(cityName)
        localStorage.setItem("cityInfo", JSON.stringify({ slug, cityName, cityId }))
        setCookie("cityInfo", { slug, cityName, cityId }, { path: "/" })
    }



    const setAllProvince = () => {
        setCityName("انتخاب شهر")
        localStorage.removeItem("cityInfo")
        removeCookie("cityInfo", { path: "/" })
    }


    return {
        provinces: province.isLoading ? [] : province?.data?.value,
        isLoadingProvince: province.isLoading,
        cityName,
        cityHandler,
        isLoadingCity,
        setAllProvince,
    }
}

export default useCity