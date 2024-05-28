import { addFavorite, deleteFavorite, getAllFavorite, isFavorite } from '@/services/favorite/favorite'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'


const useAllFavorite = () => {

    const allFavorite = useQuery(["myFavorite"], async () => {

        const result = await getAllFavorite()
        return result

    })



    return {
        myFavorite: allFavorite?.data?.value?.items,
        isLoading: allFavorite?.isLoading,
    }
}

export default useAllFavorite