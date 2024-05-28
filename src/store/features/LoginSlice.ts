import { createSlice } from "@reduxjs/toolkit";

export interface LoginType {
    phoneVerificationCodeId : string,
    accessToken : string,
    refreshToken : string,
    sessionId : string,
    phoneNumber : string
}

const initialState: LoginType = {
    phoneVerificationCodeId : "",
    accessToken : "",
    refreshToken : "",
    sessionId : "",
    phoneNumber : ""
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    savePhoneVerificationCodeId: (state , action) => {
        state.phoneVerificationCodeId = action.payload.phoneVerificationCodeId
        state.phoneNumber = action.payload.phoneNumber
    },
    saveTokens: (state , action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
    },
    saveSessionId : (state , action) => {
        state.sessionId = action.payload.sessionId
    },

   
  },
});

export const { savePhoneVerificationCodeId, saveTokens, saveSessionId  } = loginSlice.actions;
export default loginSlice.reducer;
