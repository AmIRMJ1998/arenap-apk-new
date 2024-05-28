import { http } from "../axios"
import { apiDomainNobat } from "../getApiUrl"
import urls from "../urls"



const getTransactions = async (pageNumber = 1, itemsCount = 200) => {

    const obj = {
        pageNumber,
        itemsCountPerPage: itemsCount
    }

    try {
        const res = await http.post(`${apiDomainNobat}${urls.wallet.transctions.url}`, {
            pagedListInputDto: { ...obj }
        })

        return res.data
    } catch (error) {
        console.log(error)
    }
}


export { getTransactions }