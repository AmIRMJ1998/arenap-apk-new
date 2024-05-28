


const convertDayTime = (time : number ) => {


    if (time < 11) {
        return "صبح"
    } else if (time < 14) {
        return "ظهر"
    } else if (time < 19) {
        return "عصر"
    } else if (time < 24) {
        return "شب"
    }

}


export default convertDayTime