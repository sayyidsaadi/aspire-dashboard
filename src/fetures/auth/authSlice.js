import { createSlice } from "@reduxjs/toolkit";
import {
  logedInUser,
  updateUser,
  userLogin,
  userLogout,
  userRegister,
} from "./authApi";

// Create Auth Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state, action) => {
      (state.error = null), (state.message = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logedInUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state, action) => {
        localStorage.removeItem("user");
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.data;

        localStorage.setItem("user", JSON.stringify(action.payload.data));
        state.message = action.payload.message;
      });
  },
});

// Export Selectors
export const getAuth = (state) => state.auth;

// Export Actions
export const { setMessageEmpty } = authSlice.actions;

// Exprort Reducer
export default authSlice.reducer;
