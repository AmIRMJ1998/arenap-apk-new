"use client"
import { createPayment } from '@/services/payment/payment'
import { getTransactions } from '@/services/wallet/wallet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'


const useTransactions = () => {



    const queryClient = useQueryClient();
    const transactions = useQuery(["walletUser"], async () => {
        const result = await getTransactions()

        return result
    }, {
        cacheTime: 60000 * 5
    })
    const paymentHandler = useMutation({
        mutationFn: async (parametrs: { id: number, price: number, paymentType: number }) => {

            const result = await createPayment(parametrs.id, parametrs.price, parametrs.paymentType)
            if (result !== undefined) {
                window.location.href = result;
            }
            return result
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`walletUser`],
            });

        },
    })


    return {
        transactions: transactions?.data?.value.items,
        isLoading: transactions.isLoading,
        loadingPayment: paymentHandler.isLoading,
        paymentHandler
    }

}

export default useTransactions