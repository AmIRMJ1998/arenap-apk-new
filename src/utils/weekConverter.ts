const weekConverted = (day: string) => {
  switch (day) {
    case "fridayConsultationTextPlan":
      return "جمعه";
      break;
    case "mondayConsultationTextPlan":
      return "دو شنبه";
      break;
    case "saturdayConsultationTextPlan":
      return "شنبه";
      break;
    case "sundayConsultationTextPlan":
      return "یک شنبه";
      break;
    case "thursdayConsultationTextPlan":
      return "پنج شنبه";
      break;
    case "tuesdayConsultationTextPlan":
      return "سه شنبه";
      break;
    case "wednesdayConsultationTextPlan":
      return "چهارشنبه";
      break;

    default:
      return "نامشخص"
      break;
  }
};


export default weekConverted
