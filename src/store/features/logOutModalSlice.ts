import { createSlice } from "@reduxjs/toolkit";

interface LogoutModalType {
  show: boolean;
}

const initialState: LogoutModalType = {
  show: false,
};

const LogoutModalSlice = createSlice({
  name: "logoutModal",
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

export const { toggle, open, close } = LogoutModalSlice.actions;
export default LogoutModalSlice.reducer;
