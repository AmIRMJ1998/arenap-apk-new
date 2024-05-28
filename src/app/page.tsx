"use client"
import HomePage from "@templates/HomePage"
import useHomePageData from "@/hooks/useHomePageData"
import LoadingPage from "./loading"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { activeHandler } from "@/store/features/backSlice"
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { useRouter } from "next/navigation"




export default function Home() {
  const { bestPhysicians, newestPhysicians } = useHomePageData()
  const backState = useAppSelector(state => state.back)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!backState.active) {
      dispatch(activeHandler())


      if (Capacitor.isNativePlatform()) {
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            router.back()
          }
        });
      }
    }
  }, [])


  return (
    <>
      {bestPhysicians.isLoading && newestPhysicians.isLoading ? <LoadingPage /> : <HomePage newestPhysicians={newestPhysicians.data} physicians={bestPhysicians.data} />}
    </>
  )
}
