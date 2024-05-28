
import './globals.css'


import iranSans from '@utils/localFonts'

import Layout from '@layouts/Layout'

import StoreProvider from '@/providers/StoreProvider'


import NoSSRWrappper from '@/components/layouts/NoSSRWrappper'

export default async function RootLayout({
  children,

}: {
  children: React.ReactNode,

}) {




  return (
    <html lang='fa' dir='rtl' >
      <body className={iranSans.className} data-theme="Arenap_theme">

        <NoSSRWrappper>
          <StoreProvider>
            <Layout>
              {children}
            </Layout>
          </StoreProvider>
        </NoSSRWrappper>
      </body>
    </html>
  )
}
