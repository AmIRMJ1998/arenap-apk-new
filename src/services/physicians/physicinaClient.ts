import { http } from "../axios";
import { apiDomainNobat } from "../getApiUrl";
import urls from "../urls";

const checkNewPatient = async (physicianProfileId: string) => {
  try {
    const res = await http.post(
      `${apiDomainNobat}${urls.physician.checkNewPatient.url}`,
      {
        physicianProfileId,
      }
    );
    return res.data;
  } catch (error: any) {
    if(error?.response?.status === 400)  {
            return {
                  resultCode : 400,
            }
      
    }
  }
};

export { checkNewPatient };
