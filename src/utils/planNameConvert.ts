


const planNameConvert = (type: string) => {



    switch (type) {
        case "OnlineAppointment":
            return "نوبت دهی حضوری"
            break;

        case "TextConsultation":
            return "مشاوره متنی"

            break;

        case "VoiceConsultation":
            return "مشاوره تلفنی"

            break;

        case "ImmediateConsultation":

            return "مشاوره تلفنی فوری"
            break;
        case "All":

            return "پلن مشاوره"
            break;

        case "disabled":
            return "لغو شده"

            break;

        default:
            return "نامشخص"
            break;
    }
}

export default planNameConvert