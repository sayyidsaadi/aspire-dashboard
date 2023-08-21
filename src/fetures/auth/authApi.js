import { createAsyncThunk } from "@reduxjs/toolkit";
import axio from "axios";

// User Register
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data) => {
    try {
      const response = await axio.post(
        "http://localhost:5050/api/v1/auth/register",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// User Login
export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
  try {
    const response = await axio.post(
      "http://localhost:5050/api/v1/auth",
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// User Login
export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    const response = await axio.post(
      "http://localhost:5050/api/v1/auth/logout",
      "",
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Get Login User
export const logedInUser = createAsyncThunk("auth/logedInUser", async () => {
  try {
    const response = await axio.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, data }) => {
    try {
      const response = await axio.put(
        `http://localhost:5050/api/v1/user/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
