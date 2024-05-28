import { createSlice } from "@reduxjs/toolkit";

interface ModalLoginType {
  active: boolean;
}

const initialState: ModalLoginType = {
  active: false,
};

const backSlice = createSlice({
  name: "backSlice",
  initialState,
  reducers: {
    activeHandler: (state) => {
      state.active = true;
    },
  },
});

export const { activeHandler } = backSlice.actions;
export default backSlice.reducer;
