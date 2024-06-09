export const convertWaitingTime = (value: number) => {
  switch (value) {
    case 1:
      return "۰ تا ۱۵ دقیقه";
      break;
    case 2:
      return "۱۵ تا ۴۵ دقیقه";
      break;
    case 3:
      return "۴۵ تا ۹۰ دقیقه";
      break;
    case 4:
      return "بیش از ۹۰ دقیقه";
      break;

    default:
      return "نا مشخص";
      break;
  }
};
