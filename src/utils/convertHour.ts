const convertToHour = () => {
    const hoursArray = ["00", "07", "15", "22", "30", "37", "45", "52"]
    const timeArray = []

    for (let i = 0; i < 24; i++) {
        for (let item of hoursArray) {
            timeArray.push(`${i}:${item}`)
        }
    }
    return timeArray
}
export default convertToHour