import Toastify from "@/components/elements/toasts/Toastify";
import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const getSignsAi = async (filter: string) => {
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.ai.getSigns.url}?filter=${filter}`
    );

    return res.data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultMessage);
  }
};

const getPhysiciansAi = async (symptoms: string[]) => {
  let symptomsFilter = [...symptoms];

  if (symptoms.length === 3) {
    symptomsFilter = [...symptoms, symptoms[1], symptoms[2]];
  } else if (symptoms.length === 4) {
    symptomsFilter = [...symptoms, symptoms[1]];
  }

  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.ai.getPhysicians.url}`,
      {
        symptoms : symptomsFilter,
      }
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultMessage);
  }
};

export { getSignsAi, getPhysiciansAi };
