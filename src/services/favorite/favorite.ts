import Toastify from "@/components/elements/toasts/Toastify";
import { apiDomainNobat } from "../getApiUrl";
import { http } from "../axios";
import urls from "../urls";

const getAllFavorite = async () => {
  const dataObj = {
    pagedListInputDto: {
      pageNumber: 1,
      itemsCountPerPage: 200,
    },
  };

  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.favorite.getAll.url}`,
      dataObj
    );
    return res.data;
  } catch (error: any) {
    Toastify("error", error?.response?.data?.resultMessage);
  }
};
const isFavorite = async (physicianProfileId: string) => {
  try {
    const { status, data } = await http(
      `${apiDomainNobat}${urls.favorite.isFavorite.url}${physicianProfileId}`
    );
    if (status === 200) {
      return data?.value;
    }
  } catch (error: any) {
    if (error.response) {
      if (error.response?.status) {
        Toastify("error", error.response?.data?.resultMessage);
      }
    }
  }
};
const addFavorite = async (physicianProfileId: string) => {
  const obj = {
    physicianProfileId: physicianProfileId,
  };
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.favorite.addFavorite.url}`,
      obj
    );
    res.data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultMessage);
  }
};
const deleteFavorite = async (physicianProfileId: string) => {
  try {
    const res = await http.delete(
      `${apiDomainNobat}${urls.favorite.deleteFavorite.url}${physicianProfileId}`
    );
    res.data;
  } catch (error: any) {
    Toastify("error", error.response?.data?.resultMessage);
  }
};

export { getAllFavorite, isFavorite, addFavorite, deleteFavorite };
