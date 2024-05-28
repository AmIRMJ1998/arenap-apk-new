"use client"

import { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import useUserInfo from '@/hooks/useUserInfo'
import "react-loading-skeleton/dist/skeleton.css";


import { CookiesProvider } from 'react-cookie';

const Layout = ({ children }: { children: ReactNode }) => {
    const [query] = useState(() => new QueryClient())
    const { user } = useUserInfo(true)

    return (

        <QueryClientProvider client={query}>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
                <Header />
                <main className='container  min-h-[calc(100vh-26.5375rem)] '>
                    {children}
                </main>
                <Footer />
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={
                        {
                            duration: 3000
                        }
                    }
                />
                <ReactQueryDevtools initialIsOpen={false} />
            </CookiesProvider>
        </QueryClientProvider>

    )
}

export default Layout