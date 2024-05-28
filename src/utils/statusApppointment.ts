
const statusApppointmentHandler = (status: string) => {

    switch (status) {
        case "Paid":
            return "پرداخت شده"
            break;
        case "Is Deleted By User":
            return "لغو شده"
            break;
        case "Is Deleted By Physician":
            return "لغو شده"
            break;
        case "Awaiting Payment":
            return "در انتظار پرداخت"
            break;

        default:
            return "نامشخص"
            break;
    }

}

export default statusApppointmentHandler