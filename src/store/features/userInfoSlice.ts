import { http } from "@/services/axios";
import { apiDomainNobat } from "@/services/getApiUrl";
import urls from "@/services/urls";
import { UserType } from "@/types/global";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  auth: string;
  user: UserType;
  error: string;
}

const initialState: InitialStateType = {
  auth: "isLoading",
  user: {
    firstName: "",
    lastName: "",
    nationalNumber: "",
    shomareShenasname: "",
    phoneNumber: "",
    cityId: 0,
    cityName: "",
    gender: "",
    provinceId: 0,
    provinceName: "",
    accountBalance: 0,
  },
  error: "",
};

const fetchUser = createAsyncThunk("userInfo/fetchUser", async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("no accessToken");
    }
    const res = await http.get(`${apiDomainNobat}${urls.user.getUser.url}`);
    return { data: res.data.value, auth: "authorization" };
  } catch (error) {
    return { data: {}, auth: "unauthorization" };
  }
});

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.auth = "isLoading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.auth = action.payload.auth;
      state.user = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.auth = "unauthorization";
      state.user = {
        firstName: "",
        lastName: "",
        nationalNumber: "",
        shomareShenasname: "",
        phoneNumber: "",
        cityId: 0,
        cityName: "",
        gender: "",
        provinceId: 0,
        provinceName: "",
        accountBalance: 0,
      };
      state.error = "مشکلی رخ داده است";
    });
  },
});

export default userInfoSlice.reducer;
export { fetchUser };
