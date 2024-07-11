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

import { SplashScreen } from '@capacitor/splash-screen';



export default function Home() {
  const { bestPhysicians, newestPhysicians } = useHomePageData()
  const backState = useAppSelector(state => state.back)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const dontShowSplashHandler = async () => {
    await SplashScreen.hide()
  }
  // const showSplashHandler = async () => {
  //   await SplashScreen.show()
  // }


  useEffect(() => {
    // showSplashHandler()
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



  useEffect(() => {

    if (!bestPhysicians.isLoading && !newestPhysicians.isLoading) {
      dontShowSplashHandler()
    }

  }, [bestPhysicians.isLoading, newestPhysicians.isLoading])


  return (
    <>
      {bestPhysicians.isLoading && newestPhysicians.isLoading ? <LoadingPage /> : <HomePage newestPhysicians={newestPhysicians.data} physicians={bestPhysicians.data} />}
    </>
  )
}
