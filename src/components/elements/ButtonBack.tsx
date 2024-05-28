"use client"
import BackIcon from "@icons/BackIcon"

import { useRouter } from "next/navigation"


const ButtonBack = () => {

  const router = useRouter()
  

  const backHandler = () => {

    router.back()
  }


  return (
    <div className={`size-[2.5rem] rounded-full flex justify-center items-center bg-white cursor-pointer `} onClick={backHandler}>
      <span className="ltr:rotate-180">
        <BackIcon />
      </span>
    </div>
  )
}

export default ButtonBack