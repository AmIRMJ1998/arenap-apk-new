"use client"
import HomePage from "@templates/HomePage"
import useHomePageData from "@/hooks/useHomePageData"
import LoadingPage from "./loading"




export default function Home() {
  const { bestPhysicians, newestPhysicians } = useHomePageData()




  return (
    <>
      {bestPhysicians.isLoading && newestPhysicians.isLoading ? <LoadingPage />  : <HomePage newestPhysicians={newestPhysicians.data} physicians={bestPhysicians.data} />}
    </>
  )
}
