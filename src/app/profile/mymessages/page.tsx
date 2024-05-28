"use client"
import React from 'react'
import MyMessagesPage from '@/components/templates/profile/MyMessagesPage'
import { useSearchParams } from 'next/navigation'
import DetailMessagePage from '@/components/templates/profile/DetailMessagePage'

const MyMessages = () => {
    const messageId = useSearchParams().get("messageid")


    return (
        <>
            {
                messageId === null ? <MyMessagesPage /> : <MessageDetail messageId={messageId} />
            }
        </>
    )
}

export default MyMessages


const MessageDetail = async ({ messageId }: { messageId: string }) => {



    return (
        <DetailMessagePage messageId={messageId} />
    )
}

