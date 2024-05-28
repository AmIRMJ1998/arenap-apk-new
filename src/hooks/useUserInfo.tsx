import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { fetchUser } from '@/store/features/userInfoSlice'

const useUserInfo = (isRender?: boolean) => {
    const userInfo = useAppSelector(state => state.userInfo)
    const dispatch = useAppDispatch()

    const getUser = () => {
        dispatch(fetchUser())
    }

    useEffect(() => {
        if (userInfo.auth === "isLoading", isRender) {
            getUser()
        }
    }, [])

    return { user: userInfo.user, isLogin: userInfo.auth, getUser }
}

export default useUserInfo