import { createSlice } from "@reduxjs/toolkit";

interface ModalLoginType {
  show: boolean;
}

const initialState: ModalLoginType = {
  show: false,
};

const ModalLoginSlice = createSlice({
  name: "modalLogin",
  initialState,
  reducers: {
    toggle: (state) => {
      state.show = !state.show;
    },
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
  },
});

export const { toggle, open, close } = ModalLoginSlice.actions;
export default ModalLoginSlice.reducer;
