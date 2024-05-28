const convertGender = (gender: string) => {
    switch (gender) {
        case "0":
            return "فرقی نمیکند"
            break;
        case "2":
            return "آقا"
            break;
        case "1":
            return "خانم"
            break;
        default:
            return "نا مشخص"
            break;
    }

}
export default convertGender