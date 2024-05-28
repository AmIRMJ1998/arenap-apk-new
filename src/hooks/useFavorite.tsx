import { addFavorite, deleteFavorite, getAllFavorite, isFavorite } from '@/services/favorite/favorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useUserInfo from './useUserInfo';


const useFavorite = (physicianProfileId: string) => {
    const queryClient = useQueryClient();
    const { isLogin } = useUserInfo()

    const userFavorite = useQuery(["userFavorite"], async () => {
        if (isLogin === "authorization" && physicianProfileId) {
            const result = await isFavorite(physicianProfileId)
            return result
        } else {
            return false
        }

    })

    const addFavoriteHandler = useMutation({
        mutationFn: async () => {

            const result = await addFavorite(physicianProfileId)

            return result
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`userFavorite`],
            });

        },
    })
    const deleteFavoriteHandler = useMutation({
        mutationFn: async () => {

            const result = await deleteFavorite(physicianProfileId)

            return result
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`userFavorite`],

            });

        },
    })

    return {


        userFavorite: userFavorite?.data?.isFavorite,
        isLodingUserFavorite: userFavorite.isLoading,
        addFavorite: addFavoriteHandler?.mutate,
        deleteFavorite: deleteFavoriteHandler?.mutate,
        likeLoading: userFavorite.isLoading || addFavoriteHandler.isLoading || deleteFavoriteHandler.isLoading

    }
}

export default useFavorite