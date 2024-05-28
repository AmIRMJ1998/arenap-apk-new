const generateUrlSearchPage = (parametrs: {
  specialty: string;
  consultingPlan: string;
  gender: string;
  page: string;
  disease: string;
  sign: string;
  service: string;
  search_key: string;
  city: string;
  // itemsCountPerPage: string,
}) => {
  const {
    city,
    consultingPlan,
    disease,
    gender,
    page,
    search_key,
    service,
    sign,
    specialty,
  } = parametrs;

  let url = `?${specialty ? `specialty=${specialty}` : ""}${
    city ? `&city=${city}` : ""
  }${consultingPlan ? `&consultingPlan=${consultingPlan}` : ""}${
    disease ? `&disease=${disease}` : ""
  }${gender ? `&gender=${gender}` : ""}${page ? `&page=${page}` : ""}${
    search_key ? `&search_key=${search_key}` : ""
  }${service ? `&service=${service}` : ""}${sign ? `&sign=${sign}` : ""}`;
  return url;
};

export default generateUrlSearchPage;
