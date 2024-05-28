import { useAppDispatch, useAppSelector } from './useRedux'
import { close, open, toggle } from '@/store/features/logOutModalSlice'

const useLogoutModal = () => {
    const state = useAppSelector(state => state.modalLogout)
    const dispatch = useAppDispatch()


    const closeLogoutModal = () => {
        dispatch(close())
    }
    const openLogoutModal = () => {
        dispatch(open())
    }
    const toggleLogoutModal = () => {
        dispatch(toggle())
    }


    return {
        isShow: state.show,
        closeLogoutModal,
        openLogoutModal,
        toggleLogoutModal,
    }

}

export default useLogoutModal