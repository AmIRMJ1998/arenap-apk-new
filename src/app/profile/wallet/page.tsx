"use client"
import WalletPage from '@/components/templates/profile/WalletPage'
import { useSearchParams } from 'next/navigation'
import React from 'react'


export type SearchParamsWalletType = {
    Status?: string, amount?: string, date?: string, ["transaction-number"]: string
}

export type ParamsWallet = {

    searchParams: SearchParamsWalletType
}


const Wallet = (props: ParamsWallet) => {
    const amount = useSearchParams().get("amount")
    const status = useSearchParams().get("Status")
    const date = useSearchParams().get("date")
    const transaction_number = useSearchParams().get("transaction-number")



    return (
        <WalletPage params={{
            Status: amount ? amount : "",
            amount: status ? status : "",
            date: date ? date : "",
            "transaction-number": transaction_number ? transaction_number : "",
        }} />
    )
}

export default Wallet