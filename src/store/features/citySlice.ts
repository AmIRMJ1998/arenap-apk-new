// slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityStateType {
  provinceId: number;
  cityId: number;
  cityName: number;
}

const initialState: CityStateType = {
  provinceId: 0,
  cityId: 0,
  cityName: 0,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state) => {},
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
