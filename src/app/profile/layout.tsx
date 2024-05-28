import ProfileLayout from '@/components/layouts/ProfileLayout'


import React, { ReactNode } from 'react'


const LayoutProfilePage = ({ children }: { children: ReactNode }) => {
    return (
        <ProfileLayout >
            {children}
        </ProfileLayout>
    )
}

export default LayoutProfilePage