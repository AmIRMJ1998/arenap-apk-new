import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { close, open, toggle } from '@/store/features/Modallogin'




const useModalLogin = () => {
    const isShow = useAppSelector(state => state.modalLogin)
    const dispatch = useAppDispatch()
    const openModalLogin = () => {
        
        dispatch(open())
    }
    const toggleModalLogin = () => {
        dispatch(toggle())
    }
    const closeModalLogin = () => {
        dispatch(close())
    }





    return {
        isShow: isShow.show,
        openModalLogin,
        closeModalLogin,
        toggleModalLogin
    }
}

export default useModalLogin