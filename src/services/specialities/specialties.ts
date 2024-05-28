import axios from "axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const getAllSpecialities = async () => {
  try {
    const res = await axios(
      `${apiDomainNobat}${urls.specialities.getSpecialities.url}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllSpecialities };
