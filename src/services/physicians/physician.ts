import { PhysicainProfileType } from "@/types/physicianProfile";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const getNewestPhysician = async () => {
  try {
    const res = await fetch(
      `${apiDomainNobat}${urls.physician.newestPhysicians.url}`,
      {
        method: urls.physician.newestPhysicians.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result.value;
  } catch (error) {
    console.log(error);
  }
};

const getBestPhysician = async (
  provinceId: number,
  cityId: number,
  pageNumber: number,
  itemsCountPerPage: number
) => {
  const data = {
    cityId,
    provinceId,
    pageNumber,
    itemsCountPerPage,
  };
  try {
    const res = await fetch(
      `${apiDomainNobat}${urls.physician.bestPhysician.url}`,
      {
        method: urls.physician.bestPhysician.method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    return result.value.items;
  } catch (error) {
    console.log(error);
  }
};

const getProfilePhysician = async (
  physicianProfileUrl: string
) => {
  try {
    const res = await fetch(
      `${apiDomainNobat}${urls.physician.physicianProfile.url}${physicianProfileUrl}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPhysicianDetail = async (slug: string) => {
  const res = await fetch(
    `${apiDomainNobat}${urls.physician.physicianProfile.url}${slug}`
  );
  const {value} = await res.json();

  return value;
};

export {
  getBestPhysician,
  getProfilePhysician,
  getNewestPhysician,
  getPhysicianDetail,
};
