
const convertParams = (params: string[]) => {
    let fitlerParams = {
        city: "",
        specialty: "",
        consultingPlan: "",
    }

    for (let key in fitlerParams) {
        const findItem = params.findIndex(item => item === key)
        if (findItem !== -1) {

            fitlerParams = {
                ...fitlerParams,
                [key]: params[findItem + 1]
            }
        }
    }

    return fitlerParams
}

export default convertParams