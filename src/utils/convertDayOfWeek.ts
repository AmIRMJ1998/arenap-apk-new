const convertDayOfWeek = (day: number) => {
  switch (+day) {
    case 0:
      return "یکشنبه";
      break;

    case 1:
      return "دوشنبه";
      break;

    case 2:
      return "سه شنبه";

      break;

    case 3:
      return "چهارشنبه";
      break;

    case 4:
      return "پنج شنبه";
      break;

    case 5:
      return "جمعه";
      break;

    case 6:
      return "شنبه";
      break;

    default:
      return "نامشخص";
      break;
  }
};

export default convertDayOfWeek;
